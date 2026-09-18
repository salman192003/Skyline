import { motion } from 'framer-motion';
import { remap } from '../hero-city/cityConfig';
import BeatCard from './BeatCard';

// Chronological, one-at-a-time card stack — for content that reads as a sequence
// (career history, research/teaching timeline). Active card front and center,
// up to 2 previous cards receding in depth behind it.
export default function TimelineStack({ items, zoneProgress, accentColor, depthOpacityBoost = 0 }) {
  const sliceSize = 1 / items.length;

  const activeIndex = Math.min(Math.floor(zoneProgress / sliceSize), items.length - 1);
  const activeCardStart = activeIndex * sliceSize;
  const activeCardEnd = (activeIndex + 1) * sliceSize;

  const fadeInEnd = activeCardStart + sliceSize * 0.15;
  const fadeOutStart = activeCardEnd - sliceSize * 0.15;

  let activeOpacity = 0;
  if (zoneProgress >= activeCardStart && zoneProgress <= fadeInEnd) {
    activeOpacity = remap(zoneProgress, activeCardStart, fadeInEnd, 0, 1);
  } else if (zoneProgress > fadeInEnd && zoneProgress < fadeOutStart) {
    activeOpacity = 1;
  } else if (zoneProgress >= fadeOutStart && zoneProgress <= activeCardEnd) {
    activeOpacity = remap(zoneProgress, fadeOutStart, activeCardEnd, 1, 0);
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: 'clamp(360px, 48vh, 460px)',
        perspective: '1200px',
      }}
    >
      {items.map((item, idx) => {
        const offsetFromActive = idx - activeIndex;
        if (offsetFromActive < 0 || offsetFromActive > 2) return null;

        const depthScale = Math.max(0.88, 1 - offsetFromActive * 0.05);
        const depthY = offsetFromActive * 16;
        const depthOpacity =
          offsetFromActive === 0
            ? activeOpacity
            : Math.min(1, 0.35 - offsetFromActive * 0.08 + depthOpacityBoost);

        return (
          <motion.div
            key={`stack-${idx}`}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              opacity: Math.max(0, depthOpacity),
              scale: depthScale,
              y: depthY,
              rotateX: offsetFromActive * 2 + 'deg',
              zIndex: 10 - offsetFromActive,
              pointerEvents: offsetFromActive === 0 ? 'auto' : 'none',
              boxShadow: `0 ${12 + offsetFromActive * 8}px ${40 + offsetFromActive * 20}px rgba(0,0,0,${0.2 + offsetFromActive * 0.1})`,
              borderRadius: 'var(--radius-lg, 16px)',
            }}
            transition={{ duration: 0 }}
          >
            <BeatCard item={item} accentColor={accentColor} />

            {offsetFromActive === 0 && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  right: '20px',
                  fontSize: '0.7rem',
                  color: 'var(--on-surface-dim)',
                  opacity: 0.5,
                  letterSpacing: '0.05em',
                }}
              >
                {activeIndex + 1} / {items.length}
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
