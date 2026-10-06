import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import SectionContainer from "../layout/SectionContainer";
import SectionHeading from "../layout/SectionHeading";

function Education() {
  const education = [
    {
      degree: "Bachelor of Science in Artificial Intelligence",
      institute: "National University of Modern Languages (NUML)",
      duration: "Sep 2021 - June 2025",
      subjects: [
        "Machine Learning",
        "Deep Learning",
        "Computer Vision",
        "Natural Language Processing",
        "Data Mining",
      ],
      featured: true,
    },
    {
      degree: "Intermediate in Computer Science",
      institute: "Steps College",
      duration: "Sep 2019 - July 2021",
      subjects: ["Computer Science", "Mathematics", "Physics"],
    },
    {
      degree: "Matriculation in Computer Science",
      institute: "Allied School",
      duration: "March 2017 - March 2019",
      subjects: ["Chemistry", "Computer Science", "Mathematics", "Physics"],
    },
  ];

  return (
    <section id="education" className="py-24">
      <SectionContainer>
        <SectionHeading eyebrow="Background" title="Education & Academics" />

        <div className="relative mt-16 max-w-4xl mx-auto">
          <div
            className="
              absolute
              left-5
              md:left-1/2
              md:-translate-x-1/2
              top-0
              bottom-0
              w-px
              bg-gradient-to-b
              from-sky-400/80
              via-teal-400/50
              to-transparent
            "
          />

          {education.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.2 }}
              className={`
                relative
                flex
                mb-12
                ${index % 2 === 0 ? "md:justify-start" : "md:justify-end"}
              `}
            >
              <div
                className="
                  absolute
                  left-0
                  md:left-1/2
                  md:-translate-x-1/2
                  w-11
                  h-11
                  rounded-full
                  bg-gradient-to-br
                  from-sky-600
                  to-teal-600
                  border
                  border-sky-300/50
                  shadow-[0_0_25px_rgba(6,182,212,0.6)]
                  flex
                  items-center
                  justify-center
                  z-10
                  text-white
                "
              >
                <GraduationCap size={20} />
              </div>

<div
                className={`
                  ml-16
                  md:ml-0
                  md:w-[calc(50%-3rem)]
                  bg-white/[0.04]
                  border
                  rounded-3xl p-8
                  transition-all
                  duration-200
                  hover:bg-gradient-to-br
                  hover:from-cyan-500/10
                  hover:to-teal-500/10
                  ${
                    item.featured
                      ? "border-sky-400/50 shadow-lg shadow-sky-700/20"
                      : "border-cyan-400/20 hover:border-sky-400/40"
                  }
                }
                `}
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <span
                    className="
                      inline-block
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      font-medium
                      text-cyan-300
                      bg-cyan-500/10
                      border
                      border-teal-400/20
                    "
                  >
                    {item.duration}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mt-4 leading-snug">
                  {item.degree}
                </h3>

                <p className="text-cyan-300 mt-2 text-sm font-medium">
                  {item.institute}
                </p>

                <div className="flex flex-wrap gap-2 mt-5">
                  {item.subjects.map((subject, i) => (
                    <span
                      key={i}
                      className="
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        bg-white/[0.04]
                        border
                        border-white/10
                        text-slate-300
                      "
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}

export default Education;
