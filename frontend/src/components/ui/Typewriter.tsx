import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

type Props = {
  words: string[];
  className?: string;
};

export default function Typewriter({ words, className = "" }: Props) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) {
      setText(words[0] ?? "");
      return;
    }

    const current = words[index % words.length];
    let timeout: number;

    if (!deleting && text === current) {
      timeout = window.setTimeout(() => setDeleting(true), 1600);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      timeout = window.setTimeout(() => {}, 120);
    } else {
      timeout = window.setTimeout(
        () => {
          setText((t) =>
            deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1),
          );
        },
        deleting ? 45 : 80,
      );
    }

    return () => window.clearTimeout(timeout);
  }, [text, deleting, index, words, reduce]);

  return (
    <span className={className}>
      {text}
      <span
        aria-hidden="true"
        className="ml-0.5 inline-block h-[1.05em] w-[0.6ch] translate-y-[0.12em] bg-mint-400 align-middle animate-blink"
      />
    </span>
  );
}
