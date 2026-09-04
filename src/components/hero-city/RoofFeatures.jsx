import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { BUILDINGS } from './cityConfig';

const dummy = new THREE.Object3D();
const color = new THREE.Color();

export default function RoofFeatures() {
  const setbacks = useMemo(() => BUILDINGS.filter((b) => b.roofType === 'setback'), []);
  const pyramids = useMemo(() => BUILDINGS.filter((b) => b.roofType === 'pyramid'), []);
  const spires = useMemo(() => BUILDINGS.filter((b) => b.roofType === 'spire'), []);

  const setbackRef = useRef(null);
  const pyramidRef = useRef(null);
  const spireRef = useRef(null);

  useEffect(() => {
    const mesh = setbackRef.current;
    if (!mesh) return;
    setbacks.forEach((b, i) => {
      const h = b.height * 0.16;
      dummy.position.set(b.x, b.height + h / 2, b.z);
      dummy.scale.set(b.roofWidth * 0.65, h, b.roofDepth * 0.65);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, color.set(b.glassColor));
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [setbacks]);

  useEffect(() => {
    const mesh = pyramidRef.current;
    if (!mesh) return;
    pyramids.forEach((b, i) => {
      const h = Math.max(0.5, b.roofWidth * 0.6);
      dummy.position.set(b.x, b.height + h / 2, b.z);
      dummy.scale.set(b.roofWidth * 0.75, h, b.roofDepth * 0.75);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, color.set(b.glassColor));
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [pyramids]);

  useEffect(() => {
    const mesh = spireRef.current;
    if (!mesh) return;
    spires.forEach((b, i) => {
      const h = 1.6 + (b.height % 3);
      dummy.position.set(b.x, b.height + h / 2, b.z);
      dummy.scale.set(1, h, 1);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, color.set(b.litColor));
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [spires]);

  return (
    <group>
      <instancedMesh ref={setbackRef} args={[null, null, Math.max(1, setbacks.length)]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial roughness={0.2} metalness={0.85} envMapIntensity={1.8} />
      </instancedMesh>

      <instancedMesh ref={pyramidRef} args={[null, null, Math.max(1, pyramids.length)]}>
        <coneGeometry args={[0.7, 1, 4]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>

      <instancedMesh ref={spireRef} args={[null, null, Math.max(1, spires.length)]}>
        <cylinderGeometry args={[0.025, 0.05, 1, 6]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
    </group>
  );
}
