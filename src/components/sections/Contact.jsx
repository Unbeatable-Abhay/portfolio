import { Github, Linkedin, Mail, ArrowUpRight, Download } from "lucide-react";
import { motion } from "framer-motion";
import bio from "../../data/bio.json";
import { trackEvent } from "../../utils/analytics";

export default function Contact() {
  const { email, socials, resumeUrl } = bio;

  const links = [
    {
      label: "Email",
      value: email,
      href: `mailto:${email}`,
      icon: Mail,
    },
    {
      label: "GitHub",
      value: socials.github.replace("https://", ""),
      href: socials.github,
      icon: Github,
      external: true,
    },
    {
      label: "LinkedIn",
      value: socials.linkedin.replace("https://", ""),
      href: socials.linkedin,
      icon: Linkedin,
      external: true,
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-20 md:py-28 scroll-mt-20"
    >
      <div className="mx-auto max-w-4xl w-full px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-text">
            Get in touch
          </h2>
          <p className="mt-4 text-base md:text-lg text-text/70 max-w-xl mx-auto">
            Reach out directly through any of these — always happy to connect.
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          {links.map((link, i) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -2 }}
                className="group flex items-center justify-between w-full rounded-2xl border border-accent-secondary/20 bg-accent-secondary/5 px-6 py-5 hover:border-accent/40 hover:bg-accent-secondary/10 transition-colors duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-full bg-accent-secondary/20 text-accent group-hover:bg-accent/10 transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-text/60">{link.label}</p>
                    <p className="text-base font-medium text-text">{link.value}</p>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-text/40 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
              </motion.a>
            );
          })}

          {resumeUrl && (
            <motion.a
              href={resumeUrl}
              download
              onClick={() => trackEvent("resume_download", { location: "contact" })}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: links.length * 0.08 }}
              whileHover={{ y: -2 }}
              className="group flex items-center justify-center space-x-2 w-full rounded-full bg-accent text-white px-6 py-4 font-medium hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 mt-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
            </motion.a>
          )}
        </div>
      </div>
    </section>
  );
}