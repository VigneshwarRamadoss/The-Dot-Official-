import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useInView } from 'motion/react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  trigger?: boolean;
  once?: boolean; // M-1: add once prop
}

const CHARS = 'ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789!@#$%^&*()_+';

export default function ScrambleText({ text, className, delay = 0, duration = 1, trigger = true, once = true }: ScrambleTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  // M-1: Default once to true instead of false
  const isInView = useInView(containerRef, { once, amount: 0.2 });
  const [displayText, setDisplayText] = useState(text);
  
  // H-18: RAF ref to debounce React renders
  const rafRef = useRef<number>(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    if (!trigger || !isInView) {
      if (!isInView) {
        // Option: reset to initial state or just keep text? 
        // Let's keep it as is until it enters again
      }
      return;
    }

    // Initial scrambled state
    setDisplayText(
      text.split('').map(char => {
        if (char === ' ' || char === '\n') return char;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join('')
    );

    const obj = { progress: 0 };
    
    const animation = gsap.to(obj, {
      progress: 1,
      duration: duration,
      delay: delay,
      ease: 'none',
      onUpdate: () => {
        const revealCount = Math.floor(obj.progress * text.length);
        const scrambled = text.split('').map((char, i) => {
          if (i < revealCount) return char;
          if (char === ' ' || char === '\n') return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join('');
        
        // H-18: Batch React state updates using RAF instead of firing at 60fps
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
          if (mountedRef.current) setDisplayText(scrambled);
        });
      },
      onComplete: () => {
        cancelAnimationFrame(rafRef.current);
        if (mountedRef.current) setDisplayText(text);
      }
    });

    return () => {
      animation.kill();
    };
  }, [isInView, text, trigger, delay, duration]);

  return (
    <span 
      ref={containerRef} 
      className={className} 
      style={{ display: 'inline' }}
    >
      {displayText}
    </span>
  );
}
