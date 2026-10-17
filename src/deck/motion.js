import { useReducedMotion } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

export function useSlideMotion() {
  const reduced = useReducedMotion();

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : 0.055,
        delayChildren: reduced ? 0 : 0.1,
      },
    },
  };

  const item = reduced
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
      }
    : {
        hidden: { opacity: 0, y: 22 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: EASE },
        },
      };

  return { container, item, reduced };
}

/*
 * Staggered reveal for elements that arrange themselves outside the
 * container orchestration (table rows, stat cells, timeline entries).
 * Delays are baked in so the sequence is deterministic every mount.
 */
export function cascade(reduced, index = 0, { base = 0.26, step = 0.06 } = {}) {
  if (reduced) {
    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: 0.35, delay: 0.04 * index },
      },
    };
  }

  return {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: EASE,
        delay: base + index * step,
      },
    },
  };
}
