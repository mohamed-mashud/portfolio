import { Github, Linkedin, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import TerminalWindow from "./ui/TerminalWindow";
import { profile } from "../data/portfolio";

const channels = [
  {
    icon: Mail,
    label: "email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    icon: Phone,
    label: "phone",
    value: profile.phone,
    href: `tel:${profile.phoneHref}`,
  },
  {
    icon: Github,
    label: "github",
    value: profile.githubHandle,
    href: profile.github,
  },
  {
    icon: Linkedin,
    label: "linkedin",
    value: profile.linkedinHandle,
    href: profile.linkedin,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="container-px scroll-mt-20 py-20 sm:py-28">
      <SectionHeading
        index="06"
        command="contact"
        title="Let's build something"
        blurb="I'm open to software roles and interesting collaborations. The fastest way to reach me is email — I usually reply within a day."
      />

      <Reveal>
        <TerminalWindow title="contact -- send a message">
          <p className="font-mono text-sm text-bone-300">
            <span className="text-mint-500">$</span> ./say-hello.sh
          </p>
          <p className="mt-2 font-mono text-sm text-bone-400">
            # pick a channel — I'm listening
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                className="group flex items-center gap-3 rounded-lg border border-forest-600/70 bg-forest-700/30 p-4 transition hover:border-mint-500/50 hover:bg-forest-700/50"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-forest-500 bg-forest-800/60 text-mint-400">
                  <c.icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-xs text-mint-400">
                    {c.label}
                  </span>
                  <span className="block truncate text-sm text-bone-200">
                    {c.value}
                  </span>
                </span>
                <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-bone-400 transition group-hover:text-mint-300" />
              </a>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-forest-600/60 pt-5 font-mono text-xs text-bone-400">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-mint-400" />
              {profile.location} · {profile.homeBase}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-mint-400" />
              available for opportunities
            </span>
          </div>
        </TerminalWindow>
      </Reveal>
    </section>
  );
}
