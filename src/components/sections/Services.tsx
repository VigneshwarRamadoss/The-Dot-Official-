import { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Smartphone, Globe, PenTool, Layout, Zap, Share2 } from 'lucide-react';
import gsap from 'gsap';
import ScrambleText from '../ScrambleText';
import craftBack from '../../craftworkbg.webp';

const services = [
  { icon: Smartphone, title: 'Mobile App Development', desc: 'Sleek, native performance for iOS and Android.' },
  { icon: Globe, title: 'Web Development', desc: 'Modern web experiences built with speed.' },
  { icon: PenTool, title: 'Product Design', desc: 'From ideation to high-fidelity prototyping.' },
  { icon: Layout, title: 'UI/UX Design', desc: 'Intuitive systems that users actually enjoy.' },
  { icon: Zap, title: 'Branding Strategy', desc: 'Defining the voice and soul of your product.' },
  { icon: Share2, title: 'Social Media', desc: 'Strategic content that builds community.' }
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const glow1Ref = useRef<HTMLDivElement>(null);
  const glow2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      // Normalize mouse coordinates from -0.5 to 0.5
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      // Animate background image (subtle translation for 3D feel)
      gsap.to(bgRef.current, {
        x: x * 30,
        y: y * 30,
        duration: 1.5,
        ease: 'power2.out',
        overwrite: 'auto'
      });

      // Animate glows in slightly different directions/speeds for depth
      gsap.to(glow1Ref.current, {
        x: -x * 50,
        y: -y * 50,
        duration: 2,
        ease: 'power2.out',
        overwrite: 'auto'
      });

      gsap.to(glow2Ref.current, {
        x: x * 40,
        y: -y * 40,
        duration: 2.2,
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
      className="relative w-full md:w-max md:min-w-[100vw] min-h-[100dvh] h-auto md:h-screen py-20 md:py-0 flex items-center px-5 md:px-32 flex-shrink-0 border-l border-white/5 overflow-hidden" 
      id="services"
    >
      {/* Services Background Image & Premium Overlay */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <div 
          ref={bgRef}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.28] mix-blend-lighten scale-[1.06]" 
          style={{ backgroundImage: `url(${craftBack})` }}
        />
        {/* Soft, deep ambient overlays to guarantee excellent text contrast and visual depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-neutral-950/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-transparent to-neutral-950" />
        
        {/* Colorful subtle glows to coordinate with the theme */}
        <div 
          ref={glow1Ref}
          className="absolute top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-[45vw] h-[45vw] min-w-[300px] min-h-[300px] bg-purple-500/10 rounded-full blur-[120px] animate-pulse" 
          style={{ animationDuration: '10s' }} 
        />
        <div 
          ref={glow2Ref}
          className="absolute bottom-1/4 left-1/3 -translate-x-1/2 translate-y-1/2 w-[40vw] h-[40vw] min-w-[280px] min-h-[280px] bg-indigo-500/10 rounded-full blur-[110px] animate-pulse" 
          style={{ animationDuration: '14s' }} 
        />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-20 items-start md:items-center w-full">
        <div className="w-full md:w-[35vw] flex-shrink-0">
          {/* Eyebrow label */}
          <span className="text-[10px] sm:text-xs md:text-sm font-sans tracking-[0.2em] text-neutral-500 uppercase mb-4 block">
            OUR CAPABILITIES
          </span>
          
          <h2 className="text-[clamp(2.875rem,7.5vw,5.75rem)] font-display font-bold tracking-tighter mb-8 uppercase leading-none">
            <ScrambleText text="OUR" duration={0.8} /> <br/>
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
              <ScrambleText text="CRAFT" delay={0.3} duration={1} />
            </span>
          </h2>
          <p className="text-lg md:text-xl text-neutral-400 leading-relaxed max-w-md">
            <ScrambleText 
              text="We don't just build, we craft digital weapons that define industries and convert visitors into believers." 
              delay={0.6} 
              duration={1.5} 
            />
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-row gap-4 md:gap-8 md:pr-10 w-full md:w-auto">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -15, scale: 1.01 }}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: idx * 0.07, duration: 0.5 }}
              className="w-full md:w-[350px] h-auto md:h-[450px] bg-white/[0.02] border border-white/[0.06] p-6 md:p-10 flex flex-col justify-between group relative overflow-hidden backdrop-blur-md rounded-[2rem] transition-all duration-500 shadow-[0_12px_40px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_50px_rgba(168,85,247,0.08)] hover:border-purple-500/30"
            >
              {/* Radial gradient hover accent glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:border-purple-500/30 group-hover:bg-purple-500/5 transition-all duration-500">
                    <service.icon className="w-8 h-8 text-purple-400 group-hover:text-indigo-400 transition-colors duration-300" />
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                    {service.title}
                  </h3>
                  <p className="text-neutral-400 leading-relaxed text-sm group-hover:text-neutral-300 transition-colors duration-300">
                    {service.desc}
                  </p>
                </div>
                
                <div className="pt-6">
                  {/* Premium animated bottom indicator bar */}
                  <div className="h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-700" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
