import { motion } from "framer-motion";
import { Brain, Eye, Sparkles, Rocket, Cpu } from "lucide-react";
import SectionContainer from "../layout/SectionContainer";
import SectionHeading from "../layout/SectionHeading";

function About() {
  const areas = [
    {
      icon: <Brain size={22} />,
      title: "Artificial Intelligence",
      description: "Scalable Machine Learning and Deep Learning solutions.",
    },
    {
      icon: <Rocket size={22} />,
      title: "AI Innovation",
      description: "Turning ideas into production-ready AI products.",
    },
    {
      icon: <Eye size={22} />,
      title: "Computer Vision",
      description: "Object detection, tracking and real-time image analysis.",
    },
    {
      icon: <Sparkles size={22} />,
      title: "Generative AI",
      description: "LLMs, RAG pipelines, OCR and intelligent applications.",
    },
  ];

  const tags = ["Computer Vision", "Deep Learning", "Machine Learning", "NLP", "RAG"];

  return (
    <section id="about" className="relative py-24 overflow-hidden">
      <div
        className="
          absolute
          top-20
          -left-40
          w-[380px]
          h-[380px]
          bg-sky-600/20
          blur-[120px]
          rounded-full
          pointer-events-none
        "
      />

      <SectionContainer>
        <SectionHeading eyebrow="About Me" title="Building Intelligent Systems" />

        <div
          className="
            grid
            lg:grid-cols-5
            gap-8
            mt-16
            items-start
          "
        >
          {/* Intro card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2 }}
            className="
              lg:col-span-2
              bg-white/[0.04]
              border
              border-cyan-400/20
              rounded-[2.25rem]
              p-8
              shadow-[0_0_40px_rgba(14,165,233,0.08)]
            "
          >
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
                mb-4
              "
            >
              <Cpu size={20} />
            </div>

            <h3 className="text-xl font-semibold text-white leading-snug">
              Driven by curiosity, focused on real impact.
            </h3>

            <p className="mt-4 text-slate-400 leading-relaxed text-sm">
              I am an Artificial Intelligence professional dedicated to
              building intelligent software. My work spans object detection,
              document intelligence, autonomous systems, and predictive
              analytics — turning complex AI concepts into practical
              applications that solve real-world problems and create value.
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              {tags
              .slice()
              .sort((a, b) => a.localeCompare(b))
              .map((tag) => (
                <span
                  key={tag}
                  className="
                    px-3
                    py-1.5
                    rounded-full
                    text-xs
                    text-sky-300
                    bg-sky-500/15
                    border
                    border-cyan-400/30
                    shadow-[0_0_12px_rgba(2,132,199,0.15)]
                  "
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Areas grid */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-5">
            {areas
            .slice()
            .sort((a, b) => a.title.localeCompare(b.title))
            .map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.2 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="
                  bg-white/[0.04]
                  border
                  border-cyan-400/20
                  rounded-[2.25rem]
                  p-6
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
                    w-12
                    h-12
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
                    mb-5
                  "
                >
                  {item.icon}
                </div>

                <h3 className="text-base font-semibold text-white">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

export default About;
