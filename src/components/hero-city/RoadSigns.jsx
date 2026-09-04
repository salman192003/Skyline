import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ROAD_SIGNS, COLORS } from './cityConfig';

const dummy = new THREE.Object3D();
const POLE_HEIGHT = 1.7;

export default function RoadSigns() {
  const polesRef = useRef(null);
  const platesRef = useRef(null);

  useEffect(() => {
    const poles = polesRef.current;
    const plates = platesRef.current;
    if (!poles || !plates) return;

    ROAD_SIGNS.forEach((s, i) => {
      dummy.position.set(s.x, POLE_HEIGHT / 2, s.z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      poles.setMatrixAt(i, dummy.matrix);

      dummy.position.set(s.x, POLE_HEIGHT + 0.14, s.z);
      dummy.rotation.set(0, Math.PI / 5, 0);
      dummy.updateMatrix();
      plates.setMatrixAt(i, dummy.matrix);
    });

    poles.instanceMatrix.needsUpdate = true;
    plates.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <group>
      <instancedMesh ref={polesRef} args={[null, null, ROAD_SIGNS.length]}>
        <cylinderGeometry args={[0.02, 0.03, POLE_HEIGHT, 6]} />
        <meshStandardMaterial color="#1c1e22" roughness={0.6} metalness={0.5} />
      </instancedMesh>

      <instancedMesh ref={platesRef} args={[null, null, ROAD_SIGNS.length]}>
        <boxGeometry args={[0.4, 0.18, 0.02]} />
        <meshStandardMaterial color={COLORS.signPlate} roughness={0.35} metalness={0.3} />
      </instancedMesh>
    </group>
  );
}
