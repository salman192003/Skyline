import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { TRAFFIC } from './cityConfig';

const dummy = new THREE.Object3D();
const color = new THREE.Color();
const HEADLIGHT = '#eaf4ff';
const TAILLIGHT = '#ff3b30';

export default function RoadTraffic() {
  const meshRef = useRef(null);

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    TRAFFIC.forEach((car, i) => {
      car.offset = (car.offset + car.speed * car.dir * delta + car.length) % car.length;
      const along = car.offset - car.length / 2;

      if (car.axis === 'z') {
        dummy.position.set(car.fixed, 0.15, along);
        dummy.rotation.set(0, car.dir > 0 ? 0 : Math.PI, 0);
      } else {
        dummy.position.set(along, 0.15, car.fixed);
        dummy.rotation.set(0, car.dir > 0 ? Math.PI / 2 : -Math.PI / 2, 0);
      }

      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, color.set(car.dir > 0 ? HEADLIGHT : TAILLIGHT));
    });

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, TRAFFIC.length]}>
      <boxGeometry args={[0.18, 0.12, 0.4]} />
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  );
}
