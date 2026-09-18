import { motion } from 'framer-motion';
import { remap } from '../hero-city/cityConfig';
import SectionHeader from '../SectionHeader';

const experiences = [
  {
    company: '10Pearls',
    role: 'Software Engineering Intern',
    period: 'Dec. 2025 – Feb. 2026',
    icon: 'code',
    highlights: [
      'Architected scalable RESTful services using ASP.NET Core, implementing JWT and OAuth2.',
      'Optimized SQL Server performance via indexing & query profiling, -35% response time.',
      'Engineered CI/CD pipelines & testing suites with 85% code coverage.',
    ],
    tags: ['ASP.NET CORE', 'SQL SERVER', 'C#', 'CI/CD'],
    stat: { label: 'RESPONSE TIME', value: '-35%' },
  },
  {
    company: 'Netsol Technologies Ltd.',
    role: 'Software Engineering Intern',
    period: 'July 2025 – Aug. 2025',
    icon: 'cloud',
    highlights: [
      'Engineered enterprise backend using Java Spring Boot with modular data layers.',
      'Built LLM-powered data transformation pipeline for analytical intelligence.',
      'Refactored legacy Java modules with Design Patterns for banking systems.',
    ],
    tags: ['JAVA', 'SPRING BOOT', 'LLM', 'DESIGN PATTERNS'],
    stat: { label: 'PIPELINE', value: 'LLM-DRIVEN' },
  },
];

export default function ExperienceOverlay({ zoneProgress, active }) {
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
      <div style={{ maxWidth: '800px', width: '100%' }}>
        <motion.div style={{ opacity: contentOpacity }}>
          <SectionHeader
            label="SECTION_02"
            title="Career Moves"
            subtitle="Shipping code that matters // Real-world impact"
            accent="var(--primary)"
          />
        </motion.div>

        <motion.div style={{ marginTop: '40px', opacity: contentOpacity, display: 'grid', gap: '20px' }}>
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.company}
              className="bento-card card"
              style={{
                padding: '32px',
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
                  background: 'rgba(255, 0, 0, 0.1)',
                  filter: 'blur(60px)',
                  pointerEvents: 'none',
                }}
              />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <h3 className="font-headline" style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--on-surface)' }}>
                      {exp.company}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--on-surface-dim)', marginTop: '4px' }}>
                      {exp.role}
                    </p>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)', whiteSpace: 'nowrap' }}>
                    {exp.period}
                  </span>
                </div>

                <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
                  {exp.highlights.map((h, i) => (
                    <li key={i} style={{ fontSize: '0.8rem', color: 'var(--on-surface-variant)', marginBottom: '8px', lineHeight: 1.5 }}>
                      {h}
                    </li>
                  ))}
                </ul>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: '4px 12px',
                        background: 'var(--primary)',
                        color: 'var(--nothing-white)',
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
