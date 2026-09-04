import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MorphingGrid() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Basic implementation of a sequence that changes card layouts as you scroll.
      // We create a master timeline tied to the scroll proxy.
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=4000', // 4000px of scrolling
          scrub: 1,
          pin: true,
        }
      });

      // State 1 to State 2 (Education to Experience)
      tl.to('.global-card-1', { x: 400, y: 100, scale: 0.8, duration: 1 }, 0)
        .to('.global-card-2', { x: -400, y: 50, scale: 1.2, duration: 1 }, 0)
        
      // State 2 to State 3
        .to('.global-card-1', { x: 0, y: 300, scale: 1, duration: 1 }, 1)
        .to('.global-card-2', { x: 0, y: -100, scale: 0.9, duration: 1 }, 1);

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      {/* Global Card 1 */}
      <div className="global-card-1 bento-card card" style={{
        position: 'absolute',
        top: '20%', left: '20%',
        width: '300px', height: '400px',
        background: 'var(--surface-container)'
      }}>
        Card 1 Content
      </div>

      {/* Global Card 2 */}
      <div className="global-card-2 bento-card card" style={{
        position: 'absolute',
        top: '20%', right: '20%',
        width: '400px', height: '300px',
        background: 'var(--surface-container-high)'
      }}>
        Card 2 Content
      </div>
      
      <div style={{ position: 'absolute', bottom: 20, width: '100%', textAlign: 'center' }}>
        Keep scrolling to see the layout lock into the next section.
      </div>
    </div>
  );
}
