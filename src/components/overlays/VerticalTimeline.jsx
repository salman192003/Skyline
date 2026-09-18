import { motion } from 'framer-motion';
import { remap } from '../hero-city/cityConfig';

// A real vertical timeline — every entry visible at once, connected by a rail
// with a dot per item, each one revealing (fade + slide up) as you scroll
// through the beat. No carousel, no depth-stacking, no hiding content behind
// the active card — the whole history reads top to bottom, like a resume.
export default function VerticalTimeline({ items, zoneProgress, accentColor }) {
  const revealSpan = 0.85 / items.length;

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {items.map((item, idx) => {
        const revealStart = 0.05 + idx * revealSpan;
        const revealEnd = revealStart + revealSpan * 0.7;
        const opacity = remap(zoneProgress, revealStart, revealEnd, 0, 1);
        const y = (1 - opacity) * 18;

        return (
          <motion.div
            key={item.title}
            style={{
              opacity,
              y,
              display: 'flex',
              gap: 'clamp(14px, 3vw, 22px)',
            }}
            transition={{ duration: 0 }}
          >
            {/* Rail: dot + connecting line */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flexShrink: 0,
                width: '14px',
                paddingTop: '5px',
              }}
            >
              <div
                style={{
                  width: '11px',
                  height: '11px',
                  borderRadius: '50%',
                  background: accentColor,
                  boxShadow: `0 0 10px ${accentColor}70`,
                  flexShrink: 0,
                }}
              />
              {idx < items.length - 1 && (
                <div
                  style={{
                    flex: 1,
                    width: '2px',
                    background: 'var(--surface-container-high)',
                    marginTop: '6px',
                    minHeight: '28px',
                  }}
                />
              )}
            </div>

            {/* Content row */}
            <div
              style={{
                flex: 1,
                paddingBottom: idx < items.length - 1 ? 'clamp(18px, 3vh, 26px)' : 0,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  flexWrap: 'wrap',
                  gap: '8px',
                  marginBottom: '4px',
                }}
              >
                <h3
                  className="font-headline"
                  style={{
                    fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
                    fontWeight: 700,
                    color: 'var(--on-surface)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {item.title}
                  <span style={{ color: accentColor }}>.</span>
                </h3>
                {item.period && (
                  <span
                    className="dot-matrix"
                    style={{ fontSize: '0.65rem', color: accentColor, letterSpacing: '0.05em', whiteSpace: 'nowrap' }}
                  >
                    {item.period}
                  </span>
                )}
              </div>

              {item.subtitle && (
                <p style={{ fontSize: '0.78rem', color: 'var(--on-surface-dim)', marginBottom: '6px', fontWeight: 500 }}>
                  {item.subtitle}
                </p>
              )}

              <p
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--on-surface-variant)',
                  lineHeight: 1.55,
                  marginBottom: '10px',
                }}
              >
                {item.description}
              </p>

              {item.tags && item.tags.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: item.stat ? '8px' : 0 }}>
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: '3px 9px',
                        border: `1px solid ${accentColor}`,
                        color: accentColor,
                        borderRadius: '4px',
                        fontSize: '0.6rem',
                        fontWeight: 600,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {item.stat && (
                <div style={{ fontSize: '0.72rem', color: accentColor, fontWeight: 600, letterSpacing: '0.03em' }}>
                  → {item.stat}
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
