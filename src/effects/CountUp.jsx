import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/*
 * Eased number count-up for stat blocks. Starts after `delay` seconds so
 * it can sync with the row's own reveal; jumps straight to the target
 * when the visitor prefers reduced motion.
 */
function CountUp({
  to,
  from = 0,
  suffix = "",
  prefix = "",
  duration = 1.1,
  delay = 0,
  className = "",
}) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(reduced ? to : from);
  const raf = useRef(null);

  useEffect(() => {
    if (reduced) return undefined;

    let start;
    const tick = (t) => {
      if (start === undefined) start = t;
      const p = Math.min(1, (t - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(from + (to - from) * eased));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };

    const timeout = setTimeout(() => {
      raf.current = requestAnimationFrame(tick);
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(raf.current);
    };
  }, [to, from, duration, delay, reduced]);

  return (
    <span className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

export default CountUp;
