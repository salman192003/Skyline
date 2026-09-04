import { useRef, useEffect } from 'react';
import SectionHeader from './SectionHeader';

export default function EducationSection() {
  const courses = [
    'MACHINE LEARNING', 'COMPUTER VISION', 'DISTRIBUTED SYSTEMS',
    'DATA STRUCTURES', 'ALGORITHMS', 'OPERATING SYSTEMS',
    'ARTIFICIAL INTELLIGENCE', 'SOFTWARE ENGINEERING', 'DATABASES',
  ];

  return (
    <section id="education" style={{ padding: '120px 0 80px' }}>
      <SectionHeader
        label="SECTION_01"
        title="EDUCATION"
        subtitle="Academic Foundation // Knowledge Base"
        accent="var(--accent-amber)"
      />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: '20px',
        marginTop: '40px',
      }}>
        {/* Main Degree Card - LUMS */}
        <div
          className="bento-card card"
          style={{
            gridColumn: 'span 8',
            '--card-tint': 'var(--surface-container)',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '380px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative glow */}
          <div style={{
            position: 'absolute',
            top: '-60px',
            right: '-60px',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'var(--accent-amber-glow)',
            filter: 'blur(80px)',
            pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'var(--surface-container-highest)',
                padding: '6px 16px',
                borderRadius: 'var(--radius-pill)',
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: '14px', color: 'var(--accent-amber)' }}>school</span>
                <span className="dot-matrix" style={{ fontSize: '1rem', color: 'var(--on-surface)' }}>
                  BSc COMPUTER SCIENCE
                </span>
              </div>
              <span className="dot-matrix" style={{ fontSize: '1rem', color: 'var(--on-surface-dim)' }}>
                2022 — 2026
              </span>
            </div>

            <h2 className="font-headline" style={{
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              marginTop: '32px',
              color: 'var(--on-surface)',
            }}>
              Lahore University of<br />Management Sciences
            </h2>

            <p className="font-body" style={{
              fontSize: '0.95rem',
              color: 'var(--on-surface-variant)',
              lineHeight: 1.7,
              maxWidth: '500px',
              marginTop: '16px',
            }}>
              Rigorous academic training in fundamental CS theory, advanced ML, and distributed systems engineering. Graduating May 2026.
            </p>
          </div>

          {/* Inner stats grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            marginTop: '32px',
            position: 'relative',
            zIndex: 1,
          }}>
            <div style={{
              background: 'var(--surface-container-highest)',
              borderRadius: 'var(--radius-inner)',
              padding: '20px',
            }}>
              <span className="dot-matrix" style={{ fontSize: '0.55rem', color: 'var(--on-surface-dim)' }}>CGPA</span>
              <div className="font-headline" style={{
                fontSize: '2rem',
                fontWeight: 700,
                color: 'var(--on-surface)',
                marginTop: '4px',
              }}>
                3.62<span style={{ color: 'var(--accent-amber)', fontSize: '1rem' }}>/4.0</span>
              </div>
            </div>

            <div style={{
              background: 'var(--surface-container-highest)',
              borderRadius: 'var(--radius-inner)',
              padding: '20px',
            }}>
              <span className="dot-matrix" style={{ fontSize: '0.55rem', color: 'var(--on-surface-dim)' }}>HONOR</span>
              <div className="font-headline" style={{
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--on-surface)',
                marginTop: '8px',
                letterSpacing: '-0.02em',
              }}>
                Dean's<br />Honor's List
              </div>
            </div>

          </div>
        </div>

        {/* Coursework Card */}
        <div
          className="bento-card card"
          style={{
            gridColumn: 'span 4',
            '--card-tint': 'var(--surface-low)',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--accent-amber)' }}>
              account_tree
            </span>
            <span className="dot-matrix" style={{ fontSize: '0.6rem', color: 'var(--on-surface-variant)' }}>
              CORE COURSEWORK
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
            {courses.map((course, i) => (
              <div
                key={course}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '8px 0',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.querySelector('.course-idx').style.color = 'var(--accent-amber)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.querySelector('.course-idx').style.color = 'var(--on-surface-dim)';
                }}
              >
                <span
                  className="course-idx dot-matrix"
                  style={{ fontSize: '0.55rem', color: 'var(--on-surface-dim)', width: '24px' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-headline" style={{
                  fontSize: '0.75rem',
                  letterSpacing: '0.08em',
                  color: 'var(--on-surface)',
                }}>
                  {course}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #education .bento-card {
            grid-column: span 12 !important;
          }
          #education > div > div:first-child > div:last-child {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
