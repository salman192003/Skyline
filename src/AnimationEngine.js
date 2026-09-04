/**
 * AnimationEngine.js
 * GSAP + Framer Motion orchestration for the Nothing-Core Portfolio
 * Handles: Hero card stack, scroll-triggered bento explosion, bi-directional animations
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Custom easing
const EASE_EXPO = 'expo.out';
const EASE_POWER4 = 'power4.out';

/**
 * Initialize the hero card stack animation
 * Cards fan out from a 3D stack into a bento grid on scroll
 */
export function initHeroStack(containerRef, cardRefs) {
  if (!containerRef || !cardRefs || cardRefs.length === 0) return;

  const cards = cardRefs.filter(Boolean);
  
  // Set initial 3D stack state
  cards.forEach((card, i) => {
    gsap.set(card, {
      position: 'absolute',
      top: '50%',
      left: '50%',
      xPercent: -50,
      yPercent: -50,
      rotation: (i - Math.floor(cards.length / 2)) * 3,
      scale: 1 - i * 0.03,
      zIndex: cards.length - i,
      y: i * -8,
      opacity: i < 3 ? 1 : 0.6,
      transformOrigin: 'center center',
    });
  });

  return cards;
}

/**
 * Create the scroll-triggered explosion from stack to grid
 */
export function createScrollExplosion(triggerRef, cards, gridPositions) {
  if (!triggerRef || !cards || cards.length === 0) return null;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerRef,
      start: 'top top',
      end: '+=150%',
      scrub: 1.5,
      pin: true,
      anticipatePin: 1,
    },
  });

  // Phase 1: Cards lift and spread
  cards.forEach((card, i) => {
    const pos = gridPositions[i] || { x: 0, y: 0, scale: 1, rotation: 0 };
    
    tl.to(card, {
      x: pos.x,
      y: pos.y,
      xPercent: 0,
      yPercent: 0,
      scale: pos.scale || 1,
      rotation: 0,
      opacity: 1,
      duration: 1,
      ease: EASE_EXPO,
    }, i * 0.05);
  });

  return tl;
}

/**
 * Staggered reveal animation for bento grid cards
 */
export function animateBentoReveal(containerSelector) {
  const cards = document.querySelectorAll(containerSelector);
  
  gsap.from(cards, {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.06,
    ease: EASE_POWER4,
    scrollTrigger: {
      trigger: cards[0]?.parentElement,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  });
}

/**
 * Section reveal animation
 */
export function createSectionReveal(sectionRef, direction = 'up') {
  if (!sectionRef) return null;

  const yFrom = direction === 'up' ? 60 : -60;

  return gsap.from(sectionRef, {
    y: yFrom,
    opacity: 0,
    duration: 1,
    ease: EASE_EXPO,
    scrollTrigger: {
      trigger: sectionRef,
      start: 'top 85%',
      end: 'top 20%',
      toggleActions: 'play none none reverse',
    },
  });
}

/**
 * Parallax float effect for decorative elements
 */
export function createParallax(element, speed = 0.5) {
  if (!element) return null;

  return gsap.to(element, {
    y: () => window.innerHeight * speed * -0.3,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
}

/**
 * Counter animation for statistics
 */
export function animateCounter(element, targetValue, duration = 2) {
  if (!element) return;
  
  const obj = { val: 0 };
  
  gsap.to(obj, {
    val: targetValue,
    duration,
    ease: EASE_POWER4,
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
    onUpdate: () => {
      element.textContent = Math.round(obj.val * 100) / 100;
    },
  });
}

/**
 * Terminal typing effect
 */
export function typeWriter(element, text, speed = 50) {
  if (!element) return;
  
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

/**
 * Card hover magnetic effect
 */
export function initMagneticHover(cardElement) {
  if (!cardElement) return;

  const handleMove = (e) => {
    const rect = cardElement.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(cardElement, {
      rotateX: -(y / rect.height) * 5,
      rotateY: (x / rect.width) * 5,
      duration: 0.5,
      ease: 'power2.out',
      transformPerspective: 1000,
    });
  };

  const handleLeave = () => {
    gsap.to(cardElement, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: EASE_EXPO,
    });
  };

  cardElement.addEventListener('mousemove', handleMove);
  cardElement.addEventListener('mouseleave', handleLeave);

  return () => {
    cardElement.removeEventListener('mousemove', handleMove);
    cardElement.removeEventListener('mouseleave', handleLeave);
  };
}

/**
 * Initialize all scroll-triggered animations
 */
export function initScrollAnimations() {
  // Animate all cards with data-animate attribute
  document.querySelectorAll('[data-animate="fade-up"]').forEach((el, i) => {
    gsap.from(el, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.05,
      ease: EASE_POWER4,
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        toggleActions: 'play none none reverse',
      },
    });
  });

  // Animate counters
  document.querySelectorAll('[data-counter]').forEach((el) => {
    const target = parseFloat(el.dataset.counter);
    animateCounter(el, target);
  });
}

/**
 * Kill all ScrollTrigger instances (cleanup)
 */
export function cleanup() {
  ScrollTrigger.getAll().forEach((st) => st.kill());
}
