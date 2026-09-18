import { motion } from 'framer-motion';
import { remap } from '../hero-city/cityConfig';
import BeatCard from './BeatCard';

// Chronological, one-at-a-time card stack — for content that reads as a sequence
// (career history, research/teaching timeline). Active card front and center,
// up to 2 previous cards receding in depth behind it. A stepper above shows
// where you are in the sequence, and the upcoming card visibly glides forward
// during the gap before it becomes active — a conveyor motion instead of a
// hard cut between cards.
export default function TimelineStack({ items, zoneProgress, accentColor, depthOpacityBoost = 0, solidCards = false }) {
  const sliceSize = 1 / items.length;

  // Continuous position through the whole stack (not just the active slice) —
  // lets us compute a smooth "how far into the gap are we" value for anticipation.
  const position = zoneProgress / sliceSize;
  const activeIndex = Math.min(Math.floor(position), items.length - 1);
  const frac = Math.min(1, Math.max(0, position - activeIndex));

  // Card cycle within its slice: fade in (0–15%) → hold (15–55%) → fade out
  // (55–68%) → gap (68–100%). During the gap the next card conveys forward
  // into position, so it's already gliding into place before its own slice
  // officially starts.
  const FADE_IN_END = 0.15;
  const FADE_OUT_START = 0.55;
  const FADE_OUT_END = 0.68;

  let activeOpacity = 0;
  if (frac <= FADE_IN_END) {
    activeOpacity = remap(frac, 0, FADE_IN_END, 0, 1);
  } else if (frac < FADE_OUT_START) {
    activeOpacity = 1;
  } else if (frac <= FADE_OUT_END) {
    activeOpacity = remap(frac, FADE_OUT_START, FADE_OUT_END, 1, 0);
  }

  // Anticipation: during the gap, upcoming cards creep forward by up to ~0.6
  // of a depth-step, so the transition into the next card feels like a
  // conveyor advancing rather than a sudden pop.
  const conveyor = frac > FADE_OUT_END ? remap(frac, FADE_OUT_END, 1, 0, 0.6) : 0;

  // A little settle-in motion for the active card itself, synced to its own fade.
  const activeSettleY = (1 - activeOpacity) * 14;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 'clamp(390px, 52vh, 500px)',
        gap: '14px',
      }}
    >
      {/* Stepper: shows the whole sequence, current item highlighted */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', flexShrink: 0 }}>
        {items.map((item, idx) => {
          const isActive = idx === activeIndex;
          const isPast = idx < activeIndex;
          return (
            <div
              key={`step-${idx}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 12px',
                borderRadius: '999px',
                fontSize: '0.65rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                background: isActive ? accentColor : 'var(--surface-container-high)',
                color: isActive ? 'var(--on-accent-light)' : 'var(--on-surface-dim)',
                opacity: isActive ? 1 : isPast ? 0.6 : 0.4,
                transition: 'background 0.3s ease, opacity 0.3s ease',
                whiteSpace: 'nowrap',
              }}
            >
              {item.title}
            </div>
          );
        })}
      </div>

      {/* Card stack */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          flex: 1,
          perspective: '1200px',
        }}
      >
        {items.map((item, idx) => {
          const rawOffset = idx - activeIndex;
          if (rawOffset < 0 || rawOffset > 2) return null;

          // Cards at offset >= 1 creep toward the front during the gap (conveyor).
          const effectiveOffset = rawOffset === 0 ? 0 : Math.max(0, rawOffset - conveyor);

          const depthScale = Math.max(0.88, 1 - effectiveOffset * 0.05);
          const depthY = rawOffset === 0 ? activeSettleY : effectiveOffset * 16;
          const depthOpacity =
            rawOffset === 0
              ? activeOpacity
              : Math.min(1, 0.4 - effectiveOffset * 0.08 + depthOpacityBoost);

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
                rotateX: effectiveOffset * 2 + 'deg',
                zIndex: 10 - Math.round(effectiveOffset * 10),
                pointerEvents: rawOffset === 0 ? 'auto' : 'none',
                boxShadow: `0 ${12 + effectiveOffset * 8}px ${40 + effectiveOffset * 20}px rgba(0,0,0,${0.2 + effectiveOffset * 0.1})`,
                borderRadius: 'var(--radius-lg, 16px)',
              }}
              transition={{ duration: 0 }}
            >
              <BeatCard item={item} accentColor={accentColor} solid={solidCards} />

              {rawOffset === 0 && (
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
    </div>
  );
}
