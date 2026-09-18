import BeatPanel from './BeatPanel';
import SplitPanel from './SplitPanel';

const educationItems = [
  {
    title: 'Lahore University of Management Sciences',
    subtitle: 'B.S. in Computer Science (2022–2026)',
    period: 'LUMS',
    description: 'Deep dives into ML, computer vision, distributed systems, and algorithms. Keeping the fundamentals sharp.',
    tags: ['MACHINE LEARNING', 'CV', 'ALGORITHMS', 'DATA STRUCTURES'],
  },
  {
    title: 'Hobbies & Interests',
    subtitle: 'Outside the terminal',
    period: 'Ongoing',
    description: 'Photography, gaming, building random side-projects, and way too much coffee. (Placeholder — swap in the real ones.)',
    tags: ['PHOTOGRAPHY', 'GAMING', 'BUILDING STUFF', 'COFFEE'],
  },
];

export default function EducationOverlay({ zoneProgress, active }) {
  return (
    <BeatPanel
      zoneProgress={zoneProgress}
      active={active}
      label="SECTION_01"
      title="School & Fun Stuff"
      subtitle="Brain fuel and what keeps the mind sharp"
      accent="var(--accent-amber)"
      bodyMaxWidth="900px"
    >
      <SplitPanel items={educationItems} zoneProgress={zoneProgress} accentColor="#FFB864" />
    </BeatPanel>
  );
}
