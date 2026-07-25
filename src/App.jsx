import Navbar from "./components/layout/Navbar";
import AnimatedBackground from "./components/layout/AnimatedBackground";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import bio from "./data/bio.json";

function App() {
  return (
    <div className="relative min-h-screen bg-background text-text transition-colors duration-300 overflow-x-hidden">
      {/* Global Ambient Background */}
      <AnimatedBackground />

      {/* Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </div>
  )
}

export default App