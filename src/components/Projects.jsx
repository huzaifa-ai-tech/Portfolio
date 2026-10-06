import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import SectionContainer from "../layout/SectionContainer";
import SectionHeading from "../layout/SectionHeading";

function Projects() {
  const featuredProjects = [
    {
      title: "VisionDetect Pro",
      category: "Computer Vision",
      image: "/images/VisionDetect-Pro.webp",
      description:
        "Real-time object detection and multi-object tracking system with a FastAPI web dashboard, live MJPEG streaming, and analytics across webcam, video, and image inputs.",
      tools: ["Python", "YOLO", "OpenCV", "ByteTrack", "FastAPI"],
      github: "https://github.com/huzaifa-ai-tech/VisionDetect-Pro",
    },
    {
      title: "DocIQ",
      category: "Generative AI + RAG",
      image: "/images/DocIQ.webp",
      description:
        "AI document Q&A app: upload PDFs and get instant, grounded answers using RAG with Google Gemini embeddings and chat, backed by a FastAPI backend and PostgreSQL.",
      tools: ["FastAPI", "React", "Gemini AI", "RAG", "PostgreSQL"],
      github: "https://github.com/huzaifa-ai-tech/DocIQ",
    },
    {
      title: "NovaChat",
      category: "Generative AI + Fine-Tuning",
      image: "/images/NovaChat.webp",
      description:
        "Fine-tuned LLM chatbot built with LoRA on a custom instruction dataset of 260 Q&A pairs, served through a FastAPI backend with exact-match, fuzzy-match and generative responses.",
      tools: ["Python", "PyTorch", "HuggingFace Transformers", "PEFT LoRA", "SmolLM2", "FastAPI"],
      github: "https://github.com/huzaifa-ai-tech/NovaChat",
    },
    {
      title: "Satellite Change Detection",
      category: "Remote Sensing + Computer Vision",
      image: "/images/Satellite-Change-Detection.webp",
      description:
        "AI-powered web application for detecting land changes between multi-temporal satellite images using deep learning, semantic segmentation and interactive map-based visual analytics.",
      tools: ["Python", "FastAPI", "React", "PyTorch", "ChangeFormer", "SegFormer"],
      github: "https://github.com/huzaifa-ai-tech/Satellite-Change-Detection",
    },
    {
      title: "AI Driven Smart Cart Navigator",
      category: "AI + Robotics",
      badge: "FYP — 1st Position at NUML",
      image: "/images/SmartCart.webp",
      description:
        "Autonomous smart cart built with Raspberry Pi and computer vision for indoor navigation — line-following path tracking, real-time obstacle detection, and live mobile monitoring.",
      tools: ["Python", "Raspberry Pi", "OpenCV"],
    },
    {
      title: "DocuMind AI",
      category: "Generative AI + RAG",
      image: "/images/Documind-AI.webp",
      description:
        "AI document intelligence platform using OCR, RAG and Gemini AI for document analysis and intelligent conversations.",
      tools: ["FastAPI", "React", "Gemini AI", "OCR", "ChromaDB"],
      github: "https://github.com/huzaifa-ai-tech/DocuMind-AI",
    },
    {
      title: "BillSplit Pro",
      category: "AI Finance",
      image: "/images/BillSplit-Pro.webp",
      description:
        "Smart expense splitting and balances web app powered by Google Gemini AI for natural-language quick add, receipt scanning, and spending insights.",
      tools: ["FastAPI", "React", "Gemini AI", "Finance"],
      github: "https://github.com/huzaifa-ai-tech/BillSplit-Pro",
    },
    {
      title: "StudyBuddy",
      category: "AI Mobile App",
      image: "/images/StudyBuddy.webp",
      description:
        "Offline-first AI study companion built with Flutter — turns PDF, Word and text notes into AI summaries, flashcards, quizzes, study plans and chat with your notes, powered by the Gemini API.",
      tools: ["Flutter", "Dart", "BLoC", "SQLite", "Gemini AI"],
      github: "https://github.com/huzaifa-ai-tech/Study_Buddy",
    },
    {
      title: "ShopCraft",
      category: "Full-Stack E-Commerce",
      image: "/images/ShopCraft.webp",
      description:
        "Modern e-commerce store with a searchable catalog, category filters, product reviews and ratings, a persistent cart, demo checkout, order receipts, and an admin dashboard with image uploads.",
      tools: ["Next.js", "React", "TypeScript", "Prisma", "NextAuth", "Tailwind"],
      github: "https://github.com/huzaifa-ai-tech/ShopCraft",
    },
    {
      title: "TaskForge",
      category: "Full-Stack Web App",
      image: "/images/TaskForge.webp",
      description:
        "Kanban project management platform with drag-and-drop boards, lists and cards, customizable colors, labels, due dates, favorites and global search.",
      tools: ["Next.js", "React", "TypeScript", "Prisma", "NextAuth", "Tailwind"],
      github: "https://github.com/huzaifa-ai-tech/TaskForge",
    },
  ];

  const otherProjects = [
    {
      title: "Image Captioning using Deep Learning",
      tools: ["Computer Vision", "CNN", "Detectron2", "NLP", "Python", "RNN"],
      description:
        "Designed an image captioning system by integrating computer vision and natural language processing using deep learning models.",
    },
    {
      title: "Real-Time Object Detection using YOLOv4",
      tools: ["OpenCV", "Python", "YOLOv4"],
      description:
        "Built a real-time object detection system to identify and track objects from live webcam input.",
    },
    {
      title: "Car Price Prediction",
      tools: ["Machine Learning", "NumPy", "Pandas", "Python", "Scikit-learn"],
      description:
        "Developed a machine learning model to predict car prices using vehicle attributes and historical data.",
    },
    {
      title: "Library Management System",
      tools: ["C++", "File Handling", "OOP"],
      description:
        "Created a C++ based library management system for book cataloging, issuing and student librarian operations.",
    },
    {
      title: "SMTP Email Communication Simulation",
      tools: ["Cisco Packet Tracer", "IMAP", "POP3", "SMTP"],
      description:
        "Configured email communication simulation implementing SMTP, POP3 and IMAP protocols.",
    },
  ];

  // Sliding window moving in a CIRCLE: the track holds three copies of every
  // project so it can glide forward or backward one card at a time forever
  // (1&2&3 -> 2&3&4 -> ... -> 9&10&1 -> 1&2&3) with no visible jump back.
  // pos = index of the first visible card on the track; the stable zone is
  // [total, 2 * total). Landing outside it folds the track back by a full
  // lap -- a visually identical position -- with animation disabled.
  // vis = 3 on desktop, 2 on tablet, 1 on mobile (matches the --vis / --s
  // variables consumed by .carousel-track in index.css).
  const total = featuredProjects.length;
  const [vis, setVis] = useState(3);
  const [pos, setPos] = useState(total);
  const [animate, setAnimate] = useState(true);

  const loopProjects = [
    ...featuredProjects,
    ...featuredProjects,
    ...featuredProjects,
  ];

  const normalize = (p) => total + ((((p - total) % total) + total) % total);
  const outOfZone = (p) => p >= 2 * total || p < total;

  useEffect(() => {
    const calc = () =>
      setVis(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1);
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  // Fold the track without animating, re-enabling animation once painted.
  const fold = (nextPos) => {
    setAnimate(false);
    setPos(nextPos);
  };

  // Runs fn after the folded state has been painted: prefer the next two
  // animation frames, with a timer fallback for environments where rAF is
  // throttled (background tabs). Whichever fires first wins; fn must be
  // idempotent-safe.
  const afterPaint = (fn) => {
    let done = false;
    const run = () => {
      if (done) return;
      done = true;
      fn();
    };
    const raf = requestAnimationFrame(() => requestAnimationFrame(run));
    const timer = setTimeout(run, 120);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  };

  useEffect(() => {
    if (!animate) return afterPaint(() => setAnimate(true));
  }, [animate]);

  const step = (dir) => {
    if (outOfZone(pos)) {
      // Settle event missed (very fast clicking): fold first, then slide.
      const target = normalize(pos + dir);
      fold(normalize(pos));
      afterPaint(() => {
        setAnimate(true);
        setPos(target);
      });
    } else {
      setPos((p) => p + dir);
    }
  };

  const goPrev = () => step(-1);
  const goNext = () => step(1);

  // After every completed slide, quietly fold back into the stable zone if
  // the track passed a lap boundary (visually identical, so nothing moves).
  const handleTrackEnd = (e) => {
    if (e.target !== e.currentTarget || e.propertyName !== "transform") return;
    if (outOfZone(pos)) fold(normalize(pos));
  };

  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      <div
        className="
          absolute
          top-40
          -right-40
          w-[420px]
          h-[420px]
          bg-sky-600/20
          blur-[130px]
          rounded-full
          pointer-events-none
        "
      />

      <SectionContainer>
        <SectionHeading eyebrow="Portfolio" title="Selected Projects" />

        {/* Sliding track — the next card peeks in at the right edge */}
        <div className="mt-16 relative overflow-hidden rounded-[2.75rem] p-1.5">
          <div
            className={`carousel-track${animate ? "" : " no-transition"}`}
            style={{ "--i": pos, "--vis": vis }}
            onTransitionEnd={handleTrackEnd}
          >
            {loopProjects.map((project, idx) => (
              <div
                key={`${Math.floor(idx / total)}-${project.title}`}
                className="
                  carousel-card
                  group
                  flex
                  flex-col
                  rounded-[2.25rem]
                  p-[1.5px]
                  bg-gradient-to-br
                  from-cyan-500/70
                  via-white/10
                  to-teal-500/70
                  shadow-lg
                  shadow-black/50
                  transition-all
                  duration-300
                  hover:shadow-2xl
                  hover:shadow-teal-800/40
                  hover:from-cyan-500
                  hover:via-white/15
                  hover:to-teal-500
                "
              >
                <div className="card-shine flex flex-1 flex-col rounded-[28px] bg-[#0b1330]/90 backdrop-blur-xl overflow-hidden shadow-[inset_0_0_60px_rgba(14,165,233,0.12)]">
                  <div className="m-4 aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-[#0e1a33]/80 to-[#1a2350]/60 ring-1 ring-white/10">
                    <img
                      src={`${import.meta.env.BASE_URL}images/${project.image.split("/").pop()}`}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="
                        h-full
                        w-full
                        object-contain
                        p-2
                        group-hover:scale-110
                        group-hover:rotate-[0.5deg]
                        transition-transform
                        duration-500
                        ease-out
                      "
                    />
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-cyan-300 bg-cyan-500/10 border border-teal-400/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        {project.category}
                      </span>
                      {project.badge && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold text-sky-200 bg-sky-500/20 border border-teal-400/30">
                          {project.badge}
                        </span>
                      )}
                    </div>

                    <h4 className="text-xl font-bold text-white mt-4 group-hover:text-cyan-200 transition-colors duration-300">
                      {project.title}
                    </h4>

                    <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-5">
                      {project.tools
                        .slice()
                        .sort((a, b) => a.localeCompare(b))
                        .map((tool, i) => (
                        <span
                          key={i}
                          className="
                            px-3
                            py-1
                            rounded-xl
                            text-[11px]
                            font-medium
                            bg-white/[0.05]
                            border
                            border-white/10
                            text-slate-300
                            group-hover:border-teal-400/30
                            transition-colors
                            duration-300
                          "
                        >
                          {tool}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center gap-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            inline-flex
                            items-center
                            gap-2
                            px-4
                            py-2
                            rounded-2xl
                            bg-gradient-to-r
                            from-cyan-500
                            to-sky-500
                            text-white
                            text-sm
                            font-medium
                            shadow-lg
                            shadow-teal-900/30
                            hover:shadow-sky-700/40
                            hover:-translate-y-0.5
                            transition-all
                            duration-200
                          "
                        >
                          <FaGithub />
                          View Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Shadowed edges — depth cue that the circle continues on both
              sides (previous card peeks in at the left, next at the right) */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#070b1c] via-[#070b1c]/45 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#070b1c] via-[#070b1c]/45 to-transparent" />

          {/* Small side arrows — endless navigation in both directions */}
          <button
            onClick={goPrev}
            aria-label="Previous projects"
            className="
              absolute
              left-2
              top-1/2
              -translate-y-1/2
              z-20
              w-8
              h-8
              sm:w-9
              sm:h-9
              rounded-full
              bg-[#0b1330]/85
              backdrop-blur-md
              border
              border-white/20
              text-slate-200
              flex
              items-center
              justify-center
              shadow-lg
              shadow-black/50
              hover:text-white
              hover:border-teal-400/60
              hover:bg-cyan-500/25
              transition-all
              duration-200
            "
          >
            <ChevronLeft size={16} />
          </button>

          <button
            onClick={goNext}
            aria-label="Next projects"
            className="
              absolute
              right-2
              top-1/2
              -translate-y-1/2
              z-20
              w-8
              h-8
              sm:w-9
              sm:h-9
              rounded-full
              bg-[#0b1330]/85
              backdrop-blur-md
              border
              border-white/20
              text-slate-200
              flex
              items-center
              justify-center
              shadow-lg
              shadow-black/50
              hover:text-white
              hover:border-teal-400/60
              hover:bg-cyan-500/25
              transition-all
              duration-200
            "
          >
            <ChevronRight size={16} />
          </button>
        </div>

        <h3
          className="
            text-xl
            font-semibold
            text-slate-200
            mt-20
            mb-8
            flex
            items-center
            gap-2.5
          "
        >
          <ExternalLink size={20} className="text-teal-400" />
          More Projects
        </h3>

        <div className="flex flex-wrap justify-center gap-6">
          {otherProjects
            .slice()
            .sort((a, b) => a.title.localeCompare(b.title))
            .map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.2 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="
                group
                w-full
                md:w-[calc(50%-12px)]
                lg:w-[calc(33.333%-16px)]
                bg-white/[0.04]
                border
                border-cyan-400/20
                rounded-3xl p-6
                hover:border-sky-400/50
                hover:shadow-xl
                hover:shadow-sky-700/20
                hover:bg-gradient-to-br
                hover:from-cyan-500/10
                hover:to-teal-500/10
                transition-all
                duration-300
              "
            >
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-cyan-400 to-sky-500 group-hover:scale-125 transition-transform duration-300" />
                <h4 className="text-base font-bold text-white leading-snug group-hover:text-cyan-200 transition-colors duration-300">
                  {project.title}
                </h4>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {project.tools
                  .slice()
                  .sort((a, b) => a.localeCompare(b))
                  .map((tool, i) => (
                  <span
                    key={i}
                    className="
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      bg-cyan-500/10
                      text-cyan-300
                      border
                      border-teal-400/20
                      group-hover:border-teal-400/40
                      transition-colors
                      duration-300
                    "
                  >
                    {tool}
                  </span>
                ))}
              </div>

              <p className="text-sm text-slate-400 mt-4 leading-relaxed">
                {project.description}
              </p>
            </motion.div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}

export default Projects;
