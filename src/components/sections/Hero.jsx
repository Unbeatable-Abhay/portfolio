import { useState, useEffect } from "react";
import { Github, Linkedin, Mail, ArrowRight, Download } from "lucide-react";
import { motion } from "framer-motion";
import bio from "../../data/bio.json";

export default function Hero() {
  const { name, taglines, email, socials, about, resumeUrl, photoUrl } = bio;

  // Typewriter tagline animation states
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fullText = taglines[currentTaglineIndex];
    let timer;

    if (isDeleting) {
      // Deleting speed
      timer = setTimeout(() => {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(40);
      }, typingSpeed);
    } else {
      // Typing speed
      timer = setTimeout(() => {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(80);
      }, typingSpeed);
    }

    // State transitions
    if (!isDeleting && currentText === fullText) {
      // Pause when tagline is fully typed
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2500);
    } else if (isDeleting && currentText === "") {
      // Switch to next tagline when current is deleted
      setIsDeleting(false);
      setCurrentTaglineIndex((prev) => (prev + 1) % taglines.length);
      setTypingSpeed(150); // Pause before starting to type next tagline
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentTaglineIndex, taglines, typingSpeed]);

  const hasPhoto = photoUrl && !imageError;

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden py-12 md:py-20"
    >
      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">

        {/* Left Column - Content */}
        <motion.div
          className="md:col-span-7 flex flex-col justify-center space-y-6 text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-2">
            <span className="text-accent text-sm md:text-base font-semibold tracking-wider uppercase">
              Hi, my name is
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-text">
              {name}
            </h1>
          </div>

          {/* Typewriter Tagline */}
          <div className="h-8 md:h-10 flex items-center">
            <p className="text-lg md:text-xl font-medium text-text/80">
              {currentText}
              <span className="inline-block w-[3px] h-[1.2em] bg-accent ml-1 animate-pulse" />
            </p>
          </div>

          <p className="text-base md:text-lg text-text/70 leading-relaxed max-w-xl">
            {about}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#contact"
              className="inline-flex items-center space-x-2 bg-accent text-white px-6 py-3 rounded-full font-medium hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/20 transition-all duration-300"
            >
              <span>Get in touch</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={resumeUrl}
              download
              className="inline-flex items-center space-x-2 border border-accent/30 text-text px-6 py-3 rounded-full font-medium hover:bg-accent/5 hover:border-accent hover:-translate-y-0.5 transition-all duration-300"
            >
              <Download className="w-4 h-4 text-accent" />
              <span>Download Resume</span>
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4 pt-4">
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-accent-secondary/50 text-text/75 hover:text-accent transition-colors duration-300"
              aria-label="GitHub Profile"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-accent-secondary/50 text-text/75 hover:text-accent transition-colors duration-300"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href={`mailto:${email}`}
              className="p-2 rounded-full hover:bg-accent-secondary/50 text-text/75 hover:text-accent transition-colors duration-300"
              aria-label="Email Contact"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </motion.div>

        {/* Right Column - Photo / Silhouette */}
        <motion.div
          className="md:col-span-5 relative w-full aspect-square max-w-md mx-auto md:max-w-none flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Photo — mask fades directly into the page background, no clipping box, no glow ring */}
          <div className="relative w-full h-full">
            {hasPhoto ? (
              <img
                src={photoUrl}
                onError={() => setImageError(true)}
                alt={name}
                className="w-full h-full object-cover object-top"
                style={{
                  maskImage:
                    "radial-gradient(ellipse 75% 85% at center, black 65%, transparent 98%)",
                  WebkitMaskImage:
                    "radial-gradient(ellipse 75% 85% at center, black 65%, transparent 98%)",
                }}
              />
            ) : (
              // Styled silhouette placeholder that matches design themes
              <div
                className="w-full h-full flex items-center justify-center bg-accent-secondary/20 transition-colors duration-300"
                style={{
                  maskImage:
                    "radial-gradient(ellipse 75% 85% at center, black 65%, transparent 98%)",
                  WebkitMaskImage:
                    "radial-gradient(ellipse 75% 85% at center, black 65%, transparent 98%)",
                }}
              >
                <svg
                  className="w-2/3 h-2/3 text-accent/30 dark:text-accent/20 transition-colors duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            )}

            {/* Readability Scrim Overlay — blends toward the text side, matches page background color */}
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-background via-background/30 to-transparent pointer-events-none transition-colors duration-300" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}