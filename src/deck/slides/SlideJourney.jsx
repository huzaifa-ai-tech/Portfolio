import { motion } from "framer-motion";
import SlideShell from "../SlideShell";
import { useSlideMotion, cascade } from "../motion";

const EDUCATION = [
  {
    degree: "Bachelor of Science in Artificial Intelligence",
    institute: "National University of Modern Languages (NUML)",
    duration: "Sep 2021 - June 2025",
  },
  {
    degree: "Intermediate in Computer Science",
    institute: "Steps College",
    duration: "Sep 2019 - July 2021",
  },
  {
    degree: "Matriculation in Computer Science",
    institute: "Allied School",
    duration: "March 2017 - March 2019",
  },
];

const EXPERIENCE = [
  {
    role: "IT Department Intern",
    company: "Pearl Continental Hotel, Rawalpindi",
    duration: "Jul 2024 - Sep 2024",
    description:
      "Provided first-line IT support, system maintenance, and network monitoring to keep business operations running smoothly.",
  },
  {
    role: "IT Department Intern",
    company: "Marriott Hotel, Islamabad",
    duration: "Oct 2025 - Dec 2025",
    description:
      "Supported daily IT operations, resolved staff hardware and software issues, and ran routine system checks in a live hospitality environment.",
  },
];

function SlideJourney() {
  const { container, item, reduced } = useSlideMotion();

  return (
    <SlideShell>
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="max-w-5xl"
      >
        <motion.p
          variants={item}
          className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent"
        >
          03 — Journey
        </motion.p>

        <motion.h2
          variants={item}
          className="mt-5 font-display uppercase leading-[0.95] text-[clamp(2.2rem,4.8vw,4rem)]"
        >
          Education & <span className="text-accent">experience</span>
        </motion.h2>

        <div className="mt-14 grid gap-14 md:grid-cols-2 md:gap-20">
          {/* Education */}
          <div>
            <motion.h3
              initial="hidden"
              animate="visible"
              variants={cascade(reduced, 0, { base: 0.4, step: 0 })}
              className="font-mono text-[10px] uppercase tracking-[0.35em] text-mist/40"
            >
              Education
            </motion.h3>

            <div className="relative mt-7 pl-6">
              <span
                aria-hidden="true"
                className="absolute bottom-1 left-[3px] top-1 w-px bg-gradient-to-b from-accent/60 via-mist/15 to-transparent"
              />
              {EDUCATION.map((entry, i) => (
                <motion.div
                  key={entry.degree}
                  initial="hidden"
                  animate="visible"
                  variants={cascade(reduced, i, { base: 0.5, step: 0.1 })}
                  className="relative pb-8 last:pb-1"
                >
                  <span
                    aria-hidden="true"
                    className="glow-accent absolute -left-6 top-[6px] h-[7px] w-[7px] rounded-full border border-accent/80 bg-ink"
                  />
                  <p className="text-sm font-semibold text-mist sm:text-base">
                    {entry.degree}
                  </p>
                  <p className="mt-1.5 text-[13px] text-mist/50">
                    {entry.institute}
                  </p>
                  <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-mist/35">
                    {entry.duration}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <motion.h3
              initial="hidden"
              animate="visible"
              variants={cascade(reduced, 0, { base: 0.46, step: 0 })}
              className="font-mono text-[10px] uppercase tracking-[0.35em] text-mist/40"
            >
              Experience
            </motion.h3>

            <div className="relative mt-7 pl-6">
              <span
                aria-hidden="true"
                className="absolute bottom-1 left-[3px] top-1 w-px bg-gradient-to-b from-accent/60 via-mist/15 to-transparent"
              />
              {EXPERIENCE.map((entry, i) => (
                <motion.div
                  key={entry.company}
                  initial="hidden"
                  animate="visible"
                  variants={cascade(reduced, i, { base: 0.56, step: 0.1 })}
                  className="relative pb-8 last:pb-1"
                >
                  <span
                    aria-hidden="true"
                    className="glow-accent absolute -left-6 top-[6px] h-[7px] w-[7px] rounded-full border border-accent/80 bg-ink"
                  />
                  <p className="text-sm font-semibold text-mist sm:text-base">
                    {entry.role}
                  </p>
                  <p className="mt-1.5 text-[13px] text-mist/50">
                    {entry.company}
                  </p>
                  <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-mist/35">
                    {entry.duration}
                  </p>
                  <p className="mt-3 text-[13px] leading-relaxed text-mist/45">
                    {entry.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </SlideShell>
  );
}

export default SlideJourney;
