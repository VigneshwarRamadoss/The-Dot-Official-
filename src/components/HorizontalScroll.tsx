import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HorizontalScrollProps {
  children: React.ReactNode;
}

export const HorizontalScroll: React.FC<HorizontalScrollProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!scrollRef.current || !containerRef.current) return;

      const animation = gsap.to(scrollRef.current, {
        x: () => -(scrollRef.current!.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
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

      resizeObserver.observe(scrollRef.current);

      return () => {
        resizeObserver.disconnect();
        animation.kill();
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      <div 
        ref={scrollRef} 
        className="flex flex-nowrap h-screen w-max items-center"
      >
        {children}
      </div>
    </div>
  );
};
