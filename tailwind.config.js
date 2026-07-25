/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        text: "rgb(var(--text-primary) / <alpha-value>)",
        accent: {
          DEFAULT: "#8b5cf6",
          secondary: "rgb(var(--accent-secondary) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Space Grotesk", "sans-serif"],
      },
    },
  },
  plugins: [],
}

