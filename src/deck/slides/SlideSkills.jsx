import { motion } from "framer-motion";
import SlideShell from "../SlideShell";
import { useSlideMotion, cascade } from "../motion";

const GROUPS = [
  {
    title: "Programming",
    skills: ["Python", "JavaScript", "TypeScript", "Dart"],
  },
  {
    title: "Web Development",
    skills: ["React", "Next.js", "Tailwind CSS", "Prisma", "NextAuth", "HTML & CSS"],
  },
  {
    title: "Mobile Development",
    skills: ["Flutter", "Dart", "BLoC", "SQLite"],
  },
  {
    title: "Machine Learning & Deep Learning",
    skills: ["PyTorch", "TensorFlow", "Scikit-learn"],
  },
  { title: "Computer Vision", skills: ["OpenCV", "YOLO"] },
  { title: "Generative AI", skills: ["LLMs", "RAG", "OCR"] },
  {
    title: "Backend & Tools",
    skills: ["FastAPI", "Git & GitHub", "Google Colab", "VS Code"],
  },
];

function SlideSkills() {
  const { container, item, reduced } = useSlideMotion();

  return (
    <SlideShell>
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="max-w-4xl"
      >
        <motion.p
          variants={item}
          className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent"
        >
          02 — Skills
        </motion.p>

        <motion.h2
          variants={item}
          className="mt-5 font-display uppercase leading-[0.95] text-[clamp(2.2rem,4.8vw,4rem)]"
        >
          Tools of the <span className="text-accent">trade</span>
        </motion.h2>

        <div className="mt-12 border-t border-mist/10">
          {GROUPS.map((group, i) => (
            <motion.div
              key={group.title}
              initial="hidden"
              animate="visible"
              variants={cascade(reduced, i, { base: 0.42, step: 0.07 })}
              className="group relative grid gap-1.5 border-b border-mist/10 py-5 sm:grid-cols-[auto_0.9fr_1.1fr] sm:items-baseline sm:gap-10"
            >
              <span className="font-mono text-[10px] tracking-[0.2em] text-accent/60 sm:pt-1">
                0{i + 1}
              </span>
              <h3 className="font-display uppercase text-base tracking-wide text-mist transition-transform duration-300 group-hover:translate-x-1 sm:text-lg">
                {group.title}
              </h3>
              <p className="font-mono text-[12px] leading-relaxed text-mist/45 transition-colors duration-300 group-hover:text-mist/70">
                {group.skills.join("  ·  ")}
              </p>
              {/* accent underline draws across on hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-accent/80 via-accent/35 to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SlideShell>
  );
}

export default SlideSkills;
