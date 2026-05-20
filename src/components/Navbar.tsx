import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Work' },
  { id: 'team', label: 'Team' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState('hero');
  const activeTabRef = useRef('hero');
  const isScrollingRef = useRef(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    activeTabRef.current = activeTab;
  }, [activeTab]);

  useEffect(() => {
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
          
          const progress = self ? self.progress : mainTrigger.progress;
          const scrollX = progress * maxScroll;
          const viewportCenter = scrollX + viewportWidth / 2;
          
          let bestMatch = navItems[0].id;
          let minDistance = Infinity;

          navItems.forEach((item) => {
            const element = document.getElementById(item.id);
            if (element) {
              const start = element.offsetLeft;
              const width = element.offsetWidth;
              const center = start + width / 2;
              
              if (viewportCenter >= start && viewportCenter <= start + width) {
                bestMatch = item.id;
                minDistance = -1;
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

        setTimeout(() => updateActiveState(), 100);

        return () => {
          scrollTrigger.kill();
        };
      }
    }, 3200); 

    return () => clearTimeout(timeout);
  }, []);

  const scrollToSection = (index: number) => {
    const allTriggers = ScrollTrigger.getAll();
    const mainTrigger = allTriggers.find(t => t.pin || (t.vars && t.vars.pin));
    
    if (!mainTrigger) {
      const targetSection = document.getElementById(navItems[index].id);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
        setActiveTab(navItems[index].id);
      }
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
        const allTriggers = ScrollTrigger.getAll();
        const main = allTriggers.find(t => t.pin || (t.vars && t.vars.pin));
        if (main) {
          isScrollingRef.current = false;
        }
      }
    });
  };

  return (
    <>
      <nav 
        className="fixed top-0 left-0 right-0 h-20 bg-neutral-950/60 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 md:px-12 pointer-events-auto"
        style={{ zIndex: 'var(--z-nav)' }}
      >
        {/* Logo */}
        <button 
          onClick={() => scrollToSection(0)}
          className="font-display font-bold text-xl md:text-2xl tracking-tighter uppercase"
        >
          <span className="bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-transparent">
            THE DOT
          </span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(idx)}
              className={cn(
                "text-sm font-sans tracking-wide uppercase transition-colors relative py-2",
                activeTab === item.id ? "text-white font-bold" : "text-neutral-400 hover:text-white"
              )}
            >
              {item.label}
              {activeTab === item.id && (
                <motion.div
                  layoutId="active-nav-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-t-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Right CTA */}
        <div className="hidden md:flex items-center">
          <button 
            onClick={() => scrollToSection(navItems.findIndex(i => i.id === 'contact'))}
            className="px-6 py-2.5 bg-white text-black font-sans font-bold text-xs tracking-widest uppercase rounded-full hover:bg-gray-200 transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          >
            Start a project
          </button>
        </div>

        {/* Hamburger Button (Mobile Only) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white cursor-pointer"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-x-0 top-20 bottom-0 bg-neutral-950 z-[150] pointer-events-auto flex flex-col items-center justify-start overflow-y-auto gap-8 p-12 pt-16 pb-24 safe-padding-bottom"
          >
            <div className="absolute inset-0 opacity-5 pointer-events-none noise-overlay" />
            {navItems.map((item, idx) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.05 }}
                onClick={() => {
                  scrollToSection(idx);
                  setIsMobileMenuOpen(false);
                }}
                className={cn(
                  "text-3xl font-display font-bold tracking-tighter uppercase transition-colors cursor-pointer",
                  activeTab === item.id ? "text-white" : "text-neutral-600 hover:text-white"
                )}
              >
                {item.label}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + navItems.length * 0.05 }}
              onClick={() => {
                scrollToSection(navItems.findIndex(i => i.id === 'contact'));
                setIsMobileMenuOpen(false);
              }}
              className="mt-4 px-8 py-4 bg-white text-black font-sans font-bold text-sm tracking-widest uppercase rounded-full cursor-pointer shrink-0"
            >
              Start a project
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
