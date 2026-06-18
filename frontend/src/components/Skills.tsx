import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import TerminalWindow from "./ui/TerminalWindow";
import { skills } from "../data/portfolio";

export default function Skills() {
  return (
    <section id="skills" className="container-px scroll-mt-20 py-20 sm:py-28">
      <SectionHeading
        index="04"
        command="skills"
        title="My toolbox"
        blurb="The languages, frameworks, and tools I reach for to ship reliable software."
      />

      <Reveal>
        <TerminalWindow title="skills.json">
          <div className="font-mono text-sm leading-relaxed">
            <p className="text-bone-400">
              <span className="text-mint-500">$</span> cat skills.json
            </p>
            <p className="mt-2 text-bone-400">{"{"}</p>
            <div className="grid gap-x-8 gap-y-4 py-1 pl-4 sm:grid-cols-2">
              {skills.map((group) => (
                <div key={group.label}>
                  <span className="text-mint-300">"{group.label}"</span>
                  <span className="text-bone-400">: [</span>
                  <div className="flex flex-wrap gap-2 py-2 pl-4">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-md border border-forest-500/70 bg-forest-700/40 px-2.5 py-1 text-xs text-bone-200 transition hover:border-mint-500/60 hover:text-mint-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <span className="text-bone-400">],</span>
                </div>
              ))}
            </div>
            <p className="text-bone-400">{"}"}</p>
          </div>
        </TerminalWindow>
      </Reveal>
    </section>
  );
}
