import { motion } from 'framer-motion';
import { remap } from '../hero-city/cityConfig';

export default function TimelineCard({
  index,
  total,
  item,
  zoneProgress,
  isLeft,
}) {
  // Stagger cards: each appears after the previous one
  // First card starts at 5%, appears over next 10%, then holds
  const cardStart = 0.05 + (index * 0.12);
  const cardEnd = cardStart + 0.15;

  // Only render if we're in this card's time window
  if (zoneProgress < cardStart - 0.05) return null;

  const cardProgress = remap(zoneProgress, cardStart, cardEnd, 0, 1);
  const opacity = Math.min(1, Math.max(0, cardProgress * 1.2)); // Ease in slightly past 1
  const scale = 0.85 + opacity * 0.15; // Scale from 0.85 to 1
  const y = (1 - opacity) * 40; // Slide down as it appears

  return (
    <motion.div
      style={{
        opacity,
        scale,
        y,
        position: 'relative',
        zIndex: index,
      }}
      transition={{ duration: 0 }} // Driven by zoneProgress, no easing needed
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isLeft ? '1fr auto' : 'auto 1fr',
          gap: '32px',
          alignItems: 'start',
          marginBottom: '60px',
        }}
      >
        {/* Card content */}
        <div
          className="bento-card card"
          style={{
            padding: '24px',
            '--card-tint': 'var(--surface-container)',
            position: 'relative',
            overflow: 'hidden',
            gridColumn: isLeft ? 1 : 2,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-30px',
              right: isLeft ? 'auto' : '-30px',
              left: isLeft ? '-30px' : 'auto',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: item.accentColor ? `${item.accentColor}20` : 'var(--primary-glow)',
              filter: 'blur(50px)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <h3
              className="font-headline"
              style={{
                fontSize: '1rem',
                fontWeight: 700,
                color: 'var(--on-surface)',
                marginBottom: '4px',
              }}
            >
              {item.title}
            </h3>
            <p
              style={{
                fontSize: '0.8rem',
                color: 'var(--on-surface-dim)',
                marginBottom: '12px',
              }}
            >
              {item.subtitle} · {item.period}
            </p>
            <p
              style={{
                fontSize: '0.8rem',
                color: 'var(--on-surface-variant)',
                lineHeight: 1.6,
                marginBottom: '12px',
              }}
            >
              {item.description}
            </p>

            {item.tags && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: '3px 10px',
                      background: item.accentColor || 'var(--accent-green)',
                      color: 'var(--on-accent-light)',
                      borderRadius: '3px',
                      fontSize: '0.65rem',
                      fontWeight: 600,
                      letterSpacing: '0.05em',
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
                  marginTop: '12px',
                  fontSize: '0.75rem',
                  color: item.accentColor || 'var(--accent-green)',
                  fontWeight: 600,
                }}
              >
                {item.stat}
              </div>
            )}
          </div>
        </div>

        {/* Timeline dot and line */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gridColumn: isLeft ? 2 : 1,
            marginTop: '12px',
          }}
        >
          {/* Dot */}
          <div
            style={{
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              background: item.accentColor || 'var(--accent-green)',
              border: '3px solid var(--surface)',
              boxShadow: `0 0 12px ${item.accentColor || 'var(--accent-green)'}40`,
              zIndex: 10,
            }}
          />

          {/* Line to next (if not last) */}
          {index < total - 1 && (
            <div
              style={{
                width: '2px',
                height: '52px',
                background: 'var(--surface-container-high)',
                marginTop: '8px',
              }}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}
