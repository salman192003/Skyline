import { motion } from 'framer-motion';
import { remap } from '../hero-city/cityConfig';
import SectionHeader from '../SectionHeader';
import TimelineCard from './TimelineCard';

const researchItems = [
  {
    title: 'LUMSx Research & Teaching Assistant',
    subtitle: 'LUMS',
    period: 'Jul. 2026 – Present',
    description: 'Supporting industry professionals in developing advanced skills in Data Science, analytics, and practical machine learning workflows.',
    tags: ['DATA SCIENCE', 'ML', 'MENTORSHIP', 'REMOTE'],
    stat: 'PART-TIME',
  },
  {
    title: 'Undergraduate Researcher',
    subtitle: 'Computer Vision & Graphics Lab, LUMS',
    period: 'May 2025 – Jul. 2026',
    description: 'Developed a novel saliency-guided curriculum learning framework for Knowledge Distillation. Engineered and benchmarked ResNet, Wide ResNet, and ViT architectures, improving student model performance while reducing training time by up to 40%. Work extended to ECCV 2026 and WACV 2027 submissions.',
    tags: ['COMPUTER VISION', 'KNOWLEDGE DISTILLATION', 'DEEP LEARNING', 'RESEARCH'],
    stat: '40% SPEEDUP',
  },
  {
    title: 'Teaching Assistant — Algorithms',
    subtitle: 'LUMS, CS 310 / 5102',
    period: 'Aug. 2025 – Dec. 2025',
    description: 'Conducted weekly office hours to guide 300+ students with coursework and exam prep. Collaborated on coursework testing and exam evaluation. Coordinated with instructor Dr. Imdad Ullah Khan on course objectives.',
    tags: ['TEACHING', 'MENTORSHIP', 'ALGORITHMS'],
    stat: '300+ STUDENTS',
  },
  {
    title: 'Teaching Assistant — Digital Logic Design',
    subtitle: 'LUMS',
    period: 'Jan. 2025 – Jul. 2025',
    description: 'Led weekly 3-hour labs on hardware modeling and digital design. Mentored students on end-of-course projects and exam preparation. Collaborated with TAs on effective assessment design.',
    tags: ['TEACHING', 'DIGITAL LOGIC', 'HARDWARE DESIGN'],
    stat: '3-HR LABS',
  },
];

export default function ResearchOverlay({ zoneProgress, active }) {
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
      <div style={{ maxWidth: '750px', width: '100%' }}>
        <motion.div style={{ opacity: contentOpacity }}>
          <SectionHeader
            label="SECTION_04"
            title="Research & Teaching"
            subtitle="Deep dives & mentoring // Giving back while pushing forward"
            accent="var(--accent-green)"
          />
        </motion.div>

        <motion.div style={{ marginTop: '40px', opacity: contentOpacity }}>
          {researchItems.map((item, idx) => (
            <TimelineCard
              key={item.title}
              index={idx}
              total={researchItems.length}
              item={{
                title: item.title,
                subtitle: item.subtitle,
                period: item.period,
                description: item.description,
                tags: item.tags,
                stat: item.stat,
                accentColor: '#3DFF7A', // Green for research
              }}
              zoneProgress={zoneProgress}
              isLeft={idx % 2 === 0}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
