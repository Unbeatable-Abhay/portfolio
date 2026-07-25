import { motion } from "framer-motion";

export default function SkillChip({ skill }) {
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.span
      variants={itemVariants}
      whileHover={{ scale: 1.03, y: -2 }}
      className="inline-block px-4 py-2 text-xs md:text-sm font-medium rounded-full bg-accent-secondary/15 border border-accent-secondary/30 text-text hover:border-accent hover:bg-accent/10 hover:text-accent cursor-default transition-colors duration-300"
    >
      {skill}
    </motion.span>
  );
}
