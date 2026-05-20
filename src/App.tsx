/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { HorizontalScroll } from './components/HorizontalScroll';
import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Services from './components/sections/Services';
import Portfolio from './components/sections/Portfolio';
import Team from './components/sections/Team';
import WhyUs from './components/sections/WhyUs';
import Contact from './components/sections/Contact';
import Cursor from './components/Cursor';
import Loader from './components/Loader';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  useSmoothScroll();

  useEffect(() => {
    // Dismiss loader once window fully loads, with a minimum display time for branding
    const minTime = 2500;
    const start = Date.now();
    const dismiss = () => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, minTime - elapsed);
      setTimeout(() => setIsLoading(false), remaining);
    };
    if (document.readyState === 'complete') {
      dismiss();
    } else {
      window.addEventListener('load', dismiss);
      return () => window.removeEventListener('load', dismiss);
    }
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Loader key="loader" />}
      </AnimatePresence>

      <div className="absolute top-0 z-[-2] h-full min-h-screen w-full overflow-hidden bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[999] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-lg focus:font-bold focus:text-sm">
        Skip to content
      </a>
      <main id="main-content" className="selection:bg-dot-blue selection:text-white relative">
        <Navbar />
        <Cursor />

        <HorizontalScroll>
          <Hero />
          <About />
          <Services />
          <Portfolio />
          <Team />
          <WhyUs />
          <Contact />
        </HorizontalScroll>
      </main>
    </>
  );
}

