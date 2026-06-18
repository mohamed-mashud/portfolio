import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Send, Sparkles } from "lucide-react";
import { profile } from "../data/portfolio";

type Message = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What does Mohamed do at Zoho?",
  "Tell me about his projects",
  "What's his tech stack?",
];

const GREETING: Message = {
  role: "assistant",
  content: `Hi! I'm ${profile.name.split(" ")[0]}'s assistant. Ask me anything about his experience, projects, or skills.`,
};

export default function ChatWidget() {
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasConversation = messages.length > 1;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading, expanded]);

  useEffect(() => {
    if (hasConversation) setExpanded(true);
  }, [hasConversation]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && expanded) setExpanded(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setExpanded(true);

    const nextMessages: Message[] = [
      ...messages,
      { role: "user", content: trimmed },
    ];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    setMessages((m) => [...m, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.slice(1) }),
      });

      if (!res.ok || !res.body) {
        let errMsg = "Sorry, something went wrong. Please try again.";
        try {
          const data = await res.json();
          if (data?.error) errMsg = data.error;
        } catch {
          /* keep default */
        }
        setLastAssistant(errMsg);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setLastAssistant(acc);
      }
      if (!acc.trim()) {
        setLastAssistant("Sorry, I couldn't generate a response. Please try again.");
      }
    } catch {
      setLastAssistant(
        "I'm having trouble connecting right now. Please try again in a moment."
      );
    } finally {
      setLoading(false);
    }
  }

  function setLastAssistant(content: string) {
    setMessages((m) => {
      const copy = [...m];
      for (let i = copy.length - 1; i >= 0; i--) {
        if (copy[i].role === "assistant") {
          copy[i] = { ...copy[i], content };
          break;
        }
      }
      return copy;
    });
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    send(input);
  }

  const showSuggestions = !hasConversation && !loading;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 flex flex-col"
      role="region"
      aria-label="Chat with Mohamed's assistant"
    >
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-forest-600/70 bg-forest-900/95 shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md"
          >
            <div className="container-px flex items-center justify-between py-2">
              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-bone-400">
                <Sparkles className="h-3.5 w-3.5 text-mint-400" />
                ask-about-mohamed
              </span>
              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="rounded p-1.5 text-bone-400 transition hover:bg-forest-700/60 hover:text-bone-100"
                aria-label="Minimize chat"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>

            <div
              ref={scrollRef}
              className="container-px max-h-[min(45vh,22rem)] space-y-4 overflow-y-auto pb-4"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-mint-500 text-forest-950"
                        : "border border-forest-600/70 bg-forest-800/80 text-bone-200"
                    }`}
                  >
                    {m.content ||
                      (loading && i === messages.length - 1 ? (
                        <TypingDots />
                      ) : (
                        ""
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="border-t border-forest-600/70 bg-forest-900/95 backdrop-blur-md">
        <div className="container-px py-3 sm:py-4">
          {showSuggestions && (
            <div className="mb-3 flex flex-wrap justify-center gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="rounded-full border border-forest-600/70 bg-forest-800/60 px-3 py-1.5 text-xs text-bone-300 transition hover:border-mint-500/50 hover:text-bone-100 sm:text-sm"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={onSubmit}
            className="mx-auto flex max-w-3xl items-center gap-2 rounded-2xl border border-forest-600/80 bg-forest-800/80 p-1.5 shadow-terminal focus-within:border-mint-500/40 focus-within:shadow-glow"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => setExpanded(true)}
              placeholder="Ask about Mohamed..."
              className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-bone-100 placeholder:text-bone-400 focus:outline-none"
              aria-label="Message"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-mint-500 text-forest-950 transition hover:bg-mint-400 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-2 text-center font-mono text-[10px] text-bone-400 sm:text-xs">
            Answers are grounded in Mohamed&apos;s portfolio · powered by Gemini
          </p>
        </div>
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 py-1">
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-bone-300 [animation-delay:-0.3s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-bone-300 [animation-delay:-0.15s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-bone-300" />
    </span>
  );
}
