import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const para1Ref = useRef<HTMLParagraphElement>(null);
  const para2Ref = useRef<HTMLParagraphElement>(null);
  const para3Ref = useRef<HTMLParagraphElement>(null);
  const para4Ref = useRef<HTMLParagraphElement>(null);
  const para5Ref = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current || !titleRef.current) return;

      const paragraphs = [para1Ref.current, para2Ref.current, para3Ref.current, para4Ref.current, para5Ref.current].filter(Boolean);
      const allEls = [titleRef.current, ...paragraphs];

      const mm = gsap.matchMedia();

      // ─── DESKTOP: Horizontal scroll-linked animation ───────────────────
      mm.add('(min-width: 768px)', () => {
        // Set ALL elements invisible immediately, before first paint
        gsap.set(allEls, { opacity: 0, y: 40 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: () => `+=${window.innerWidth * 0.5}`,
            end: () => `+=${window.innerWidth * 1.5}`,
            scrub: true,
            invalidateOnRefresh: true,
          }
        });

        tl.to(titleRef.current, {
          y: 0, opacity: 1,
          duration: 0.2, ease: 'power2.out',
        }, 0);

        tl.to(paragraphs, {
          y: 0, opacity: 1,
          stagger: 0.03,
          duration: 0.1,
          ease: 'power2.out',
        }, 0.1);

        tl.to({}, { duration: 0.3 }, 0.35);

        tl.to(allEls, {
          opacity: 0,
          y: -60,
          stagger: 0.02,
          duration: 0.25,
          ease: 'power2.in',
        }, 0.65);
      });

      // ─── MOBILE: Standard scroll-triggered reveal (no horizontal offsets) ─
      mm.add('(max-width: 767px)', () => {
        // Ensure content is visible first
        gsap.set(allEls, { opacity: 0, y: 30 });

        gsap.to(allEls, {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full md:w-screen min-h-[100dvh] h-auto md:h-screen py-20 md:py-0 flex items-center justify-center flex-shrink-0 bg-[#ede7de] px-6 md:px-32 border-l border-black/10 overflow-hidden"
      id="about"
    >
      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-4xl w-full flex flex-col items-center text-center z-10">
        {/* Title */}
        <h2
          ref={titleRef}
          className="text-[clamp(1.75rem,5vw,3.5rem)] font-serif font-bold mb-8 tracking-tight leading-tight text-black"
        >
          Where the world's best businesses begin.
        </h2>

        {/* Body Copy */}
        <div className="w-full flex justify-center">
          <div className="text-base md:text-lg text-black/80 font-sans leading-relaxed max-w-3xl font-medium text-left flex flex-col gap-5">
            <p ref={para1Ref}>
              Most agencies sell you safety. We build weapons.
            </p>
            <p ref={para2Ref}>
              The Indian design space is built on bloated templates and soft metrics. Founders bleed cash on aesthetics that do nothing for their bottom line. Beautiful is useless if it does not convert.
            </p>
            <p ref={para3Ref}>
              We defy the gravity of average. We refuse to build safe, forgettable digital products. We strip away the corporate fat and engineer brands that dominate markets.
            </p>
            <p ref={para4Ref}>
              We have armed over 100 founders with the exact digital infrastructure required to crush their competitors.
            </p>
            <p ref={para5Ref} className="font-bold text-black pt-2">
              If you want to blend in, hire an agency. If you want to take over, start here.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
