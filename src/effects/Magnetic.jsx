import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

function Magnetic({ children, className = "", strength = 0.3, ...rest }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 17, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 17, mass: 0.4 });

  const handleMove = (event) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className={`inline-flex ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export default Magnetic;
