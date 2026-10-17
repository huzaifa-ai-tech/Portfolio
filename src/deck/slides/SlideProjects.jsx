import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { EASE, cascade } from "../motion";

const IMG = (name) => `${import.meta.env.BASE_URL}images/${name}.webp`;

const PROJECTS = [
  {
    title: "VisionDetect Pro",
    category: "Computer Vision",
    image: IMG("VisionDetect-Pro"),
    description:
      "Real-time object detection and multi-object tracking system with a FastAPI web dashboard, live MJPEG streaming, and analytics across webcam, video, and image inputs.",
    tools: ["Python", "YOLO", "OpenCV", "ByteTrack", "FastAPI"],
    github: "https://github.com/huzaifa-ai-tech/VisionDetect-Pro",
  },
  {
    title: "ShopCraft",
    category: "Full-Stack E-Commerce",
    image: IMG("ShopCraft"),
    description:
      "Modern e-commerce store with a searchable catalog, category filters, product reviews and ratings, a persistent cart, demo checkout, order receipts, and an admin dashboard with image uploads.",
    tools: ["Next.js", "React", "TypeScript", "Prisma", "NextAuth", "Tailwind"],
    github: "https://github.com/huzaifa-ai-tech/ShopCraft",
  },
  {
    title: "TaskForge",
    category: "Full-Stack Web App",
    image: IMG("TaskForge"),
    description:
      "Kanban project management platform with drag-and-drop boards, lists and cards, customizable colors, labels, due dates, favorites and global search.",
    tools: ["Next.js", "React", "TypeScript", "Prisma", "NextAuth", "Tailwind"],
    github: "https://github.com/huzaifa-ai-tech/TaskForge",
  },
  {
    title: "StudyBuddy",
    category: "AI Mobile App",
    image: IMG("StudyBuddy"),
    description:
      "Offline-first AI study companion built with Flutter — turns PDF, Word and text notes into AI summaries, flashcards, quizzes, study plans and chat with your notes, powered by the Gemini API.",
    tools: ["Flutter", "Dart", "BLoC", "SQLite", "Gemini AI"],
    github: "https://github.com/huzaifa-ai-tech/Study_Buddy",
  },
  {
    title: "DocIQ",
    category: "Generative AI + RAG",
    image: IMG("DocIQ"),
    description:
      "AI document Q&A app: upload PDFs and get instant, grounded answers using RAG with Google Gemini embeddings and chat, backed by a FastAPI backend and PostgreSQL.",
    tools: ["FastAPI", "React", "Gemini AI", "RAG", "PostgreSQL"],
    github: "https://github.com/huzaifa-ai-tech/DocIQ",
  },
  {
    title: "NovaChat",
    category: "Generative AI + Fine-Tuning",
    image: IMG("NovaChat"),
    description:
      "Fine-tuned LLM chatbot built with LoRA on a custom instruction dataset of 260 Q&A pairs, served through a FastAPI backend with exact-match, fuzzy-match and generative responses.",
    tools: ["Python", "PyTorch", "HuggingFace", "LoRA", "SmolLM2", "FastAPI"],
    github: "https://github.com/huzaifa-ai-tech/NovaChat",
  },
  {
    title: "Satellite Change Detection",
    category: "Remote Sensing + CV",
    image: IMG("Satellite-Change-Detection"),
    description:
      "AI-powered web application for detecting land changes between multi-temporal satellite images using deep learning, semantic segmentation and interactive map-based visual analytics.",
    tools: ["Python", "FastAPI", "React", "PyTorch", "ChangeFormer", "SegFormer"],
    github: "https://github.com/huzaifa-ai-tech/Satellite-Change-Detection",
  },
  {
    title: "AI Driven Smart Cart Navigator",
    category: "AI + Robotics",
    badge: "FYP — 1st at NUML",
    image: IMG("SmartCart"),
    frame: 1280 / 853,
    description:
      "Mobile-operated smart cart built with Raspberry Pi and computer vision — pick a destination point on the app and it drives there on its own, with real-time obstacle detection and live path tracking.",
    tools: ["Python", "Raspberry Pi", "OpenCV"],
  },
  {
    title: "DocuMind AI",
    category: "Generative AI + RAG",
    image: IMG("Documind-AI"),
    description:
      "AI document intelligence platform using OCR, RAG and Gemini AI for document analysis and intelligent conversations.",
    tools: ["FastAPI", "React", "Gemini AI", "OCR", "ChromaDB"],
    github: "https://github.com/huzaifa-ai-tech/DocuMind-AI",
  },
  {
    title: "BillSplit Pro",
    category: "AI Finance",
    image: IMG("BillSplit-Pro"),
    description:
      "Smart expense splitting and balances web app powered by Google Gemini AI for natural-language quick add, receipt scanning, and spending insights.",
    tools: ["FastAPI", "React", "Gemini AI", "Finance"],
    github: "https://github.com/huzaifa-ai-tech/BillSplit-Pro",
  },
];

// ‹ · dots · › pager — sits at the slide's bottom on every screen.
function ProjectPager({ active, onSelect, onStep }) {
  const total = PROJECTS.length;

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onStep(-1)}
        disabled={active === 0}
        aria-label="Previous project"
        className="rounded-full border border-mist/15 p-2 text-mist/75 transition-colors duration-150 hover:border-accent/60 hover:text-mist disabled:pointer-events-none disabled:opacity-30"
      >
        <ChevronLeft size={14} />
      </button>
      <div
        role="group"
        aria-label="Projects pagination"
        className="flex items-center gap-1"
      >
        {PROJECTS.map((p, i) => (
          <button
            key={p.title}
            type="button"
            onClick={() => onSelect(i)}
            aria-label={p.title}
            aria-current={i === active ? "true" : undefined}
            className="group relative grid h-4 w-4 cursor-pointer place-items-center"
          >
            <span
              className={`h-1.5 w-1.5 rounded-full transition-colors duration-200 ${
                i === active ? "opacity-0" : "bg-mist/25 group-hover:bg-mist/50"
              }`}
            />
            {i === active && (
              <motion.span
                layoutId="proj-dot"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
                className="grad-bg glow-accent absolute h-2 w-2 rounded-full"
              />
            )}
          </button>
        ))}
      </div>
      <button
        onClick={() => onStep(1)}
        disabled={active === total - 1}
        aria-label="Next project"
        className="rounded-full border border-mist/15 p-2 text-mist/75 transition-colors duration-150 hover:border-accent/60 hover:text-mist disabled:pointer-events-none disabled:opacity-30"
      >
        <ChevronRight size={14} />
      </button>
    </div>
  );
}

function SlideProjects() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const total = PROJECTS.length;
  const project = PROJECTS[active];
  // One stage shape for the whole gallery — Smart Cart is the only one
  // that keeps its own taller 3:2 frame.
  const frameRatio = project.frame ?? 16 / 9;

  const step = useCallback(
    (dir) => {
      setActive((prev) => Math.min(total - 1, Math.max(0, prev + dir)));
    },
    [total]
  );

  // Left/Right arrows walk through the projects
  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        step(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        step(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);

  return (
    <section className="relative min-h-full w-full">
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-28 pt-12 sm:px-8 short:pt-8 tiny:pt-6 tall:pb-32 tall:pt-16">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={cascade(reduced, 0, { base: 0.05, step: 0 })}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent">
              04 — Selected Work
            </p>
            <h2 className="mt-3 font-display uppercase leading-none text-[clamp(2rem,5vw,3.6rem)]">
              Projects <span className="chrome-text">that ship</span>
            </h2>
          </motion.div>
        </div>

        <div className="mt-8 grid short:mt-6 lg:grid-cols-[1.28fr_1fr] lg:gap-12">
          {/* Screen */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={cascade(reduced, 2, { base: 0.12, step: 0 })}
          >
            {/* Screen stage — one 16:9 frame for the gallery (Smart Cart
                keeps its 3:2 frame); grows to fill the column on desktop,
                height-capped so the footer never crowds the navbar */}
            <div
              className="relative mx-auto w-full overflow-hidden rounded-2xl border border-mist/10 bg-[#0A0C10] shadow-[0_34px_90px_-48px_rgba(0,0,0,0.95)] ring-1 ring-mist/5 lg:[--stage-cap:48vh]"
              style={{
                aspectRatio: String(frameRatio),
                maxWidth: `min(100%, calc(var(--stage-cap, 34vh) * ${frameRatio.toFixed(4)}))`,
              }}
            >
              {PROJECTS.map((p, i) => (
                <img
                  key={p.title}
                  src={p.image}
                  alt={`${p.title} — ${p.category}`}
                  loading="eager"
                  decoding="async"
                  className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-[400ms] ease-out ${
                    i === active ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>

          </motion.div>

          {/* Details — beside the stage on desktop, below it on mobile */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={cascade(reduced, 3, { base: 0.16, step: 0 })}
          >
            {/* Caption */}
            <motion.div
              key={active}
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="mt-4 lg:mt-0"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="min-w-0">
                  {/* Number + category eyebrow — desktop only; on phones the
                      caption starts right at the project name */}
                  <p className="hidden font-mono text-[10px] uppercase tracking-[0.32em] text-accent lg:block">
                    {String(active + 1).padStart(2, "0")} — {project.category}
                    {project.badge ? ` · ${project.badge}` : ""}
                  </p>
                  <h3 className="mt-0 font-display uppercase leading-tight text-[clamp(1.6rem,3.4vw,2.5rem)] lg:mt-2.5">
                    {project.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mist/55">
                    {project.description}
                  </p>
                </div>

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 hidden shrink-0 items-center gap-2 rounded-full border border-mist/15 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-mist/70 transition-colors duration-150 hover:border-accent/60 hover:text-mist sm:inline-flex"
                  >
                    <FaGithub size={13} />
                    GitHub
                    <ExternalLink size={11} className="text-mist/40" />
                  </a>
                )}
              </div>

              <p className="mt-3 font-mono text-[11px] tracking-wide text-mist/35">
                {project.tools.join("  ·  ")}
              </p>

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3.5 inline-flex items-center gap-2 rounded-full border border-mist/15 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-mist/70 transition-colors duration-150 active:border-accent/60 active:text-mist sm:hidden"
                >
                  <FaGithub size={13} />
                  GitHub
                  <ExternalLink size={11} className="text-mist/40" />
                </a>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Pager — bottom of the slide, above the navbar */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={cascade(reduced, 4, { base: 0.2, step: 0 })}
          className="mt-6 flex justify-center lg:mt-8"
        >
          <ProjectPager
            active={active}
            onSelect={setActive}
            onStep={step}
          />
        </motion.div>
      </div>
    </section>
  );
}

export default SlideProjects;
