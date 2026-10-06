import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import AnimatedBackground from "./effects/AnimatedBackground";
import LoadingScreen from "./effects/LoadingScreen";
import ScrollReveal from "./effects/ScrollReveal";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let pageLoaded = document.readyState === "complete";
    let minElapsed = false;
    let done = false;

    const tryFinish = () => {
      if (done || !pageLoaded || !minElapsed) return;
      done = true;
      setLoading(false);
    };

    const onLoad = () => {
      pageLoaded = true;
      tryFinish();
    };

    if (!pageLoaded) {
      window.addEventListener("load", onLoad, { once: true });
    }

    // Always show the splash for at least 1.2s, wait for the page to finish
    // loading, and never hold it longer than 2.5s.
    const minTimer = setTimeout(() => {
      minElapsed = true;
      tryFinish();
    }, 1200);
    const cap = setTimeout(() => {
      done = true;
      setLoading(false);
    }, 2500);

    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(minTimer);
      clearTimeout(cap);
    };
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="relative min-h-screen text-slate-200">
      <AnimatedBackground />

      <div className="relative z-10">
        <Navbar />

        <main>
          <ScrollReveal>
            <Hero />
          </ScrollReveal>

          <ScrollReveal>
            <About />
          </ScrollReveal>

          <ScrollReveal direction="left">
            <Skills />
          </ScrollReveal>

          <ScrollReveal direction="right">
            <Education />
          </ScrollReveal>

          <ScrollReveal direction="left">
            <Experience />
          </ScrollReveal>

          <ScrollReveal>
            <Projects />
          </ScrollReveal>

          <ScrollReveal direction="left">
            <Achievements />
          </ScrollReveal>

          <ScrollReveal direction="right">
            <Contact />
          </ScrollReveal>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
