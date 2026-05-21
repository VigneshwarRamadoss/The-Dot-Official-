import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import ScrambleText from '../ScrambleText';
import { ArrowRight } from 'lucide-react';
import heroBack from '../../herobackg.webp';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    if (!textRef.current) return;

    const mm = gsap.matchMedia();

    let splitInstance: SplitType | null = null;

    // Desktop only: character scatter animation on horizontal scroll
    mm.add('(min-width: 768px)', () => {
      splitInstance = new SplitType(textRef.current!, { types: 'words,chars' });
      const chars = splitInstance.chars;

      const ctx = gsap.context(() => {
        if (chars) {
          gsap.set(chars, { x: 0, y: 0, rotation: 0, opacity: 1 });

          gsap.to(chars, {
            x: () => (Math.random() - 0.5) * 500,
            y: () => (Math.random() - 0.5) * 500,
            rotation: () => (Math.random() - 0.5) * 720,
            opacity: 0,
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: () => `+=${window.innerWidth * 0.6}`,
              scrub: 0.1,
              invalidateOnRefresh: true,
            },
            stagger: { each: 0.01, from: 'random' },
            ease: 'power2.inOut',
          });
        }

        // Subtle parallax effect on background image
        const bgImg = containerRef.current?.querySelector('.hero-bg-img');
        if (bgImg) {
          gsap.to(bgImg, {
            xPercent: 12,
            scale: 1.06,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: () => `+=${window.innerWidth}`,
              scrub: true,
              invalidateOnRefresh: true,
            }
          });
        }
      }, containerRef);

      return () => {
        ctx.revert();
        splitInstance?.revert();
      };
    });

    // Mobile: no SplitType, no animation — text stays fully visible
    mm.add('(max-width: 767px)', () => {
      // ensure text is fully visible, no split
      if (textRef.current) {
        textRef.current.style.opacity = '1';
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full md:w-screen h-[100dvh] md:h-screen overflow-hidden flex-shrink-0 bg-transparent px-5 md:px-16 lg:px-24" id="hero">
      {/* Hero Background Image & Premium Overlay */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <div 
          className="hero-bg-img absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.38] mix-blend-lighten scale-[1.02]" 
          style={{ backgroundImage: `url(${heroBack})`, willChange: 'transform' }}
        />
        {/* Soft, deep ambient overlays to guarantee excellent text contrast and visual depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-neutral-950/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-transparent to-neutral-950" />
        
        {/* Colorful subtle glows */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[45vw] h-[45vw] min-w-[300px] min-h-[300px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/3 right-1/4 translate-x-1/2 translate-y-1/2 w-[50vw] h-[50vw] min-w-[350px] min-h-[350px] bg-indigo-500/10 rounded-full blur-[130px] animate-pulse" style={{ animationDuration: '12s' }} />
      </div>

      {/* Background Texture (Grid pattern on top of overlay but below text) */}
      <div className="absolute inset-0 bg-grid pointer-events-none z-1" />

      {/* H-23: Apply landscape:pt-14 landscape:pb-4 to prevent overflow on short landscape screens */}
      <div className="relative z-10 flex flex-col items-start justify-center h-full pt-20 pb-8 landscape:pt-14 landscape:pb-4">

        {/* Eyebrow Label */}
        <span className="text-[10px] sm:text-xs md:text-sm font-sans tracking-[0.2em] text-neutral-400 uppercase mb-4 md:mb-6 block">
          Web, App &amp; Identity Design
        </span>

        {/* Hero Headline — NO SplitType on mobile so words never break mid-word */}
        <h1
          ref={textRef}
          className="font-serif text-white mb-2 leading-[1.15]"
          // H-23: Adjust min clamp size for better landscape fit
          style={{ fontSize: 'clamp(1.5rem, 8vw, 5rem)' }}
        >
          Where the world's best businesses begin.
        </h1>


        {/* Subheading */}
        <div className="text-sm md:text-base lg:text-lg font-sans text-neutral-300 max-w-[480px] mb-8 md:mb-10 leading-relaxed">
          <ScrambleText text="We build brand identities, websites, and apps for founders who refuse to be average." duration={1.5} delay={0.5} />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-3 sm:gap-4 w-full sm:w-auto">
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center justify-center gap-2 px-7 py-3.5 sm:px-8 sm:py-4 bg-white text-black font-sans font-bold text-xs tracking-widest uppercase rounded-full hover:bg-gray-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all"
          >
            Start your project
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-7 py-3.5 sm:px-8 sm:py-4 border border-white/20 text-white font-sans font-bold text-xs tracking-widest uppercase rounded-full hover:bg-white/5 hover:border-white/40 transition-all"
          >
            Explore capabilities
          </button>
        </div>

      </div>
    </section>
  );
}
