import { useEffect } from 'react';
import { gsap } from 'gsap';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function useSmoothScroll() {
  useEffect(() => {
    // FIX 2: Lenis smooth scroll is only useful on desktop where horizontal
    // pin is active. On mobile, native scroll provides better UX (esp. iOS momentum).
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (isMobile) return;

    const lenis = new Lenis({
      duration: 1.5, // Increased from 1.2 to 1.5 for a more buttery, elegant flow
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Organic deceleration curve
      orientation: 'vertical', // We scroll vertically to drive horizontal movement
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.05, // Slightly boosted for premium responsive feedback
      touchMultiplier: 1.5,
      infinite: false,
    });

    // Sync Lenis scroll updates with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Official integration: Synchronize Lenis's RAF loop with GSAP's internal ticker.
    // This removes frame-rate mismatch micro-stuttering and guarantees perfect coordinate sync.
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);

    // Disable lagSmoothing to prevent horizontal layout offsets during micro frame drops
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);
}
