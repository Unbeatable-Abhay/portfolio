import { motion } from "framer-motion";
import skillsData from "../../data/skills.json";
import SkillChip from "../ui/SkillChip";

export default function Skills() {
  const { categories } = skillsData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 15 },
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
    <section 
      id="skills" 
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
            Skills & Expertise
          </h2>
          <div className="mt-2 h-1 w-12 bg-accent mx-auto rounded-full" />
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category) => (
            <motion.div
              key={category.name}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="p-6 rounded-2xl bg-accent-secondary/5 dark:bg-accent-secondary/10 border border-accent-secondary/20 hover:border-accent/30 transition-colors duration-300 shadow-sm flex flex-col h-full"
            >
              {/* Category Title */}
              <motion.h3 
                variants={titleVariants}
                className="font-heading text-lg font-bold text-text mb-4 border-b border-accent-secondary/20 pb-3"
              >
                {category.name}
              </motion.h3>

              {/* Skills Chip List */}
              <div className="flex flex-wrap gap-2.5 mt-auto">
                {category.skills.map((skill) => (
                  <SkillChip key={skill} skill={skill} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
