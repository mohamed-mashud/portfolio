import { ArrowUpRight, Sparkles } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import { projects } from "../data/portfolio";

export default function Projects() {
  return (
    <section id="work" className="container-px scroll-mt-20 py-20 sm:py-28">
      <SectionHeading
        index="03"
        command="work"
        title="Things I've built"
        blurb="A few projects spanning machine learning, full-stack web, and hardware — from idea to working prototype."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal
            key={p.name}
            delay={i * 0.06}
            className={p.featured ? "md:col-span-2" : ""}
          >
            <article
              className={`group flex h-full flex-col rounded-xl border bg-forest-800/40 p-6 transition-colors hover:border-mint-500/50 ${
                p.featured
                  ? "border-mint-500/30 shadow-glow"
                  : "border-forest-600/70"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2 font-mono text-xs text-bone-400">
                  <span className="text-mint-500">{`{`}</span>
                  project
                  <span className="text-mint-500">{`}`}</span>
                  <span className="text-forest-500">·</span>
                  <span>{p.year}</span>
                </div>
                {p.highlight && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-mint-500/15 px-2.5 py-1 font-mono text-xs text-mint-300">
                    <Sparkles className="h-3 w-3" />
                    {p.highlight}
                  </span>
                )}
              </div>

              <h3 className="mt-4 text-xl font-bold text-bone-100">
                {p.name}
              </h3>
              <p className="mt-2 text-sm text-bone-300">{p.blurb}</p>

              <ul className="mt-4 space-y-2">
                {p.bullets.map((b, bi) => (
                  <li
                    key={bi}
                    className="flex gap-2.5 text-sm leading-relaxed text-bone-300"
                  >
                    <span className="shrink-0 select-none font-mono leading-relaxed text-mint-500/80">
                      ›
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-5">
                <div className="flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-md border border-forest-500/70 bg-forest-700/40 px-2.5 py-1 font-mono text-xs text-bone-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {p.links.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-4">
                    {p.links.map((l) => (
                      <a
                        key={l.label}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="link-underline font-mono text-sm text-mint-300"
                      >
                        {l.label}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
