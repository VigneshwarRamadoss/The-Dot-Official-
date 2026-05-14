import { motion } from 'motion/react';
import { Send, Instagram, Twitter, Mail, MapPin, Linkedin } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { cn } from '../../lib/utils';
import ScrambleText from '../ScrambleText';

const ThreadsIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12V13.5C21 14.8807 19.8807 16 18.5 16C17.1193 16 16 14.8807 16 13.5V8.5C16 8.22386 15.7761 8 15.5 8C15.2239 8 15 8.22386 15 8.5V13.19C14.54 13.68 13.9 14 13.17 14C11.8 14 10.69 12.88 10.69 11.5V11.19C10.69 9.81 11.8 8.69 13.17 8.69H14" />
  </svg>
);

const SERVICES = [
  "Website Development",
  "Mobile Application",
  "UI/UX Design",
  "Product Design",
  "Branding Strategy",
  "Social Media",
  "Other"
];

export default function Contact() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [selectedService, setSelectedService] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setErrorMessage('');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, service: selectedService })
      });

      const data = await response.json();

      if (response.ok) {
        if (data.mock) {
          setFormState('success');
          setErrorMessage('Live emails require setup: Add "EMAIL_PASS" in the Settings menu.');
        } else {
          setFormState('success');
          setFormData({ name: '', email: '', message: '' });
          setSelectedService('');
        }
      } else {
        setFormState('error');
        setErrorMessage(data.error || 'Failed to send message.');
      }
    } catch (error) {
      console.error(error);
      setFormState('error');
      setErrorMessage('Network error. Please try again.');
    }
  };

  return (
    <section className="relative w-screen h-screen flex items-center justify-center flex-shrink-0 bg-transparent px-6 md:px-32 border-l border-white/5" id="contact">
       {/* Background ambient glow */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-dot-purple/5 blur-[120px] rounded-full pointer-events-none" />

       <div className="max-w-6xl w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Left Side: Info */}
          <div className="flex flex-col justify-center">
            <div className="mb-12">
              <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-display font-bold tracking-tighter mb-4 leading-tight uppercase">
                  <ScrambleText text="LET'S" duration={0.8} /> <span className="text-white"><ScrambleText text="BUILD" delay={0.4} duration={0.8} /></span>
              </h2>
              <p className="text-gray-500 uppercase tracking-widest font-bold text-[10px]">
                <ScrambleText text="Experience the new standard of digital execution." delay={0.8} duration={1} />
              </p>
            </div>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.location.href = 'mailto:thedotco.official@gmail.com'}>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white group-hover:text-black transition-all">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] text-gray-500 uppercase tracking-widest font-bold mb-0.5">Email us</p>
                  <p className="text-base font-display">thedotco.official@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white group-hover:text-black transition-all">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] text-gray-500 uppercase tracking-widest font-bold mb-0.5">Our Location</p>
                  <p className="text-base font-display">Remote Anywhere</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              {[
                { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/the_dot._official?igsh=MTBucWo2MjY5YmUyZw==' },
                { icon: Twitter, label: 'Twitter', href: '#' },
                { icon: Linkedin, label: 'LinkedIn', href: '#' },
                { icon: ThreadsIcon, label: 'Threads', href: 'https://www.threads.net/@the_dot._official' }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  whileHover={{ y: -5 }}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/40 transition-colors"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="bg-neutral-900/40 backdrop-blur-xl border border-white/5 p-6 md:p-8 rounded-2xl">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input 
                  type="text" 
                  placeholder="NAME"
                  required
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-white/5 border border-white/10 p-3 rounded-lg w-full focus:outline-none focus:border-white transition-colors font-sans text-[10px] uppercase font-bold tracking-widest"
                />
                <input 
                  type="email" 
                  placeholder="EMAIL"
                  required
                  value={formData.email}
                  onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-white/5 border border-white/10 p-3 rounded-lg w-full focus:outline-none focus:border-white transition-colors font-sans text-[10px] uppercase font-bold tracking-widest"
                />
              </div>

              <div>
                <p className="text-[9px] text-gray-500 uppercase tracking-widest font-bold mb-2">QUICK TOPICS</p>
                <div className="flex flex-wrap gap-1.5">
                  {SERVICES.map(service => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => {
                        setSelectedService(service);
                        setFormData(prev => ({
                          ...prev,
                          message: prev.message ? `${prev.message}\nInterested in: ${service}` : `I'm interested in ${service}. `
                        }));
                      }}
                      className={cn(
                        "px-3 py-1.5 rounded-full border text-[8px] uppercase font-bold tracking-widest transition-all",
                        selectedService === service 
                          ? "bg-white text-black border-white"
                          : "bg-transparent text-gray-400 border-white/10 hover:border-white/30"
                      )}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>

              <textarea 
                rows={4}
                placeholder="YOUR MESSAGE..."
                required
                value={formData.message}
                onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                className="bg-white/5 border border-white/10 p-3 rounded-lg w-full focus:outline-none focus:border-white transition-colors font-sans text-[10px] uppercase font-bold tracking-widest resize-none"
              />
              
              <button 
                type="submit"
                disabled={formState === 'submitting'}
                className="w-full bg-white text-black py-3 rounded-lg font-sans font-bold text-[10px] tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-neutral-200 transition-all disabled:opacity-50"
              >
                {formState === 'idle' && (
                  <>
                    SEND MESSAGE <Send className="w-3 h-3" />
                  </>
                )}
                {formState === 'submitting' && 'SENDING...'}
                {formState === 'success' && (errorMessage ? 'SENT (DEMO)' : 'SENT SUCCESSFULLY!')}
                {formState === 'error' && (errorMessage || 'ERROR SENDING.')}
              </button>
              
              {(formState === 'error' || (formState === 'success' && errorMessage)) && (
                <p className={cn(
                  "text-[9px] uppercase font-bold tracking-widest text-center mt-2",
                  formState === 'error' ? "text-red-400" : "text-emerald-400"
                )}>
                  {errorMessage}
                </p>
              )}
            </form>
          </div>
       </div>
    </section>
  );
}
