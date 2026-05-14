import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

import ScrambleText from '../ScrambleText';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    if (!textRef.current || !titleRef.current) return;
    
    // 1. Split text into lines
    const split = new SplitType(textRef.current, { types: 'lines' });
    
    const ctx = gsap.context(() => {
      if (!textRef.current || !titleRef.current || !containerRef.current) return;
      
      // 2. Wrap each line for masking
      split.lines?.forEach(line => {
        const wrapper = document.createElement('div');
        wrapper.className = 'about-line-mask';
        wrapper.style.overflow = 'hidden';
        wrapper.style.display = 'block';
        line.parentNode?.insertBefore(wrapper, line);
        wrapper.appendChild(line);
      });

      // 3. Create the timeline
      // About is the 2nd section (at index 1, so offset 100vw)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: () => `+=${window.innerWidth * 0.5}`, 
          end: () => `+=${window.innerWidth * 1.5}`,
          scrub: 0.3, // Smoother connection to scroll
          invalidateOnRefresh: true,
        }
      });

      // Set initial states
      gsap.set([titleRef.current, split.lines], { opacity: 0, y: 80 });

      // Phase 1: Reveal (0.0 to 0.45 progress)
      // Designed to be fully complete by the time it hits dead center (0.5 progress)
      tl.to(titleRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "expo.out"
      }, 0);

      tl.to(split.lines, {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.3,
        ease: "expo.out"
      }, 0.1);

      // Phase 2: Visibility Hold (0.45 to 0.6 progress)
      // Provides a stable window while the user is looking at the center
      tl.to({}, { duration: 0.15 }); 

      // Phase 3: Exit/Fade (0.6 onwards)
      // Smoothly fades out as it starts to leave the center area
      tl.to([titleRef.current, ...split.lines], {
        opacity: 0,
        y: -100,
        stagger: 0.02,
        duration: 0.4,
        ease: "power2.inOut"
      }, 0.6);

    }, containerRef);

    return () => {
      ctx.revert();
      split.revert();
      // Manual cleanup for our custom masks
      document.querySelectorAll('.about-line-mask').forEach(el => {
        const parent = el.parentNode;
        if (parent) {
          while (el.firstChild) parent.insertBefore(el.firstChild, el);
          parent.removeChild(el);
        }
      });
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-screen h-screen flex items-center justify-center flex-shrink-0 bg-[#ede7de] px-6 md:px-32 border-l border-black/10 overflow-hidden" id="about">
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-4xl w-full flex flex-col items-center text-center z-10">
        <h2 ref={titleRef} className="text-[clamp(2.5rem,8vw,5rem)] font-display font-bold mb-8 tracking-tight leading-tight uppercase text-black">
          <ScrambleText text="WE ARE THE" duration={0.8} /> <br/>
          <span className="text-dot-purple">
            <ScrambleText text="NEW STANDARD" delay={0.4} duration={1} />
          </span>
        </h2>
        <div className="overflow-hidden">
          <p ref={textRef} className="text-xl md:text-2xl text-black/70 font-sans leading-relaxed max-w-3xl uppercase font-medium">
            The Dot is a modern digital product studio focused on high-performance execution. 
            We bridge the gap between creative vision and technical excellence. 
            Innovation is not just a goal; it's our core architecture.
          </p>
        </div>
      </div>
    </section>
  );
}
