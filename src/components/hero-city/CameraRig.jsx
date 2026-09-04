import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import {
  SIDE_VIEW_POS,
  SIDE_VIEW_TARGET,
  INTO_CITY_POS,
  INTO_CITY_TARGET,
  FINAL_CAMERA_POS,
  FINAL_CAMERA_TARGET,
  easeInOutExpo,
  remap,
} from './cityConfig';

// Three-stage path: wide establishing view -> down the avenue -> converging on
// a single glowing window until the camera is essentially inside its light.
// The split point (0.6) is where "down the avenue" ends and the final approach begins.
const SPLIT = 0.6;

export default function CameraRig({ progressRef }) {
  const { camera } = useThree();
  const lookAtVec = useRef(new THREE.Vector3());

  useFrame(() => {
    const p = progressRef.current ?? 0;

    if (p < SPLIT) {
      const eased = easeInOutExpo(remap(p, 0, SPLIT, 0, 1));
      camera.position.lerpVectors(SIDE_VIEW_POS, INTO_CITY_POS, eased);
      lookAtVec.current.lerpVectors(SIDE_VIEW_TARGET, INTO_CITY_TARGET, eased);
    } else {
      const eased = easeInOutExpo(remap(p, SPLIT, 1, 0, 1));
      camera.position.lerpVectors(INTO_CITY_POS, FINAL_CAMERA_POS, eased);
      lookAtVec.current.lerpVectors(INTO_CITY_TARGET, FINAL_CAMERA_TARGET, eased);
    }

    camera.lookAt(lookAtVec.current);
  });

  return null;
}
