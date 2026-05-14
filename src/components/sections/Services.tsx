import { motion } from 'motion/react';
import { Smartphone, Globe, PenTool, Layout, Zap, Share2 } from 'lucide-react';
import ScrambleText from '../ScrambleText';

const services = [
  { icon: Smartphone, title: 'Mobile App Development', desc: 'Sleek, native performance for iOS and Android.' },
  { icon: Globe, title: 'Web Development', desc: 'Modern web experiences built with speed.' },
  { icon: PenTool, title: 'Product Design', desc: 'From ideation to high-fidelity prototyping.' },
  { icon: Layout, title: 'UI/UX Design', desc: 'Intuitive systems that users actually enjoy.' },
  { icon: Zap, title: 'Branding Strategy', desc: 'Defining the voice and soul of your product.' },
  { icon: Share2, title: 'Social Media', desc: 'Strategic content that builds community.' }
];

export default function Services() {
  return (
    <section className="relative min-w-[240vw] h-screen flex items-center px-6 md:px-32 flex-shrink-0 border-l border-white/5" id="services">
      <div className="flex gap-20 md:gap-32 items-center">
        <div className="w-[80vw] md:w-[35vw] flex-shrink-0 px-4 md:px-0">
          <h2 className="text-[clamp(2.875rem,7.5vw,5.75rem)] font-display font-bold tracking-tighter mb-8 uppercase">
            <ScrambleText text="OUR" duration={0.8} /> <br/>
            <span className="text-gradient-blue">
              <ScrambleText text="CRAFT" delay={0.3} duration={1} />
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-500">
            <ScrambleText 
              text="We don't just build, we craft experiences that leave a mark." 
              delay={0.6} 
              duration={1.5} 
            />
          </p>
        </div>

        <div className="flex gap-6 md:gap-8 pr-20">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -20, scale: 1.02 }}
              className="w-[350px] h-[450px] bg-charcoal/50 border border-white/5 p-10 flex flex-col justify-between group relative overflow-hidden backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-dot-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <service.icon className="w-12 h-12 text-dot-blue mb-4 group-hover:scale-110 transition-transform" />
              <div>
                <h3 className="text-2xl font-display font-bold mb-4">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{service.desc}</p>
              </div>
              
              <div className="h-1 w-0 group-hover:w-full bg-dot-blue transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
