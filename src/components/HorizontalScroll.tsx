import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HorizontalScrollProps {
  children: React.ReactNode;
}

export const HorizontalScroll: React.FC<HorizontalScrollProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    if (!scrollRef.current || !containerRef.current) return;

    // FIX 2: Use matchMedia so the horizontal pin only applies on md+ screens
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      setIsMobile(false);
      // Desktop / Tablet landscape: horizontal scroll as-is
      const animation = gsap.to(scrollRef.current!, {
        x: () => -(scrollRef.current!.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current!,
          pin: true,
          scrub: 0.1,
          invalidateOnRefresh: true,
          start: 'top top',
          end: () => `+=${scrollRef.current!.scrollWidth - window.innerWidth}`,
        },
      });

      const resizeObserver = new ResizeObserver(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      });

      resizeObserver.observe(scrollRef.current!);

      return () => {
        resizeObserver.disconnect();
        animation.kill();
      };
    });

    mm.add("(max-width: 767px)", () => {
      // Mobile: stack sections vertically, no GSAP pin
      setIsMobile(true);
      return () => {
        // Cleanup: restore defaults when leaving this breakpoint
        setIsMobile(false);
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      <div 
        ref={scrollRef} 
        className={isMobile 
          ? "flex flex-col w-full h-auto items-stretch" 
          : "flex flex-nowrap h-screen w-max items-center"
        }
        style={{ willChange: isMobile ? 'auto' : 'transform' }}
      >
        {children}
      </div>
    </div>
  );
};
