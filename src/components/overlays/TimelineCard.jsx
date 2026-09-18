import { motion } from 'framer-motion';
import { remap } from '../hero-city/cityConfig';

// Renders a stack of cards (one active + up to 2 behind, receding in depth) within
// whatever box its parent provides. Purely relative/absolute — no viewport-fixed
// positioning of its own, so it always respects the layout the parent (BeatPanel) sets up.
export default function TimelineStack({ items, zoneProgress, accentColor }) {
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
        height: '100%',
        perspective: '1200px',
      }}
    >
      {items.map((item, idx) => {
        const offsetFromActive = idx - activeIndex;
        if (offsetFromActive < 0 || offsetFromActive > 2) return null; // active + 2 behind

        const depthScale = Math.max(0.88, 1 - offsetFromActive * 0.05);
        const depthY = offsetFromActive * 16;
        const depthOpacity = offsetFromActive === 0 ? activeOpacity : 0.35 - offsetFromActive * 0.08;

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
            }}
            transition={{ duration: 0 }}
          >
            <div
              className="bento-card card"
              style={{
                padding: 'clamp(24px, 4vw, 40px)',
                '--card-tint': 'var(--surface-container)',
                position: 'relative',
                overflow: 'hidden',
                height: '100%',
                boxSizing: 'border-box',
                boxShadow: `0 ${12 + offsetFromActive * 8}px ${40 + offsetFromActive * 20}px rgba(0,0,0,${0.2 + offsetFromActive * 0.1})`,
              }}
            >
              {/* Glow background — consistent with hero section's accent glows */}
              <div
                style={{
                  position: 'absolute',
                  top: '-60px',
                  right: '-60px',
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  background: `${accentColor}30`,
                  filter: 'blur(80px)',
                  pointerEvents: 'none',
                }}
              />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <h2
                  className="font-headline"
                  style={{
                    fontSize: 'clamp(1.2rem, 4vw, 1.6rem)',
                    fontWeight: 700,
                    color: 'var(--on-surface)',
                    letterSpacing: '-0.02em',
                    marginBottom: '8px',
                  }}
                >
                  {item.title}
                  <span style={{ color: accentColor }}>.</span>
                </h2>

                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '16px' }}>
                  {item.subtitle && (
                    <p style={{ fontSize: '0.82rem', color: 'var(--on-surface-dim)', fontWeight: 500 }}>
                      {item.subtitle}
                    </p>
                  )}
                  {item.period && (
                    <span
                      className="dot-matrix"
                      style={{ fontSize: '0.72rem', color: accentColor, letterSpacing: '0.05em' }}
                    >
                      {item.period}
                    </span>
                  )}
                </div>

                <p
                  style={{
                    fontSize: '0.88rem',
                    color: 'var(--on-surface-variant)',
                    lineHeight: 1.7,
                    marginBottom: '20px',
                  }}
                >
                  {item.description}
                </p>

                {item.tags && item.tags.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          padding: '5px 12px',
                          background: accentColor,
                          color: 'var(--on-accent-light)',
                          borderRadius: '4px',
                          fontSize: '0.65rem',
                          fontWeight: 600,
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {item.stat && (
                  <div
                    style={{
                      fontSize: '0.8rem',
                      color: accentColor,
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                    }}
                  >
                    → {item.stat}
                  </div>
                )}
              </div>

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
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
