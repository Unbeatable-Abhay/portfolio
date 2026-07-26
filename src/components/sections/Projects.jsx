import { motion } from "framer-motion";
import projectsData from "../../data/projects.json";
import ProjectCard from "../ui/ProjectCard";

export default function Projects() {
  const { projects } = projectsData;

  // Filter out non-visible projects and sort by ascending 'order'
  const displayProjects = projects
    .filter((project) => project.visible !== false)
    .sort((a, b) => (a.order || 999) - (b.order || 999));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  return (
    <section 
      id="projects" 
      className="py-20 border-t border-accent-secondary/10 relative overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-text">
            Featured Projects
          </h2>
          <div className="mt-2 h-1 w-12 bg-accent mx-auto rounded-full" />
        </motion.div>

        {/* Stacked single-column layout — avoids awkward gaps since most projects are featured */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-6 md:gap-8 max-w-3xl mx-auto"
        >
          {displayProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}