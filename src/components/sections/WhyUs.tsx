import { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Target, Zap, Shield, Brain, Network } from 'lucide-react';
import gsap from 'gsap';
import ScrambleText from '../ScrambleText';
import whyUsBack from '../../whyusbg.png';

const values = [
  { icon: Zap, title: 'Fast Execution', desc: 'We ship products at lightning speed without compromising quality.', color: 'from-blue-500 to-cyan-400' },
  { icon: Target, title: 'Product Thinking', desc: 'Product-first approach that solves real business problems.', color: 'from-purple-500 to-pink-500' },
  { icon: Shield, title: 'Scalable Apps', desc: 'Architecting for millions of users from day one.', color: 'from-emerald-400 to-cyan-500' },
  { icon: Brain, title: 'First Principle Thinking', desc: 'We strip away assumptions and rebuild every solution from the ground up — no templates, no shortcuts.', color: 'from-amber-400 to-orange-500' },
  { icon: Network, title: 'System Thinking', desc: 'Every product decision is made with the whole ecosystem in mind — how pieces connect, scale, and compound over time.', color: 'from-rose-400 to-red-500' }
];

export default function WhyUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const glow1Ref = useRef<HTMLDivElement>(null);
  const glow2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      // Animate background image for interactive 3D perspective
      gsap.to(bgRef.current, {
        x: x * 35,
        y: y * 35,
        duration: 1.5,
        ease: 'power2.out',
        overwrite: 'auto'
      });

      // Animate glows in slightly different directions/speeds for depth
      gsap.to(glow1Ref.current, {
        x: -x * 60,
        y: -y * 60,
        duration: 2,
        ease: 'power2.out',
        overwrite: 'auto'
      });

      gsap.to(glow2Ref.current, {
        x: x * 50,
        y: -y * 50,
        duration: 2.5,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    };

    const handleMouseLeave = () => {
      gsap.to([bgRef.current, glow1Ref.current, glow2Ref.current], {
        x: 0,
        y: 0,
        duration: 1.8,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    };

    section.addEventListener('mousemove', handleMouseMove);
    section.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full md:w-max md:min-w-[100vw] min-h-[100dvh] h-auto md:h-screen py-20 md:py-0 flex flex-col md:flex-row items-center justify-center md:items-center px-6 md:px-32 flex-shrink-0 border-l border-white/5 overflow-hidden" 
      id="why"
    >
      {/* Background Image & Premium Overlay */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <div 
          ref={bgRef}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.25] mix-blend-lighten scale-[1.05]" 
          style={{ backgroundImage: `url(${whyUsBack})` }}
        />
        {/* Soft, deep ambient overlays to guarantee excellent text contrast and visual depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-neutral-950/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-transparent to-neutral-950" />
        
        {/* Colorful subtle glows */}
        <div 
          ref={glow1Ref}
          className="absolute top-1/2 left-[20%] w-[40vw] h-[40vw] min-w-[300px] min-h-[300px] bg-purple-500/10 rounded-full blur-[130px] -translate-y-1/2 animate-pulse" 
          style={{ animationDuration: '9s' }}
        />
        <div 
          ref={glow2Ref}
          className="absolute top-1/2 right-[20%] w-[30vw] h-[30vw] min-w-[280px] min-h-[280px] bg-blue-500/10 rounded-full blur-[120px] -translate-y-1/2 animate-pulse" 
          style={{ animationDuration: '13s' }}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-12 md:gap-40 items-start md:items-center relative z-10 w-full">
        {/* Left: Title block */}
        <div className="w-full md:w-[35vw] flex-shrink-0">
          <span className="text-[10px] sm:text-xs md:text-sm font-sans tracking-[0.2em] text-neutral-500 uppercase mb-4 block">
            OUR PHILOSOPHY
          </span>
          <h2 className="text-[clamp(3.5rem,10vw,8rem)] font-display font-bold tracking-tighter mb-6 leading-none uppercase">
            <ScrambleText text="WHY" duration={0.8} /> <br/>
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
              <ScrambleText text="US?" delay={0.3} duration={1} />
            </span>
          </h2>
          <div className="border-l-2 border-white/10 pl-6">
            <p className="text-base md:text-xl text-neutral-400 font-light tracking-wide leading-relaxed">
              <ScrambleText text="Because average is not in our vocabulary." delay={0.6} duration={1.2} />
            </p>
          </div>
        </div>

        {/* Right: Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-row gap-6 md:gap-12 md:pr-10 w-full md:w-auto mt-8 md:mt-0">
          {values.map((value, idx) => (
            <motion.div
              key={idx}
              className="w-full md:w-[360px] md:h-[380px] flex flex-col relative group cursor-pointer"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: idx * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -12 }}
            >
              {/* Glassmorphic Background with Hover state scaling */}
              <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-xl rounded-[2.5rem] border border-white/[0.05] group-hover:border-white/[0.15] transition-all duration-500 group-hover:bg-white/[0.04] shadow-[0_12px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_50px_rgba(168,85,247,0.06)]" />

              {/* Hover gradient overlay matching card colors */}
              <div className={`absolute inset-0 bg-gradient-to-tr ${value.color} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 rounded-[2.5rem]`} />

              {/* Top glow boundary line */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative p-6 md:p-8 h-full flex flex-col z-10 justify-between">
                <div className="flex justify-between items-start mb-6 md:mb-12">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center border border-white/[0.06] relative overflow-hidden group-hover:border-white/10 transition-colors duration-300">
                    <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />
                    <value.icon className="w-8 h-8 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className={`text-white/[0.03] group-hover:bg-gradient-to-br group-hover:${value.color} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500 text-6xl md:text-8xl font-display font-bold leading-none tracking-tighter -mt-2 md:-mt-4`}>
                    0{idx + 1}
                  </div>
                </div>

                <div className="mt-auto">
                  <h3 className="text-xl md:text-2xl font-display font-bold mb-3 md:mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                    {value.title}
                  </h3>
                  <p className="text-neutral-400 leading-relaxed text-sm group-hover:text-neutral-300 transition-colors duration-300">
                    {value.desc}
                  </p>
                </div>
              </div>

              {/* Bottom Custom Colored Accent Bar */}
              <div className={`absolute inset-x-8 bottom-0 h-[2px] bg-gradient-to-r ${value.color} w-0 group-hover:w-[calc(100%-4rem)] transition-all duration-700`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
