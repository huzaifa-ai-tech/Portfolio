import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import AuroraBackdrop from "./AuroraBackdrop";
import DeckNav from "./DeckNav";
import SlideCover from "./slides/SlideCover";
import SlideAbout from "./slides/SlideAbout";
import SlideSkills from "./slides/SlideSkills";
import SlideJourney from "./slides/SlideJourney";
import SlideProjects from "./slides/SlideProjects";
import SlideAward from "./slides/SlideAward";
import SlideContact from "./slides/SlideContact";
import { DeckContext } from "./DeckContext";
import { EASE } from "./motion";

// One accent across the whole deck — the chrome-and-blue C4 identity.
const SLIDES = [
  { id: "cover", label: "Cover", Component: SlideCover },
  { id: "about", label: "About", Component: SlideAbout },
  { id: "skills", label: "Skills", Component: SlideSkills },
  { id: "journey", label: "Journey", Component: SlideJourney },
  { id: "projects", label: "Projects", Component: SlideProjects },
  { id: "award", label: "Awards", Component: SlideAward },
  { id: "contact", label: "Contact", Component: SlideContact },
];

const LOCK_MS = 520; // one transition in flight, across every input mode
const WHEEL_THRESHOLD = 48; // scroll distance that commits to one section
const WHEEL_RESUME_MS = 150; // pause that starts a new gesture within a stream
const WHEEL_RESET_MS = 320; // longer pause that fully re-arms plain scrolling
const WHEEL_REARM = 0.75; // push strength (vs. step's delta) that re-arms a tail
const SWIPE_THRESHOLD = 54;

function Deck({ ready = true }) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
  const lockedRef = useRef(false);
  const unlockTimer = useRef(null);
  const wheelAccum = useRef(0);
  const lastWheelAt = useRef(0);
  const wheelArmMag = useRef(0);
  const touchStart = useRef(null);
  const scrollerRef = useRef(null);
  const queuedRef = useRef(null);

  const goTo = useCallback((target) => {
    const clamp = (value) => Math.max(0, Math.min(SLIDES.length - 1, value));

    const run = (value) => {
      const next = clamp(value);
      const current = indexRef.current;
      if (next === current) return;

      lockedRef.current = true;
      indexRef.current = next;
      setIndex(next);

      if (unlockTimer.current) window.clearTimeout(unlockTimer.current);
      unlockTimer.current = window.setTimeout(() => {
        lockedRef.current = false;
        // Never drop discrete input (keys, buttons): replay the last queued move.
        const queued = queuedRef.current;
        queuedRef.current = null;
        if (queued !== null && queued !== indexRef.current) run(queued);
      }, LOCK_MS);
    };

    if (lockedRef.current) {
      queuedRef.current = clamp(target);
      return;
    }
    run(target);
  }, []);

  const step = useCallback(
    (delta) => goTo(indexRef.current + delta),
    [goTo]
  );

  useEffect(
    () => () => {
      if (unlockTimer.current) window.clearTimeout(unlockTimer.current);
    },
    []
  );

  // Wheel: keep a steady cadence. While fingers keep scrolling, each
  // transition hands over to the next accumulation — no dead zones. A
  // momentum tail after a step must push back at comparable strength (or
  // wait out the arm window) before it counts again, so decaying inertia
  // cannot double-fire sections.
  useEffect(() => {
    const onWheel = (event) => {
      if (event.ctrlKey) return; // never hijack pinch-zoom
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
        wheelAccum.current = 0;
        return; // horizontal gestures belong to in-slide strips
      }

      const scroller = scrollerRef.current;
      if (scroller) {
        const maxScroll = scroller.scrollHeight - scroller.clientHeight;
        if (maxScroll > 2) {
          const atTop = scroller.scrollTop <= 4;
          const atBottom = scroller.scrollTop >= maxScroll - 4;
          if (
            (event.deltaY < 0 && !atTop) ||
            (event.deltaY > 0 && !atBottom)
          ) {
            wheelAccum.current = 0;
            return; // let the slide scroll its overflowing content
          }
        }
      }

      event.preventDefault();

      const now = performance.now();
      const idle = now - lastWheelAt.current;
      lastWheelAt.current = now;

      if (idle > WHEEL_RESET_MS) {
        wheelAccum.current = 0;
        wheelArmMag.current = 0; // long pause: everything re-arms
      } else if (idle > WHEEL_RESUME_MS && !wheelArmMag.current) {
        wheelAccum.current = 0; // short pause: new gesture, fresh distance
      }

      // A transition is in flight: swallow, but keep the re-arm state.
      if (lockedRef.current) {
        wheelAccum.current = 0;
        return;
      }

      // Normalize across wheel delta modes (pixels / lines / pages)
      let dy = event.deltaY;
      if (event.deltaMode === 1) dy *= 16;
      else if (event.deltaMode === 2) dy *= window.innerHeight;
      if (Math.abs(dy) < 2) return;

      if (wheelArmMag.current) {
        if (Math.abs(dy) >= wheelArmMag.current * WHEEL_REARM) {
          wheelArmMag.current = 0; // strong enough: a deliberate re-push
          wheelAccum.current = 0;
        } else {
          wheelAccum.current = 0;
          return; // decaying momentum — ignore it
        }
      }

      wheelAccum.current += dy;
      if (Math.abs(wheelAccum.current) < WHEEL_THRESHOLD) return;
      const delta = wheelAccum.current > 0 ? 1 : -1;
      wheelAccum.current = 0;
      wheelArmMag.current = Math.max(8, Math.abs(dy));
      step(delta);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [step]);

  // Touch: vertical swipes change slides, horizontal drags stay interactive
  useEffect(() => {
    const onTouchStart = (event) => {
      const touch = event.touches[0];
      touchStart.current = {
        x: touch.clientX,
        y: touch.clientY,
        scrollTop: scrollerRef.current?.scrollTop ?? 0,
      };
    };
    const onTouchEnd = (event) => {
      const start = touchStart.current;
      touchStart.current = null;
      if (!start || lockedRef.current) return;
      const scroller = scrollerRef.current;
      if (scroller && Math.abs(scroller.scrollTop - start.scrollTop) > 4) {
        return; // the gesture scrolled slide content instead
      }
      const touch = event.changedTouches[0];
      const dx = touch.clientX - start.x;
      const dy = touch.clientY - start.y;
      if (Math.abs(dy) < SWIPE_THRESHOLD || Math.abs(dy) < Math.abs(dx)) return;
      step(dy < 0 ? 1 : -1);
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [step]);

  // Keyboard — same hybrid rule as the wheel: if the slide still has room to
  // scroll, scroll it; only step the deck at the edges.
  useEffect(() => {
    const canScrollBy = (dir) => {
      const scroller = scrollerRef.current;
      if (!scroller) return false;
      const maxScroll = scroller.scrollHeight - scroller.clientHeight;
      if (maxScroll <= 2) return false;
      return dir > 0 ? scroller.scrollTop < maxScroll - 4 : scroller.scrollTop > 4;
    };

    const onKeyDown = (event) => {
      if (
        event.key === "ArrowDown" ||
        event.key === "PageDown" ||
        event.key === " "
      ) {
        event.preventDefault();
        const scroller = scrollerRef.current;
        if (canScrollBy(1) && scroller) {
          scroller.scrollBy({
            top: scroller.clientHeight * 0.85,
            behavior: "smooth",
          });
          return;
        }
        step(1);
      } else if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        const scroller = scrollerRef.current;
        if (canScrollBy(-1) && scroller) {
          scroller.scrollBy({
            top: -scroller.clientHeight * 0.85,
            behavior: "smooth",
          });
          return;
        }
        step(-1);
      } else if (event.key === "Home") {
        event.preventDefault();
        goTo(0);
      } else if (event.key === "End") {
        event.preventDefault();
        goTo(SLIDES.length - 1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [step, goTo]);

  const active = SLIDES[index];
  const ActiveSlide = active.Component;

  // Section changes are transform + opacity only. Animating scale on a
  // full-screen section re-rasterizes its entire page every frame — the
  // stutter source on weaker GPUs. A light rise-and-fade composites cheaply.
  const variants = reduced
    ? {
        enter: { opacity: 0 },
        center: {
          opacity: 1,
          pointerEvents: "auto",
          transition: { duration: 0.25 },
        },
        exit: {
          opacity: 0,
          pointerEvents: "none",
          transition: { duration: 0.18 },
        },
      }
    : {
        enter: { opacity: 0, y: 26 },
        center: {
          opacity: 1,
          y: 0,
          pointerEvents: "auto",
          transition: { duration: 0.44, ease: EASE },
        },
        exit: {
          opacity: 0,
          y: -14,
          pointerEvents: "none",
          transition: { duration: 0.2, ease: [0.4, 0, 1, 1] },
        },
      };

  return (
    <DeckContext.Provider value={{ goTo, index, count: SLIDES.length, ready }}>
      <main className="fixed inset-0 overflow-hidden bg-ink text-mist select-none">
        <AuroraBackdrop />

        <AnimatePresence initial={false}>
          <motion.section
            key={active.id}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 z-10"
          >
            <div
              ref={(el) => {
                // Only capture mounts: the outgoing slide's unmount would
                // otherwise null the shared ref after every transition.
                if (el) scrollerRef.current = el;
              }}
              className="no-scrollbar h-full w-full overflow-y-auto overscroll-contain"
            >
              <ActiveSlide />
            </div>
          </motion.section>
        </AnimatePresence>

        <DeckNav slides={SLIDES} index={index} onSelect={goTo} onStep={step} />
      </main>
    </DeckContext.Provider>
  );
}

export default Deck;
