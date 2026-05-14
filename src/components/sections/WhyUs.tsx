import { motion } from 'motion/react';
import { Target, Zap, Shield, Cpu, Gauge } from 'lucide-react';
import ScrambleText from '../ScrambleText';

const values = [
  { icon: Zap, title: 'Fast Execution', desc: 'We ship products at lightning speed without compromising quality.' },
  { icon: Target, title: 'Modern Thinking', desc: 'Product-first approach that solves real business problems.' },
  { icon: Shield, title: 'Scalable Apps', desc: 'Architecting for millions of users from day one.' },
  { icon: Cpu, title: 'Creative Engineering', desc: 'Where design meets complex technical possibilities.' },
  { icon: Gauge, title: 'High Performance', desc: 'Every millisecond counts. We optimize for pure speed.' }
];

export default function WhyUs() {
  return (
    <section className="relative min-w-[200vw] h-screen flex items-center px-6 md:px-32 flex-shrink-0 border-l border-white/5" id="why">
      <div className="flex gap-20 md:gap-40 items-center">
        <div className="w-[80vw] md:w-[35vw] flex-shrink-0 px-4 md:px-0">
            <h2 className="text-[clamp(3.5rem,10vw,8rem)] font-display font-bold tracking-tighter mb-8 leading-none uppercase">
                <ScrambleText text="WHY" duration={0.8} /> <br/>
                <span className="text-gradient-blue">
                  <ScrambleText text="US?" delay={0.3} duration={1} />
                </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-500">
                <ScrambleText text="Because average is not in our vocabulary." delay={0.6} duration={1.2} />
            </p>
        </div>

        <div className="flex gap-6 md:gap-8 pr-20">
            {values.map((value, idx) => (
                <div key={idx} className="w-[300px] flex flex-col gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-charcoal flex items-center justify-center border border-white/5">
                        <value.icon className="w-8 h-8 text-purple-400" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-display font-bold mb-4">{value.title}</h3>
                        <p className="text-gray-400 leading-relaxed text-sm">{value.desc}</p>
                    </div>
                    <div className="text-purple-500/20 text-6xl font-display font-bold">
                        0{idx + 1}
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
