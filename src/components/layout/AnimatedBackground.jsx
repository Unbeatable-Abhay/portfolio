import { motion, useReducedMotion } from "framer-motion";

export default function AnimatedBackground() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className="fixed inset-0 -z-50 overflow-hidden bg-background transition-colors duration-300 pointer-events-none">
        {/* Static blurred accent blobs for reduced motion preference */}
        <div className="absolute top-[10%] left-[5%] w-[45vw] h-[45vw] rounded-full bg-accent/5 dark:bg-accent/10 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[50vw] h-[50vw] rounded-full bg-accent/5 dark:bg-accent/10 blur-[150px]" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-background transition-colors duration-300 pointer-events-none">
      {/* Blob 1: Top Left drifting to center-left */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[55vw] h-[55vw] rounded-full bg-accent/4 dark:bg-accent/8 blur-[100px] md:blur-[130px]"
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -40, 50, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Blob 2: Bottom Right drifting to center-right */}
      <motion.div
        className="absolute bottom-[-15%] right-[-15%] w-[65vw] h-[65vw] rounded-full bg-accent/3 dark:bg-accent/6 blur-[120px] md:blur-[150px]"
        animate={{
          x: [0, -70, 40, 0],
          y: [0, 50, -40, 0],
          scale: [1, 0.85, 1.1, 1],
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Blob 3: Middle Center-Left drifting */}
      <motion.div
        className="absolute top-[35%] left-[25%] w-[35vw] h-[35vw] rounded-full bg-accent/2 dark:bg-accent/4 blur-[90px] md:blur-[110px]"
        animate={{
          x: [0, -40, 40, 0],
          y: [0, 40, -40, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
