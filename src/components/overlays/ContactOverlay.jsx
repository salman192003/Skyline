import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { remap } from '../hero-city/cityConfig';
import SectionHeader from '../SectionHeader';

const BOOT_SEQUENCE = [
  '> CONNECTION PROTOCOL INITIALIZED',
  '> PROFILE: SALMAN_AJMAL',
  '> STATUS: OPEN TO OPPORTUNITIES',
  '> SKILLS: Full-stack, Cloud, ML/AI',
  '> CONTACT:',
  '  |-- LinkedIn: linkedin.com/in/salman-ajmal',
  '  |-- GitHub:   github.com/salman192003',
  '  |__ Email:    salmanatwork1@gmail.com',
  '> TYPE A COMMAND BELOW: linkedin / github / email / help',
];

const LINKS = {
  linkedin: 'https://www.linkedin.com/in/salman-ajmal/',
  github: 'https://github.com/salman192003',
  email: 'mailto:salmanatwork1@gmail.com',
};

const HELP_TEXT = 'AVAILABLE: linkedin · github · email · help · clear';

export default function ContactOverlay({ zoneProgress, active, flat = false }) {
  const fadeInStart = 0;
  const fadeInEnd = 0.15;
  const fadeOutStart = 0.8;
  const fadeOutEnd = 1;

  const opacity = flat
    ? 1
    : zoneProgress < fadeInStart
    ? 0
    : zoneProgress < fadeInEnd
    ? remap(zoneProgress, fadeInStart, fadeInEnd, 0, 1)
    : zoneProgress < fadeOutStart
    ? 1
    : remap(zoneProgress, fadeOutStart, fadeOutEnd, 1, 0);

  const contentOpacity = flat ? 1 : remap(zoneProgress, 0.05, 0.25, 0, 1);

  const [terminalLines, setTerminalLines] = useState([]);
  const [bootDone, setBootDone] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [history, setHistory] = useState([]); // { type: 'input' | 'response', text }
  const terminalRef = useRef(null);
  const inputRef = useRef(null);
  const indexRef = useRef(0);

  // In flat (mobile) mode there's no scroll-driven "active" beat — boot once
  // the terminal scrolls into view instead.
  const [flatInView, setFlatInView] = useState(!flat);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!flat || !containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFlatInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [flat]);

  const shouldBoot = flat ? flatInView : active && contentOpacity >= 0.5;

  // Type out the boot sequence once the beat becomes visible
  useEffect(() => {
    if (!shouldBoot) return;

    indexRef.current = 0;
    setTerminalLines([]);
    setBootDone(false);
    setHistory([]);

    const interval = setInterval(() => {
      if (indexRef.current < BOOT_SEQUENCE.length) {
        setTerminalLines((prev) => [...prev, BOOT_SEQUENCE[indexRef.current]]);
        indexRef.current++;
      } else {
        clearInterval(interval);
        setBootDone(true);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [shouldBoot]);

  // Auto-focus the input once boot sequence finishes (desktop only — focusing
  // an input on mobile pops the keyboard up unprompted, which is unwelcome)
  useEffect(() => {
    if (bootDone && active && !flat && inputRef.current) {
      inputRef.current.focus();
    }
  }, [bootDone, active, flat]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalLines, history]);

  const runCommand = (raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      setHistory([]);
      return;
    }

    if (cmd === 'help') {
      setHistory((prev) => [...prev, { type: 'input', text: cmd }, { type: 'response', text: HELP_TEXT }]);
      return;
    }

    if (LINKS[cmd]) {
      setHistory((prev) => [
        ...prev,
        { type: 'input', text: cmd },
        { type: 'response', text: `Opening ${cmd}...`, accent: true },
      ]);
      window.open(LINKS[cmd], '_blank', 'noopener,noreferrer');
      return;
    }

    setHistory((prev) => [
      ...prev,
      { type: 'input', text: cmd },
      { type: 'response', text: `command not found: "${cmd}" — try: linkedin, github, email, help` },
    ]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      runCommand(inputValue);
      setInputValue('');
    }
  };

  return (
    <motion.div
      id={flat ? 'contact' : undefined}
      ref={containerRef}
      style={
        flat
          ? { padding: '80px 24px', opacity }
          : {
              position: 'fixed',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'clamp(20px, 4vh, 36px)',
              opacity,
              pointerEvents: active ? 'auto' : 'none',
              zIndex: 10,
              padding: '96px 32px 32px',
            }
      }
    >
      <div style={{ maxWidth: '700px', width: '100%', margin: flat ? '0 auto' : undefined }}>
        <motion.div style={{ opacity: contentOpacity }}>
          <SectionHeader
            label="SECTION_05"
            title="Contact"
            subtitle="Let's build something together // Open to collaboration"
            accent="var(--accent-green)"
          />
        </motion.div>

        <motion.div
          style={{
            marginTop: '32px',
            opacity: contentOpacity,
          }}
        >
          {/* Interactive Terminal */}
          <div
            className="bento-card card"
            style={{
              padding: '24px',
              '--card-tint': 'var(--surface-lowest)',
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: 'var(--surface-lowest)',
              border: '1px solid var(--surface-container-high)',
              fontFamily: 'monospace',
              cursor: 'text',
            }}
            onClick={() => inputRef.current?.focus()}
          >
            <div
              ref={terminalRef}
              style={{
                height: '280px',
                overflowY: 'auto',
                fontSize: '0.75rem',
                color: 'var(--on-surface)',
                lineHeight: '1.6',
              }}
            >
              {terminalLines.map((line, i) => (
                <div key={`boot-${i}`} style={{ opacity: 0.9 }}>
                  <span style={{ color: 'var(--primary)', marginRight: '8px' }}>→</span>
                  {line}
                </div>
              ))}

              {history.map((entry, i) =>
                entry.type === 'input' ? (
                  <div key={`hist-${i}`} style={{ marginTop: '6px', color: 'var(--on-surface)' }}>
                    <span style={{ color: 'var(--accent-green)', marginRight: '8px' }}>$</span>
                    {entry.text}
                  </div>
                ) : (
                  <div
                    key={`hist-${i}`}
                    style={{ color: entry.accent ? 'var(--accent-green)' : 'var(--on-surface-dim)', paddingLeft: '18px' }}
                  >
                    {entry.text}
                  </div>
                )
              )}

              {/* Live input line */}
              {bootDone && (
                <div style={{ marginTop: '6px', display: 'flex', alignItems: 'center', color: 'var(--accent-green)' }}>
                  <span style={{ marginRight: '8px' }}>$</span>
                  <span style={{ color: 'var(--on-surface)' }}>{inputValue}</span>
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    style={{ display: 'inline-block', width: '7px', height: '13px', background: 'var(--accent-green)', marginLeft: '2px' }}
                  />
                  {/* Real (invisible) input capturing keystrokes */}
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoComplete="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    style={{
                      position: 'absolute',
                      opacity: 0,
                      pointerEvents: 'none',
                      width: 0,
                      height: 0,
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          <p
            style={{
              marginTop: '10px',
              fontSize: '0.68rem',
              color: 'var(--on-surface-dim)',
              letterSpacing: '0.03em',
            }}
          >
            Click the terminal and type <span style={{ color: 'var(--accent-green)' }}>linkedin</span>,{' '}
            <span style={{ color: 'var(--accent-green)' }}>github</span>, or{' '}
            <span style={{ color: 'var(--accent-green)' }}>email</span>, then hit Enter.
          </p>

          {/* Skills Grid */}
          <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--on-surface-dim)', marginBottom: '8px', fontWeight: 600 }}>
                LANGUAGES
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {['SQL', 'Python', 'Java', 'C#', 'TypeScript'].map((lang) => (
                  <span key={lang} style={{ fontSize: '0.7rem', padding: '4px 10px', background: 'var(--surface-container-high)', borderRadius: '3px' }}>
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--on-surface-dim)', marginBottom: '8px', fontWeight: 600 }}>
                TOOLS & FRAMEWORKS
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {['React', 'Spring Boot', 'Docker', 'AWS'].map((tool) => (
                  <span key={tool} style={{ fontSize: '0.7rem', padding: '4px 10px', background: 'var(--surface-container-high)', borderRadius: '3px' }}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
