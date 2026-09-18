import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { BEAT_RANGES } from './hero-city/cityConfig';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'INTRO', beatId: 'intro' },
    { label: 'EDUCATION', beatId: 'education' },
    { label: 'EXPERIENCE', beatId: 'experience' },
    { label: 'PROJECTS', beatId: 'projects' },
    { label: 'RESEARCH', beatId: 'research' },
    { label: 'CONNECT', beatId: 'contact' },
  ];

  // Jump directly to a beat's stretch of the pinned city-journey scroll. Falls back
  // to a plain anchor scroll if the journey's ScrollTrigger isn't active (mobile /
  // reduced-motion, where beats render as a flat stack instead).
  const jumpToBeat = (beatId) => {
    const trigger = ScrollTrigger.getById('city-journey');
    const beat = BEAT_RANGES.find((b) => b.id === beatId);

    if (trigger && beat) {
      // Land just past the beat's start so it reads as active immediately.
      const targetProgress = Math.min(beat.startT + 0.03, beat.endT - 0.01);
      const targetY = trigger.start + (trigger.end - trigger.start) * targetProgress;
      gsap.to(window, { duration: 0.5, scrollTo: targetY, ease: 'power3.out', overwrite: 'auto' });
    } else {
      document.getElementById(beatId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      className={scrolled ? 'glass' : undefined}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '0 32px',
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled ? undefined : 'transparent',
        transition: 'background 0.4s ease, backdrop-filter 0.4s ease',
      }}
    >
      {/* Logo */}
      <a href="#" style={{ textDecoration: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'var(--primary)',
            animation: 'pulse-red 2s ease-in-out infinite',
          }} />
          <span className="font-headline" style={{
            fontSize: '1rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            color: 'var(--on-surface)',
            textTransform: 'uppercase',
          }}>
            SALMAN<span style={{ color: 'var(--primary)' }}>_</span>SYS
          </span>
        </div>
      </a>

      {/* Desktop Links */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '32px',
      }}
      className="desktop-nav"
      >
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={`#${link.beatId}`}
            className="font-headline"
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.12em',
              color: link.label === 'CONNECT' ? 'var(--primary)' : 'var(--on-surface-variant)',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
              textTransform: 'uppercase',
              fontWeight: 500,
              cursor: 'pointer',
            }}
            onClick={(e) => {
              e.preventDefault();
              jumpToBeat(link.beatId);
            }}
            onMouseEnter={(e) => e.target.style.color = 'var(--primary)'}
            onMouseLeave={(e) => {
              if (link.label !== 'CONNECT') {
                e.target.style.color = 'var(--on-surface-variant)';
              }
            }}
          >
            {link.label}
          </a>
        ))}

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="mode-toggle"
          style={{ width: '36px', height: '36px' }}
          aria-label="Toggle theme"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
            {theme === 'dark' ? 'light_mode' : 'dark_mode'}
          </span>
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          color: 'var(--on-surface)',
          cursor: 'pointer',
        }}
        aria-label="Toggle menu"
      >
        <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
          {menuOpen ? 'close' : 'menu'}
        </span>
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'absolute',
              top: '72px',
              left: 0,
              right: 0,
              background: 'var(--surface-low)',
              padding: '24px 32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              borderBottom: '1px solid var(--surface-container-high)',
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={`#${link.beatId}`}
                className="font-headline"
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(false);
                  jumpToBeat(link.beatId);
                }}
                style={{
                  fontSize: '0.85rem',
                  letterSpacing: '0.12em',
                  color: 'var(--on-surface-variant)',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                }}
              >
                {link.label}
              </a>
            ))}
            <button onClick={toggleTheme} className="mode-toggle" style={{ width: '36px', height: '36px', marginTop: '8px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                {theme === 'dark' ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </motion.nav>
  );
}
