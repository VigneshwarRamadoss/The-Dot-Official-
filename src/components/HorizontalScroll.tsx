import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface HorizontalScrollProps {
  children: React.ReactNode;
  // H-6: Accept external ref so Navbar can access the container via context
  scrollRef?: React.RefObject<HTMLDivElement | null>;
}

export const HorizontalScroll: React.FC<HorizontalScrollProps> = ({ children, scrollRef }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const internalScrollRef = useRef<HTMLDivElement>(null);

  // H-4: Initialize isMobile with SSR-safe media query check to prevent flash
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(max-width: 767px)').matches;
  });

  // Sync external scrollRef with internal ref
  const actualScrollRef = scrollRef || internalScrollRef;

  useLayoutEffect(() => {
    if (!actualScrollRef.current || !containerRef.current) return;

    // FIX 2: Use matchMedia so the horizontal pin only applies on md+ screens
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      setIsMobile(false);
      // Desktop / Tablet landscape: horizontal scroll as-is
      const animation = gsap.to(actualScrollRef.current!, {
        x: () => -(actualScrollRef.current!.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current!,
          pin: true,
          scrub: 0.1,
          invalidateOnRefresh: true,
          start: 'top top',
          end: () => `+=${actualScrollRef.current!.scrollWidth - window.innerWidth}`,
        },
      });

      const resizeObserver = new ResizeObserver(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      });

      resizeObserver.observe(actualScrollRef.current!);

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
  }, [actualScrollRef]);

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      <div 
        ref={actualScrollRef} 
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
