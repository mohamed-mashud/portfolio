import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";
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
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const nextMessages: Message[] = [
      ...messages,
      { role: "user", content: trimmed },
    ];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    // Placeholder assistant message we stream tokens into.
    setMessages((m) => [...m, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Drop the canned greeting (index 0); send the real conversation only.
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
        appendToLastAssistant(errMsg, true);
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
      appendToLastAssistant(
        "I'm having trouble connecting right now. Please try again in a moment.",
        true
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

  function appendToLastAssistant(content: string, replace = false) {
    setMessages((m) => {
      const copy = [...m];
      for (let i = copy.length - 1; i >= 0; i--) {
        if (copy[i].role === "assistant") {
          copy[i] = {
            ...copy[i],
            content: replace ? content : copy[i].content + content,
          };
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

  const showSuggestions = messages.length <= 1 && !loading;

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-4 z-[70] flex h-[min(70vh,32rem)] w-[min(92vw,24rem)] flex-col overflow-hidden rounded-xl border border-forest-600/80 bg-forest-800/95 shadow-terminal backdrop-blur sm:right-6"
            role="dialog"
            aria-label="Chat with Mohamed's assistant"
          >
            <div className="flex items-center gap-2 border-b border-forest-600/70 bg-forest-700/60 px-4 py-2.5">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 inline-flex items-center gap-1.5 select-none font-mono text-xs text-bone-400">
                <Sparkles className="h-3.5 w-3.5 text-mint-400" />
                ask-about-mohamed
              </span>
              <button
                onClick={() => setOpen(false)}
                className="ml-auto rounded p-1 text-bone-400 transition hover:bg-forest-600/60 hover:text-bone-100"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] whitespace-pre-wrap rounded-lg px-3 py-2 text-sm ${
                      m.role === "user"
                        ? "bg-mint-500 text-forest-950"
                        : "border border-forest-600/70 bg-forest-700/40 text-bone-200"
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

              {showSuggestions && (
                <div className="space-y-2 pt-1">
                  <p className="font-mono text-xs text-bone-400"># try asking</p>
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="block w-full rounded-lg border border-forest-600/70 bg-forest-700/30 px-3 py-2 text-left text-sm text-bone-300 transition hover:border-mint-500/50 hover:bg-forest-700/50 hover:text-bone-100"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={onSubmit}
              className="flex items-center gap-2 border-t border-forest-600/70 bg-forest-700/40 px-3 py-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Mohamed..."
                className="min-w-0 flex-1 rounded-lg border border-forest-600/70 bg-forest-800/60 px-3 py-2 text-sm text-bone-100 placeholder:text-bone-400 focus:border-mint-500/60 focus:outline-none"
                aria-label="Message"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-mint-500 text-forest-950 transition hover:bg-mint-400 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-4 z-[70] grid h-14 w-14 place-items-center rounded-full bg-mint-500 text-forest-950 shadow-glow transition hover:bg-mint-400 sm:right-6"
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageSquare className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </>
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
