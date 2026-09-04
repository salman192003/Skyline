import SectionHeader from './SectionHeader';

export default function ResearchSection() {
  return (
    <section id="research" style={{ padding: '80px 0', '--tag-accent': 'var(--accent-cyan)', '--tag-accent-on': 'var(--on-accent-light)' }}>
      <SectionHeader
        label="SECTION_02"
        title="RESEARCH"
        subtitle="Active Processing // CVGL Lab Node"
        accent="var(--accent-cyan)"
      />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: '20px',
        marginTop: '40px',
      }}>
        {/* Card 1: CVGL Lab */}
        <div
          className="bento-card card"
          style={{
            gridColumn: 'span 4',
            '--card-tint': 'var(--surface-container)',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '320px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Top accent bar */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, var(--primary), var(--accent-amber), var(--accent-cyan), var(--accent-green))',
          }} />

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <span className="dot-matrix" style={{ fontSize: '0.55rem', color: 'var(--on-surface-dim)' }}>
                RESEARCH ASSISTANT
              </span>
              <span className="material-symbols-outlined" style={{
                fontSize: '16px',
                color: 'var(--accent-cyan)',
                fontVariationSettings: "'FILL' 1",
              }}>
                verified
              </span>
            </div>

            <h3 className="font-headline" style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: 'var(--on-surface)',
              marginBottom: '12px',
            }}>
              Computer Vision &<br />Graphics Lab
            </h3>

            <p className="font-body" style={{
              fontSize: '0.85rem',
              color: 'var(--on-surface-variant)',
              lineHeight: 1.6,
              marginBottom: '8px',
            }}>
              Under the supervision of <strong style={{ color: 'var(--on-surface)' }}>Dr. Murtaza Taj</strong> at LUMS CVGL.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '16px' }}>
            <span className="tag">COMPUTER VISION</span>
            <span className="tag">MODEL COMPRESSION</span>
          </div>
        </div>

        {/* Card 2: ECCV Manuscript */}
        <div
          className="bento-card card"
          style={{
            gridColumn: 'span 8',
            '--card-tint': 'var(--surface-low)',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '320px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background glow */}
          <div style={{
            position: 'absolute',
            top: '-40px',
            right: '-40px',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'var(--accent-cyan-glow)',
            filter: 'blur(80px)',
            pointerEvents: 'none',
          }} />

          {/* Dot pattern */}
          <div className="dot-pattern" style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.03,
            pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'var(--accent-cyan-glow)',
                padding: '6px 14px',
                borderRadius: 'var(--radius-pill)',
              }}>
                <span className="dot-matrix" style={{ fontSize: '0.55rem', color: 'var(--accent-cyan)' }}>
                  IN_REVIEW // ECCV 2026
                </span>
              </div>
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--on-surface-dim)' }}>
                description
              </span>
            </div>

            <h3 className="font-body" style={{
              fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
              fontWeight: 500,
              color: 'var(--on-surface)',
              lineHeight: 1.3,
              marginBottom: '16px',
              maxWidth: '600px',
            }}>
              Model Compression & Knowledge Distillation for Efficient Scene Understanding
            </h3>

            <p className="font-body" style={{
              fontSize: '0.9rem',
              color: 'var(--on-surface-variant)',
              lineHeight: 1.7,
              maxWidth: '550px',
              marginBottom: '24px',
            }}>
              Proposed a novel knowledge distillation framework targeting Vision Transformers and Wide Residual Networks, achieving significant inference speedup while maintaining accuracy benchmarks.
            </p>
          </div>

          {/* Visualization bar chart */}
          <div style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            gap: '4px',
            alignItems: 'flex-end',
            height: '60px',
            marginBottom: '16px',
          }}>
            {[30, 45, 60, 85, 100, 90, 50, 35, 20].map((h, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${h}%`,
                  background:
                    h > 70
                      ? 'var(--accent-cyan)'
                      : `color-mix(in srgb, var(--accent-cyan) ${Math.round(h / 2 + 10)}%, transparent)`,
                  borderRadius: '2px 2px 0 0',
                  transition: 'background 0.3s ease',
                }}
              />
            ))}
          </div>

          <button style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--accent-cyan)',
            color: 'var(--on-accent-light)',
            border: 'none',
            borderRadius: 'var(--radius-pill)',
            padding: '12px 24px',
            fontFamily: 'var(--font-body)',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'transform 0.3s var(--ease-out-expo)',
            width: 'fit-content',
            position: 'relative',
            zIndex: 1,
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.03)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>
              download
            </span>
            PREPRINT
          </button>
        </div>

        {/* Card 3: Technical Expertise */}
        <div
          className="bento-card card"
          style={{
            gridColumn: 'span 12',
            '--card-tint': 'var(--surface-container)',
            padding: '32px 40px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '48px',
            flexWrap: 'wrap',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background gradient */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, var(--surface-container) 0%, var(--surface-low) 50%, var(--surface-container) 100%)',
            opacity: 0.5,
            pointerEvents: 'none',
          }} />

          <div style={{ flex: '0 0 auto', position: 'relative', zIndex: 1, minWidth: '200px' }}>
            <span className="dot-matrix" style={{ fontSize: '0.55rem', color: 'var(--accent-cyan)' }}>
              CORE COMPETENCY // 01
            </span>
            <h3 className="font-headline" style={{
              fontSize: '1.4rem',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: 'var(--on-surface)',
              marginTop: '8px',
            }}>
              Knowledge Distillation<br />& Model Compression
            </h3>
          </div>

          {/* Distillation flow */}
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            position: 'relative',
            zIndex: 1,
            minWidth: '300px',
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
            }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '12px',
                background: 'var(--surface-container-highest)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: '22px', color: 'var(--on-surface)' }}>
                  memory
                </span>
              </div>
              <span className="dot-matrix" style={{ fontSize: '0.5rem', color: 'var(--on-surface-dim)' }}>
                TEACHER (ViT)
              </span>
            </div>

            {/* Arrow flow */}
            <div style={{
              flex: 1,
              height: '2px',
              background: 'var(--surface-bright)',
              position: 'relative',
              maxWidth: '200px',
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: '60%',
                background: 'var(--accent-cyan)',
              }} />
              <span className="material-symbols-outlined" style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '16px',
                color: 'var(--accent-cyan)',
                background: 'var(--surface-container)',
                padding: '0 8px',
                fontVariationSettings: "'FILL' 1",
              }}>
                arrow_forward
              </span>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
            }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'var(--accent-cyan-glow)',
                border: '1px solid color-mix(in srgb, var(--accent-cyan) 30%, transparent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--accent-cyan)' }}>
                  bolt
                </span>
              </div>
              <span className="dot-matrix" style={{ fontSize: '0.5rem', color: 'var(--accent-cyan)' }}>
                STUDENT (WRN)
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #research .bento-card {
            grid-column: span 12 !important;
          }
        }
      `}</style>
    </section>
  );
}
