import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import ScrambleText from '../ScrambleText';
import { caseStudies, CaseStudy } from '../../data/caseStudies';

export default function Portfolio() {
  const [activeStudy, setActiveStudy] = useState<CaseStudy | null>(null);

  // Lock body scroll when case study modal is active to prevent background scrolling
  useEffect(() => {
    if (activeStudy) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [activeStudy]);

  // Handle Escape key to close active modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveStudy(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section className="relative w-full lg:w-max lg:min-w-[100vw] min-h-[100dvh] lg:h-screen h-auto flex flex-col lg:flex-row items-center px-6 lg:px-32 flex-shrink-0 border-l border-white/5" id="work">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-32 h-auto lg:h-[75vh] items-start lg:items-center py-20 lg:py-0 w-full lg:w-max">
        <div className="w-full lg:w-[35vw] flex-shrink-0 flex flex-col justify-center text-left">
          <h2 className="text-[clamp(3.25rem,9vw,7.5rem)] font-display font-bold tracking-tighter mb-8 leading-none uppercase">
            <ScrambleText text="SELECTED" duration={0.8} /> <br/>
            <span className="inline-block text-gradient-blue">
              <ScrambleText text="WORKS" delay={0.3} duration={1} />
            </span>
          </h2>
          <div className="border-l-2 border-white/10 pl-6 max-w-sm">
            <p className="text-sm md:text-base text-gray-400 font-light tracking-wide leading-relaxed">
              Curated case studies highlighting our design craftsmanship, rigorous product strategy, and technical execution.
            </p>
            <p className="text-[10px] text-purple-400 font-mono tracking-wider mt-4 uppercase">
              Click any card to read story
            </p>
          </div>
        </div>

        <div className="flex flex-row gap-8 lg:gap-12 h-full lg:pr-20 w-full lg:w-max overflow-x-auto lg:overflow-visible snap-x snap-mandatory scrollbar-hide pb-4 lg:pb-0">
          {caseStudies.map((project) => (
            <motion.div 
              key={project.id}
              role="button"
              tabIndex={0}
              aria-label={`View case study: ${project.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveStudy(project);
                }
              }}
              whileHover={{ scale: 0.98 }}
              onClick={() => setActiveStudy(project)}
              className="group relative w-[80vw] min-w-[80vw] lg:w-[35vw] lg:min-w-[35vw] aspect-[4/3] lg:h-full overflow-hidden cursor-pointer bg-neutral-900 snap-center rounded-2xl border border-white/[0.03] hover:border-purple-500/20 transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.37)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-400 focus-visible:outline-offset-2"
            >
              <img 
                src={project.img} 
                alt={project.title}
                width={800}
                height={600}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Overlay with elegant details */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent flex flex-col justify-end p-6 md:p-12 text-left">
                <span className="text-purple-400 font-mono uppercase tracking-widest text-[10px] md:text-xs mb-1 md:mb-2 font-semibold">
                  {project.category}
                </span>
                <h3 className="text-2xl md:text-5xl font-display font-bold text-white mb-2 leading-none uppercase tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-xs font-sans line-clamp-1 group-hover:text-gray-300 transition-colors">
                  {project.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Case Study Modal Dialog */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {activeStudy && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 p-0 md:p-8 backdrop-blur-md"
              onClick={() => setActiveStudy(null)}
            >
              <motion.div 
                initial={{ scale: 0.95, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 20, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative w-full max-w-4xl h-full md:h-[90vh] bg-neutral-950 border-0 md:border border-white/10 rounded-none md:rounded-[2.5rem] overflow-hidden flex flex-col shadow-[0_24px_80px_rgba(0,0,0,0.8)]"
                onClick={(e) => e.stopPropagation()}
              >
                
                {/* Cover Header Image */}
                <div className="relative h-[25vh] md:h-[35vh] flex-shrink-0">
                  <img 
                    src={activeStudy.img} 
                    alt={activeStudy.title}
                    className="w-full h-full object-cover opacity-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
                  
                  {/* Close Button with premium rotate & scale micro-interaction */}
                  <button 
                    onClick={() => setActiveStudy(null)}
                    className="absolute top-6 right-6 md:top-6 md:right-6 w-11 h-11 md:w-10 md:h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-all hover:scale-110 hover:rotate-90 duration-300 cursor-pointer z-20 safe-top-margin"
                    aria-label="Close modal"
                  >
                    <X className="w-5.5 h-5.5 md:w-5 md:h-5" />
                  </button>

                  {/* Title overlay */}
                  <div className="absolute bottom-6 left-6 md:left-12 right-6 text-left">
                    <span className="text-purple-400 font-mono text-xs md:text-sm uppercase tracking-widest font-semibold block mb-2">{activeStudy.category}</span>
                    <h1 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight uppercase">{activeStudy.title}</h1>
                  </div>
                </div>

                {/* Scrollable Content Container */}
                <div 
                  className="flex-1 overflow-y-auto px-6 md:px-12 py-8 custom-scrollbar relative"
                  data-lenis-prevent
                >
                  {/* Subtitle Intro */}
                  <div className="border-b border-white/5 pb-6 mb-8 text-left">
                    <p className="text-base md:text-xl text-gray-200 leading-relaxed font-light font-sans max-w-3xl">
                      {activeStudy.subtitle}
                    </p>
                  </div>

                  {/* Main Sections */}
                  <div className="text-left max-w-3xl">
                    {activeStudy.sections.map((section, idx) => (
                      <div key={idx} className="mb-10 group">
                        <h2 className="text-lg md:text-xl font-display font-bold text-white uppercase tracking-tight flex items-center gap-3 mb-4">
                          <span className="text-purple-500 font-mono text-xs font-semibold">0{idx + 1}.</span>
                          {section.heading}
                        </h2>
                        <div className="space-y-4">
                          {section.content.map((p, pIdx) => {
                            // Detect if paragraph is a structured numbered list item (starts with e.g. "1. ")
                            const listItemMatch = p.match(/^(\d+)\.\s*(.*)/);
                            if (listItemMatch) {
                              const [, num, content] = listItemMatch;
                              return (
                                <div key={pIdx} className="flex gap-4 items-start bg-white/[0.01] border border-white/[0.03] p-5 rounded-2xl hover:border-purple-500/10 hover:bg-white/[0.02] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.15)] group-hover:translate-x-1 duration-300">
                                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-mono text-xs font-bold mt-0.5 shadow-[0_0_12px_rgba(168,85,247,0.15)]">
                                    {num}
                                  </span>
                                  <p className="text-gray-300 text-sm md:text-base leading-relaxed font-sans font-light flex-1">
                                    {content}
                                  </p>
                                </div>
                              );
                            }
                            return (
                              <p key={pIdx} className="text-gray-400 text-sm md:text-base leading-relaxed font-sans font-light">
                                {p}
                              </p>
                            );
                          })}
                        </div>
                        
                        {section.quote && (
                          <blockquote className="border-l-2 border-purple-500/80 bg-white/[0.01] pl-6 py-4 my-8 italic text-base md:text-lg text-white font-serif rounded-r-2xl pr-4 border-t border-b border-r border-white/[0.03]">
                            {section.quote}
                          </blockquote>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer CTA */}
                <div className="bg-neutral-950 border-t border-white/5 py-4 px-6 md:px-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-gray-500 font-sans tracking-wide">
                  <p>Case study curated by The Dot © 2025</p>
                  <button 
                    onClick={() => setActiveStudy(null)}
                    className="px-6 py-2 rounded-full border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10 hover:text-white transition-all text-xs font-mono cursor-pointer"
                  >
                    Close Case Study
                  </button>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
