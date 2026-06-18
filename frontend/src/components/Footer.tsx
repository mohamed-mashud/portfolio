import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "../data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t border-forest-600/60 bg-forest-950/40 pb-36 sm:pb-40">
      <div className="container-px flex flex-col items-center justify-between gap-5 py-8 sm:flex-row">
        <p className="font-mono text-xs text-bone-400">
          <span className="text-mint-500">©</span> {new Date().getFullYear()}{" "}
          {profile.name} · built with React + Tailwind
        </p>

        <div className="flex items-center gap-5 text-bone-300">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="transition hover:text-mint-300"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="transition hover:text-mint-300"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="transition hover:text-mint-300"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>

        <a
          href="#home"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-bone-400 transition hover:text-mint-300"
        >
          back to top
          <ArrowUp className="h-3.5 w-3.5" />
        </a>
      </div>
    </footer>
  );
}
