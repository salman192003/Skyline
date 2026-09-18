import { motion } from 'framer-motion';
import { remap } from '../hero-city/cityConfig';
import SectionHeader from '../SectionHeader';

export default function EducationOverlay({ zoneProgress, active }) {
  const fadeInStart = 0.05;
  const fadeInEnd = 0.35;
  const fadeOutStart = 0.65;
  const fadeOutEnd = 1;

  const opacity =
    zoneProgress < fadeInStart
      ? 0
      : zoneProgress < fadeInEnd
      ? remap(zoneProgress, fadeInStart, fadeInEnd, 0, 1)
      : zoneProgress < fadeOutStart
      ? 1
      : remap(zoneProgress, fadeOutStart, fadeOutEnd, 1, 0);

  const contentOpacity = remap(zoneProgress, 0.2, 0.4, 0, 1);

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
            label="SECTION_01"
            title="School & Fun Stuff"
            subtitle="Brain fuel and what keeps the mind sharp"
            accent="var(--accent-amber)"
          />
        </motion.div>

        <motion.div
          style={{
            marginTop: '40px',
            opacity: contentOpacity,
            display: 'grid',
            gap: '20px',
          }}
        >
          {/* LUMS Degree */}
          <motion.div
            className="bento-card card"
            style={{
              padding: '32px',
              '--card-tint': 'var(--surface-container)',
              position: 'relative',
              overflow: 'hidden',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: contentOpacity, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-40px',
                right: '-40px',
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                background: 'var(--accent-amber-glow)',
                filter: 'blur(60px)',
                pointerEvents: 'none',
              }}
            />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '16px' }}>
                <div>
                  <h3 className="font-headline" style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--on-surface)', marginBottom: '4px' }}>
                    Lahore University of Management Sciences
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--on-surface-dim)' }}>
                    B.S. in Computer Science (2022–2026)
                  </p>
                </div>
              </div>

              <div style={{ marginTop: '20px' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--on-surface-variant)', lineHeight: 1.6, marginBottom: '16px' }}>
                  Deep dives into ML, computer vision, distributed systems, and algorithms. Keeping the fundamentals sharp.
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['MACHINE LEARNING', 'CV', 'ALGORITHMS', 'DATA STRUCTURES'].map((tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: '4px 12px',
                        background: 'var(--accent-amber)',
                        color: 'var(--on-accent-light)',
                        borderRadius: '4px',
                        fontSize: '0.65rem',
                        fontWeight: 600,
                        letterSpacing: '0.05em',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Hobbies Placeholder */}
          <motion.div
            className="bento-card card"
            style={{
              padding: '32px',
              '--card-tint': 'var(--surface-container)',
              position: 'relative',
              overflow: 'hidden',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: contentOpacity, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-headline" style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--on-surface)', marginBottom: '12px' }}>
              Hobbies & Interests
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {['Photography', 'Gaming', 'Building stuff', 'Coffee'].map((hobby) => (
                <div
                  key={hobby}
                  style={{
                    padding: '12px',
                    borderRadius: '6px',
                    background: 'var(--surface-container-high)',
                    textAlign: 'center',
                    fontSize: '0.8rem',
                    color: 'var(--on-surface-variant)',
                  }}
                >
                  {hobby} <span style={{ opacity: 0.5 }}>→ placeholder</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
