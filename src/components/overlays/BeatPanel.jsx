import { motion } from 'framer-motion';
import { remap } from '../hero-city/cityConfig';
import SectionHeader from '../SectionHeader';
import TimelineStack from './TimelineCard';

// Shared layout for every list-style beat (Education, Experience, Projects, Research):
// header on top, card stack below, both fading/scaling together as one column.
// This is the single source of truth for beat-panel design language — header always
// stays visible above the stack, spacing and fade timing are identical across beats.
export default function BeatPanel({
  zoneProgress,
  active,
  label,
  title,
  subtitle,
  accent,
  accentColor,
  items,
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
      {/* Header — always sits above the card stack, never covered by it */}
      <motion.div style={{ opacity: contentOpacity, maxWidth: '700px', width: '100%', flexShrink: 0 }}>
        <SectionHeader label={label} title={title} subtitle={subtitle} accent={accent} />
      </motion.div>

      {/* Card stack — sized box the stack fills, positioned in normal flow below the header */}
      <motion.div
        style={{
          opacity: contentOpacity,
          width: '100%',
          maxWidth: '700px',
          height: 'clamp(360px, 48vh, 460px)',
          position: 'relative',
        }}
      >
        <TimelineStack items={items} zoneProgress={zoneProgress} accentColor={accentColor} />
      </motion.div>
    </motion.div>
  );
}
