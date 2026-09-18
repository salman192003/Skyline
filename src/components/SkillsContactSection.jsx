import { useState, useEffect, useRef } from 'react';
import SectionHeader from './SectionHeader';

const BOOT_SEQUENCE = [
  '> SECURE CONNECTION ESTABLISHED.',
  '> LOADING PROFILE: SALMAN_AJMAL',
  '> STATUS: OPEN TO OPPORTUNITIES',
  '> LINKS:',
  '  |-- linkedin.com/in/salman-ajmal',
  '  |-- github.com/salman192003',
  '  |__ salmanatwork1@gmail.com',
  '> AWAITING TRANSMISSION...',
];

export default function SkillsContactSection() {
  const [terminalLines, setTerminalLines] = useState([]);
  const terminalRef = useRef(null);
  const indexRef = useRef(0);

  const languages = ['SQL', 'Python', 'Java', 'C#', 'TypeScript', 'C++', 'JavaScript'];
  const frameworks = [
    { name: 'Docker', icon: 'deployed_code' },
    { name: 'AWS', icon: 'cloud' },
    { name: 'React', icon: 'code' },
    { name: '.NET', icon: 'terminal' },
    { name: 'Spring Boot', icon: 'bolt' },
    { name: 'FastAPI', icon: 'speed' },
    { name: 'Redis', icon: 'storage' },
    { name: 'PostgreSQL', icon: 'database' },
  ];

  useEffect(() => {
    indexRef.current = 0;
    const interval = setInterval(() => {
      if (indexRef.current < BOOT_SEQUENCE.length) {
        const line = BOOT_SEQUENCE[indexRef.current];
        setTerminalLines(prev => [...prev, line]);
        indexRef.current++;
      } else {
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalLines]);

  return (
    <section id="contact" style={{ padding: '80px 0 120px' }}>
      <SectionHeader
        label="SECTION_05"
        title="SYSTEM"
        subtitle="Skills Registry & Contact Terminal"
      />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: '20px',
        marginTop: '40px',
      }}>
        {/* Languages Card */}
        <div
          className="bento-card card"
          style={{
            gridColumn: 'span 4',
            '--card-tint': 'var(--surface-container)',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '280px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--accent-amber)' }}>
              translate
            </span>
            <span className="dot-matrix" style={{ fontSize: '0.6rem', color: 'var(--on-surface-variant)' }}>
              LANGUAGES_
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
            {languages.map((lang, i) => (
              <div
                key={lang}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '4px 0',
                  cursor: 'default',
                }}
              >
                <span className="font-headline" style={{
                  fontSize: '0.8rem',
                  letterSpacing: '0.06em',
                  color: 'var(--on-surface)',
                  fontWeight: 500,
                }}>
                  {lang}
                </span>
                <div style={{
                  width: '80px',
                  height: '3px',
                  background: 'var(--surface-container-highest)',
                  borderRadius: '2px',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100%',
                    width: `${90 - i * 8}%`,
                    background: i === 0 ? 'var(--accent-amber)' : 'var(--on-surface-dim)',
                    borderRadius: '2px',
                    transition: 'width 0.5s var(--ease-out-expo)',
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Frameworks Card */}
        <div
          className="bento-card card"
          style={{
            gridColumn: 'span 4',
            '--card-tint': 'var(--surface-low)',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '280px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--accent-cyan)' }}>
              hub
            </span>
            <span className="dot-matrix" style={{ fontSize: '0.6rem', color: 'var(--on-surface-variant)' }}>
              FRAMEWORKS_
            </span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px',
            flex: 1,
          }}>
            {frameworks.map((fw) => (
              <div
                key={fw.name}
                style={{
                  background: 'var(--surface-container-highest)',
                  borderRadius: 'var(--radius-inner)',
                  padding: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'default',
                  transition: 'all 0.3s var(--ease-out-expo)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--accent-cyan)';
                  e.currentTarget.querySelector('.fw-icon').style.color = 'var(--on-accent-light)';
                  e.currentTarget.querySelector('.fw-name').style.color = 'var(--on-accent-light)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--surface-container-highest)';
                  e.currentTarget.querySelector('.fw-icon').style.color = 'var(--on-surface)';
                  e.currentTarget.querySelector('.fw-name').style.color = 'var(--on-surface)';
                }}
              >
                <span className="material-symbols-outlined fw-icon" style={{
                  fontSize: '18px',
                  color: 'var(--on-surface)',
                  transition: 'color 0.3s ease',
                }}>
                  {fw.icon}
                </span>
                <span className="fw-name font-headline" style={{
                  fontSize: '0.7rem',
                  letterSpacing: '0.06em',
                  color: 'var(--on-surface)',
                  fontWeight: 500,
                  transition: 'color 0.3s ease',
                }}>
                  {fw.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Terminal Contact Card */}
        <div
          className="bento-card card"
          style={{
            gridColumn: 'span 4',
            '--card-tint': 'var(--surface-container)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '280px',
          }}
        >
          {/* Terminal header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--accent-green)' }}>
                terminal
              </span>
              <span className="font-headline" style={{
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'var(--on-surface)',
              }}>
                TERMINAL.APP
              </span>
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--surface-container-highest)' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--surface-container-highest)' }} />
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'var(--accent-green)',
                animation: 'pulse-red 2s ease-in-out infinite',
              }} />
            </div>
          </div>

          {/* Terminal body */}
          <div
            ref={terminalRef}
            style={{
              background: 'var(--surface-lowest)',
              borderRadius: 'var(--radius-inner)',
              padding: '16px',
              flex: 1,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--on-surface-variant)',
              lineHeight: 1.8,
              overflow: 'auto',
              letterSpacing: '0.03em',
            }}
          >
            {terminalLines.map((line, i) => (
              <div key={i} style={{
                color: line.includes('LINKS') || line.includes('|--') || line.includes('|__')
                  ? 'var(--on-surface)'
                  : line.includes('STATUS')
                    ? 'var(--accent-green)'
                    : 'var(--on-surface-variant)',
              }}>
                {line.includes('linkedin') ? (
                  <span>  ├─ <a href="https://www.linkedin.com/in/salman-ajmal/" target="_blank" rel="noopener noreferrer" style={{
                    color: 'var(--accent-green)',
                    textDecoration: 'none',
                    borderBottom: '1px solid transparent',
                    transition: 'border-color 0.3s ease',
                  }}
                  onMouseEnter={(e) => e.target.style.borderColor = 'var(--accent-green)'}
                  onMouseLeave={(e) => e.target.style.borderColor = 'transparent'}
                  >linkedin.com/in/salman-ajmal</a></span>
                ) : line.includes('github') ? (
                  <span>  ├─ <a href="https://github.com/salman192003" target="_blank" rel="noopener noreferrer" style={{
                    color: 'var(--accent-green)',
                    textDecoration: 'none',
                    borderBottom: '1px solid transparent',
                    transition: 'border-color 0.3s ease',
                  }}
                  onMouseEnter={(e) => e.target.style.borderColor = 'var(--accent-green)'}
                  onMouseLeave={(e) => e.target.style.borderColor = 'transparent'}
                  >github.com/salman192003</a></span>
                ) : line.includes('gmail.com') ? (
                  <span>  └─ <a href="mailto:salmanatwork1@gmail.com" style={{
                    color: 'var(--accent-green)',
                    textDecoration: 'none',
                    borderBottom: '1px solid transparent',
                    transition: 'border-color 0.3s ease',
                  }}
                  onMouseEnter={(e) => e.target.style.borderColor = 'var(--accent-green)'}
                  onMouseLeave={(e) => e.target.style.borderColor = 'transparent'}
                  >salmanatwork1@gmail.com</a></span>
                ) : (
                  line
                )}
              </div>
            ))}
            {terminalLines.length >= BOOT_SEQUENCE.length && (
              <div style={{ display: 'inline' }}>
                <span style={{ color: 'var(--accent-green)' }}>{'>'}</span>
                <span className="cursor-blink" />
              </div>
            )}
          </div>
        </div>

        {/* Full-width CTA */}
        <div
          className="bento-card card"
          style={{
            gridColumn: 'span 12',
            '--card-tint': 'var(--surface-low)',
            padding: '48px 40px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '24px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Gradient accent */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, var(--primary-glow) 0%, transparent 40%)',
            pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 className="font-headline" style={{
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              color: 'var(--on-surface)',
              lineHeight: 1.1,
            }}>
              INITIATE SEQUENCE<span style={{ color: 'var(--primary)' }}>.</span>
            </h2>
            <p className="font-body" style={{
              fontSize: '0.9rem',
              color: 'var(--on-surface-variant)',
              marginTop: '8px',
            }}>
              Open for full-time SWE roles, ML research positions, and technical consultations.
            </p>
          </div>

          <a
            href="mailto:salmanatwork1@gmail.com"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: 'var(--primary)',
              color: 'var(--nothing-white)',
              border: 'none',
              borderRadius: 'var(--radius-pill)',
              padding: '16px 32px',
              fontFamily: 'var(--font-headline)',
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'transform 0.3s var(--ease-out-expo)',
              position: 'relative',
              zIndex: 1,
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            CONNECT NOW
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
              arrow_forward
            </span>
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact .bento-card {
            grid-column: span 12 !important;
          }
        }
      `}</style>
    </section>
  );
}
