import { Trophy, Medal, BookOpen, ExternalLink } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import { achievements, workshops, publications } from "../data/portfolio";

export default function Achievements() {
  return (
    <section id="awards" className="container-px scroll-mt-20 py-20 sm:py-28">
      <SectionHeading
        index="05"
        command="awards"
        title="Wins & writing"
        blurb="Hackathons, competitions, a publication, and workshops along the way."
      />

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <div className="grid gap-3 sm:grid-cols-2">
            {achievements.map((a) => {
              const isWinner = a.result.toLowerCase() === "winner";
              return (
                <div
                  key={a.title}
                  className="flex items-start gap-3 rounded-lg border border-forest-600/70 bg-forest-800/40 p-4 transition hover:border-mint-500/40"
                >
                  <span
                    className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-md border ${
                      isWinner
                        ? "border-mint-500/40 bg-mint-500/10 text-mint-300"
                        : "border-forest-500 bg-forest-700/50 text-bone-300"
                    }`}
                  >
                    {isWinner ? (
                      <Trophy className="h-4 w-4" />
                    ) : (
                      <Medal className="h-4 w-4" />
                    )}
                  </span>
                  <div>
                    <p className="font-mono text-xs text-mint-400">
                      {a.result}
                    </p>
                    <p className="mt-0.5 text-sm text-bone-200">{a.title}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="space-y-6">
          {publications.map((pub) => (
            <a
              key={pub.title}
              href={pub.href}
              target="_blank"
              rel="noreferrer"
              className="group block rounded-xl border border-forest-600/70 bg-forest-800/40 p-6 transition hover:border-mint-500/50"
            >
              <div className="flex items-center gap-2 font-mono text-xs text-mint-300">
                <BookOpen className="h-4 w-4" />
                publication · {pub.venue}
                <ExternalLink className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
              </div>
              <h3 className="mt-3 text-base font-semibold text-bone-100">
                {pub.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-bone-300">
                {pub.summary}
              </p>
            </a>
          ))}

          <div className="rounded-xl border border-forest-600/70 bg-forest-800/40 p-6">
            <p className="mb-3 font-mono text-xs text-mint-300">workshops</p>
            <ul className="space-y-2">
              {workshops.map((w) => (
                <li
                  key={w}
                  className="flex gap-2.5 text-sm text-bone-300"
                >
                  <span className="mt-1.5 select-none font-mono text-mint-500/80">
                    ▹
                  </span>
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
