import { useMemo } from 'react';
import * as THREE from 'three';
import { Stars, Billboard } from '@react-three/drei';
import { COLORS } from './cityConfig';

// Three-stop vertical gradient: fog-matched horizon -> warm city-glow band -> cool zenith.
function useGradientSkyGeometry() {
  return useMemo(() => {
    const geometry = new THREE.SphereGeometry(220, 24, 16);
    const pos = geometry.attributes.position;
    const colors = new Float32Array(pos.count * 3);

    const horizon = new THREE.Color(COLORS.skyHorizon);
    const glow = new THREE.Color(COLORS.skyGlow);
    const zenith = new THREE.Color(COLORS.skyZenith);
    const c = new THREE.Color();

    const GLOW_BAND = 0.22; // fraction of the 0..1 height where the glow peaks

    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i) / 220; // -1 (bottom) .. 1 (top)
      const t = THREE.MathUtils.clamp((y + 0.15) / 0.6, 0, 1);

      if (t < GLOW_BAND) {
        c.copy(horizon).lerp(glow, t / GLOW_BAND);
      } else {
        c.copy(glow).lerp(zenith, (t - GLOW_BAND) / (1 - GLOW_BAND));
      }

      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geometry;
  }, []);
}

// A soft radial glow texture -- reused (at different scales/opacities) for the
// moon's halo so it fades smoothly instead of the hard edge of a plain sphere.
function makeGlowTexture(color) {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, `${color}cc`);
  gradient.addColorStop(0.4, `${color}55`);
  gradient.addColorStop(1, `${color}00`);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

// A simple procedural moon surface: a base disc plus a handful of soft darker
// blotches standing in for maria/craters, so it reads as a surface, not a flat dot.
function makeMoonTexture(seed = 11) {
  let s = seed;
  const rand = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };

  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#fdf6e3';
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  ctx.fill();

  for (let i = 0; i < 9; i++) {
    const r = size * (0.06 + rand() * 0.1);
    const angle = rand() * Math.PI * 2;
    const dist = rand() * (size / 2 - r);
    const x = size / 2 + Math.cos(angle) * dist;
    const y = size / 2 + Math.sin(angle) * dist;

    const blotch = ctx.createRadialGradient(x, y, 0, x, y, r);
    blotch.addColorStop(0, 'rgba(150, 140, 120, 0.35)');
    blotch.addColorStop(1, 'rgba(150, 140, 120, 0)');
    ctx.fillStyle = blotch;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  return new THREE.CanvasTexture(canvas);
}

export default function Sky() {
  const geometry = useGradientSkyGeometry();
  const moonTexture = useMemo(() => makeMoonTexture(), []);
  const haloTexture = useMemo(() => makeGlowTexture(COLORS.moon), []);

  return (
    <group>
      <mesh geometry={geometry}>
        <meshBasicMaterial vertexColors side={THREE.BackSide} fog={false} toneMapped={false} />
      </mesh>

      <Stars radius={180} depth={60} count={3400} factor={3.5} saturation={0} fade speed={0.25} />

      {/* Moon */}
      <mesh position={[70, 80, -140]}>
        <sphereGeometry args={[6, 24, 24]} />
        <meshBasicMaterial map={moonTexture} toneMapped={false} fog={false} />
      </mesh>
      <Billboard position={[70, 80, -140]}>
        <mesh>
          <planeGeometry args={[30, 30]} />
          <meshBasicMaterial
            map={haloTexture}
            transparent
            toneMapped={false}
            fog={false}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </Billboard>
    </group>
  );
}
