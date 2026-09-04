import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { BEACON_BUILDINGS } from './cityConfig';

export default function RooftopBeacons() {
  const refs = useRef([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    BEACON_BUILDINGS.forEach((b, i) => {
      const mesh = refs.current[i];
      if (!mesh) return;
      const pulse = 0.4 + Math.max(0, Math.sin(t * 2.4 + b.beaconPhase)) * 1.6;
      mesh.material.opacity = pulse / 2;
      mesh.scale.setScalar(0.12 + pulse * 0.04);
    });
  });

  return (
    <group>
      {BEACON_BUILDINGS.map((b, i) => (
        <mesh
          key={`${b.x}-${b.z}`}
          ref={(el) => (refs.current[i] = el)}
          position={[b.x, b.height + 0.25, b.z]}
        >
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial color="#ff2a2a" transparent toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}
