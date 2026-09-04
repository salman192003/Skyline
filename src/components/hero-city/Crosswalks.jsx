import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { CROSSWALK_STRIPES, COLORS } from './cityConfig';

const dummy = new THREE.Object3D();

export default function Crosswalks() {
  const meshRef = useRef(null);

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    CROSSWALK_STRIPES.forEach((s, i) => {
      dummy.position.set(s.x, 0.009, s.z);
      // Rotating the stripe's in-plane axis (via the z-Euler term, applied before
      // the x-flip that lays it flat) swaps it between the two crossing orientations.
      dummy.rotation.set(-Math.PI / 2, 0, s.axis === 'z' ? Math.PI / 2 : 0);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <instancedMesh ref={meshRef} args={[null, null, CROSSWALK_STRIPES.length]}>
      <planeGeometry args={[0.16, 1.1]} />
      <meshStandardMaterial color={COLORS.crosswalk} roughness={0.8} />
    </instancedMesh>
  );
}
