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
}) {
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

      {/* Body — layout varies per beat (stack / grid / split / list), sizing varies too.
          maxHeight + overflow is a safety net for taller content (e.g. a full vertical
          timeline) so it never gets clipped by the fixed-position wrapper. */}
      <motion.div
        style={{
          opacity: contentOpacity,
          width: '100%',
          maxWidth: bodyMaxWidth,
          maxHeight: 'calc(100vh - 260px)',
          overflowY: 'auto',
          position: 'relative',
        }}
      >
        {typeof children === 'function' ? children(contentOpacity) : children}
      </motion.div>
    </motion.div>
  );
}
