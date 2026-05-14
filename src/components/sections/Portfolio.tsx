import { motion } from 'motion/react';
import ScrambleText from '../ScrambleText';

const projects = [
  { 
    title: 'Nexus Pay', 
    category: 'Fintech App', 
    img: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    title: 'Aura SaaS', 
    category: 'Workspace Tool', 
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    title: 'Flow Design', 
    category: 'Agency Portfolio', 
    img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    title: 'Nova Vision', 
    category: 'AI Platform', 
    img: 'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?auto=format&fit=crop&q=80&w=800' 
  }
];

export default function Portfolio() {
  return (
    <section className="relative min-w-[240vw] h-screen flex items-center px-6 md:px-32 flex-shrink-0 border-l border-white/5" id="work">
      <div className="flex gap-20 md:gap-32 h-[75vh] items-center">
        <div className="w-[80vw] md:w-[35vw] flex-shrink-0 flex flex-col justify-center px-4 md:px-0">
          <h2 className="text-[clamp(3.25rem,9vw,7.5rem)] font-display font-bold tracking-tighter mb-8 leading-none uppercase">
            <ScrambleText text="SELECTED" duration={0.8} /> <br/>
            <span className="text-gradient-blue">
              <ScrambleText text="WORKS" delay={0.3} duration={1} />
            </span>
          </h2>
          <div className="flex items-center gap-4 text-gray-500 uppercase text-xs tracking-[0.2em]">
            <div className="w-12 h-[1px] bg-gray-700" />
            <span>
              <ScrambleText text="2024 — 2026" delay={0.6} duration={1} />
            </span>
          </div>
        </div>

        <div className="flex gap-8 md:gap-12 h-full pr-20">
          {projects.map((project, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ scale: 0.98 }}
              className="group relative w-[35vw] h-full overflow-hidden cursor-pointer"
            >
              <img 
                src={project.img} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-12">
                <span className="text-dot-blue font-sans uppercase tracking-widest text-sm mb-2">{project.category}</span>
                <h3 className="text-5xl font-display font-bold">{project.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
