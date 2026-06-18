import { Briefcase } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import { experience } from "../data/portfolio";

export default function Experience() {
  return (
    <section
      id="experience"
      className="container-px scroll-mt-20 py-20 sm:py-28"
    >
      <SectionHeading
        index="02"
        command="experience"
        title="Where I've worked"
      />

      <div className="space-y-8">
        {experience.map((job, i) => (
          <Reveal key={job.company} delay={i * 0.05}>
            <article className="relative rounded-xl border border-forest-600/70 bg-forest-800/40 p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <span className="mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-forest-500 bg-forest-700/60 text-mint-400">
                    <Briefcase className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-bone-100">
                      {job.role}
                    </h3>
                    <p className="text-mint-300">{job.company}</p>
                    <p className="mt-0.5 font-mono text-xs text-bone-400">
                      {job.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs">
                  {job.current && (
                    <span className="rounded-full bg-mint-500/15 px-2.5 py-1 text-mint-300">
                      current
                    </span>
                  )}
                  <span className="rounded-full border border-forest-500 px-2.5 py-1 text-bone-300">
                    {job.period}
                  </span>
                </div>
              </div>

              <ul className="mt-6 space-y-3">
                {job.bullets.map((b, bi) => (
                  <li
                    key={bi}
                    className="flex gap-3 text-sm leading-relaxed text-bone-300"
                  >
                    <span className="mt-1.5 select-none font-mono text-mint-500">
                      ▹
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                {job.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-forest-500/70 bg-forest-700/40 px-2.5 py-1 font-mono text-xs text-bone-300"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
