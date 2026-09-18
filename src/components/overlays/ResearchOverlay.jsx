import { motion } from 'framer-motion';
import { remap } from '../hero-city/cityConfig';
import SectionHeader from '../SectionHeader';

const researchItems = [
  {
    title: 'Computer Vision & Graphics Lab (CVGL)',
    subtitle: 'LUMS',
    period: 'Active',
    description: 'Working on computer vision research. Exploring novel approaches to image processing and scene understanding.',
    tags: ['COMPUTER VISION', 'RESEARCH', 'DEEP LEARNING'],
  },
  {
    title: 'Teaching Assistant — Algorithms',
    subtitle: 'LUMS',
    period: 'Aug. 2025 – Dec. 2025',
    description: 'Designed & evaluated algorithmic assessments for 300+ students. Mentored on DP, graph theory, and coding fundamentals.',
    tags: ['TEACHING', 'MENTORSHIP', 'ALGORITHMS'],
    stat: 'STUDENTS: 300+',
  },
];

export default function ResearchOverlay({ zoneProgress, active }) {
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
      <div style={{ maxWidth: '750px', width: '100%' }}>
        <motion.div style={{ opacity: contentOpacity }}>
          <SectionHeader
            label="SECTION_04"
            title="Research & Teaching"
            subtitle="Deep dives & mentoring // Giving back while pushing forward"
            accent="var(--accent-green)"
          />
        </motion.div>

        <motion.div style={{ marginTop: '40px', opacity: contentOpacity, display: 'grid', gap: '20px' }}>
          {researchItems.map((item, idx) => (
            <motion.div
              key={item.title}
              className="bento-card card"
              style={{
                padding: '28px',
                '--card-tint': 'var(--surface-container)',
                position: 'relative',
                overflow: 'hidden',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: contentOpacity, y: 0 }}
              transition={{ delay: 0.1 + idx * 0.1 }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '-40px',
                  right: '-40px',
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  background: 'rgba(61, 255, 122, 0.1)',
                  filter: 'blur(60px)',
                  pointerEvents: 'none',
                }}
              />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '16px', marginBottom: '12px' }}>
                  <div>
                    <h3 className="font-headline" style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--on-surface)' }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--on-surface-dim)' }}>
                      {item.subtitle} · {item.period}
                    </p>
                  </div>
                </div>

                <p style={{ fontSize: '0.8rem', color: 'var(--on-surface-variant)', lineHeight: 1.6, marginBottom: '12px' }}>
                  {item.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: '4px 12px',
                        background: 'var(--accent-green)',
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

                {item.stat && (
                  <div style={{ marginTop: '12px', fontSize: '0.75rem', color: 'var(--accent-green)', fontWeight: 600 }}>
                    {item.stat}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
