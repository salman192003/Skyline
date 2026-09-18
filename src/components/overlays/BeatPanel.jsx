import { motion } from 'framer-motion';
import { remap } from '../hero-city/cityConfig';
import SectionHeader from '../SectionHeader';

// Shared wrapper for every beat: header always fades/positions the same way,
// but the body underneath is passed in as children — each beat picks whatever
// layout actually suits its content (stack, grid, split, custom), while still
// inheriting identical header treatment, fade timing, and positioning rhythm.
export default function BeatPanel({
  zoneProgress,
  active,
  label,
  title,
  subtitle,
  accent,
  bodyMaxWidth = '700px',
  children,
  flat = false,
  id,
}) {
  if (flat) {
    return (
      <section id={id} style={{ padding: '80px 24px', maxWidth: bodyMaxWidth, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <SectionHeader label={label} title={title} subtitle={subtitle} accent={accent} />
        </motion.div>

        <motion.div
          style={{ marginTop: '32px', position: 'relative' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        >
          {typeof children === 'function' ? children(1) : children}
        </motion.div>
      </section>
    );
  }

  const fadeInStart = 0;
  const fadeInEnd = 0.15;
  const fadeOutStart = 0.8;
  const fadeOutEnd = 1;

  const opacity =
    zoneProgress < fadeInStart
      ? 0
      : zoneProgress < fadeInEnd
      ? remap(zoneProgress, fadeInStart, fadeInEnd, 0, 1)
      : zoneProgress < fadeOutStart
      ? 1
      : remap(zoneProgress, fadeOutStart, fadeOutEnd, 1, 0);

  const contentOpacity = remap(zoneProgress, 0.05, 0.25, 0, 1);

  return (
    <motion.div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'clamp(20px, 4vh, 36px)',
        opacity,
        pointerEvents: active ? 'auto' : 'none',
        zIndex: 10,
        padding: '96px 32px 32px',
      }}
    >
      {/* Header — always sits above the body, never covered by it */}
      <motion.div style={{ opacity: contentOpacity, maxWidth: '700px', width: '100%', flexShrink: 0 }}>
        <SectionHeader label={label} title={title} subtitle={subtitle} accent={accent} />
      </motion.div>

      {/* Body — layout varies per beat (stack / grid / split), sizing varies too */}
      <motion.div
        style={{
          opacity: contentOpacity,
          width: '100%',
          maxWidth: bodyMaxWidth,
          position: 'relative',
        }}
      >
        {typeof children === 'function' ? children(contentOpacity) : children}
      </motion.div>
    </motion.div>
  );
}
