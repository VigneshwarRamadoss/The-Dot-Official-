import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { Linkedin, Instagram, Github, X, ChevronDown } from 'lucide-react';
import ScrambleText from '../ScrambleText';
import { hasHover } from '../../utils/pointerDevice';

const team = [
  {
    name: 'Chanakiya Kshatriya',
    role: 'Founder',
    img: 'photos/ck.jpeg',
    bio: "I don't just write code. I build things that hold up.",
    accent: 'from-purple-500 to-fuchsia-500',
    accentGlow: 'rgba(168,85,247,0.35)',
    hoverBorder: 'group-hover:border-purple-500/50',
    socials: [
      { label: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/chanakiya-kshatriya-476035267?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
      { label: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/chanakiyakshatriya?igsh=eDQ1eTJmbDB5OXM0' },
      { label: 'GitHub', icon: Github, href: 'https://github.com/ChanakiyaKshatriyaArivoli' }
    ],
    detailedBio: `I don't just write code. I build things that hold up.

Full-Stack Developer in React and Node.js — with a security mindset most developers don't develop until something breaks in production.

Most developers ship features. I ship decisions — architecture that scales, interfaces that convert, and code that doesn't collapse the moment someone tries to break it.

What you get:
→ Frontend built for speed and clarity — not just aesthetics
→ Backend with security built in from line one
→ A hacker's instinct on every product I touch

The result: Less technical debt. Fewer vulnerabilities. A codebase your future team will thank you for.

That's a rare combination. If you need it — let's talk.`
  },
  {
    name: 'Vigneshwar',
    role: 'Co-Founder',
    img: 'photos/vicky.jpeg',
    bio: "If your SaaS is leaking revenue at onboarding — I fix that.",
    accent: 'from-cyan-400 to-blue-500',
    accentGlow: 'rgba(34,211,238,0.35)',
    hoverBorder: 'group-hover:border-cyan-400/50',
    socials: [
      { label: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/vigneshwar-ramadoss-2b39b3267?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
      { label: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/thenameisvigneshwar?igsh=Z3JocHRiZGxqazZp' },
      { label: 'GitHub', icon: Github, href: 'https://github.com/VigneshwarRamadoss' }
    ],
    detailedBio: `If your SaaS is leaking revenue at onboarding or checkout — I fix that.

I'm a Full-Stack Developer & UI/UX Designer. I don't do general work. I don't build "websites."

I specialize in the two moments that make or break your business — when someone signs up, and when they pay.

Most SaaS founders don't realize they're losing 60-70% of users inside these two flows. Not because the product is bad. Because the experience is broken — bad copy, confusing UI, fragile architecture holding it all together with duct tape.

I come in, find exactly where you're bleeding, and rebuild it.

What you get:
→ One person who designs AND builds — no handoffs, no finger-pointing
→ Conversion-first thinking on every decision, not just pretty screens
→ Clean, scalable code your engineering team can actually inherit

The result: A tighter funnel. More activations. More revenue.

If your onboarding or checkout isn't converting the way it should — that's a fixable problem. Let's fix it.`,
  },
  {
    name: 'Subash Chandra Bose',
    role: 'Co-Founder',
    img: 'photos/subash.webp',
    bio: "Most designers make things look good. I make things work — and then make them look good.",
    accent: 'from-cyan-400 to-blue-500', // Co-Founder cyan
    accentGlow: 'rgba(34,211,238,0.35)',
    hoverBorder: 'group-hover:border-cyan-400/50',
    socials: [
      { label: 'LinkedIn', icon: Linkedin, href: '#' },
      { label: 'Instagram', icon: Instagram, href: '#' },
      { label: 'Portfolio', icon: Github, href: '#' }
    ],
    detailedBio: `Most designers make things look good.
I make things work — and then make them look good.

I'm a Brand Identity & Visual Designer. I don't decorate businesses. I build the visual language that makes people trust you before you say a word.

Most founders underestimate design until a competitor with half their product beats them on perception. A stronger logo. A cleaner layout. A brand that feels like it belongs in the room.

That's not luck. That's craft.

What you get:
→ A brand identity that communicates authority, not effort
→ Visual systems that scale — from business card to billboard
→ Design decisions rooted in strategy, not personal taste

The result: A business that looks like it has already won.

If your brand isn't doing the selling before you open your mouth — that's the problem I solve.`
  },
];

interface TeamCardProps {
  member: (typeof team)[0];
  idx: number;
  onClick?: () => void;
}

const TeamCard: React.FC<TeamCardProps> = ({ member, idx, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hasHover() || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    if (!hasHover()) return;
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: idx * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, amount: 0.3 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
      }}
      className="relative group cursor-pointer hover:-translate-y-[6px] transition-transform duration-500 ease-out"
      onClick={onClick}
    >
      {/* Ambient glow behind card */}
      <div
        className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl pointer-events-none"
        style={{ background: member.accentGlow }}
      />

      {/* Card */}
      <div className={`relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-2xl transition-colors duration-500 ${member.hoverBorder}`}>
        {/* Image section */}
        <div className="relative h-[280px] overflow-hidden">
          {/* Gradient overlay */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />

          {/* Accent line at top */}
          <div
            className={`absolute top-0 left-0 right-0 h-[2px] z-20 bg-gradient-to-r ${member.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
          />

          <motion.img
            src={member.img}
            alt={member.name}
            loading="lazy"
            decoding="async"
            width="400"
            height="400"
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            referrerPolicy="no-referrer"
          />

          {/* Role badge */}
          <motion.div
            className={`absolute bottom-4 left-4 z-20 px-3 py-1 rounded-full text-[11px] font-bold tracking-[0.1em] bg-gradient-to-r ${member.accent} text-white shadow-lg`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.15 + 0.3, duration: 0.5 }}
          >
            {member.role}
          </motion.div>
        </div>

        {/* Info section */}
        <div className="relative p-6 pt-5 pb-8 flex flex-col min-h-[140px]">
          {/* Name */}
          <h3 className="text-xl font-display font-bold tracking-tight text-white mb-2">
            {member.name}
          </h3>

          {/* Bio */}
          <p className="text-sm text-gray-500 group-hover:text-white transition-colors duration-300 leading-relaxed font-sans mb-4">
            {member.bio}
          </p>

          {/* View Profile */}
          <div className="mt-auto overflow-hidden">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="inline-block text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold"
            >
              View Profile →
            </motion.span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Team() {
  const [selectedMember, setSelectedMember] = useState<typeof team[0] | null>(null);
  const [showScrollCue, setShowScrollCue] = useState(true);
  const modalScrollRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (selectedMember) {
      document.body.style.overflow = 'hidden';
      setShowScrollCue(true);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedMember]);

  return (
    <section
      className="relative lg:w-screen w-full lg:h-screen h-auto flex flex-col lg:flex-row items-center justify-center flex-shrink-0 bg-transparent px-6 lg:px-32 border-l border-white/5 py-24 lg:py-0"
      id="team"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: '48px 48px',
      }} />

      <div className="max-w-7xl w-full relative z-10">
        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-bold mb-4"
          >
            THE PEOPLE WHO BUILD YOUR BEGINNING
          </motion.p>
          <h2 className="text-[42px] sm:text-[52px] md:text-[clamp(2.5rem,7vw,5.5rem)] font-display font-bold tracking-tighter uppercase leading-[1.1] md:leading-[0.9]">
            <ScrambleText text="MEET THE" duration={0.8} />{' '}
            <span className="inline-block bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              <ScrambleText text="BRAINS" delay={0.4} duration={0.8} />
            </span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent origin-center"
          />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {team.map((member, idx) => (
            <TeamCard key={idx} member={member} idx={idx} onClick={() => setSelectedMember(member)} />
          ))}
        </div>


      </div>

      {/* Modal Overlay */}
      {typeof document !== 'undefined' ? createPortal(
        <AnimatePresence>
          {selectedMember && selectedMember.detailedBio && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6"
            >
              {/* Backdrop */}
              <motion.div
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
                onClick={() => setSelectedMember(null)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              {/* Modal Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative w-full h-full md:h-[600px] md:max-h-[85vh] max-w-[780px] overflow-hidden md:rounded-2xl border border-white/10 bg-neutral-900 shadow-2xl flex flex-col md:flex-row z-10"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedMember(null)}
                  aria-label="Close modal"
                  className="absolute top-4 right-4 z-50 flex h-11 w-11 md:h-8 md:w-8 items-center justify-center rounded-full bg-black/50 text-white/70 backdrop-blur-md transition-colors hover:bg-black/80 hover:text-white safe-top-margin cursor-pointer"
                >
                  <X className="h-5.5 w-5.5 md:h-4 md:w-4" />
                </button>

                {/* Image Section */}
                <div className="relative h-[200px] md:h-full w-full md:w-[40%] shrink-0 overflow-hidden">
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-neutral-900 to-transparent md:bg-gradient-to-r" />
                  <img
                    src={selectedMember.img}
                    alt={selectedMember.name}
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="400"
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Content Section */}
                <div className="relative flex flex-col w-full md:w-[60%] h-[calc(100%-200px)] md:h-full overflow-hidden">
                  <div 
                    ref={modalScrollRef}
                    data-lenis-prevent
                    onScroll={(e) => {
                      if (e.currentTarget.scrollTop > 30) {
                        setShowScrollCue(false);
                      } else {
                        setShowScrollCue(true);
                      }
                    }}
                    className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 pb-24"
                  >
                    <h3 className="mb-2 text-3xl font-display font-bold tracking-tight text-white">
                      {selectedMember.name}
                    </h3>
                    <div
                      className={`inline-block mb-6 rounded-full bg-gradient-to-r ${selectedMember.accent} px-3 py-1 text-[11px] font-bold tracking-[0.1em] text-white shadow-lg`}
                    >
                      {selectedMember.role}
                    </div>
                    
                    <div className="prose prose-invert prose-sm md:prose-base whitespace-pre-wrap font-sans text-gray-300 leading-relaxed max-w-none">
                      {selectedMember.detailedBio}
                    </div>

                    {/* Social Links inside modal */}
                    <div className="mt-10 pt-6 border-t border-white/10">
                      <div className="flex flex-wrap gap-4">
                        {selectedMember.socials.map((social, sIdx) => (
                          <a
                            key={sIdx}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group/link"
                          >
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 group-hover/link:bg-white/10 transition-colors">
                              <social.icon className="w-4 h-4" />
                            </span>
                            <span className="font-medium tracking-wide">{social.label}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Scroll Indicator Gradient */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-neutral-900 to-transparent pointer-events-none" />

                  {/* Visual Scroll Cue */}
                  <AnimatePresence>
                    {showScrollCue && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: 10, x: '-50%' }}
                        whileHover={{ scale: 1.05, x: '-50%' }}
                        transition={{ duration: 0.3 }}
                        onClick={() => {
                          if (modalScrollRef.current) {
                            modalScrollRef.current.scrollTo({
                              top: 220,
                              behavior: 'smooth'
                            });
                          }
                        }}
                        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-auto cursor-pointer z-30 group"
                      >
                        <span className="text-[9px] uppercase tracking-[0.25em] font-sans font-extrabold bg-purple-600/90 text-white px-3 py-1 rounded-full border border-purple-400/20 backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.4)] group-hover:bg-purple-500 transition-colors">
                          Scroll to read
                        </span>
                        <motion.div
                          animate={{ y: [0, 4, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                          className="flex items-center justify-center mt-1"
                        >
                          <ChevronDown size={14} className="text-purple-400" />
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      ) : null}
    </section>
  );
}
