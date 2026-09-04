import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import EducationSection from './components/EducationSection';
import ResearchSection from './components/ResearchSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsContactSection from './components/SkillsContactSection';
import Footer from './components/Footer';
import ProgressBar from './components/ProgressBar';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [theme, setTheme] = useState('dark');
  const [isLoaded, setIsLoaded] = useState(false);
  const mainRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    // Boot sequence
    const timer = setTimeout(() => setIsLoaded(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    // Initialize GSAP scroll animations for all sections
    const ctx = gsap.context(() => {
      // Animate each section's cards
      document.querySelectorAll('.bento-card').forEach((card, i) => {
        gsap.from(card, {
          y: 20,
          opacity: 0,
          scale: 0.98,
          duration: 0.5,
          ease: 'power2.out', // Very subtle, gentle movement
          scrollTrigger: {
            trigger: card,
            start: 'top 85%', // Wait until slightly more into the viewport
            toggleActions: 'play none none none', // Play once on scroll down, do not reverse on scroll up
          },
        });
      });
    }, mainRef);

    return () => ctx.revert();
  }, [isLoaded]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      {/* Boot Screen */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ background: 'var(--surface-lowest)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="dot-matrix" style={{ color: 'var(--primary)', fontSize: '0.75rem', marginBottom: '16px' }}>
                SYSTEM BOOT SEQUENCE
              </div>
              <div className="font-headline" style={{ fontSize: '3rem', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--on-surface)' }}>
                SALMAN<span style={{ color: 'var(--primary)' }}>.</span>
              </div>
              <div className="dot-matrix" style={{ color: 'var(--on-surface-dim)', fontSize: '0.65rem', marginTop: '12px' }}>
                LOADING MODULES...
              </div>
              <motion.div
                style={{
                  width: '120px',
                  height: '2px',
                  background: 'var(--surface-container-high)',
                  margin: '20px auto 0',
                  borderRadius: '2px',
                  overflow: 'hidden',
                }}
              >
                <motion.div
                  style={{
                    height: '100%',
                    background: 'var(--primary)',
                    borderRadius: '2px',
                  }}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.7, ease: 'easeInOut' }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Bar */}
      <ProgressBar />

      {/* Navigation */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Main Content */}
      <main ref={mainRef} style={{ position: 'relative' }}>
        <HeroSection isLoaded={isLoaded} />
        
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
          <EducationSection />
          <ExperienceSection />
          <ProjectsSection />
          <ResearchSection />
          <SkillsContactSection />
        </div>

        <Footer />
      </main>
    </>
  );
}

export default App;
