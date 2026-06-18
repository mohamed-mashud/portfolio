import type { ReactNode } from "react";

type Props = {
  title?: string;
  children: ReactNode;
  className?: string;
};

export default function TerminalWindow({
  title = "zsh",
  children,
  className = "",
}: Props) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-forest-600/80 bg-forest-800/90 shadow-terminal backdrop-blur ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-forest-600/70 bg-forest-700/60 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 select-none font-mono text-xs text-bone-400">
          {title}
        </span>
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </div>
  );
}
