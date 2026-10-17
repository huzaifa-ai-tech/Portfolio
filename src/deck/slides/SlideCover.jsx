import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import SlideShell from "../SlideShell";
import { useSlideMotion, EASE } from "../motion";
import { useDeck } from "../DeckContext";
import Magnetic from "../../effects/Magnetic";
import SplitText from "../../effects/SplitText";

const MARQUEE = [
  "Computer Vision",
  "Deep Learning",
  "Generative AI",
  "Machine Learning",
  "RAG Pipelines",
  "OCR",
  "YOLO",
  "FastAPI",
  "React",
  "Next.js",
  "TypeScript",
  "Flutter",
];

function SlideCover() {
  const { container, item } = useSlideMotion();
  const { goTo, ready } = useDeck();

  return (
    <SlideShell
      className="items-center"
      footer={
        /* Word marquee — quiet band, fading at the edges, pauses on hover */
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={
            ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
          }
          transition={{ duration: 0.8, ease: EASE, delay: 0.75 }}
          className="absolute inset-x-0 bottom-28 z-20 overflow-hidden border-y border-mist/10 py-4 [@media(max-height:620px)]:hidden"
          style={{
            maskImage:
              "linear-gradient(90deg, transparent, black 14%, black 86%, transparent)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent, black 14%, black 86%, transparent)",
          }}
        >
          <div className="animate-marquee flex w-max hover:[animation-play-state:paused]">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex items-center pr-12">
                {MARQUEE.map((word) => (
                  <span
                    key={word}
                    className="flex items-center font-mono text-[10px] uppercase tracking-[0.35em] text-mist/35 sm:text-[11px]"
                  >
                    <span className="px-8">{word}</span>
                    <span className="text-accent/60">·</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      }
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate={ready ? "visible" : "hidden"}
        className="flex flex-col items-center text-center"
      >
        <motion.h1
          variants={item}
          className="font-display uppercase leading-[0.95] tracking-[0.02em] [word-spacing:0.4em] text-[clamp(3rem,12vw,10.5rem)]"
        >
          <SplitText
            text="Huzaifa Rehan"
            wordClassName="chrome-text chrome-flow"
            delay={0.35}
            stagger={0.14}
            play={ready}
          />
        </motion.h1>

        <motion.span
          aria-hidden="true"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={ready ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.95 }}
          className="mt-6 block h-px w-48 origin-center bg-gradient-to-r from-transparent via-accent/80 to-transparent"
        />

        <motion.p
          variants={item}
          className="mt-6 font-mono text-lg text-mist/70 sm:text-2xl"
        >
          <span className="text-accent">&gt;</span> AI Engineer | Full-Stack Web &amp; App Developer
          <span className="animate-pulse text-accent">_</span>
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-wrap items-center justify-center gap-5"
        >
          <Magnetic>
            <button
              onClick={() => goTo(4)}
              className="group glow-accent-lg relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-accent px-8 py-4 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.03]"
            >
              <span
                aria-hidden="true"
                className="animate-sheen pointer-events-none absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent"
              />
              <span className="relative">View Projects</span>
              <ArrowRight
                size={16}
                className="relative transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </button>
          </Magnetic>

          <Magnetic>
            <button
              onClick={() => goTo(6)}
              className="inline-flex items-center gap-2.5 rounded-full border border-mist/15 bg-panel/40 px-8 py-4 text-sm font-semibold text-mist/80 transition-colors duration-200 hover:text-mist"
            >
              <Sparkles size={15} className="text-accent" />
              Get in Touch
            </button>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <div className="pointer-events-none absolute right-8 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-mist/30 [writing-mode:vertical-rl]">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-px bg-gradient-to-b from-accent/70 to-transparent"
        />
      </div>
    </SlideShell>
  );
}

export default SlideCover;
