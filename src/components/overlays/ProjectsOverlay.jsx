import BeatPanel from './BeatPanel';

const projects = [
  {
    name: 'Algnosis',
    tagline: 'AI Diagnostic Platform',
    description: 'AI-powered medical imaging. MRI classification with Spring Boot backend and Django ML pipeline, +30% accuracy in pathology detection.',
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
  return (
    <BeatPanel
      zoneProgress={zoneProgress}
      active={active}
      label="SECTION_03"
      title="Cool Projects"
      subtitle="Things I've built and loved building // Proof of concept"
      accent="var(--accent-cyan)"
      accentColor="#22C3EE"
      items={projects.map((proj) => ({
        title: proj.name,
        subtitle: proj.tagline,
        description: proj.description,
        tags: proj.tags,
        stat: proj.stat ? `${proj.stat.label}: ${proj.stat.value}` : null,
      }))}
    />
  );
}
