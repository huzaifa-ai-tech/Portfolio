import { motion } from "framer-motion";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import SectionContainer from "../layout/SectionContainer";
import SectionHeading from "../layout/SectionHeading";

function Contact() {
  const contacts = [
    {
      title: "Email",
      value: "huzaifarehan.2121@gmail.com",
      icon: <FaEnvelope size={24} />,
      link: "mailto:huzaifarehan.2121@gmail.com",
    },
    {
      title: "LinkedIn",
      value: "Muhammad Huzaifa Rehan",
      icon: <FaLinkedin size={24} />,
      link: "https://www.linkedin.com/in/muhammad-huzaifa-rehan-4ab838419",
    },
    {
      title: "GitHub",
      value: "huzaifa-ai-tech",
      icon: <FaGithub size={24} />,
      link: "https://github.com/huzaifa-ai-tech",
    },
  ];

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      <div
        className="
          absolute
          -top-40
          right-0
          w-[420px]
          h-[420px]
          bg-sky-600/20
          blur-[130px]
          rounded-full
          pointer-events-none
        "
      />

      <SectionContainer>
        <SectionHeading eyebrow="Get in touch" title="Let's Build Something Great" />

        <p className="text-center text-slate-400 mt-6 max-w-xl mx-auto">
          I'm always open to new AI projects, collaborations, and
          professional opportunities. Let's create value together.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-14 max-w-3xl mx-auto">
          {contacts.map((item, index) => (
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
                text-center
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
                  w-14
                  h-14
                  mx-auto
                  rounded-3xl flex
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

              <h3 className="text-lg font-bold text-white">{item.title}</h3>

              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  block
                  mt-3
                  text-sm
                  text-slate-400
                  hover:text-sky-300
                  transition-colors
                  duration-200
                  break-words
                "
              >
                {item.value}
              </a>
            </motion.div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}

export default Contact;
