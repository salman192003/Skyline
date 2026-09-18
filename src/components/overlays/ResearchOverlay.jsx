import BeatPanel from './BeatPanel';
import VerticalTimeline from './VerticalTimeline';

const researchItems = [
  {
    title: 'LUMSx Research & Teaching Assistant',
    subtitle: 'LUMS',
    period: 'Jul. 2026 – Present',
    description: 'Supporting industry professionals in developing advanced skills in Data Science, analytics, and practical ML workflows.',
    tags: ['DATA SCIENCE', 'ML', 'MENTORSHIP'],
    stat: 'PART-TIME',
  },
  {
    title: 'Undergraduate Researcher',
    subtitle: 'Computer Vision & Graphics Lab, LUMS',
    period: 'May 2025 – Jul. 2026',
    description: 'Saliency-guided curriculum learning framework for Knowledge Distillation — benchmarked ResNet, Wide ResNet, and ViT, cutting training time up to 40%. Extended to ECCV 2026 / WACV 2027 submissions.',
    tags: ['COMPUTER VISION', 'KNOWLEDGE DISTILLATION', 'RESEARCH'],
    stat: '40% SPEEDUP',
  },
  {
    title: 'Teaching Assistant — Algorithms',
    subtitle: 'LUMS, CS 310 / 5102',
    period: 'Aug. 2025 – Dec. 2025',
    description: 'Weekly office hours guiding 300+ students through coursework and exams, plus assessment design with the teaching team.',
    tags: ['TEACHING', 'MENTORSHIP', 'ALGORITHMS'],
    stat: '300+ STUDENTS',
  },
  {
    title: 'Teaching Assistant — Digital Logic Design',
    subtitle: 'LUMS',
    period: 'Jan. 2025 – Jul. 2025',
    description: 'Led weekly 3-hour labs on hardware modeling and digital design; mentored end-of-course projects.',
    tags: ['TEACHING', 'DIGITAL LOGIC', 'HARDWARE'],
    stat: '3-HR LABS',
  },
];

export default function ResearchOverlay({ zoneProgress, active }) {
  return (
    <BeatPanel
      zoneProgress={zoneProgress}
      active={active}
      label="SECTION_04"
      title="Research & Teaching"
      subtitle="Deep dives & mentoring // Giving back while pushing forward"
      accent="var(--accent-green)"
      bodyMaxWidth="650px"
    >
      <VerticalTimeline items={researchItems} zoneProgress={zoneProgress} accentColor="#3DFF7A" />
    </BeatPanel>
  );
}
