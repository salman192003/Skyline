import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { STREETLIGHTS, COLORS } from './cityConfig';

const dummy = new THREE.Object3D();
const POLE_HEIGHT = 1.35;

function makeGlowTexture() {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, 'rgba(255, 220, 168, 0.55)');
  gradient.addColorStop(0.5, 'rgba(255, 200, 140, 0.18)');
  gradient.addColorStop(1, 'rgba(255, 200, 140, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// A handful of streetlights nearest the camera's into-city path get a real
// point light + ground glow decal; the rest just get the emissive lamp mesh.
const HERO_LIGHT_COUNT = 8;

export default function StreetLights() {
  const polesRef = useRef(null);
  const lampsRef = useRef(null);
  const glowTexture = useMemo(() => makeGlowTexture(), []);

  const heroLights = useMemo(() => {
    return [...STREETLIGHTS]
      .map((s) => ({ ...s, distSq: s.x * s.x + (s.z - 6) * (s.z - 6) }))
      .sort((a, b) => a.distSq - b.distSq)
      .slice(0, HERO_LIGHT_COUNT);
  }, []);

  useEffect(() => {
    const poles = polesRef.current;
    const lamps = lampsRef.current;
    if (!poles || !lamps) return;

    STREETLIGHTS.forEach((s, i) => {
      dummy.position.set(s.x, POLE_HEIGHT / 2, s.z);
      dummy.scale.set(1, 1, 1);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      poles.setMatrixAt(i, dummy.matrix);

      dummy.position.set(s.x, POLE_HEIGHT + 0.05, s.z);
      dummy.updateMatrix();
      lamps.setMatrixAt(i, dummy.matrix);
    });

    poles.instanceMatrix.needsUpdate = true;
    lamps.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <group>
      <instancedMesh ref={polesRef} args={[null, null, STREETLIGHTS.length]}>
        <cylinderGeometry args={[0.028, 0.04, POLE_HEIGHT, 6]} />
        <meshStandardMaterial color="#1c1e22" roughness={0.6} metalness={0.5} />
      </instancedMesh>

      <instancedMesh ref={lampsRef} args={[null, null, STREETLIGHTS.length]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshBasicMaterial color={COLORS.lampGlow} toneMapped={false} />
      </instancedMesh>

      {/* Soft ground light-pools beneath every lamp -- cheap unlit glow decals */}
      {STREETLIGHTS.map((s) => (
        <mesh key={`glow-${s.x}-${s.z}`} rotation={[-Math.PI / 2, 0, 0]} position={[s.x, 0.008, s.z]}>
          <planeGeometry args={[1.6, 1.6]} />
          <meshBasicMaterial
            map={glowTexture}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* Real point lights + soft shadows near the camera's street-level path */}
      {heroLights.map((s) => (
        <pointLight
          key={`herolight-${s.x}-${s.z}`}
          position={[s.x, POLE_HEIGHT + 0.1, s.z]}
          color={COLORS.lampGlow}
          intensity={3.5}
          distance={6}
          decay={2}
        />
      ))}
    </group>
  );
}
