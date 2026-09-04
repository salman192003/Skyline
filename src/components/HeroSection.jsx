import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import HeroCityScene from './hero-city/HeroCityScene';
import { remap } from './hero-city/cityConfig';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection({ isLoaded }) {
  const sectionRef = useRef(null);
  const progressRef = useRef(0);
  const cutoverRef = useRef(null);
  const [overlayProgress, setOverlayProgress] = useState(0);

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
            end: '+=140%',
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              progressRef.current = self.progress;
              setOverlayProgress(self.progress);
            },
            // The pin -- and this section's own scroll position -- ends here, so a
            // fixed, independent layer picks up the cross-fade into whatever section
            // has now scrolled into view underneath, instead of a hard color cut.
            onLeave: () => {
              if (cutoverRef.current) {
                gsap.to(cutoverRef.current, { opacity: 0, duration: 1.1, ease: 'power2.out' });
              }
            },
            onEnterBack: () => {
              if (cutoverRef.current) {
                gsap.killTweensOf(cutoverRef.current);
                gsap.set(cutoverRef.current, { opacity: 1 });
              }
            },
          });
        } else {
          // Reduced motion / mobile: static mid-journey framing, no scroll-jacking,
          // no green cutover.
          progressRef.current = 0.5;
          setOverlayProgress(0);
        }
      }
    );

    return () => mm.revert();
  }, [isLoaded]);

  const indicatorOpacity = 1 - remap(overlayProgress, 0, 0.15, 0, 1);
  // Green flash as the camera converges into the portal window: a glow builds first,
  // then a solid fill takes over so the screen is fully green by the very end of the
  // scrub -- the moment the pin releases and the rest of the site takes over.
  const portalGlow = remap(overlayProgress, 0.75, 0.94, 0, 0.9);
  const portalSolid = remap(overlayProgress, 0.93, 1, 0, 1);

  return (
    <>
      <section
        ref={sectionRef}
        id="hero"
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

        {/* Green glow flash as the camera arrives at the portal window */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle, var(--hero-portal-green) 0%, transparent 70%)',
            opacity: portalGlow,
            pointerEvents: 'none',
          }}
        />

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: indicatorOpacity } : {}}
          transition={{ delay: 1.5, duration: 1 }}
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            opacity: indicatorOpacity,
            pointerEvents: 'none',
          }}
        >
          <span className="dot-matrix" style={{ fontSize: '0.55rem', color: 'var(--on-surface-dim)' }}>
            SCROLL TO EXPLORE
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '20px' }}>
              expand_more
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* Viewport-fixed cutover: stays put through the pin release (independent of the
          hero section's own scroll position), then eases out over the section that has
          scrolled into view beneath it -- a real cross-fade rather than a hard cut. */}
      <div
        ref={cutoverRef}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'var(--hero-portal-green)',
          opacity: portalSolid,
          pointerEvents: 'none',
          zIndex: 40,
        }}
      />
    </>
  );
}
