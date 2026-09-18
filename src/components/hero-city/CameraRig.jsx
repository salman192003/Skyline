import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import {
  JOURNEY_PATH,
  easeInOutExpo,
  remap,
} from './cityConfig';

// Easing for straight drives: lighter, snappier (near-linear)
function easeLinear(x) {
  return x;
}

// Easing for turns: deliberate, smooth swing
function easeTurn(x) {
  return easeInOutExpo(x);
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

    // Use turn-optimized easing for turn waypoints, linear for straight drives
    const isFromTurn = from.turn;
    const eased = isFromTurn ? easeTurn(segmentProgress) : easeLinear(segmentProgress);

    camera.position.lerpVectors(from.pos, to.pos, eased);
    lookAtVec.current.lerpVectors(from.target, to.target, eased);
    camera.lookAt(lookAtVec.current);

    // Apply subtle camera tilt during turns (simulating vehicle lean)
    // Peak tilt at 50% through the turn segment
    let rollAngle = 0;
    if (isFromTurn) {
      // Tilt builds to peak at ~50%, then subsides
      const tiltAmount = eased < 0.5 ? eased * 2 : (1 - eased) * 2;
      rollAngle = tiltAmount * 0.08; // ~4.6° max tilt
    }

    // Apply roll to camera
    euler.current.setFromQuaternion(camera.quaternion, 'YXZ');
    euler.current.z = rollAngle;
    camera.quaternion.setFromEuler(euler.current);
  });

  return null;
}
