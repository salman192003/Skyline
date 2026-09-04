import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { SIDE_VIEW_POS, CITY_HALF_Z, COLORS } from './cityConfig';
import CameraRig from './CameraRig';
import CityBuildings from './CityBuildings';
import StreetNetwork from './StreetNetwork';
import StreetLights from './StreetLights';
import TrafficLights from './TrafficLights';
import RoadSigns from './RoadSigns';
import Crosswalks from './Crosswalks';
import Pedestrians from './Pedestrians';
import RoadTraffic from './RoadTraffic';
import Sky from './Sky';

// Hoisted so these object literals keep a stable identity across re-renders --
// passing a fresh object each render makes R3F reconfigure the renderer/camera
// on every scroll tick, which is wasteful and re-triggers Three.js's internal
// one-time deprecation warnings on every reconfiguration.
const GL_CONFIG = { antialias: true, powerPreference: 'high-performance' };
const CAMERA_CONFIG = { position: SIDE_VIEW_POS.toArray(), fov: 48, near: 0.1, far: 300 };

export default function HeroCityScene({ progressRef }) {
  return (
    <Canvas dpr={[1, 1.75]} gl={GL_CONFIG} camera={CAMERA_CONFIG}>
      <color attach="background" args={[COLORS.background]} />
      <fog attach="fog" args={[COLORS.fog, 24, CITY_HALF_Z * 3.4]} />

      <Sky />

      <hemisphereLight args={[COLORS.ambientSky, COLORS.ambientGround, 0.55]} />
      <directionalLight position={[26, 36, 20]} intensity={0.7} color="#dfe8ff" />
      <directionalLight position={[-28, 16, -22]} intensity={0.25} color="#8fa8ff" />

      {/* Skyline glow accents */}
      <pointLight position={[6, 6, -10]} color="#ff5a4d" intensity={12} distance={34} />
      <pointLight position={[-10, 8, 8]} color="#9fe8ff" intensity={10} distance={34} />
      <pointLight position={[12, 9, 20]} color="#ffb864" intensity={10} distance={36} />

      {/* Real environment reflections -- glass facades pick up genuine directional
          highlights that visibly shift as the camera moves through the scroll. */}
      <Environment preset="night" background={false} />

      <Suspense fallback={null}>
        <StreetNetwork />
        <CityBuildings />
        <StreetLights />
        <TrafficLights />
        <RoadSigns />
        <Crosswalks />
        <Pedestrians />
        <RoadTraffic />
      </Suspense>

      <CameraRig progressRef={progressRef} />
    </Canvas>
  );
}
