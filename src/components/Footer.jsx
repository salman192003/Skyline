export default function Footer() {
  return (
    <footer style={{
      padding: '48px 32px',
      background: 'var(--surface-low)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '16px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: 'var(--primary)',
          animation: 'pulse-red 2s ease-in-out infinite',
        }} />
        <span className="dot-matrix" style={{
          fontSize: '0.55rem',
          color: 'var(--on-surface-dim)',
        }}>
          © 2026 SALMAN AJMAL. ALL SYSTEMS NOMINAL.
        </span>
      </div>

      <div style={{ display: 'flex', gap: '24px' }}>
        {[
          { label: 'GITHUB', url: 'https://github.com/salman192003' },
          { label: 'LINKEDIN', url: 'https://linkedin.com/in/salmanajmal' },
          { label: 'EMAIL', url: 'mailto:salmanajmal@lums.edu.pk' },
        ].map((link) => (
          <a
            key={link.label}
            href={link.url}
            target={link.url.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
            className="dot-matrix"
            style={{
              fontSize: '0.55rem',
              color: 'var(--on-surface-dim)',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => e.target.style.color = 'var(--primary)'}
            onMouseLeave={(e) => e.target.style.color = 'var(--on-surface-dim)'}
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
