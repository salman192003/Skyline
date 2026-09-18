import BeatPanel from './BeatPanel';
import VerticalTimeline from './VerticalTimeline';

const experiences = [
  {
    company: 'AdalFi',
    role: 'Software Engineer',
    period: 'Aug. 2026 – Present',
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
    highlights: [
      'Architected backend systems into microservices using Java Spring Boot, defining service boundaries and REST communication.',
      'Evaluated and optimized computer vision models, integrating Django-based inference pipeline for real-time predictions.',
      'Collaborated in Agile sprint cycles, delivering milestones ahead of schedule.',
    ],
    tags: ['JAVA', 'SPRING BOOT', 'MICROSERVICES', 'CV/ML'],
    stat: { label: 'DELIVERY', value: 'AHEAD OF SCHEDULE' },
  },
];

const items = experiences.map((exp) => ({
  title: exp.company,
  subtitle: exp.role,
  period: exp.period,
  description: exp.highlights[0],
  tags: exp.tags,
  stat: exp.stat ? `${exp.stat.label}: ${exp.stat.value}` : null,
}));

export default function ExperienceOverlay({ zoneProgress, active }) {
  return (
    <BeatPanel
      zoneProgress={zoneProgress}
      active={active}
      label="SECTION_02"
      title="Experience"
      subtitle="Shipping code that matters // Real-world impact"
      accent="var(--primary)"
      bodyMaxWidth="650px"
    >
      <VerticalTimeline items={items} zoneProgress={zoneProgress} accentColor="#FF0000" />
    </BeatPanel>
  );
}
