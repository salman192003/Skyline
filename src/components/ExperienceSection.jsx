import SectionHeader from './SectionHeader';

export default function ExperienceSection() {
  const experiences = [
    {
      company: '10Pearls',
      role: 'Software Engineering Intern',
      period: 'Dec. 2025 – Feb. 2026',
      icon: 'code',
      color: 'var(--accent-green)',
      highlights: [
        'Architected scalable RESTful services using ASP.NET Core, implementing JWT and OAuth2 protocols to secure endpoints and ensure high availability.',
        'Optimized SQL Server performance via advanced indexing and query profiling, achieving a 35% reduction in average response times.',
        'Engineered CI/CD pipelines and comprehensive testing suites using xUnit, maintaining 85% code coverage to ensure system stability.'
      ],
      tags: ['ASP.NET CORE', 'SQL SERVER', 'C#', 'CI/CD'],
      stat: { label: 'RESPONSE TIME', value: '-35%', suffix: '' },
    },
    {
      company: 'Netsol Technologies Ltd.',
      role: 'Software Engineering Intern',
      period: 'July 2025 – Aug. 2025',
      icon: 'cloud',
      color: 'var(--accent-green)',
      highlights: [
        'Engineered enterprise grade backend services using Java Spring Boot, designing modular data layers for core system communication.',
        'Developed an automated data transformation pipeline utilizing LLM APIs and prompt engineering for structured analytical intelligence.',
        'Refactored legacy Java modules implementing Design Patterns, improving maintainability across mission-critical banking subsystems.'
      ],
      tags: ['JAVA', 'SPRING BOOT', 'LLM', 'DESIGN PATTERNS'],
      stat: { label: 'PIPELINE', value: 'LLM', suffix: '-DRIVEN' },
    },
    {
      company: 'Lahore University of Management Sciences',
      role: 'Teaching Assistant, Algorithms',
      period: 'Aug. 2025 – Dec. 2025',
      icon: 'co_present',
      color: 'var(--accent-green)',
      highlights: [
        'Collaborated to design and evaluate rigorous algorithmic assessments for a cohort of 300+ undergraduate students.',
        'Facilitated technical labs resolving complex queries regarding dynamic programming and graph theory.',
        'Provided constructive feedback on student code implementations and fundamental logic paradigms.'
      ],
      tags: ['ALGORITHMS', 'TEACHING', 'MENTORSHIP'],
      stat: { label: 'STUDENTS', value: '300', suffix: '+' },
    },
  ];

  return (
    <section id="experience" style={{ padding: '80px 0', '--tag-accent': 'var(--accent-green)', '--tag-accent-on': 'var(--on-accent-light)' }}>
      <SectionHeader
        label="SECTION_03"
        title="EXPERIENCE"
        subtitle="Professional Deployment // Active Nodes"
        accent="var(--accent-green)"
      />

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        marginTop: '60px',
        position: 'relative'
      }}>
        {/* Subtle timeline connector */}
        <div style={{
          position: 'absolute',
          left: '39px',
          top: '40px',
          bottom: '40px',
          width: '2px',
          background: 'var(--surface-container-highest)',
          zIndex: 0
        }} className="timeline-connector" />

        {experiences.map((exp, i) => (
          <div
            key={exp.company}
            className="bento-card card"
            style={{
              position: 'relative',
              zIndex: 1,
              '--card-tint': 'var(--surface-container)',
              padding: '40px',
              display: 'grid',
              gridTemplateColumns: 'minmax(250px, 1fr) 2fr',
              gap: '40px',
              overflow: 'hidden',
            }}
          >
            {/* Hover glow */}
            <div
              className="project-glow"
              style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: 'radial-gradient(circle at center, var(--accent-green-glow) 0%, transparent 50%)',
                opacity: 0,
                transition: 'opacity 0.5s ease',
                pointerEvents: 'none',
                zIndex: 0
              }}
            />

            {/* Left Column: Context */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '20px',
                  background: 'var(--surface-container-highest)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span className="material-symbols-outlined" style={{
                    fontSize: '36px',
                    color: exp.color,
                  }}>
                    {exp.icon}
                  </span>
                </div>
              </div>
              
              <h3 className="font-headline" style={{
                fontSize: '1.8rem',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: 'var(--on-surface)',
                marginBottom: '8px'
              }}>
                {exp.company}
              </h3>
              <div className="dot-matrix" style={{
                fontSize: '0.75rem',
                color: 'var(--accent-green)',
                marginBottom: '16px'
              }}>
                {exp.role.toUpperCase()}
              </div>
              <div className="dot-matrix" style={{
                fontSize: '0.65rem',
                color: 'var(--on-surface-dim)',
              }}>
                {exp.period}
              </div>

              {/* Desktop Stat Badge */}
              <div className="desktop-stat" style={{
                marginTop: '40px',
                background: 'var(--surface-container-highest)',
                borderRadius: 'var(--radius-inner)',
                padding: '20px',
                borderLeft: '2px solid var(--accent-green)',
                display: 'inline-block'
              }}>
                <span className="dot-matrix" style={{ fontSize: '0.55rem', color: 'var(--on-surface-dim)', display: 'block', marginBottom: '4px' }}>
                  {exp.stat.label}
                </span>
                <span className="font-headline" style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: 'var(--accent-green)',
                }}>
                  {exp.stat.value}
                </span>
                <span className="dot-matrix" style={{ fontSize: '0.65rem', color: 'var(--on-surface-dim)' }}>
                  {exp.stat.suffix}
                </span>
              </div>
            </div>

            {/* Right Column: Details */}
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                {exp.highlights.map((h, j) => (
                  <div key={j} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <span className="dot-matrix" style={{
                      fontSize: '0.6rem',
                      color: 'var(--on-surface-dim)',
                      marginTop: '6px',
                      flexShrink: 0,
                    }}>
                      [{String(j + 1).padStart(2, '0')}]
                    </span>
                    <p className="font-body" style={{
                      fontSize: '0.95rem',
                      color: 'var(--on-surface-variant)',
                      lineHeight: 1.7,
                    }}>
                      {h}
                    </p>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {exp.tags.map((tag) => (
                  <span key={tag} className="tag" style={{ fontSize: '0.65rem' }}>{tag}</span>
                ))}
              </div>

              {/* Mobile Stat Badge (Hidden on Desktop via CSS) */}
              <div className="mobile-stat" style={{
                marginTop: '24px',
                background: 'var(--surface-container-highest)',
                borderRadius: 'var(--radius-inner)',
                padding: '16px',
                borderLeft: '2px solid var(--accent-green)',
                display: 'none'
              }}>
                <span className="dot-matrix" style={{ fontSize: '0.55rem', color: 'var(--on-surface-dim)', display: 'block', marginBottom: '4px' }}>
                  {exp.stat.label}
                </span>
                <span className="font-headline" style={{
                  fontSize: '1.8rem',
                  fontWeight: 700,
                  color: 'var(--accent-green)',
                }}>
                  {exp.stat.value}
                </span>
                <span className="dot-matrix" style={{ fontSize: '0.65rem', color: 'var(--on-surface-dim)' }}>
                  {exp.stat.suffix}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          #experience .bento-card {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
            padding: 32px !important;
          }
          .timeline-connector {
            display: none !important;
          }
          .desktop-stat {
            display: none !important;
          }
          .mobile-stat {
            display: inline-block !important;
          }
        }
        
        #experience .bento-card:hover .project-glow {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
}
