import type { VercelRequest, VercelResponse } from "@vercel/node";
import { config as loadEnv } from "dotenv";
import { resolve } from "node:path";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildChunks, type Chunk } from "./knowledge.js";

type Message = { role: "user" | "assistant"; content: string };

const CHAT_MODEL = "gemini-2.5-flash";
const EMBED_MODEL = "gemini-embedding-001";
const TOP_K = 5;

function loadLocalEnv() {
  if (process.env.GEMINI_API_KEY) return;
  for (const path of [
    resolve(process.cwd(), ".env.local"),
    resolve(process.cwd(), ".env"),
    resolve(process.cwd(), "frontend/.env.local"),
    resolve(process.cwd(), "frontend/.env"),
  ]) {
    loadEnv({ path });
  }
}

loadLocalEnv();

const SYSTEM_INSTRUCTION = `You are the friendly AI assistant on Mohamed Masood N's personal portfolio website. \
People visit to learn about Mohamed — his background, skills, projects, and experience. \
Answer in a warm, concise, professional tone, speaking about Mohamed in the third person (you are his assistant, not Mohamed himself). \

Ground your answers in the CONTEXT provided with each question, which is drawn from Mohamed's portfolio. \
Prefer the context for anything about Mohamed and never invent personal facts (jobs, dates, contact info, achievements) that are not supported by it. \
If a personal detail isn't in the context, say you don't have that information and point them to the contact section. \
For broader or general questions (e.g. explaining a technology Mohamed uses), you may use your general knowledge, ideally relating it back to Mohamed where relevant. \
Keep answers short — a sentence or two unless more detail is clearly warranted.`;

let cachedChunks: Chunk[] | null = null;
let cachedEmbeddings: number[][] | null = null;

function getGenAI(): GoogleGenerativeAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }
  return new GoogleGenerativeAI(apiKey);
}

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

function fullContext(): string {
  return buildChunks().map((c) => `- ${c.text}`).join("\n");
}

async function withRetry<T>(fn: () => Promise<T>, attempts = 3): Promise<T> {
  let last: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      last = err;
      if (i < attempts - 1) {
        await new Promise((r) => setTimeout(r, 400 * (i + 1)));
      }
    }
  }
  throw last;
}

async function ensureEmbeddings(genAI: GoogleGenerativeAI): Promise<{
  chunks: Chunk[];
  embeddings: number[][];
}> {
  if (cachedChunks && cachedEmbeddings) {
    return { chunks: cachedChunks, embeddings: cachedEmbeddings };
  }

  const chunks = buildChunks();
  const model = genAI.getGenerativeModel({ model: EMBED_MODEL });
  const result = await withRetry(() =>
    model.batchEmbedContents({
      requests: chunks.map((chunk) => ({
        content: { role: "user", parts: [{ text: chunk.text }] },
      })),
    })
  );

  const embeddings = result.embeddings.map((e) => e.values);
  cachedChunks = chunks;
  cachedEmbeddings = embeddings;
  return { chunks, embeddings };
}

async function retrieveContext(
  genAI: GoogleGenerativeAI,
  query: string
): Promise<string> {
  try {
    const { chunks, embeddings } = await ensureEmbeddings(genAI);

    const model = genAI.getGenerativeModel({ model: EMBED_MODEL });
    const queryResult = await withRetry(() => model.embedContent(query));
    const queryVector = queryResult.embedding.values;

    const ranked = chunks
      .map((chunk, i) => ({
        chunk,
        score: cosineSimilarity(queryVector, embeddings[i]),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, TOP_K);

    return ranked.map((r) => `- ${r.chunk.text}`).join("\n");
  } catch (err) {
    console.warn("Embedding retrieval failed, using full portfolio context:", err);
    return fullContext();
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const body =
      typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body;
    const messages: Message[] = Array.isArray(body?.messages)
      ? body.messages
      : [];

    if (messages.length === 0) {
      res.status(400).json({ error: "No messages provided" });
      return;
    }

    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (!lastUser) {
      res.status(400).json({ error: "No user message provided" });
      return;
    }

    const genAI = getGenAI();
    const context = await retrieveContext(genAI, lastUser.content);

    const model = genAI.getGenerativeModel({
      model: CHAT_MODEL,
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    // Prior turns become conversation history; the latest user turn carries the
    // retrieved context so the model answers grounded in Mohamed's data.
    const history = messages.slice(0, -1).map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const latestWithContext = `CONTEXT (from Mohamed's portfolio):\n${context}\n\nQUESTION: ${lastUser.content}`;

    const contents = [
      ...history,
      { role: "user", parts: [{ text: latestWithContext }] },
    ];

    const streamResult = await model.generateContentStream({ contents });

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache, no-transform");

    for await (const chunk of streamResult.stream) {
      const text = chunk.text();
      if (text) res.write(text);
    }
    res.end();
  } catch (err) {
    console.error("Chat API error:", err);

    const message =
      err instanceof Error && err.message === "GEMINI_API_KEY is not configured"
        ? "The chat assistant isn't configured yet. Please reach out via the contact section."
        : "Something went wrong while answering. Please try again in a moment.";

    if (res.headersSent) {
      res.end();
    } else {
      res.status(500).json({ error: message });
    }
  }
}
