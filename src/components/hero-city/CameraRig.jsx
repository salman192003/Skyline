import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import {
  JOURNEY_PATH,
  remap,
} from './cityConfig';

// Straight drives: gentle ease at the very start/end of each segment (not pure
// linear) so consecutive segments blend into each other instead of meeting at
// a hard velocity kink — still reads as brisk, just without the seam.
function easeDrive(x) {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

// Turns: a softer swing than expo — expo's near-instant middle snap read as
// jerky rather than smooth. Cubic keeps the deliberate arc but rounds it out.
function easeTurn(x) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

// Smooth in/out curve for the lean-into-turn tilt (replaces the old linear
// triangle, which snapped to its peak rather than easing through it).
function easeTilt(x) {
  return Math.sin(x * Math.PI);
}

export default function CameraRig({ progressRef }) {
  const { camera } = useThree();
  const lookAtVec = useRef(new THREE.Vector3());
  const euler = useRef(new THREE.Euler(0, 0, 0, 'YXZ'));

  useFrame(() => {
    const p = progressRef.current ?? 0;

    // Map progress (0–1) to a waypoint segment
    const numSegments = JOURNEY_PATH.length - 1;
    const segmentIndex = Math.min(Math.floor(p * numSegments), numSegments - 1);
    const segmentProgress = remap(p, segmentIndex / numSegments, (segmentIndex + 1) / numSegments, 0, 1);

    const from = JOURNEY_PATH[segmentIndex];
    const to = JOURNEY_PATH[segmentIndex + 1];

    // Use turn-optimized easing for turn waypoints, gentled drive easing otherwise
    const isFromTurn = from.turn;
    const eased = isFromTurn ? easeTurn(segmentProgress) : easeDrive(segmentProgress);

    camera.position.lerpVectors(from.pos, to.pos, eased);
    lookAtVec.current.lerpVectors(from.target, to.target, eased);
    camera.lookAt(lookAtVec.current);

    // Apply subtle camera tilt during turns (simulating vehicle lean), eased
    // smoothly in and out rather than snapping linearly to its peak.
    let rollAngle = 0;
    if (isFromTurn) {
      rollAngle = easeTilt(segmentProgress) * 0.08; // ~4.6° max tilt
    }

    // Apply roll to camera
    euler.current.setFromQuaternion(camera.quaternion, 'YXZ');
    euler.current.z = rollAngle;
    camera.quaternion.setFromEuler(euler.current);
  });

  return null;
}
