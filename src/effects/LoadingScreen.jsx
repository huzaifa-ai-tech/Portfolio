import { motion } from "framer-motion";
import logo from "../assets/logo.webp";

function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-[#070b1c]
      "
    >
      <div className="text-center">
        <motion.img
          src={logo}
          alt="HR Logo"
          animate={{
            scale: [1, 1.06, 1],
            rotate: [0, 2, 0, -2, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            w-36
            h-36
            md:w-44
            md:h-44
            mx-auto
            object-contain
            drop-shadow-[0_0_35px_rgba(6,182,212,0.7)]
          "
        />

        <p className="mt-6 text-lg font-semibold tracking-wide text-slate-300">
          Loading Portfolio<span className="animate-pulse">...</span>
        </p>

        <div className="mt-8 w-56 mx-auto overflow-hidden rounded-full bg-white/10">
          <motion.div
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              h-1
              w-28
              rounded-full
              bg-gradient-to-r
              from-cyan-500
              via-teal-400
              to-sky-500
            "
          />
        </div>
      </div>
    </motion.div>
  );
}

export default LoadingScreen;
