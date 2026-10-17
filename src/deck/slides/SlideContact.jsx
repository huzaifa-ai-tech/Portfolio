import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { ArrowUp } from "lucide-react";
import SlideShell from "../SlideShell";
import { useSlideMotion } from "../motion";
import { useDeck } from "../DeckContext";
import Magnetic from "../../effects/Magnetic";

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/huzaifa-ai-tech",
    icon: <FaGithub size={16} />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/muhammad-huzaifa-rehan-4ab838419",
    icon: <FaLinkedin size={16} />,
  },
];

const EMAIL = "huzaifarehan.2121@gmail.com";

function SlideContact() {
  const { container, item } = useSlideMotion();
  const { goTo } = useDeck();

  return (
    <SlideShell className="items-center">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center text-center"
      >
        <motion.p
          variants={item}
          className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent"
        >
          06 — Contact
        </motion.p>

        <motion.h2
          variants={item}
          className="mt-5 font-display uppercase leading-[0.9] text-[clamp(2.4rem,7vw,6rem)]"
        >
          Let's build <span className="chrome-text">something great</span>
        </motion.h2>

        <motion.p
          variants={item}
          className="mt-7 max-w-xl text-sm leading-relaxed text-mist/55 sm:text-base"
        >
          Have an AI idea worth building? I'm open to opportunities,
          collaborations and ambitious projects. Let's talk.
        </motion.p>

        {/* Availability chip */}
        <motion.span
          variants={item}
          className="mt-9 inline-flex items-center gap-2.5 rounded-full border border-mist/10 bg-panel/40 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-mist/60"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Available for opportunities
        </motion.span>

        {/* Email CTA */}
        <motion.div variants={item} className="mt-10">
          <Magnetic strength={0.35}>
            <a
              href={`mailto:${EMAIL}`}
              className="group glow-accent-lg relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-accent px-9 py-4 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.03] sm:text-base"
            >
              <span
                aria-hidden="true"
                className="animate-sheen pointer-events-none absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
              <FaEnvelope className="relative transition-transform duration-200 group-hover:-translate-y-0.5" />
              <span className="relative">{EMAIL}</span>
            </a>
          </Magnetic>
        </motion.div>

        {/* Socials */}
        <motion.div
          variants={item}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          {SOCIALS.map((social) => (
            <Magnetic key={social.label} strength={0.25}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full border border-mist/10 bg-panel/40 px-6 py-3 text-sm font-semibold text-mist/70 transition-colors duration-200 hover:text-mist"
              >
                {social.icon}
                {social.label}
              </a>
            </Magnetic>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          variants={item}
          className="mt-16 flex flex-col items-center gap-3 short:mt-10 sm:flex-row sm:gap-6"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-mist/30">
            © 2026 Muhammad Huzaifa Rehan
          </p>
          <span className="hidden h-1 w-1 rounded-full bg-mist/25 sm:block" />
          <button
            onClick={() => goTo(0)}
            className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-mist/45 transition-colors duration-200 hover:text-accent"
          >
            <ArrowUp size={12} />
            Back to top
          </button>
        </motion.div>
      </motion.div>
    </SlideShell>
  );
}

export default SlideContact;
