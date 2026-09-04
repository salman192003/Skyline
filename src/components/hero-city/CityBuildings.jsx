import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { BUILDING_PARTS, WINDOWS, FRAME_COLOR } from './cityConfig';
import RooftopBeacons from './RooftopBeacons';
import RoofFeatures from './RoofFeatures';

const dummy = new THREE.Object3D();
const color = new THREE.Color();

function paintPanels(mesh, panels) {
  if (!mesh) return;
  panels.forEach((w, i) => {
    dummy.position.set(w.x, w.y, w.z);
    dummy.rotation.set(0, w.rotY, 0);
    dummy.scale.set(w.w, w.h, 1);
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);
    mesh.setColorAt(i, color.set(w.color));
  });
  mesh.instanceMatrix.needsUpdate = true;
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
}

export default function CityBuildings() {
  const bodiesRef = useRef(null);
  const outlinesRef = useRef(null);
  const glassRef = useRef(null);
  const litWindowsRef = useRef(null);

  const glassPanels = useMemo(() => WINDOWS.filter((w) => !w.lit), []);
  const litPanels = useMemo(() => WINDOWS.filter((w) => w.lit), []);

  // Structural frame/body -- a single neutral dark tone; the glass panels
  // (rendered on top) carry all of the facade's actual color and life.
  useEffect(() => {
    const mesh = bodiesRef.current;
    if (!mesh) return;
    BUILDING_PARTS.forEach((p, i) => {
      dummy.position.set(p.x, p.yBase + p.height / 2, p.z);
      dummy.scale.set(p.width, p.height, p.depth);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, []);

  // Thin, translucent, tinted outline -- a subtle reflective edge, not a solid line
  useEffect(() => {
    const mesh = outlinesRef.current;
    if (!mesh) return;
    BUILDING_PARTS.forEach((p, i) => {
      dummy.position.set(p.x, p.yBase + p.height / 2, p.z);
      dummy.scale.set(p.width + 0.02, p.height + 0.02, p.depth + 0.02);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, color.set(p.glassColor));
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, []);

  // Dark reflective glass panels -- lit by the scene/environment so they pick up
  // real highlights and colored reflections as the camera moves.
  useEffect(() => paintPanels(glassRef.current, glassPanels), [glassPanels]);

  // Occupied/lobby windows -- glow warm regardless of scene lighting.
  useEffect(() => paintPanels(litWindowsRef.current, litPanels), [litPanels]);

  return (
    <group>
      <instancedMesh ref={outlinesRef} args={[null, null, BUILDING_PARTS.length]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial side={THREE.BackSide} transparent opacity={0.35} toneMapped={false} />
      </instancedMesh>

      <instancedMesh ref={bodiesRef} args={[null, null, BUILDING_PARTS.length]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={FRAME_COLOR} roughness={0.25} metalness={0.85} envMapIntensity={1.8} />
      </instancedMesh>

      <instancedMesh ref={glassRef} args={[null, null, Math.max(1, glassPanels.length)]}>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial
          side={THREE.DoubleSide}
          roughness={0.06}
          metalness={0.95}
          envMapIntensity={2.6}
        />
      </instancedMesh>

      <instancedMesh ref={litWindowsRef} args={[null, null, Math.max(1, litPanels.length)]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial toneMapped={false} side={THREE.DoubleSide} />
      </instancedMesh>

      <RoofFeatures />
      <RooftopBeacons />
    </group>
  );
}
