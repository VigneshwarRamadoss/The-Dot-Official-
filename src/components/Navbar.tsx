import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import ScrambleText from './ScrambleText';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const navItems = [
  { id: 'hero', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'services', label: 'SERVICES' },
  { id: 'work', label: 'WORK' },
  { id: 'team', label: 'TEAM' },
  { id: 'why', label: 'WHY' },
  { id: 'contact', label: 'CONTACT' },
];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState('hero');
  const activeTabRef = useRef('hero');
  const isScrollingRef = useRef(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    activeTabRef.current = activeTab;
  }, [activeTab]);

  const logoRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    // Staggered entrance for nav items
    gsap.fromTo(itemsRef.current, 
      { opacity: 0, x: -30, scale: 0.5 },
      { 
        opacity: 1, 
        x: 0, 
        scale: 1, 
        duration: 1, 
        stagger: 0.1, 
        ease: "back.out(1.7)",
        delay: 3.5 
      }
    );

    // Wait for GSAP triggers to be ready
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
      
      const findMainTrigger = () => {
        const allTriggers = ScrollTrigger.getAll();
        return allTriggers.find(t => t.pin || (t.vars && t.vars.pin));
      };
      
      const mainTrigger = findMainTrigger();
      
      if (mainTrigger) {
        const updateActiveState = (self?: any) => {
          if (isScrollingRef.current) return;
          
          const scrollRef = document.querySelector('.flex-nowrap') as HTMLElement;
          if (!scrollRef || !mainTrigger) return;
          
          const viewportWidth = window.innerWidth;
          const scrollWidth = scrollRef.scrollWidth;
          const maxScroll = scrollWidth - viewportWidth;
          
          // Use scroll progress if available from self (ScrollTrigger onUpdate), 
          // otherwise fallback to property or current progress
          const progress = self ? self.progress : mainTrigger.progress;
          const scrollX = progress * maxScroll;
          
          // The center of the screen relative to the horizontal scroll container
          const viewportCenter = scrollX + viewportWidth / 2;
          
          let bestMatch = navItems[0].id;
          let minDistance = Infinity;

          navItems.forEach((item) => {
            const element = document.getElementById(item.id);
            if (element) {
              const start = element.offsetLeft;
              const width = element.offsetWidth;
              const center = start + width / 2;
              
              // If the viewport center is inside the section, it's the winner
              if (viewportCenter >= start && viewportCenter <= start + width) {
                bestMatch = item.id;
                minDistance = -1; // Priority find
              } else if (minDistance !== -1) {
                const dist = Math.abs(viewportCenter - center);
                if (dist < minDistance) {
                  minDistance = dist;
                  bestMatch = item.id;
                }
              }
            }
          });
          
          if (bestMatch !== activeTabRef.current) {
            setActiveTab(bestMatch);
          }
        };

        const scrollTrigger = ScrollTrigger.create({
          trigger: mainTrigger.trigger,
          start: mainTrigger.start,
          end: mainTrigger.end,
          onUpdate: (self) => updateActiveState(self)
        });

        // Run once initially with a small delay to ensure layout
        setTimeout(() => updateActiveState(), 100);

          // Logo Animation: Center to Top
          if (logoRef.current) {
            gsap.set(logoRef.current, {
              opacity: 0,
              position: 'fixed',
              top: '50%',
              left: '50%',
              xPercent: -50,
              yPercent: -50,
              scale: 1,
            });

            // Entrance animation
            gsap.to(logoRef.current, {
              opacity: 1,
              duration: 1.5,
              ease: "expo.out",
              delay: 0.5
            });

            // Move to Top Animation
            gsap.to(logoRef.current, {
              top: () => window.innerWidth < 768 ? '2rem' : '2.5rem', 
              yPercent: -50,
              scale: 0.25, 
              ease: 'power2.inOut',
              scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: () => window.innerHeight * 0.8, 
                scrub: 1,
                invalidateOnRefresh: true,
              }
            });
          }

          // Vertical Navigation Bar - Left Side
        const navContainer = navContainerRef.current;
        if (navContainer) {
          gsap.fromTo(navContainer,
            { x: -80, opacity: 0, rotateY: 45 },
            { 
              x: 0, 
              opacity: 1, 
              rotateY: 0,
              duration: 1.2, 
              ease: "expo.out",
              delay: 3.2 
            }
          );
        }

        return () => {
          scrollTrigger.kill();
        };
      }
    }, 3200); 

    return () => clearTimeout(timeout);
  }, []);

  // Magnetic Effect
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    const btn = itemsRef.current[index];
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = (index: number) => {
    const btn = itemsRef.current[index];
    if (!btn) return;

    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)"
    });
    setHoveredItem(null);
  };

  const scrollToSection = (index: number) => {
    const allTriggers = ScrollTrigger.getAll();
    const mainTrigger = allTriggers.find(t => t.pin || (t.vars && t.vars.pin));
    
    if (!mainTrigger) {
      console.warn("Main scroll trigger not found");
      return;
    }

    const scrollRef = document.querySelector('.flex-nowrap') as HTMLElement;
    const targetSection = document.getElementById(navItems[index].id);
    if (!scrollRef || !targetSection) return;

    const totalWidth = scrollRef.scrollWidth - window.innerWidth;
    const sectionWidth = targetSection.offsetWidth;
    const targetX = targetSection.offsetLeft;
    const targetId = navItems[index].id;
    
    const sectionsToStart = ['hero', 'about', 'services', 'work', 'why', 'contact'];
    let optimizedTargetX = targetX;
    
    if (!sectionsToStart.includes(targetId)) {
      optimizedTargetX = targetX + (sectionWidth / 2) - (window.innerWidth / 2);
    }
    
    optimizedTargetX = Math.max(0, Math.min(optimizedTargetX, totalWidth));
    const progress = optimizedTargetX / totalWidth;
    
    const start = mainTrigger.start;
    const end = mainTrigger.end;
    const scrollDistance = end - start;
    const targetProgress = start + (scrollDistance * progress);
    
    isScrollingRef.current = true;
    gsap.to(window, {
      scrollTo: { y: targetProgress },
      duration: 1.5,
      ease: "power3.inOut",
      onStart: () => setActiveTab(targetId),
      onComplete: () => {
        isScrollingRef.current = false;
        // Force one final check to be sure we're in the right place
        const allTriggers = ScrollTrigger.getAll();
        const main = allTriggers.find(t => t.pin || (t.vars && t.vars.pin));
        if (main) {
          // Temporarily disable the ref to allow the final sync
          isScrollingRef.current = false;
        }
      }
    });
  };

  return (
    <nav className="fixed inset-0 z-[100] pointer-events-none">

      {/* Dynamic Animated Logo */}
      <div 
        ref={logoRef}
        onClick={() => scrollToSection(0)}
        className="fixed top-1/2 left-1/2 font-display font-bold tracking-tighter pointer-events-auto cursor-pointer whitespace-nowrap z-[150] uppercase text-[7vw]"
      >
        <span id="logo-text" className="bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-transparent">
          THE DOT
        </span>
      </div>

      {/* Vertical Navigation Bar - Left Side */}
      <div 
        ref={navContainerRef}
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 items-center pointer-events-auto bg-neutral-950/60 backdrop-blur-3xl p-1.5 md:p-2 rounded-full border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.8)]"
      >
        {navItems.map((item, idx) => (
          <motion.button
            key={item.id}
            ref={(el) => (itemsRef.current[idx] = el as HTMLButtonElement)}
            onClick={() => scrollToSection(idx)}
            onMouseMove={(e) => {
              handleMouseMove(e, idx);
              setHoveredItem(item.id);
            }}
            onMouseLeave={() => handleMouseLeave(idx)}
            whileTap={{ scale: 0.9 }}
            className={cn(
              "text-[8px] md:text-[10px] tracking-widest font-sans font-bold uppercase transition-all relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full group",
              activeTab === item.id 
                ? "text-black" 
                : "text-neutral-300 hover:text-white"
            )}
          >
            {/* Label on hover for vertical nav */}
            <AnimatePresence>
              {(hoveredItem === item.id || activeTab === item.id) && (
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="absolute left-full ml-3 px-3 py-1 bg-neutral-900/90 text-white backdrop-blur-md rounded-md border border-white/20 whitespace-nowrap pointer-events-none text-[10px] font-bold shadow-xl overflow-hidden"
                >
                  <ScrambleText text={item.label} duration={0.6} />
                </motion.span>
              )}
            </AnimatePresence>

            <span className="relative z-10">{item.label[0]}</span>
            
            {activeTab === item.id && (
              <motion.div
                layoutId="active-pill-vertical"
                className="absolute inset-0 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            
            {/* Hover indicator pill */}
            {hoveredItem === item.id && activeTab !== item.id && (
              <motion.div
                layoutId="hover-pill"
                className="absolute inset-0 bg-white/10 rounded-full"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}

            {activeTab === item.id && (
              <motion.div
                layoutId="active-glow-vertical"
                className="absolute inset-0 bg-white/20 blur-xl rounded-full"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </nav>
  );
}
