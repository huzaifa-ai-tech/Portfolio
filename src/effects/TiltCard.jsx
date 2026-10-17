import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function TiltCard({
  children,
  className = "",
  maxTilt = 8,
  scale = 1.015,
  lift = 4,
  glare = true,
  spotlight = true,
  spotlightColor = "77,124,254",
  ...rest
}) {
  const ref = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 240, damping: 22, mass: 0.6 });
  const springY = useSpring(rotateY, { stiffness: 240, damping: 22, mass: 0.6 });
  const [active, setActive] = useState(false);

  const handleMove = (event) => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    rotateY.set((px - 0.5) * 2 * maxTilt);
    rotateX.set(-(py - 0.5) * 2 * maxTilt);

    el.style.setProperty("--mx", `${(px * 100).toFixed(2)}%`);
    el.style.setProperty("--my", `${(py * 100).toFixed(2)}%`);
  };

  const handleLeave = () => {
    setActive(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={handleLeave}
      whileHover={prefersReducedMotion() ? undefined : { scale, y: -lift }}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformPerspective: 900,
      }}
      className={`relative ${className}`}
      {...rest}
    >
      {children}

      {spotlight && (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 ${
            active ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: `radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), rgba(${spotlightColor}, 0.14), transparent 65%)`,
          }}
        />
      )}

      {glare && (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 ${
            active ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: `radial-gradient(200px circle at var(--mx, 50%) var(--my, 50%), rgba(255, 255, 255, 0.08), transparent 60%)`,
          }}
        />
      )}
    </motion.div>
  );
}

export default TiltCard;
