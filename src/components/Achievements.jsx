import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import SectionContainer from "../layout/SectionContainer";
import SectionHeading from "../layout/SectionHeading";

function Achievements() {
  return (
    <section id="achievements" className="py-24">
      <SectionContainer>
        <SectionHeading eyebrow="Recognition" title="Achievements" />

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ amount: 0.2 }}
          whileHover={{ y: -6 }}
          className="
            relative
            max-w-4xl
            mx-auto
            mt-16
            p-[1px]
            rounded-[2.25rem]
            bg-gradient-to-br
            from-sky-500/80
            via-teal-400/50
            to-teal-500/80
          "
        >
          <div
            className="
              rounded-[2.25rem]
              bg-[#0b1330]
              p-8
              sm:p-10
            "
          >
            <div
              className="
                flex
                flex-col
                md:flex-row
                items-center
                gap-8
              "
            >
              <motion.div
                animate={{
                  rotate: [0, 8, -8, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  shrink-0
                  w-20
                  h-20
                  rounded-3xl flex
                  items-center
                  justify-center
                  bg-gradient-to-br
                  from-sky-600
                  to-teal-600
                  text-white
                  shadow-lg
                  shadow-sky-700/40
                "
              >
                <Trophy size={38} />
              </motion.div>

              <div className="text-center md:text-left">
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  1st Position — Final Year Project
                </h3>

                <p className="text-cyan-300 mt-2 font-medium text-sm">
                  National University of Modern Languages (NUML)
                </p>

                <p className="text-slate-400 mt-4 leading-relaxed text-sm">
                  Recognized with first position for building the{" "}
                  <span className="text-cyan-300 font-medium">
                    AI Driven Smart Cart Navigator
                  </span>
                  . The project combined autonomous indoor navigation,
                  computer vision guidance, obstacle detection, and smart
                  monitoring into a cohesive intelligent system.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </SectionContainer>
    </section>
  );
}

export default Achievements;
