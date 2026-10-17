import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import logo from "../assets/logo.webp";

const PHASES = [
  "Initializing experience",
  "Loading vision models",
  "Warming up the deck",
];

function LoadingScreen() {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);

  // E1 — counter runs 000 -> 100 over ~1s while the page loads behind.
  useEffect(() => {
    if (reduced) return undefined;
    let raf;
    let start;
    const tick = (t) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / 1000);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const shown = reduced ? 100 : count;
  const phase = reduced
    ? PHASES[PHASES.length - 1]
    : PHASES[Math.min(PHASES.length - 1, Math.floor(shown / 38))];

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={reduced ? { opacity: 0 } : { y: "-100%" }}
      transition={
        reduced
          ? { duration: 0.2 }
          : { duration: 0.75, ease: [0.76, 0, 0.24, 1] }
      }
      className="fixed inset-0 z-[100] overflow-hidden bg-ink"
    >
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(77,124,254,0.16),transparent_55%)]" />
      <div className="bg-noise absolute -inset-4 opacity-[0.04]" />

      <div className="relative flex h-full flex-col items-center justify-center px-6">
        <div className="relative h-28 w-28 md:h-36 md:w-36">
          <div className="animate-spin-slow absolute -inset-3 rounded-full border-2 border-transparent border-t-accent/80 border-r-accent-deep/60" />
          <div
            className="animate-spin-slow absolute -inset-6 rounded-full border border-transparent border-b-accent/50"
            style={{ animationDirection: "reverse", animationDuration: "5s" }}
          />
          <motion.img
            src={logo}
            alt="HR Logo"
            animate={reduced ? undefined : { scale: [1, 1.05, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="glow-accent-img h-28 w-28 object-contain md:h-36 md:w-36"
          />
        </div>

        <p className="chrome-text mt-9 font-display text-[clamp(3rem,9vw,5.5rem)] leading-none tabular-nums">
          {String(shown).padStart(3, "0")}
        </p>

        <div className="mt-6 h-[3px] w-64 rounded-full bg-mist/10">
          <div
            className="grad-bg relative h-full rounded-full transition-[width] duration-150 ease-out"
            style={{ width: `${shown}%` }}
          >
            <span className="glow-accent absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 translate-x-1/2 rounded-full bg-accent" />
          </div>
        </div>

        <div className="mt-6 h-4 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={phase}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="font-mono text-[10px] uppercase tracking-[0.35em] text-mist/50"
            >
              {phase}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Glowing edge reveals the deck as the panel lifts */}
      <div className="grad-bg glow-accent absolute inset-x-0 bottom-0 h-[3px]" />
    </motion.div>
  );
}

export default LoadingScreen;
