import { GraduationCap } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import { about, education } from "../data/portfolio";

export default function About() {
  return (
    <section id="about" className="container-px scroll-mt-20 py-20 sm:py-28">
      <SectionHeading index="01" command="about" title="A bit about me" />

      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <Reveal className="space-y-5">
          {about.paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-base leading-relaxed text-bone-300 sm:text-lg"
            >
              {p}
            </p>
          ))}

          <div className="grid grid-cols-2 gap-3 pt-2 sm:max-w-lg">
            {about.facts.map((f) => (
              <div
                key={f.label}
                className="rounded-lg border border-forest-600/70 bg-forest-800/40 p-3"
              >
                <p className="font-mono text-xs text-mint-400">{f.label}</p>
                <p className="mt-1 text-sm text-bone-200">{f.value}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-xl border border-forest-600/70 bg-forest-800/40 p-6">
            <div className="mb-5 flex items-center gap-2 font-mono text-sm text-mint-300">
              <GraduationCap className="h-4 w-4" />
              education
            </div>
            <ol className="space-y-5">
              {education.map((e) => (
                <li
                  key={e.degree}
                  className="border-l border-forest-500 pl-4"
                >
                  <p className="text-sm font-semibold text-bone-100">
                    {e.degree}
                  </p>
                  <p className="mt-0.5 text-sm text-bone-300">{e.institute}</p>
                  <p className="mt-1 flex items-center gap-2 font-mono text-xs text-bone-400">
                    <span className="text-mint-400">{e.score}</span>
                    <span className="text-forest-500">·</span>
                    {e.period}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
