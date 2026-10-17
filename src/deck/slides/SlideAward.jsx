import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import SlideShell from "../SlideShell";
import { useSlideMotion } from "../motion";

const HIGHLIGHTS = [
  "Autonomous Navigation",
  "Computer Vision Guidance",
  "Real-Time Obstacle Detection",
  "Live Remote Monitoring",
];

function SlideAward() {
  const { container, item } = useSlideMotion();

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
          05 — Achievement
        </motion.p>

        {/* Trophy medallion */}
        <motion.div variants={item} className="relative mt-12">
          <span className="animate-spin-slow absolute -inset-3 rounded-full border border-dashed border-accent/35" />
          <span className="grad-bg glow-accent-lg relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full text-white sm:h-28 sm:w-28">
            <span
              aria-hidden="true"
              className="animate-sheen pointer-events-none absolute inset-y-0 w-3/4 bg-gradient-to-r from-transparent via-white/35 to-transparent"
            />
            <Trophy size={40} className="relative" />
          </span>
        </motion.div>

        <motion.h2
          variants={item}
          className="mt-10 max-w-4xl font-display uppercase leading-[0.95] text-[clamp(1.9rem,5vw,4rem)]"
        >
          First Position — <span className="chrome-text">Final Year Project</span>
        </motion.h2>

        <motion.p
          variants={item}
          className="mt-5 font-mono text-[10px] uppercase tracking-[0.35em] text-accent/90"
        >
          National University of Modern Languages (NUML)
        </motion.p>

        <motion.p
          variants={item}
          className="mt-7 max-w-xl text-sm leading-relaxed text-mist/55 sm:text-base"
        >
          My AI Driven Smart Cart Navigator won first position among all final
          year projects — a mobile-operated smart cart: pick a destination on
          the app and it navigates there using computer vision, avoiding
          obstacles in real time.
        </motion.p>

        <motion.p
          variants={item}
          className="mt-10 max-w-3xl font-mono text-[11px] leading-loose tracking-wide text-mist/35"
        >
          {HIGHLIGHTS.join("  ·  ")}
        </motion.p>
      </motion.div>
    </SlideShell>
  );
}

export default SlideAward;
