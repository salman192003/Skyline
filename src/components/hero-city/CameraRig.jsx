import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { JOURNEY_PATH } from './cityConfig';

export default function CameraRig({ progressRef }) {
  const { camera } = useThree();
  const lookAtVec = useRef(new THREE.Vector3());
  const euler = useRef(new THREE.Euler(0, 0, 0, 'YXZ'));

  // Build one continuous spline through every waypoint's position, and a second
  // through every waypoint's look-at target. Centripetal Catmull-Rom avoids the
  // loops/cusps uniform parameterization can produce at sharp turns.
  //
  // This replaces the old per-segment lerp+ease approach, which eased each
  // segment in and out from a dead stop at every waypoint -- individually smooth
  // curves, but velocity hit zero at every junction, reading as a stop-start
  // stutter through the whole drive. A single spline sampled with getPointAt
  // (arc-length parameterized) has continuous velocity end to end: no stops.
  const { posCurve, targetCurve } = useMemo(() => {
    const posPoints = JOURNEY_PATH.map((wp) => wp.pos);
    const targetPoints = JOURNEY_PATH.map((wp) => wp.target);
    return {
      posCurve: new THREE.CatmullRomCurve3(posPoints, false, 'centripetal'),
      targetCurve: new THREE.CatmullRomCurve3(targetPoints, false, 'centripetal'),
    };
  }, []);

  useFrame(() => {
    const p = THREE.MathUtils.clamp(progressRef.current ?? 0, 0, 1);

    const pos = posCurve.getPointAt(p);
    const target = targetCurve.getPointAt(p);

    camera.position.copy(pos);
    lookAtVec.current.copy(target);
    camera.lookAt(lookAtVec.current);

    // Bank into turns based on how sharply the travel direction is curving,
    // rather than a fixed tilt tied to hand-marked "turn" waypoints -- this
    // stays smooth and proportional to the actual curve of the spline at
    // every point along the drive, not just at discrete corners.
    const delta = 0.006;
    const p0 = Math.max(0, p - delta);
    const p1 = Math.min(1, p + delta);
    const tangentPrev = posCurve.getTangentAt(p0);
    const tangentNext = posCurve.getTangentAt(p1);
    const turnRate = tangentPrev.cross(tangentNext).y;
    const rollAngle = THREE.MathUtils.clamp(turnRate * 12, -0.09, 0.09);

    euler.current.setFromQuaternion(camera.quaternion, 'YXZ');
    euler.current.z = rollAngle;
    camera.quaternion.setFromEuler(euler.current);
  });

  return null;
}
