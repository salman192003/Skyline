import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import HeroCityScene from './HeroCityScene';
import { BEAT_RANGES, remap } from './cityConfig';
import IntroductionOverlay from '../overlays/IntroductionOverlay';
import EducationOverlay from '../overlays/EducationOverlay';
import ExperienceOverlay from '../overlays/ExperienceOverlay';
import ProjectsOverlay from '../overlays/ProjectsOverlay';
import ResearchOverlay from '../overlays/ResearchOverlay';
import ContactOverlay from '../overlays/ContactOverlay';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const OVERLAY_COMPONENTS = [
  IntroductionOverlay,
  EducationOverlay,
  ExperienceOverlay,
  ProjectsOverlay,
  ResearchOverlay,
  ContactOverlay,
];

const DESKTOP_QUERY = '(min-width: 768px) and (prefers-reduced-motion: no-preference)';

export default function CityJourney({ isLoaded }) {
  const sectionRef = useRef(null);
  const progressRef = useRef(0);
  const [overlayProgress, setOverlayProgress] = useState(0);
  const [activeWaypoint, setActiveWaypoint] = useState(0);

  // Desktop gets the full pinned 3D journey; mobile / reduced-motion gets a
  // flat stacked page instead — and skips the Three.js canvas entirely
  // (heavy on phones, and there's no pinned scroll to drive its camera on
  // this path anyway).
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.matchMedia(DESKTOP_QUERY).matches : true
  );

  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY);
    const onChange = () => setIsDesktop(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!isLoaded || !isDesktop || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        id: 'city-journey',
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=1800%',
        scrub: 0.4,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          progressRef.current = self.progress;
          setOverlayProgress(self.progress);
          const activeBeat = BEAT_RANGES.findIndex(
            (beat) => self.progress >= beat.startT && self.progress <= beat.endT
          );
          setActiveWaypoint(Math.max(0, activeBeat));
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoaded, isDesktop]);

  if (!isDesktop) {
    return (
      <div id="journey">
        {OVERLAY_COMPONENTS.map((Component, i) => (
          <Component key={BEAT_RANGES[i].id} flat />
        ))}
      </div>
    );
  }

  return (
    <>
      <section
        ref={sectionRef}
        id="journey"
        style={{
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* 3D City Scene */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <HeroCityScene progressRef={progressRef} />
        </div>

        {/* Beat overlays */}
        <AnimatePresence>
          {OVERLAY_COMPONENTS.map((Component, i) => {
            const beat = BEAT_RANGES[i];
            const zoneProgress = remap(overlayProgress, beat.startT, beat.endT, 0, 1);
            const isActive = activeWaypoint === i;

            return (
              <Component
                key={beat.id}
                zoneProgress={zoneProgress}
                active={isActive}
                beat={beat}
              />
            );
          })}
        </AnimatePresence>

        {/* Skip to end of journey (lands right after the pin releases, at the Footer) */}
        <motion.a
          href="#footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          whileHover={{ opacity: 1 }}
          style={{
            position: 'fixed',
            top: '80px',
            right: '32px',
            zIndex: 200,
            fontSize: '0.7rem',
            letterSpacing: '0.12em',
            color: 'var(--primary)',
            textDecoration: 'none',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}
          onClick={(e) => {
            e.preventDefault();
            const trigger = ScrollTrigger.getById('city-journey');
            if (trigger) {
              gsap.to(window, { duration: 0.6, scrollTo: trigger.end, ease: 'power3.out', overwrite: 'auto' });
            }
          }}
        >
          SKIP JOURNEY
        </motion.a>
      </section>
    </>
  );
}
