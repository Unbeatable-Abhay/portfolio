import { motion } from "framer-motion";
import { GraduationCap, MapPin, Calendar } from "lucide-react";
import bio from "../../data/bio.json";

export default function About() {
  const { about, education } = bio;

  return (
    <section 
      id="about" 
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
            About Me
          </h2>
          <div className="mt-2 h-1 w-12 bg-accent mx-auto rounded-full" />
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Bio Text Column */}
          <motion.div
            className="lg:col-span-7 space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-heading text-xl md:text-2xl font-bold text-text">
              My Background
            </h3>
            <p className="text-text/75 text-base md:text-lg leading-relaxed">
              {about}
            </p>
          </motion.div>

          {/* Education Block Column */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="p-6 md:p-8 rounded-2xl bg-accent-secondary/5 dark:bg-accent-secondary/10 border border-accent-secondary/20 hover:border-accent/30 transition-colors duration-300 shadow-sm relative group overflow-hidden">
              {/* Subtle background glow effect on card hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <h3 className="font-heading text-xl font-bold text-text mb-6 flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-accent" />
                Education
              </h3>

              <div className="space-y-4 relative z-10">
                <div className="border-l-2 border-accent pl-4 space-y-2">
                  <h4 className="font-heading text-lg font-semibold text-text group-hover:text-accent transition-colors duration-300">
                    {education.institution}
                  </h4>
                  <p className="text-text/80 text-sm md:text-base font-medium">
                    {education.degree}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 pt-2 text-xs md:text-sm text-text/60">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-accent/70" />
                      <span>{education.year}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-accent/70" />
                      <span>{education.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
