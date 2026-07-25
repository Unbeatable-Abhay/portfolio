import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-accent-secondary/50 text-text transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2 }}
        className="w-5 h-5 flex items-center justify-center"
      >
        {theme === "dark" ? (
          <Sun className="w-5 h-5 text-accent" />
        ) : (
          <Moon className="w-5 h-5 text-accent" />
        )}
      </motion.div>
    </button>
  );
}
