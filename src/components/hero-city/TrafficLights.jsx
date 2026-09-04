import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { INTERSECTIONS, COLORS } from './cityConfig';

const dummy = new THREE.Object3D();
const color = new THREE.Color();
const dimColor = new THREE.Color('#2a2a2e');

const POLE_HEIGHT = 1.9;
const HOUSING_Y = POLE_HEIGHT + 0.16;
const LAMP_SPACING = 0.13;
const CYCLE = 6; // seconds per full red -> green -> yellow -> red cycle

// slot 0 = red (top), 1 = green (middle), 2 = yellow (bottom)
function activeSlot(t) {
  if (t < 3) return 0;
  if (t < 5) return 1;
  return 2;
}

export default function TrafficLights() {
  const polesRef = useRef(null);
  const housingsRef = useRef(null);
  const redRef = useRef(null);
  const greenRef = useRef(null);
  const yellowRef = useRef(null);

  useEffect(() => {
    const poles = polesRef.current;
    const housings = housingsRef.current;
    const lamps = [redRef.current, greenRef.current, yellowRef.current];
    if (!poles || !housings || lamps.some((l) => !l)) return;

    INTERSECTIONS.forEach((s, i) => {
      dummy.position.set(s.x, POLE_HEIGHT / 2, s.z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      poles.setMatrixAt(i, dummy.matrix);

      dummy.position.set(s.x, HOUSING_Y + LAMP_SPACING, s.z);
      dummy.updateMatrix();
      housings.setMatrixAt(i, dummy.matrix);

      lamps.forEach((mesh, slot) => {
        dummy.position.set(s.x, HOUSING_Y + LAMP_SPACING * (1 - slot), s.z + 0.041);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      });
    });

    poles.instanceMatrix.needsUpdate = true;
    housings.instanceMatrix.needsUpdate = true;
    lamps.forEach((mesh) => {
      mesh.instanceMatrix.needsUpdate = true;
    });
  }, []);

  useFrame(({ clock }) => {
    const lamps = [
      { mesh: redRef.current, color: COLORS.trafficRed, slot: 0 },
      { mesh: greenRef.current, color: COLORS.trafficGreen, slot: 1 },
      { mesh: yellowRef.current, color: COLORS.trafficYellow, slot: 2 },
    ];
    if (lamps.some((l) => !l.mesh)) return;

    const t = clock.getElapsedTime();

    lamps.forEach(({ mesh, color: lampColor, slot }) => {
      INTERSECTIONS.forEach((s, i) => {
        const phase = (t + i * 0.9) % CYCLE;
        const isActive = activeSlot(phase) === slot;
        mesh.setColorAt(i, isActive ? color.set(lampColor) : dimColor);
      });
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    });
  });

  return (
    <group>
      <instancedMesh ref={polesRef} args={[null, null, INTERSECTIONS.length]}>
        <cylinderGeometry args={[0.025, 0.035, POLE_HEIGHT, 6]} />
        <meshStandardMaterial color="#1c1e22" roughness={0.6} metalness={0.5} />
      </instancedMesh>

      <instancedMesh ref={housingsRef} args={[null, null, INTERSECTIONS.length]}>
        <boxGeometry args={[0.14, 0.36, 0.08]} />
        <meshStandardMaterial color="#17181b" roughness={0.5} metalness={0.4} />
      </instancedMesh>

      <instancedMesh ref={redRef} args={[null, null, INTERSECTIONS.length]}>
        <circleGeometry args={[0.045, 10]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>

      <instancedMesh ref={greenRef} args={[null, null, INTERSECTIONS.length]}>
        <circleGeometry args={[0.045, 10]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>

      <instancedMesh ref={yellowRef} args={[null, null, INTERSECTIONS.length]}>
        <circleGeometry args={[0.045, 10]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
    </group>
  );
}
