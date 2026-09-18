import { motion } from 'framer-motion';
import { remap } from '../hero-city/cityConfig';
import SectionHeader from '../SectionHeader';

const projects = [
  {
    name: 'Algnosis',
    tagline: 'AI Diagnostic Platform',
    description: 'AI-powered medical imaging. MRI classification with Spring Boot backend and Django ML pipeline, +30% accuracy in pathology.',
    tags: ['SPRING BOOT', 'DJANGO', 'ML', 'MRI'],
    stat: { label: 'ACCURACY', value: '+30%' },
  },
  {
    name: 'Inventra',
    tagline: 'Business Analytics Engine',
    description: 'Text-to-SQL natural language engine for business queries. 95% success rate. AWS SageMaker ML inference.',
    tags: ['TEXT-TO-SQL', 'AWS SAGEMAKER', 'REACT', 'NLP'],
    stat: { label: 'SQL SUCCESS RATE', value: '95%' },
  },
  {
    name: 'EmCon',
    tagline: 'Emergency Control System',
    description: 'Real-time emergency dispatch & routing. Redis caching for -40% load. FastAPI + WebSocket.',
    tags: ['FASTAPI', 'REDIS', 'WEBSOCKET'],
    stat: { label: 'LOAD REDUCTION', value: '-40%' },
  },
];

export default function ProjectsOverlay({ zoneProgress, active }) {
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
      <div style={{ maxWidth: '900px', width: '100%' }}>
        <motion.div style={{ opacity: contentOpacity }}>
          <SectionHeader
            label="SECTION_03"
            title="Cool Projects"
            subtitle="Things I've built and loved building // Proof of concept"
            accent="var(--accent-cyan)"
          />
        </motion.div>

        <motion.div style={{ marginTop: '40px', opacity: contentOpacity, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {projects.map((proj, idx) => (
            <motion.div
              key={proj.name}
              className="bento-card card"
              style={{
                padding: '28px',
                '--card-tint': 'var(--surface-container)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '300px',
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: contentOpacity, scale: 1 }}
              transition={{ delay: 0.1 + idx * 0.08 }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '-40px',
                  right: '-40px',
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  background: 'rgba(34, 195, 238, 0.1)',
                  filter: 'blur(60px)',
                  pointerEvents: 'none',
                }}
              />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 className="font-headline" style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--on-surface)', marginBottom: '4px' }}>
                  {proj.name}
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', marginBottom: '12px' }}>
                  {proj.tagline}
                </p>
                <p style={{ fontSize: '0.8rem', color: 'var(--on-surface-variant)', lineHeight: 1.6, marginBottom: '16px' }}>
                  {proj.description}
                </p>
              </div>

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: '3px 10px',
                        background: 'var(--accent-cyan)',
                        color: 'var(--on-accent-light)',
                        borderRadius: '3px',
                        fontSize: '0.6rem',
                        fontWeight: 600,
                        letterSpacing: '0.04em',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)' }}>
                  {proj.stat.label}: <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>{proj.stat.value}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
