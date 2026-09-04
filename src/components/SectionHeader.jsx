export default function SectionHeader({ label, title, subtitle, accent = 'var(--primary)' }) {
  return (
    <div style={{ marginBottom: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
        <div style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: accent,
        }} />
        <span className="dot-matrix" style={{
          fontSize: '0.6rem',
          color: accent,
        }}>
          {label}
        </span>
      </div>
      <h2 className="font-headline" style={{
        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
        fontWeight: 700,
        letterSpacing: '-0.04em',
        color: 'var(--on-surface)',
        lineHeight: 1,
      }}>
        {title}<span style={{ color: accent }}>.</span>
      </h2>
      {subtitle && (
        <p className="dot-matrix" style={{
          fontSize: '0.65rem',
          color: 'var(--on-surface-dim)',
          marginTop: '12px',
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
