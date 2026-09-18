// The shared visual "look" of a beat item — used by every layout (stack, grid, split)
// so the design language (glow, typography, tag pills, stat line) stays identical
// no matter how the cards are arranged on screen.
export default function BeatCard({ item, accentColor, compact = false, solid = false }) {
  return (
    <div
      className="bento-card card"
      style={{
        padding: compact ? 'clamp(20px, 3vw, 28px)' : 'clamp(24px, 4vw, 40px)',
        '--card-tint': 'var(--surface-container)',
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        // .bento-card is 72% opaque by default (glass effect) — override to
        // near-solid when the card needs to read clearly on its own.
        ...(solid ? { backgroundColor: 'var(--surface-container)' } : {}),
      }}
    >
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

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <h2
          className="font-headline"
          style={{
            fontSize: compact ? 'clamp(1.05rem, 3vw, 1.3rem)' : 'clamp(1.2rem, 4vw, 1.6rem)',
            fontWeight: 700,
            color: 'var(--on-surface)',
            letterSpacing: '-0.02em',
            marginBottom: '8px',
          }}
        >
          {item.title}
          <span style={{ color: accentColor }}>.</span>
        </h2>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: compact ? '10px' : '16px' }}>
          {item.subtitle && (
            <p style={{ fontSize: compact ? '0.78rem' : '0.82rem', color: 'var(--on-surface-dim)', fontWeight: 500 }}>
              {item.subtitle}
            </p>
          )}
          {item.period && (
            <span
              className="dot-matrix"
              style={{ fontSize: compact ? '0.68rem' : '0.72rem', color: accentColor, letterSpacing: '0.05em' }}
            >
              {item.period}
            </span>
          )}
        </div>

        <p
          style={{
            fontSize: compact ? '0.82rem' : '0.88rem',
            color: 'var(--on-surface-variant)',
            lineHeight: 1.65,
            marginBottom: compact ? '14px' : '20px',
            flex: compact ? 1 : undefined,
          }}
        >
          {item.description}
        </p>

        {item.tags && item.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: compact ? '6px' : '8px', marginBottom: compact ? '12px' : '16px' }}>
            {item.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: compact ? '4px 10px' : '5px 12px',
                  background: accentColor,
                  color: 'var(--on-accent-light)',
                  borderRadius: '4px',
                  fontSize: compact ? '0.6rem' : '0.65rem',
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
              fontSize: compact ? '0.72rem' : '0.8rem',
              color: accentColor,
              fontWeight: 600,
              letterSpacing: '0.05em',
              marginTop: compact ? 'auto' : 0,
            }}
          >
            → {item.stat}
          </div>
        )}
      </div>
    </div>
  );
}
