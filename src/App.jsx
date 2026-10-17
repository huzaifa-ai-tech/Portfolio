import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import Deck from "./deck/Deck";
import LoadingScreen from "./effects/LoadingScreen";
import { EASE } from "./deck/motion";

function App() {
  const [loading, setLoading] = useState(true);
  const reduced = useReducedMotion();

  useEffect(() => {
    let pageLoaded = document.readyState === "complete";
    let minElapsed = false;
    let done = false;

    const tryFinish = () => {
      if (done || !pageLoaded || !minElapsed) return;
      done = true;
      setLoading(false);
    };

    const onLoad = () => {
      pageLoaded = true;
      tryFinish();
    };

    if (!pageLoaded) {
      window.addEventListener("load", onLoad, { once: true });
    }

    // Full speed ahead once the counter lands — and never longer than 2s.
    const minTimer = setTimeout(() => {
      minElapsed = true;
      tryFinish();
    }, 950);
    const cap = setTimeout(() => {
      done = true;
      setLoading(false);
    }, 2000);

    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(minTimer);
      clearTimeout(cap);
    };
  }, []);

  // The deck waits out of focus behind the splash, then pulls into
  // sharpness as the loading panel lifts away.
  return (
    <>
      <motion.div
        className="fixed inset-0"
        initial={false}
        animate={loading && !reduced ? "hidden" : "visible"}
        variants={{
          hidden: { opacity: 0.45, scale: 1.025 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.7, ease: EASE, delay: 0.08 },
          },
        }}
        style={{ willChange: "transform, opacity" }}
      >
        <Deck ready={!loading} />
      </motion.div>
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>
    </>
  );
}

export default App;
