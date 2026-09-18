import { motion, AnimatePresence } from 'framer-motion';
import BeatCard from './BeatCard';

// Chronological, one-at-a-time card view — for content that reads as a sequence
// (career history, research/teaching timeline). A stepper above shows where you
// are in the sequence; the active card itself swaps via AnimatePresence with a
// real, fixed-duration transition — so moving from one card to the next always
// has a deliberate delay/glide, never an instant snap, no matter how fast you scroll.
export default function TimelineStack({ items, zoneProgress, accentColor, solidCards = false, flat = false }) {
  if (flat) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {items.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: idx * 0.05, ease: 'easeOut' }}
          >
            <BeatCard item={item} accentColor={accentColor} solid={solidCards} />
          </motion.div>
        ))}
      </div>
    );
  }

  const sliceSize = 1 / items.length;
  const activeIndex = Math.min(Math.floor(zoneProgress / sliceSize), items.length - 1);
  const activeItem = items[activeIndex];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'clamp(390px, 52vh, 500px)', gap: '14px' }}>
      {/* Stepper: shows the whole sequence, current item highlighted */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', flexShrink: 0 }}>
        {items.map((item, idx) => {
          const isActive = idx === activeIndex;
          const isPast = idx < activeIndex;
          return (
            <motion.div
              key={`step-${idx}`}
              animate={{
                background: isActive ? accentColor : 'var(--surface-container-high)',
                opacity: isActive ? 1 : isPast ? 0.6 : 0.4,
              }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 12px',
                borderRadius: '999px',
                fontSize: '0.65rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                color: isActive ? 'var(--on-accent-light)' : 'var(--on-surface-dim)',
                whiteSpace: 'nowrap',
              }}
            >
              {item.title}
            </motion.div>
          );
        })}
      </div>

      {/* Active card — swaps with a real, time-based transition on every index change */}
      <div style={{ position: 'relative', width: '100%', flex: 1 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -28, scale: 0.96 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <BeatCard item={activeItem} accentColor={accentColor} solid={solidCards} />

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
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
