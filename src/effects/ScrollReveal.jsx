import { motion } from "framer-motion";

function ScrollReveal({ children, direction = "up", delay = 0 }) {
  const animations = {
    up: {
      hidden: {
        opacity: 0,
        y: 40,
      },
      visible: {
        opacity: 1,
        y: 0,
      },
    },

    left: {
      hidden: {
        opacity: 0,
        x: -40,
      },
      visible: {
        opacity: 1,
        x: 0,
      },
    },

    right: {
      hidden: {
        opacity: 0,
        x: 40,
      },
      visible: {
        opacity: 1,
        x: 0,
      },
    },
  };

  return (
    <motion.div
      variants={animations[direction]}
      initial="hidden"
      whileInView="visible"
      viewport={{
        amount: "some",
        once: true,
      }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export default ScrollReveal;
