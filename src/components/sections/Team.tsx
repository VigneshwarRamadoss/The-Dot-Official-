import { motion } from 'motion/react';
import { Linkedin, Instagram, Github } from 'lucide-react';
import ScrambleText from '../ScrambleText';

const team = [
  {
    name: 'Chanakiya Kshatriya',
    role: 'Founder',
    img: 'photos/ck.jpeg',
    bio: 'Visionary artist focusing on digital architecture.'
  },
  {
    name: 'Vigneshwar',
    role: 'Co-Founder',
    img: 'photos/vicky.jpeg',
    bio: 'Problem solver with a passion for clean code.'
  },
  {
    name: 'Subash Chandra Bose',
    role: 'Co-Founder',
    img: 'photos/subash.png',
    bio: 'Crafting meaningful connections through design.'
  }
];

export default function Team() {
  return (
    <section className="relative min-w-[120vw] h-screen flex items-center justify-center flex-shrink-0 bg-transparent px-6 md:px-32 border-l border-white/5" id="team">
      <div className="max-w-7xl w-full">
        <h2 className="text-[clamp(2.5rem,8vw,6rem)] font-display font-bold mb-10 md:mb-16 tracking-tighter text-center uppercase">
            <ScrambleText text="MEET THE" duration={0.8} /> <span className="text-gradient-blue"><ScrambleText text="BRAINS" delay={0.4} duration={0.8} /></span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {team.map((member, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              className="group flex flex-col items-center"
            >
              <div className="relative w-64 h-64 mb-8">
                <div className="absolute inset-0 bg-dot-blue/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 opacity-0 group-hover:opacity-100" />
                <img 
                  src={member.img} 
                  alt={member.name}
                  className="w-full h-full object-cover rounded-full border-2 border-white/5 relative z-10 grayscale hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-2xl font-display font-bold mb-1">{member.name}</h3>
              <p className="text-dot-blue text-sm uppercase tracking-widest mb-4">{member.role}</p>
              <p className="text-gray-500 text-center mb-6 max-w-xs">{member.bio}</p>
              
              <div className="flex gap-4">
                <Linkedin className="w-5 h-5 text-gray-600 hover:text-white cursor-pointer transition-colors" />
                <Instagram className="w-5 h-5 text-gray-600 hover:text-white cursor-pointer transition-colors" />
                <Github className="w-5 h-5 text-gray-600 hover:text-white cursor-pointer transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
