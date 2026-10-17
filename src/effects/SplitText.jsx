import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "../deck/motion";

/*
 * Word-mask headline reveal: each word rises out of an overflow-hidden
 * mask like a title card. `play` lets a parent hold the reveal until the
 * loading screen has lifted.
 */
function SplitText({
  text,
  className = "",
  wordClassName = "",
  delay = 0,
  stagger = 0.12,
  play = true,
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  const start = reduced ? { opacity: 0 } : { y: "114%", opacity: 0 };
  const end = reduced ? { opacity: 1 } : { y: "0%", opacity: 1 };

  return (
    <span className={className}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="inline-block overflow-hidden align-bottom pb-[0.07em] -mb-[0.07em]">
            <motion.span
              initial={start}
              animate={play ? end : start}
              transition={{
                duration: reduced ? 0.4 : 0.9,
                ease: EASE,
                delay: delay + i * stagger,
              }}
              className={`inline-block ${wordClassName}`}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}

export default SplitText;
