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

export default function CityJourney({ isLoaded }) {
  const sectionRef = useRef(null);
  const progressRef = useRef(0);
  const [overlayProgress, setOverlayProgress] = useState(0);
  const [activeWaypoint, setActiveWaypoint] = useState(0);

  useEffect(() => {
    if (!isLoaded || !sectionRef.current) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
        isReduced: '(prefers-reduced-motion: reduce)',
        isMobile: '(max-width: 767px)',
      },
      (context) => {
        const { isDesktop } = context.conditions;

        if (isDesktop) {
          ScrollTrigger.create({
            id: 'city-journey',
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=1800%', // Shorter: faster paced journey
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              progressRef.current = self.progress;
              setOverlayProgress(self.progress);
              // Determine active beat (0–5) based on which BEAT_RANGES slice we're in
              const activeBeat = BEAT_RANGES.findIndex(
                (beat) => self.progress >= beat.startT && self.progress <= beat.endT
              );
              setActiveWaypoint(Math.max(0, activeBeat));
            },
          });
        } else {
          // Mobile / reduced motion: no pin, fall back to flat stack
          // Return to default scroll behavior (handled by flat sections in App)
        }
      }
    );

    return () => mm.revert();
  }, [isLoaded]);

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
            // Compute zone progress (local 0–1 for this beat)
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
              gsap.to(window, { duration: 1.2, scrollTo: trigger.end, ease: 'power2.inOut' });
            }
          }}
        >
          SKIP JOURNEY
        </motion.a>
      </section>
    </>
  );
}
