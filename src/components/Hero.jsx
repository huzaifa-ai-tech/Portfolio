import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { Brain, Eye, Sparkles, ArrowRight } from "lucide-react";
import SectionContainer from "../layout/SectionContainer";

const ROLES = ["AI Engineer", "Computer Vision", "Generative AI", "Machine Learning"];

function Hero() {
  const badges = [
    {
      icon: <Brain size={18} />,
      text: "Machine Learning",
    },
    {
      icon: <Eye size={18} />,
      text: "Computer Vision",
    },
    {
      icon: <Sparkles size={18} />,
      text: "Generative AI",
    },
  ];

  const [roleIndex, setRoleIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIndex];
    let timer;

    if (!deleting && typed === current) {
      timer = setTimeout(() => setDeleting(true), 1500);
    } else if (deleting && typed === "") {
      timer = setTimeout(() => {
        setDeleting(false);
        setRoleIndex((index) => (index + 1) % ROLES.length);
      }, 350);
    } else {
      timer = setTimeout(() => {
        setTyped(current.slice(0, typed.length + (deleting ? -1 : 1)));
      }, deleting ? 40 : 90);
    }

    return () => clearTimeout(timer);
  }, [typed, deleting, roleIndex]);

  return (
    <section
      id="home"
      className="
        relative
        min-h-screen
        flex
        items-center
        pt-32
        pb-16
        overflow-hidden
      "
    >
      <SectionContainer>
        <div
          className="
            flex
            flex-col
            items-center
            text-center
          "
        >
          <div className="w-full max-w-3xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="
                text-4xl
                sm:text-5xl
                lg:text-6xl
                font-bold
                leading-tight
                mt-6
              "
            >
              <span className="text-slate-100">Muhammad Huzaifa Rehan</span>
              <br />
              <span
                className="
                  bg-gradient-to-r
                  from-sky-400
                  via-cyan-400
                  to-teal-500
                  bg-clip-text
                  text-transparent
                  text-gradient-animate
                  animate-aurora
                "
              >
                AI Engineer
              </span>
            </motion.h1>

            {/* Typewriter */}
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="
                text-xl
                sm:text-2xl
                font-semibold
                text-slate-200
                mt-5
                font-mono
              "
            >
              <span className="text-teal-400">&gt;</span> {typed}
              <span className="animate-pulse text-teal-400">_</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="
                mt-6
                text-slate-400
                leading-relaxed
                max-w-xl
                mx-auto
                text-center
                text-base
                sm:text-lg
              "
            >
              I design and build end-to-end AI applications spanning Machine
              Learning, Deep Learning, Computer Vision and Generative AI —
              transforming ambitious ideas into fast, reliable, and beautiful
              software that delivers real value.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 mt-9 justify-center"
            >
              <a
                href="#projects"
                className="
                  inline-flex
                  items-center
                  gap-2.5
                  px-7
                  py-3.5
                  rounded-2xl
                  text-white
                  font-semibold
                  text-sm
                  bg-gradient-to-r
                  from-sky-600
                  to-teal-600
                  hover:from-sky-500
                  hover:to-teal-500
                  shadow-lg
                  shadow-sky-700/40
                  hover:shadow-teal-700/50
                  hover:-translate-y-0.5
                  transition-all
                  duration-200
                "
              >
                View Projects
                <ArrowRight size={16} />
              </a>

              <a
                href="https://github.com/huzaifa-ai-tech"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="
                  inline-flex
                  items-center
                  justify-center
                  w-12
                  h-12
                  rounded-2xl
                  border
                  border-white/15
                  bg-white/[0.03]
                  text-slate-300
                  hover:text-white
                  hover:border-teal-400/50
                  hover:bg-cyan-500/10
                  hover:-translate-y-0.5
                  transition-all
                  duration-200
                "
              >
                <FaGithub size={18} />
              </a>
            </motion.div>

            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-3 mt-10 justify-center"
            >
              {badges.map((badge, index) => (
                <div
                  key={index}
                  className="
                    inline-flex
                    items-center
                    gap-2.5
                    px-4
                    py-2.5
                    rounded-3xl bg-white/[0.03]
                    border
                    border-white/10
                    text-sm
                    text-slate-300
                    hover:border-teal-400/40
                    hover:bg-cyan-500/5
                    transition-all
                    duration-200
                  "
                >
                  <span className="text-teal-400">{badge.icon}</span>
                  {badge.text}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

export default Hero;
