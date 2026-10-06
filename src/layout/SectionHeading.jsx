import { motion } from "framer-motion";

function SectionHeading({ eyebrow, title }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <motion.span
        initial={{
          opacity: 0,
          y: 20,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{}}
        className="
          inline-block
          font-mono
          text-xs
          font-semibold
          uppercase
          tracking-[0.25em]
          text-sky-400
        "
      >
        <span className="text-slate-500">//</span> {eyebrow}
      </motion.span>

      <motion.h2
        initial={{
          opacity: 0,
          y: 20,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{}}
        transition={{
          delay: 0.1,
        }}
        className="
          text-3xl
          sm:text-4xl
          md:text-5xl
          font-bold
          text-white
          mt-3
          leading-tight
          drop-shadow-[0_0_25px_rgba(6,182,212,0.45)]
          bg-gradient-to-r
          from-white
          via-sky-200
          to-teal-300
          bg-clip-text
          text-transparent
          text-gradient-animate
          animate-aurora
        "
      >
        {title}
      </motion.h2>

      <div className="flex items-center justify-center mt-6">
        <motion.div
          initial={{
            opacity: 0,
            scaleX: 0,
          }}
          whileInView={{
            opacity: 1,
            scaleX: 1,
          }}
          viewport={{}}
          transition={{
            delay: 0.2,
            duration: 0.5,
          }}
          className="
            h-1
            w-16
            rounded-full
            bg-gradient-to-r
            from-cyan-500
            via-teal-400
            to-sky-500
          "
        />

        <motion.span
          initial={{
            opacity: 0,
            scale: 0,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{}}
          transition={{
            delay: 0.35,
            type: "spring",
            stiffness: 300,
            damping: 15,
          }}
          className="
            -ml-1.5
            w-2.5
            h-2.5
            rounded-full
            bg-cyan-300
            shadow-[0_0_14px_rgba(34,211,238,0.9)]
          "
        />
      </div>
    </div>
  );
}

export default SectionHeading;
