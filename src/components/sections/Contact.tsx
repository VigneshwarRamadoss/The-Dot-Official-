import React from 'react';
import { motion } from 'motion/react';
import { Mail, Instagram, Twitter, Linkedin, Copy, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import ScrambleText from '../ScrambleText';
import contactBack from '../../contact_back.webp';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText('thedotco.official@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative w-full md:w-screen min-h-[100dvh] flex flex-col justify-center flex-shrink-0 bg-transparent overflow-hidden" id="contact">
       {/* Ambient contact background image */}
       <div 
         className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-20 select-none" 
         style={{ backgroundImage: `url(${contactBack})` }}
       />

       {/* Depth gradients to guarantee exceptional text readability */}
       <div className="absolute inset-0 z-0 bg-gradient-to-t from-neutral-950 via-neutral-950/65 to-neutral-950/80 pointer-events-none" />
       
       {/* Background ambient glow overlaying image */}
       <div className="absolute top-1/2 left-[20%] -translate-x-1/2 -translate-y-1/2 w-[45vw] h-[45vw] bg-purple-500/10 blur-[130px] rounded-full pointer-events-none" />
       <div className="absolute bottom-0 right-[15%] w-[35vw] h-[35vw] bg-blue-500/10 blur-[110px] rounded-full pointer-events-none" />

       <div className="flex-1 flex items-center px-6 md:px-24 py-16 lg:py-0 border-l border-white/5 relative z-10 w-full">
         <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center justify-between">
            
            {/* Left Column: Huge typography and availability details */}
            <div className="lg:col-span-6 flex flex-col text-left items-start">
               <div className="mb-4 flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse shadow-[0_0_8px_#a855f7]" />
                 <span className="text-[10px] text-purple-400 font-mono tracking-widest uppercase font-semibold">GET IN TOUCH</span>
               </div>
               
               <h2 className="text-[44px] md:text-[clamp(3.5rem,6vw,5.5rem)] font-display font-bold tracking-tighter mb-6 leading-[1.05] uppercase">
                   <span className="text-white drop-shadow-lg block">
                       <ScrambleText text="LET'S" duration={0.8} />
                   </span>
                   <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-200 to-white drop-shadow-lg block">
                       <ScrambleText text="BUILD" delay={0.4} duration={0.8} />
                   </span>
               </h2>
               
               <p className="text-gray-400 font-sans text-sm md:text-base leading-relaxed max-w-md">
                 Tell us what you're building. <span className="text-white font-medium">We'll show you how we make it extraordinary.</span> Let's collaborate to engineer an experience that leaves a lasting impression.
               </p>

               {/* Availability Badges */}
               <div className="flex flex-wrap gap-3 mt-8">
                 <div className="px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono flex items-center gap-2">
                   <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                   Available for select projects
                 </div>
                 <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 text-[11px] font-mono">
                   Collaborating globally
                 </div>
               </div>
            </div>

            {/* Right Column: Premium Glassmorphic Card dashboard */}
            <div className="lg:col-span-6 w-full">
              <div className="w-full bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-[2rem] p-6 md:p-8 shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
                
                {/* Interactive Email Card */}
                <div className="mb-6">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-3">Primary Channel</p>
                  <motion.div 
                    className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-purple-500/40 hover:bg-white/[0.06] transition-all cursor-pointer group relative overflow-hidden"
                    whileHover={{ y: -3 }}
                    onClick={() => window.location.href = 'mailto:thedotco.official@gmail.com'}
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-300">
                      <Mail className="w-5 h-5 text-purple-300 group-hover:text-white" />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-[11px] text-gray-500 uppercase tracking-widest font-bold mb-0.5">Email us</p>
                      <p className="text-[12px] md:text-[13px] font-display text-gray-300 group-hover:text-white transition-colors truncate">
                        thedotco.official@gmail.com
                      </p>
                    </div>
                    <button 
                      onClick={handleCopyEmail}
                      className="p-3 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors relative z-10 min-w-[44px] min-h-[44px] flex items-center justify-center"
                      aria-label="Copy email address"
                    >
                      {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-gray-500 group-hover:text-white" />}
                    </button>
                  </motion.div>
                </div>

                {/* Social Channels Row */}
                <div className="mb-6">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-3">Direct Platforms</p>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { icon: Instagram, label: 'Instagram', name: '@the_dot._official', href: 'https://www.instagram.com/the_dot._official?igsh=MTBjZDdyODRmcWpzcw==' },
                      { icon: Twitter, label: 'X (Twitter)', name: '@thedot_official', href: 'https://x.com/thedot_official' },
                      { icon: Linkedin, label: 'LinkedIn', name: 'The Dot', href: 'https://www.linkedin.com/company/the-dotco/' }
                    ].map((social, i) => (
                      <motion.a
                        key={i}
                        whileHover={{ y: -4, backgroundColor: 'rgba(255, 255, 255, 0.04)', borderColor: 'rgba(168, 85, 247, 0.3)' }}
                        whileTap={{ scale: 0.98 }}
                        className="flex flex-col items-center text-center p-3 rounded-xl border border-white/[0.04] bg-white/[0.01] transition-all duration-300 group"
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                      >
                        <social.icon className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors mb-2" />
                        <span className="text-[10px] text-gray-200 font-semibold leading-none">{social.label}</span>
                        <span className="text-[8px] text-gray-500 mt-1 truncate max-w-full w-full">{social.name}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Core Philosophy Quote */}
                <div className="pt-5 border-t border-white/[0.05] text-left">
                  <p className="text-[10px] text-gray-500 leading-relaxed italic font-serif">
                    "Design is not just what it looks like and feels like. Design is how it works. Let's make it work beautifully."
                  </p>
                </div>
              </div>
            </div>

         </div>
       </div>

       {/* Footer Micro-strip */}
       <div className="w-full border-t border-white/5 bg-neutral-950/50 backdrop-blur-md py-4 px-6 relative z-10 mt-auto">
         <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-gray-500 font-sans tracking-wide">
           <p>© 2025 The Dot. All rights reserved.</p>
           <div className="flex items-center gap-4">
             <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
             <span>·</span>
             <a href="mailto:thedotco.official@gmail.com" className="hover:text-white transition-colors">thedotco.official@gmail.com</a>
           </div>
         </div>
       </div>
    </section>
  );
}
