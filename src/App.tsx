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
import SnakeGame from './components/sections/SnakeGame';
import Cursor from './components/Cursor';
import Loader from './components/Loader';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  useSmoothScroll();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Loader key="loader" />}
      </AnimatePresence>

      <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <main className="selection:bg-dot-blue selection:text-white relative">
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
          <SnakeGame />
        </HorizontalScroll>
      </main>
    </>
  );
}

