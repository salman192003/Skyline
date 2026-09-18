import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroCityScene from './HeroCityScene';
import { JOURNEY_WAYPOINTS, remap } from './cityConfig';
import IntroductionOverlay from '../overlays/IntroductionOverlay';
import EducationOverlay from '../overlays/EducationOverlay';
import ExperienceOverlay from '../overlays/ExperienceOverlay';
import ProjectsOverlay from '../overlays/ProjectsOverlay';
import ResearchOverlay from '../overlays/ResearchOverlay';
import ContactOverlay from '../overlays/ContactOverlay';

gsap.registerPlugin(ScrollTrigger);

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
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=2600%',
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              progressRef.current = self.progress;
              setOverlayProgress(self.progress);
              // Determine active waypoint (0–5)
              const numWaypoints = JOURNEY_WAYPOINTS.length;
              const waypointIndex = Math.min(
                Math.floor(self.progress * (numWaypoints - 1)),
                numWaypoints - 1
              );
              setActiveWaypoint(waypointIndex);
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

        {/* Waypoint overlays */}
        <AnimatePresence>
          {OVERLAY_COMPONENTS.map((Component, i) => {
            const waypoint = JOURNEY_WAYPOINTS[i];
            // Compute zone progress (local 0–1 for this overlay)
            const numWaypoints = JOURNEY_WAYPOINTS.length - 1;
            const zoneStart = (i) / numWaypoints;
            const zoneEnd = (i + 1) / numWaypoints;
            const zoneProgress = remap(overlayProgress, zoneStart, zoneEnd, 0, 1);
            const isActive = activeWaypoint === i || (activeWaypoint === i + 1 && zoneProgress < 0.5);

            return (
              <Component
                key={waypoint.id}
                zoneProgress={zoneProgress}
                active={isActive}
                waypoint={waypoint}
              />
            );
          })}
        </AnimatePresence>

        {/* Skip to full resume link */}
        <motion.a
          href="#flat-resume"
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
            // Scroll to top so flat sections below are visible
            window.scrollTo({ top: window.innerHeight * 3, behavior: 'smooth' });
          }}
        >
          SKIP JOURNEY
        </motion.a>
      </section>
    </>
  );
}
