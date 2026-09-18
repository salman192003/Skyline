import { motion } from 'framer-motion';
import { remap } from '../hero-city/cityConfig';
import BeatCard from './BeatCard';

// Side-by-side split — for a beat with just a couple of items where hiding one
// behind the other would waste the content rather than pace it (education +
// hobbies). Both cards visible together, entering from opposite sides.
export default function SplitPanel({ items, zoneProgress, accentColor }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: items.length > 1 ? 'repeat(auto-fit, minmax(280px, 1fr))' : '1fr',
        gap: '24px',
        width: '100%',
      }}
    >
      {items.map((item, idx) => {
        const cardDelayStart = 0.05 + idx * 0.1;
        const cardOpacity = remap(zoneProgress, cardDelayStart, cardDelayStart + 0.2, 0, 1);
        const direction = idx % 2 === 0 ? -1 : 1;
        const cardX = (1 - cardOpacity) * 30 * direction;

        return (
          <motion.div
            key={item.title}
            style={{
              opacity: cardOpacity,
              x: cardX,
              minHeight: '360px',
            }}
            transition={{ duration: 0 }}
          >
            <BeatCard item={item} accentColor={accentColor} />
          </motion.div>
        );
      })}
    </div>
  );
}
