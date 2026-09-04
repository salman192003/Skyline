import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from './SectionHeader';

const CATEGORY_ACCENT = {
  'Software Engineering': { fill: 'var(--primary)', on: 'var(--nothing-white)', glow: 'var(--primary-glow)' },
  'Data Science': { fill: 'var(--accent-amber)', on: 'var(--on-accent-light)', glow: 'var(--accent-amber-glow)' },
  'AI/ML': { fill: 'var(--accent-green)', on: 'var(--on-accent-light)', glow: 'var(--accent-green-glow)' },
  'Computer Vision': { fill: 'var(--accent-cyan)', on: 'var(--on-accent-light)', glow: 'var(--accent-cyan-glow)' },
};

export default function ProjectsSection() {
  const [activeTab, setActiveTab] = useState('Software Engineering');

  const tabs = ['Software Engineering', 'Data Science', 'AI/ML', 'Computer Vision'];

  const projects = [
    {
      name: 'Algnosis',
      tagline: 'AI Diagnostic Platform',
      description: 'AI-powered diagnostic platform for medical imaging. MRI classification system with Spring Boot backend and Django ML pipeline, achieving 30% accuracy increase in pathology detection.',
      tags: ['SPRING BOOT', 'DJANGO', 'ML', 'MRI'],
      stat: { label: 'ACCURACY', value: '+30%' },
      icon: 'biotech',
      span: 7,
      featured: true,
      category: ['Computer Vision', 'Software Engineering'],
    },
    {
      name: 'EmCon',
      tagline: 'Emergency Control System',
      description: 'Real-time emergency routing and dispatch system. Redis-based caching achieving 40% load reduction, FastAPI backbone with WebSocket communications.',
      tags: ['FASTAPI', 'REDIS', 'WEBSOCKET'],
      stat: { label: 'LOAD REDUCTION', value: '-40%' },
      icon: 'emergency',
      span: 5,
      featured: false,
      category: ['Software Engineering'],
    },
    {
      name: 'Inventra',
      tagline: 'AI Business Analytics',
      description: 'Intelligent business analytics platform with Text-to-SQL natural language engine achieving 95% query success rate. Deployed with AWS SageMaker for ML inference.',
      tags: ['TEXT-TO-SQL', 'AWS SAGEMAKER', 'REACT', 'NLP'],
      stat: { label: 'SQL SUCCESS RATE', value: '95%' },
      icon: 'analytics',
      span: 12,
      featured: true,
      category: ['AI/ML', 'Software Engineering'],
    },
    {
      name: 'Predictive E-Commerce Analytics',
      tagline: 'Order Cancellation Forecasting',
      description: 'Engineered an automated data pipeline for 600k+ raw transactions. Analyzed operational bottlenecks and developed predictive machine learning models to forecast cancellations, achieving an 85% predictive accuracy to guide proactive risk mitigation.',
      tags: ['PYTHON', 'PANDAS', 'SCIKIT-LEARN', 'ML'],
      stat: { label: 'PREDICTIVE ACCURACY', value: '85%' },
      icon: 'monitoring',
      span: 7,
      featured: false,
      category: ['Data Science'],
    },
    {
      name: 'IRKD',
      tagline: 'Inter Resolution Knowledge Distillation',
      description: 'Developed a compact Vision Transformer (ViT) training framework leveraging saliency maps for guided knowledge distillation and curriculum learning to improve generalization.',
      tags: ['DEEP LEARNING', 'MACHINE LEARNING', 'VIT'],
      stat: { label: 'MODEL TYPE', value: 'ViT' },
      icon: 'visibility',
      span: 5,
      featured: false,
      category: ['Computer Vision'],
    },
    {
      name: 'Urdu News Classification',
      tagline: 'End-to-End News Recommendation',
      description: 'Built a scalable pipeline for a news recommendation system by web scraping Urdu articles and classifying them using Neural Networks and Bayesian models to identify the most effective personalization approach.',
      tags: ['MACHINE LEARNING', 'NLP', 'NEURAL NETWORKS'],
      stat: { label: 'PIPELINE', value: 'E2E' },
      icon: 'article',
      span: 12,
      featured: false,
      category: ['AI/ML'],
    },
    {
      name: 'Supply Chain Optimisation',
      tagline: 'Retail Purchasing Strategy',
      description: 'Developed an Integer Linear Program to optimize purchasing strategies for an e-commerce retailer. Navigated supply chain disruptions and constraints including budget, diversification, and demand to maximize profit and mitigate supplier risks.',
      tags: ['LINEAR PROGRAMMING', 'OPTIMIZATION', 'SUPPLY CHAIN'],
      stat: { label: 'STRATEGY', value: 'OPTIMIZED' },
      icon: 'local_shipping',
      span: 12,
      featured: false,
      category: ['Data Science'],
    },
  ];

  const filteredProjects = projects.filter(p => p.category.includes(activeTab));

  return (
    <section id="projects" style={{ padding: '80px 0' }}>
      <SectionHeader
        label="SECTION_04"
        title="PROJECTS"
        subtitle="Innovation Cluster // Deployed Systems"
      />

      <div style={{
        display: 'flex',
        gap: '12px',
        marginTop: '32px',
        flexWrap: 'wrap',
      }}>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-pill)',
              background: activeTab === tab ? CATEGORY_ACCENT[tab].fill : 'var(--surface-container-highest)',
              color: activeTab === tab ? CATEGORY_ACCENT[tab].on : 'var(--on-surface-variant)',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <motion.div layout style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: '20px',
        marginTop: '40px',
      }}>
        <AnimatePresence>
        {filteredProjects.map((project, i) => {
          const accent = CATEGORY_ACCENT[project.category[0]] ?? CATEGORY_ACCENT['Software Engineering'];
          return (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            key={project.name}
            className="bento-card card"
            style={{
              gridColumn: `span ${project.span}`,
              '--card-tint': 'var(--surface-container)',
              '--tag-accent': accent.fill,
              '--tag-accent-on': accent.on,
              padding: project.span === 12 ? '40px' : '32px',
              display: 'flex',
              flexDirection: project.span === 12 ? 'row' : 'column',
              justifyContent: 'space-between',
              minHeight: project.span === 12 ? '220px' : '360px',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              gap: project.span === 12 ? '48px' : '0',
              flexWrap: 'wrap',
            }}
            onMouseEnter={(e) => {
              const glow = e.currentTarget.querySelector('.project-glow');
              if (glow) glow.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              const glow = e.currentTarget.querySelector('.project-glow');
              if (glow) glow.style.opacity = '0';
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
                background: `radial-gradient(circle at center, ${accent.glow} 0%, transparent 50%)`,
                opacity: 0,
                transition: 'opacity 0.5s ease',
                pointerEvents: 'none',
              }}
            />

            <div style={{ flex: project.span === 12 ? '0 0 40%' : '1 1 auto', position: 'relative', zIndex: 1 }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '16px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    background: project.featured ? accent.fill : 'var(--surface-container-highest)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <span className="material-symbols-outlined" style={{
                      fontSize: '20px',
                      color: project.featured ? accent.on : 'var(--on-surface)',
                    }}>
                      {project.icon}
                    </span>
                  </div>
                  <div>
                    <span className="dot-matrix" style={{ fontSize: '0.5rem', color: 'var(--on-surface-dim)', display: 'block' }}>
                      {project.tagline}
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined" style={{
                  fontSize: '18px',
                  color: 'var(--on-surface-dim)',
                  opacity: 0.5,
                }}>
                  open_in_new
                </span>
              </div>

              <h3 className="font-headline" style={{
                fontSize: project.span === 12 ? '2.5rem' : '2rem',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                color: 'var(--on-surface)',
                marginBottom: '12px',
              }}>
                {project.name}
              </h3>

              <div style={{ marginBottom: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {project.category.map(cat => (
                  <span key={cat} className="tag" style={{ background: 'var(--surface-container-highest)' }}>{cat}</span>
                ))}
              </div>

              <p className="font-body" style={{
                fontSize: '0.85rem',
                color: 'var(--on-surface-variant)',
                lineHeight: 1.6,
                maxWidth: '450px',
              }}>
                {project.description}
              </p>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: project.span === 12 ? 'column' : 'row',
              justifyContent: project.span === 12 ? 'center' : 'space-between',
              alignItems: project.span === 12 ? 'flex-end' : 'flex-end',
              gap: '16px',
              position: 'relative',
              zIndex: 1,
              flex: project.span === 12 ? '1 1 auto' : 'none',
              marginTop: project.span === 12 ? '0' : '16px',
            }}>
              {/* Stat widget */}
              <div style={{
                background: 'var(--surface-container-highest)',
                borderRadius: 'var(--radius-inner)',
                padding: '20px 24px',
                textAlign: project.span === 12 ? 'center' : 'left',
                minWidth: project.span === 12 ? '180px' : 'auto',
              }}>
                <span className="dot-matrix" style={{
                  fontSize: '0.45rem',
                  color: 'var(--on-surface-dim)',
                  display: 'block',
                  marginBottom: '4px',
                }}>
                  {project.stat.label}
                </span>
                <span className="font-headline" style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: accent.fill,
                  letterSpacing: '-0.04em',
                }}>
                  {project.stat.value}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: project.span === 12 ? 'flex-end' : 'flex-start' }}>
                {project.tags.map((tag) => (
                  <span key={tag} className="tag" style={{ fontSize: '0.55rem' }}>{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
          );
        })}
        </AnimatePresence>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          #projects .bento-card {
            grid-column: span 12 !important;
            flex-direction: column !important;
            min-height: auto !important;
          }
        }
      `}</style>
    </section>
  );
}
