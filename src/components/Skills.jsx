import { motion } from "framer-motion";
import { Code2, Brain, Eye, Sparkles, Wrench } from "lucide-react";
import SectionContainer from "../layout/SectionContainer";
import SectionHeading from "../layout/SectionHeading";

function Skills() {
  const groups = [
    {
      title: "Programming",
      icon: <Code2 size={22} />,
      skills: ["Python"],
    },
    {
      title: "Machine Learning & Deep Learning",
      icon: <Brain size={22} />,
      skills: ["PyTorch", "TensorFlow", "Scikit-learn"],
    },
    {
      title: "Computer Vision",
      icon: <Eye size={22} />,
      skills: ["OpenCV", "YOLO"],
    },
    {
      title: "Generative AI",
      icon: <Sparkles size={22} />,
      skills: ["LLMs", "RAG", "OCR"],
    },
    {
      title: "Backend & Tools",
      icon: <Wrench size={22} />,
      skills: ["FastAPI", "GitHub", "Google Colab", "VS Code"],
    },
  ];

  return (
    <section id="skills" className="py-24">
      <SectionContainer>
        <SectionHeading eyebrow="Expertise" title="My Technical Skills" />

        <div
          className="
            flex
            flex-wrap
            justify-center
            gap-6
            mt-16
          "
        >
          {groups.map((group, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.2 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="
                group
                relative
                w-full
                md:w-[calc(50%-12px)]
                lg:w-[calc(33.333%-16px)]
                bg-white/[0.04]
                border
                border-cyan-400/20
                rounded-[2.25rem]
                p-8
                overflow-hidden
                hover:border-sky-400/50
                hover:shadow-xl
                hover:shadow-sky-700/20
                hover:bg-gradient-to-br
                hover:from-cyan-500/10
                hover:to-teal-500/10
                transition-all
                duration-200
              "
            >
              <div
                className="
                  absolute
                  top-0
                  left-0
                  right-0
                  h-px
                  bg-gradient-to-r
                  from-transparent
                  via-sky-400/70
                  to-transparent
                  opacity-0
                  group-hover:opacity-100
                  transition-opacity
                  duration-300
                "
              />

              <div className="flex items-center gap-4 mb-6">
                <div
                  className="
                    w-11
                    h-11
                    rounded-2xl
                    flex
                    items-center
                    justify-center
                    bg-gradient-to-br
                    from-sky-500
                    to-teal-600
                    text-white
                    shadow-lg
                    shadow-teal-600/30
                  "
                >
                  {group.icon}
                </div>

                <h3 className="text-lg font-semibold text-white">
                  {group.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {group.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="
                      px-3.5
                      py-2
                      rounded-2xl
                      text-sm
                      bg-sky-500/10
                      text-sky-200
                      border
                      border-cyan-400/30
                      group-hover:border-sky-400/50
                      group-hover:text-sky-100
                      transition-colors
                      duration-200
                    "
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}

export default Skills;
