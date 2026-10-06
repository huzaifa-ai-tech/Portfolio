import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import SectionContainer from "../layout/SectionContainer";
import SectionHeading from "../layout/SectionHeading";

function Experience() {
  const experiences = [
    {
      company: "Pearl Continental Hotel, Rawalpindi",
      role: "IT Department Intern",
      duration: "Jul. 2024 - Sep. 2024",
      description:
        "Provided first-line IT support, system maintenance, and network monitoring to keep business operations running smoothly.",
    },
    {
      company: "Marriott Hotel, Islamabad",
      role: "IT Department Intern",
      duration: "Oct. 2025 - Dec. 2025",
      description:
        "Supported daily IT operations, resolved staff hardware and software issues, and ran routine system checks in a live hospitality environment.",
    },
  ];

  return (
    <section id="experience" className="py-24">
      <SectionContainer>
        <SectionHeading eyebrow="Experience" title="Internships" />

        <div className="grid md:grid-cols-2 gap-6 mt-14 max-w-4xl mx-auto">
          {experiences.map((item, index) => (
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
                p-8
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
              <div className="flex flex-wrap items-start justify-between gap-3">
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
                  <Briefcase size={20} />
                </div>
              </div>

              <h3 className="text-lg font-bold text-white mt-4 leading-snug">
                {item.role}
              </h3>

              <p className="text-cyan-300 mt-2 text-sm font-medium">
                {item.company}
              </p>

              <p className="text-slate-400 text-sm mt-4 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}

export default Experience;
