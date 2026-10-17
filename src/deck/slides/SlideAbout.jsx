import { motion } from "framer-motion";
import SlideShell from "../SlideShell";
import { useSlideMotion, cascade } from "../motion";
import CountUp from "../../effects/CountUp";

const STATS = [
  { to: 10, suffix: "+", label: "Projects Built" },
  { to: 1, suffix: "st", label: "FYP Award — NUML" },
  { to: 3, suffix: "+", label: "AI Domains" },
  { to: 2025, from: 2017, label: "BS AI Graduate" },
];

function SlideAbout() {
  const { container, item, reduced } = useSlideMotion();

  return (
    <SlideShell>
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="max-w-4xl"
      >
        <motion.p
          variants={item}
          className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent"
        >
          01 — About Me
        </motion.p>

        <motion.h2
          variants={item}
          className="mt-5 font-display uppercase leading-[0.95] text-[clamp(2.2rem,4.8vw,4rem)]"
        >
          I build <span className="text-accent">intelligent systems</span> that
          ship.
        </motion.h2>

        <motion.p
          variants={item}
          className="mt-8 max-w-2xl text-base leading-relaxed text-mist/55"
        >
          I'm an Artificial Intelligence engineer dedicated to building
          intelligent software. My work spans object detection, document
          intelligence, autonomous systems and predictive analytics — turning
          complex AI concepts into practical applications that solve real-world
          problems.
        </motion.p>

        <motion.p
          variants={item}
          className="mt-4 max-w-2xl text-base leading-relaxed text-mist/55"
        >
          Beyond AI, I build{" "}
          <span className="text-mist/80">full-stack web applications</span> with
          React, Next.js and TypeScript, and{" "}
          <span className="text-mist/80">cross-platform mobile apps</span> with
          Flutter — taking products from model to shipped interface.
        </motion.p>

        <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial="hidden"
              animate="visible"
              variants={cascade(reduced, i, { base: 0.42, step: 0.08 })}
              className="border-t border-mist/10 pt-5"
            >
              <p className="font-display text-4xl sm:text-5xl">
                <CountUp
                  to={stat.to}
                  from={stat.from ?? 0}
                  suffix={stat.suffix}
                  delay={0.5 + i * 0.08}
                  className="chrome-text tabular-nums"
                />
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-mist/40">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SlideShell>
  );
}

export default SlideAbout;
