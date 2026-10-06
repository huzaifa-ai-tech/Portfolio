import { useState } from "react";
import logo from "../assets/logo.webp";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    "About",
    "Skills",
    "Education",
    "Experience",
    "Projects",
    "Achievements",
    "Contact",
  ];

  return (
    <nav
      className="
        fixed
        top-0
        left-0
        w-full
        z-50
        bg-[#0a0e20]/80
        backdrop-blur-xl
        border-b
        border-cyan-500/20
        shadow-[0_4px_30px_rgba(2,132,199,0.15)]
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          py-3
          flex
          items-center
          justify-between
        "
      >
        <a href="#home" className="flex items-center">
          <img
            src={logo}
            alt="HR Logo"
            className="w-9 h-9 object-contain"
          />
        </a>

        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="
                px-4
                py-2
                rounded-xl
                text-sm
                font-medium
                text-slate-300
                border
                border-transparent
                hover:text-white
                hover:bg-cyan-500/10
                hover:border-teal-400/20
                transition-all
                duration-200
              "
            >
              {link}
            </a>
          ))}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="
            md:hidden
            text-slate-300
            p-2
          "
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden px-6 pb-5">
          <div
            className="
              flex
              flex-col
              gap-1
              bg-white/[0.04]
              border
              border-white/10
              rounded-3xl p-4
              backdrop-blur-xl
            "
          >
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="
                  px-4
                  py-2.5
                  rounded-2xl
                  text-slate-300
                  hover:text-white
                  hover:bg-cyan-500/10
                  transition
                "
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
