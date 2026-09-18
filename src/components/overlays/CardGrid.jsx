import { motion } from 'framer-motion';
import { remap } from '../hero-city/cityConfig';
import BeatCard from './BeatCard';

// Browsable grid — for content meant to be compared side-by-side rather than
// read in sequence (projects). All cards visible together, staggered entrance
// tied to zoneProgress so they still feel alive as you scroll into the beat.
export default function CardGrid({ items, zoneProgress, accentColor }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, minmax(240px, 1fr))`,
        gap: '20px',
        width: '100%',
      }}
    >
      {items.map((item, idx) => {
        // Staggered reveal: each card starts its fade a little after the previous one,
        // but all settle in well before the beat's own fade-out begins.
        const cardDelayStart = 0.05 + idx * 0.06;
        const cardOpacity = remap(zoneProgress, cardDelayStart, cardDelayStart + 0.15, 0, 1);
        const cardY = (1 - cardOpacity) * 24;

        return (
          <motion.div
            key={item.title}
            style={{
              opacity: cardOpacity,
              y: cardY,
              minHeight: '320px',
            }}
            transition={{ duration: 0 }}
          >
            <BeatCard item={item} accentColor={accentColor} compact />
          </motion.div>
        );
      })}
    </div>
  );
}
