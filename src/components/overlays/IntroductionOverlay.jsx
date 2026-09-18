import { motion } from 'framer-motion';
import { remap } from '../hero-city/cityConfig';

export default function IntroductionOverlay({ zoneProgress, active }) {
  const fadeInStart = 0;
  const fadeInEnd = 0.3;
  const fadeOutStart = 0.7;
  const fadeOutEnd = 1;

  const opacity =
    zoneProgress < fadeInStart
      ? 0
      : zoneProgress < fadeInEnd
      ? remap(zoneProgress, fadeInStart, fadeInEnd, 0, 1)
      : zoneProgress < fadeOutStart
      ? 1
      : remap(zoneProgress, fadeOutStart, fadeOutEnd, 1, 0);

  const scale = remap(zoneProgress, 0, 0.3, 0.95, 1);

  return (
    <motion.div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        pointerEvents: active ? 'auto' : 'none',
        zIndex: 10,
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity, scale }}
      transition={{ duration: 0.4 }}
    >
      <div style={{ textAlign: 'center', maxWidth: '600px', padding: '0 32px' }}>
        <motion.div
          className="dot-matrix"
          style={{
            fontSize: '0.75rem',
            color: 'var(--primary)',
            marginBottom: '24px',
            letterSpacing: '0.15em',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          WELCOME TO THE JOURNEY
        </motion.div>

        <motion.h1
          className="font-headline"
          style={{
            fontSize: 'clamp(3rem, 8vw, 5rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: 'var(--on-surface)',
            marginBottom: '16px',
            lineHeight: 1.1,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          I'm <span style={{ color: 'var(--primary)' }}>Salman</span>
        </motion.h1>

        <motion.p
          className="dot-matrix"
          style={{
            fontSize: '0.8rem',
            color: 'var(--on-surface-dim)',
            marginTop: '24px',
            letterSpacing: '0.05em',
            lineHeight: 1.6,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Software engineer who builds scalable systems and breaks things for fun (in the best way).
          Scroll down to explore my journey.
        </motion.p>
      </div>
    </motion.div>
  );
}
