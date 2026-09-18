import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { remap } from '../hero-city/cityConfig';
import SectionHeader from '../SectionHeader';

const BOOT_SEQUENCE = [
  '> CONNECTION PROTOCOL INITIALIZED',
  '> PROFILE: SALMAN_AJMAL',
  '> STATUS: OPEN TO OPPORTUNITIES',
  '> SKILLS: Full-stack, Cloud, ML/AI',
  '> REACH OUT:',
  '  |-- linkedin.com/in/salmanajmal',
  '  |-- github.com/salman192003',
  '  |__ salmanajmal@lums.edu.pk',
  '> AWAITING YOUR MESSAGE...',
];

export default function ContactOverlay({ zoneProgress, active }) {
  const fadeInStart = 0;
  const fadeInEnd = 0.15;
  const fadeOutStart = 0.8;
  const fadeOutEnd = 1;

  const opacity =
    zoneProgress < fadeInStart
      ? 0
      : zoneProgress < fadeInEnd
      ? remap(zoneProgress, fadeInStart, fadeInEnd, 0, 1)
      : zoneProgress < fadeOutStart
      ? 1
      : remap(zoneProgress, fadeOutStart, fadeOutEnd, 1, 0);

  const contentOpacity = remap(zoneProgress, 0.05, 0.25, 0, 1);

  const [terminalLines, setTerminalLines] = useState([]);
  const terminalRef = useRef(null);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!active || contentOpacity < 0.5) return;

    indexRef.current = 0;
    setTerminalLines([]);

    const interval = setInterval(() => {
      if (indexRef.current < BOOT_SEQUENCE.length) {
        setTerminalLines((prev) => [...prev, BOOT_SEQUENCE[indexRef.current]]);
        indexRef.current++;
      } else {
        clearInterval(interval);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [active, contentOpacity]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalLines]);

  return (
    <motion.div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        pointerEvents: active ? 'auto' : 'none',
        zIndex: 10,
        padding: '0 32px',
      }}
    >
      <div style={{ maxWidth: '700px', width: '100%' }}>
        <motion.div style={{ opacity: contentOpacity }}>
          <SectionHeader
            label="SECTION_05"
            title="How to Get In Touch?"
            subtitle="Let's build something together // Open to collaboration"
            accent="var(--accent-green)"
          />
        </motion.div>

        <motion.div
          style={{
            marginTop: '40px',
            opacity: contentOpacity,
          }}
        >
          {/* Terminal Block */}
          <div
            className="bento-card card"
            style={{
              padding: '24px',
              '--card-tint': 'var(--surface-lowest)',
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: 'var(--surface-lowest)',
              border: '1px solid var(--surface-container-high)',
              fontFamily: 'monospace',
            }}
          >
            <div
              ref={terminalRef}
              style={{
                height: '280px',
                overflowY: 'auto',
                fontSize: '0.75rem',
                color: 'var(--on-surface)',
                lineHeight: '1.6',
              }}
            >
              {terminalLines.map((line, i) => (
                <div key={i} style={{ opacity: 0.9 }}>
                  <span style={{ color: 'var(--primary)', marginRight: '8px' }}>→</span>
                  {line}
                </div>
              ))}
              {terminalLines.length > 0 && terminalLines.length === BOOT_SEQUENCE.length && (
                <motion.div
                  style={{ marginTop: '12px', color: 'var(--accent-green)' }}
                  animate={{ opacity: [0.5, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  <span style={{ marginRight: '8px' }}>→</span>
                  <span style={{ animation: 'blink 1s infinite' }}>_</span>
                </motion.div>
              )}
            </div>
          </div>

          {/* Skills Grid */}
          <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--on-surface-dim)', marginBottom: '8px', fontWeight: 600 }}>
                LANGUAGES
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {['SQL', 'Python', 'Java', 'C#', 'TypeScript'].map((lang) => (
                  <span key={lang} style={{ fontSize: '0.7rem', padding: '4px 10px', background: 'var(--surface-container-high)', borderRadius: '3px' }}>
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--on-surface-dim)', marginBottom: '8px', fontWeight: 600 }}>
                TOOLS & FRAMEWORKS
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {['React', 'Spring Boot', 'Docker', 'AWS'].map((tool) => (
                  <span key={tool} style={{ fontSize: '0.7rem', padding: '4px 10px', background: 'var(--surface-container-high)', borderRadius: '3px' }}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </motion.div>
  );
}
