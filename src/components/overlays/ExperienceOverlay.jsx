import { motion } from 'framer-motion';
import { remap } from '../hero-city/cityConfig';
import SectionHeader from '../SectionHeader';
import TimelineCard from './TimelineCard';

const experiences = [
  {
    company: 'AdalFi',
    role: 'Software Engineer',
    period: 'Aug. 2026 – Present',
    icon: 'code',
    highlights: [
      'Building AI-driven financial systems that make credit more accessible and inclusive.',
      'Developing scalable backend architectures for next-gen fintech platforms.',
    ],
    tags: ['AI/ML', 'FINTECH', 'FULL-STACK', 'SYSTEMS DESIGN'],
    stat: { label: 'ROLE', value: 'FULL-TIME' },
  },
  {
    company: 'i2c Inc.',
    role: 'Associate Software Engineer',
    period: 'Jun. 2026 – Aug. 2026',
    icon: 'cloud',
    highlights: [
      'Contributed to Java/Spring Boot backend supporting large-scale credit/debit card processing.',
      'Investigated and resolved backend issues through log analysis, exception tracing, and concurrency debugging.',
      'Built strong fintech domain knowledge through extensive codebase exploration and system design understanding.',
    ],
    tags: ['JAVA', 'SPRING BOOT', 'FINTECH', 'BACKEND'],
    stat: { label: 'SCALE', value: 'PRODUCTION' },
  },
  {
    company: '10Pearls',
    role: 'Software Engineer Intern',
    period: 'Dec. 2025 – Feb. 2026',
    icon: 'code',
    highlights: [
      'Engineered multi-tenant backend architectures with ASP.NET Core, building high-throughput RESTful APIs.',
      'Profiled high-traffic endpoints to isolate bottlenecks, slashing latency by 35% through SQL Server indexing & Redis caching.',
      'Architected end-to-end service reliability via automated CI/CD and SonarQube quality gates.',
    ],
    tags: ['ASP.NET CORE', 'SQL SERVER', 'REDIS', 'CI/CD'],
    stat: { label: 'LATENCY REDUCTION', value: '-35%' },
  },
  {
    company: 'NETSOL Technologies Inc.',
    role: 'Software Engineering Intern',
    period: 'Jul. 2025 – Aug. 2025',
    icon: 'cloud',
    highlights: [
      'Architected backend systems into microservices using Java Spring Boot, defining service boundaries and REST communication.',
      'Evaluated and optimized computer vision models, integrating Django-based inference pipeline for real-time predictions.',
      'Collaborated in Agile sprint cycles, delivering milestones ahead of schedule.',
    ],
    tags: ['JAVA', 'SPRING BOOT', 'MICROSERVICES', 'CV/ML'],
    stat: { label: 'DELIVERY', value: 'AHEAD OF SCHEDULE' },
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

        <motion.div style={{ marginTop: '40px', opacity: contentOpacity }}>
          {experiences.map((exp, idx) => {
            // Format highlights as description
            const description = exp.highlights ? exp.highlights.join(' • ') : '';
            const item = {
              title: exp.company,
              subtitle: exp.role,
              period: exp.period,
              description,
              tags: exp.tags,
              stat: exp.stat ? `${exp.stat.label}: ${exp.stat.value}` : null,
              accentColor: '#FF0000', // Red for experience
            };

            return (
              <TimelineCard
                key={exp.company}
                index={idx}
                total={experiences.length}
                item={item}
                zoneProgress={zoneProgress}
                isLeft={idx % 2 === 0}
              />
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
}
