import { useEffect, useState } from "react";
import { Menu, X, Terminal } from "lucide-react";
import { nav } from "../data/portfolio";
import { useActiveSection } from "../hooks/useActiveSection";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection([...nav.map((n) => n.id), "home"]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-forest-600/60 bg-forest-900/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="container-px flex h-16 items-center justify-between">
        <a
          href="#home"
          className="group flex items-center gap-2 font-mono text-sm font-semibold text-bone-100"
        >
          <Terminal className="h-4 w-4 text-mint-500" />
          <span>
            mohamed
            <span className="text-mint-500">@</span>
            masood
          </span>
          <span className="text-mint-500 transition group-hover:opacity-100">
            :~$
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`rounded-md px-3 py-2 font-mono text-sm transition-colors ${
                  active === item.id
                    ? "text-mint-300"
                    : "text-bone-300 hover:text-mint-300"
                }`}
              >
                <span className="text-mint-500/70">#</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden rounded-md border border-mint-500/40 bg-mint-500/10 px-4 py-2 font-mono text-sm font-medium text-mint-300 transition hover:border-mint-400 hover:bg-mint-500/20 md:inline-block"
        >
          get in touch
        </a>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-2 text-bone-200 hover:bg-forest-700/60 md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-forest-600/60 bg-forest-900/95 md:hidden">
          <ul className="container-px flex flex-col py-3">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-2 py-3 font-mono text-sm text-bone-200 hover:bg-forest-700/50 hover:text-mint-300"
                >
                  <span className="text-mint-500/70">#</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
