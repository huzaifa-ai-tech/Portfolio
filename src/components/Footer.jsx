import { FaGithub, FaLinkedin } from "react-icons/fa";
import { ArrowUp } from "lucide-react";
import SectionContainer from "../layout/SectionContainer";

function Footer() {
  return (
    <footer className="py-8 border-t border-cyan-500/20 bg-[#0a0e20]/70">
      <SectionContainer>
        <div
          className="
            flex
            flex-col
            md:flex-row
            items-center
            justify-between
            gap-5
            text-sm
          "
        >
          <p className="text-slate-400">
            © {new Date().getFullYear()} Muhammad Huzaifa Rehan. All rights
            reserved.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/huzaifa-ai-tech"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="
                p-2.5
                rounded-2xl
                text-slate-400
                hover:text-white
                hover:bg-cyan-500/10
                transition
              "
            >
              <FaGithub size={19} />
            </a>

            <a
              href="https://www.linkedin.com/in/muhammad-huzaifa-rehan-4ab838419"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="
                p-2.5
                rounded-2xl
                text-slate-400
                hover:text-white
                hover:bg-cyan-500/10
                transition
              "
            >
              <FaLinkedin size={19} />
            </a>

            <a
              href="#home"
              aria-label="Back to top"
              className="
                p-2.5
                rounded-2xl
                text-slate-400
                hover:text-white
                hover:bg-cyan-500/10
                transition
              "
            >
              <ArrowUp size={19} />
            </a>
          </div>
        </div>
      </SectionContainer>
    </footer>
  );
}

export default Footer;
