import { motion } from "framer-motion";
import { Github, ExternalLink, Star } from "lucide-react";

export default function ProjectCard({ project }) {
  const { title, description, techStack, githubUrl, liveUrl, featured } = project;

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6 }}
      className={`relative group flex flex-col h-full p-6 md:p-8 rounded-2xl border bg-accent-secondary/5 dark:bg-accent-secondary/10 transition-all duration-500 ${
        featured
          ? "lg:col-span-2 border-accent/20 dark:border-accent/15 shadow-sm shadow-accent/5 hover:shadow-md hover:shadow-accent/10"
          : "border-accent-secondary/20 hover:shadow-sm"
      } hover:border-accent/40`}
    >
      {/* Featured Ribbon / Badge */}
      {featured && (
        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-accent/10 text-accent border border-accent/20">
          <Star className="w-3.5 h-3.5 fill-accent" />
          <span>Featured Project</span>
        </div>
      )}

      {/* Content */}
      <div className="flex-grow space-y-4 pr-16">
        <h3 className="font-heading text-xl md:text-2xl font-bold text-text group-hover:text-accent transition-colors duration-300">
          {title}
        </h3>

        <p className="text-text/70 text-sm md:text-base leading-relaxed pr-0 sm:pr-8">
          {description}
        </p>

        {/* Tech Stack Tags */}
        {techStack && techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-accent-secondary/10 text-text/80 border border-accent-secondary/20"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Links */}
      <div className="flex items-center gap-4 pt-6 border-t border-accent-secondary/10 mt-6">
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-text/80 hover:text-accent transition-colors duration-300"
          aria-label={`View code for ${title} on GitHub`}
        >
          <Github className="w-4 h-4" />
          <span>Code</span>
        </a>

        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent/80 transition-colors duration-300"
            aria-label={`View live demo for ${title}`}
          >
            <ExternalLink className="w-4 h-4" />
            <span>Live Demo</span>
          </a>
        )}
      </div>
    </motion.div>
  );
}
