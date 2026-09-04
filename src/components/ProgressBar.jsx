import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{
        scaleX: scrollYProgress,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'var(--primary)',
        transformOrigin: '0%',
        zIndex: 10000,
      }}
    />
  );
}
