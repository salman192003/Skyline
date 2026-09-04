import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PEDESTRIANS } from './cityConfig';

const dummy = new THREE.Object3D();
const PERSON_HEIGHT = 0.34;

export default function Pedestrians() {
  const meshRef = useRef(null);

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = clock.getElapsedTime();

    PEDESTRIANS.forEach((p, i) => {
      const wave = Math.sin(t * p.speed + p.phase);
      const z = p.zCenter + wave * p.range;
      const facing = Math.cos(t * p.speed + p.phase) >= 0 ? 0 : Math.PI;

      dummy.position.set(p.x, PERSON_HEIGHT / 2, z);
      dummy.rotation.set(0, facing, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, PEDESTRIANS.length]}>
      <capsuleGeometry args={[0.055, 0.2, 4, 8]} />
      <meshStandardMaterial color="#1a1c20" roughness={0.8} />
    </instancedMesh>
  );
}
