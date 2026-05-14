import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useInView } from 'motion/react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  trigger?: boolean;
}

const CHARS = 'ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789!@#$%^&*()_+';

export default function ScrambleText({ text, className, delay = 0, duration = 1, trigger = true }: ScrambleTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const [displayText, setDisplayText] = useState(text);

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
        setDisplayText(scrambled);
      },
      onComplete: () => {
        setDisplayText(text);
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
      style={{ display: 'inline-block' }}
    >
      {displayText}
    </span>
  );
}
