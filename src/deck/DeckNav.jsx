import { motion } from "framer-motion";
import { ArrowDown, ArrowUp } from "lucide-react";
import logo from "../assets/logo.webp";
import Magnetic from "../effects/Magnetic";
import { EASE } from "./motion";

function DeckNav({ slides, index, onSelect, onStep }) {
  const last = slides.length - 1;

  return (
    <div className="absolute inset-x-0 bottom-0 z-40">
      <div className="mx-auto w-full max-w-6xl px-4 pb-4 sm:px-6">
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-mist/10 bg-panel/80 px-3 py-2.5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.9)] backdrop-blur-md sm:px-4">
          {/* Brand — click the name (or logo) to return to the cover */}
          <button
            type="button"
            onClick={() => onSelect(0)}
            title="Back to top"
            aria-label="Back to top"
            className="group flex min-w-0 cursor-pointer items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            <img
              src={logo}
              alt="HR Logo"
              className="glow-accent-img h-7 w-7 object-contain transition-transform duration-200 group-hover:scale-105"
            />
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-mist/55 transition-colors duration-200 group-hover:text-mist sm:block">
              Huzaifa Rehan
            </span>
          </button>

          {/* Section buttons (desktop) */}
          <nav aria-label="Sections" className="hidden items-center gap-0.5 lg:flex">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                onClick={() => onSelect(i)}
                aria-current={i === index ? "true" : undefined}
                className={`
                  relative
                  rounded-full
                  px-2.5
                  py-1.5
                  font-mono
                  text-[10px]
                  uppercase
                  tracking-[0.14em]
                  transition-colors
                  duration-200
                  ${
                    i === index
                      ? "text-ink"
                      : "text-mist/55 hover:text-mist"
                  }
                `}
              >
                {i === index && (
                  <motion.span
                    layoutId="deck-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="grad-bg glow-accent absolute inset-0 rounded-full"
                  />
                )}
                <span className="relative z-10">{slide.label}</span>
              </button>
            ))}
          </nav>

          {/* Mobile dots */}
          <nav aria-label="Sections" className="flex items-center gap-1.5 lg:hidden">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                onClick={() => onSelect(i)}
                aria-label={slide.label}
                className={`
                  h-1.5
                  rounded-full
                  transition-all
                  duration-300
                  ${i === index ? "grad-bg glow-accent w-5" : "w-1.5 bg-mist/25"}
                `}
              />
            ))}
          </nav>

          {/* Readout + arrows */}
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-1 font-mono text-[10px] tracking-[0.2em] text-mist/35 sm:flex">
              <span className="tabular-nums text-mist/75">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>/</span>
              <span className="tabular-nums">
                {String(slides.length).padStart(2, "0")}
              </span>
            </span>

            <div className="flex items-center gap-2">
              <Magnetic strength={0.25}>
                <button
                  onClick={() => onStep(-1)}
                  disabled={index === 0}
                  aria-label="Previous section"
                  className="rounded-full border border-mist/15 p-2 text-mist/75 transition-colors duration-200 hover:border-accent/60 hover:text-mist disabled:pointer-events-none disabled:opacity-30"
                >
                  <ArrowUp size={14} />
                </button>
              </Magnetic>
              <Magnetic strength={0.25}>
                <button
                  onClick={() => onStep(1)}
                  disabled={index === last}
                  aria-label="Next section"
                  className="rounded-full border border-mist/15 p-2 text-mist/75 transition-colors duration-200 hover:border-accent/60 hover:text-mist disabled:pointer-events-none disabled:opacity-30"
                >
                  <ArrowDown size={14} />
                </button>
              </Magnetic>
            </div>
          </div>
        </div>

        {/* Progress — glowing spark rides the fill edge */}
        <div className="mt-2 h-[2px] w-full rounded-full bg-mist/10">
          <motion.div
            animate={{ width: `${((index + 1) / slides.length) * 100}%` }}
            transition={{ duration: 0.6, ease: EASE }}
            className="grad-bg relative h-full rounded-full"
          >
            <span className="glow-accent absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-accent" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default DeckNav;
