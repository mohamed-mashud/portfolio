import { ArrowRight, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import TerminalWindow from "./ui/TerminalWindow";
import Typewriter from "./ui/Typewriter";
import { profile } from "../data/portfolio";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid-faint bg-[size:46px_46px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)] opacity-60"
      />

      <div className="container-px relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-mint-500/30 bg-mint-500/10 px-3.5 py-1.5 font-mono text-xs text-mint-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-mint-400" />
            </span>
            available for opportunities
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-3xl font-extrabold leading-[1.05] tracking-tight text-bone-100 sm:text-5xl"
          >
            {profile.name}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-4 font-mono text-lg text-mint-300 sm:text-2xl"
          >
            <span className="text-bone-400">{">"} </span>
            <Typewriter
              words={[
                "Software Developer @ Zoho",
                "Backend engineer",
                "MERN stack builder",
                "Maps & data-driven systems",
              ]}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-bone-300 sm:text-lg"
          >
            {profile.tagline.join(" ")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-md bg-mint-500 px-5 py-3 text-sm font-semibold text-forest-950 transition hover:bg-mint-400"
            >
              View my work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-md border border-forest-500 bg-forest-800/50 px-5 py-3 text-sm font-semibold text-bone-100 transition hover:border-mint-500/60 hover:text-mint-300"
            >
              Get in touch
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-8 flex items-center gap-5 text-bone-300"
          >
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="transition hover:text-mint-300"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="transition hover:text-mint-300"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="transition hover:text-mint-300"
            >
              <Mail className="h-5 w-5" />
            </a>
            <span className="inline-flex items-center gap-1.5 font-mono text-xs text-bone-400">
              <MapPin className="h-3.5 w-3.5" />
              {profile.location}
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div
            aria-hidden="true"
            className="absolute -inset-3 -z-10 rounded-2xl bg-mint-500/10 blur-2xl"
          />
          <TerminalWindow title="mohamed@masood: ~">
            <div className="flex items-center gap-5">
              <div className="relative shrink-0">
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -m-1 rounded-2xl bg-gradient-to-br from-mint-500/50 to-moss-400/30 blur-[2px]"
                />
                <img
                  src="/avatar-placeholder.svg"
                  alt="Portrait of Mohamed Masood N"
                  className="relative h-24 w-24 rounded-2xl border border-forest-500 object-cover sm:h-28 sm:w-28"
                />
              </div>
              <div className="min-w-0 font-mono text-sm">
                <p className="truncate text-bone-100">{profile.name}</p>
                <p className="truncate text-bone-400">{profile.role}</p>
                <p className="mt-1 truncate text-mint-400">@{profile.githubHandle}</p>
              </div>
            </div>

            <div className="mt-5 space-y-2 font-mono text-sm leading-relaxed">
              <p className="text-bone-300">
                <span className="text-mint-500">$</span> whoami
              </p>
              <p className="text-bone-200">
                software_developer · backend · maps · ml
              </p>
              <p className="text-bone-300">
                <span className="text-mint-500">$</span> cat stack.txt
              </p>
              <p className="flex flex-wrap gap-x-2 text-bone-200">
                Java · JavaScript · React · Node · SQL · Python
              </p>
              <p className="text-bone-300">
                <span className="text-mint-500">$</span> status
                <span className="ml-2 rounded bg-mint-500/15 px-1.5 py-0.5 text-mint-300">
                  open_to_work
                </span>
                <span className="ml-1 inline-block h-4 w-2 translate-y-0.5 bg-mint-400 animate-blink" />
              </p>
            </div>
          </TerminalWindow>
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 animate-float font-mono text-xs text-bone-400 hover:text-mint-300 sm:block"
      >
        scroll ↓
      </a>
    </section>
  );
}
