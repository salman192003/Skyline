import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import {
  JOURNEY_WAYPOINTS,
  easeInOutExpo,
  remap,
} from './cityConfig';

export default function CameraRig({ progressRef }) {
  const { camera } = useThree();
  const lookAtVec = useRef(new THREE.Vector3());

  useFrame(() => {
    const p = progressRef.current ?? 0;

    // Map progress (0–1) to a waypoint segment
    const numSegments = JOURNEY_WAYPOINTS.length - 1;
    const segmentIndex = Math.min(Math.floor(p * numSegments), numSegments - 1);
    const segmentProgress = remap(p, segmentIndex / numSegments, (segmentIndex + 1) / numSegments, 0, 1);
    const eased = easeInOutExpo(segmentProgress);

    const from = JOURNEY_WAYPOINTS[segmentIndex];
    const to = JOURNEY_WAYPOINTS[segmentIndex + 1];

    camera.position.lerpVectors(from.pos, to.pos, eased);
    lookAtVec.current.lerpVectors(from.target, to.target, eased);
    camera.lookAt(lookAtVec.current);
  });

  return null;
}
