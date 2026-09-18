import { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { SIDE_VIEW_POS, CITY_HALF_Z, getSceneColors } from './cityConfig';
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

export default function HeroCityScene({ progressRef, theme = 'dark' }) {
  const colors = useMemo(() => getSceneColors(), [theme]);

  return (
    <Canvas dpr={[1, 1.75]} gl={GL_CONFIG} camera={CAMERA_CONFIG} key={theme}>
      <color attach="background" args={[colors.background]} />
      <fog attach="fog" args={[colors.fog, 24, CITY_HALF_Z * 3.4]} />

      <Sky theme={theme} />

      <hemisphereLight args={[colors.ambientSky, colors.ambientGround, theme === 'dark' ? 0.55 : 0.7]} />
      <directionalLight position={[26, 36, 20]} intensity={theme === 'dark' ? 0.7 : 0.8} color={theme === 'dark' ? '#dfe8ff' : '#ffffee'} />
      <directionalLight position={[-28, 16, -22]} intensity={theme === 'dark' ? 0.25 : 0.15} color={theme === 'dark' ? '#8fa8ff' : '#b0d4ff'} />

      {/* Skyline glow accents */}
      <pointLight position={[6, 6, -10]} color="#ff5a4d" intensity={theme === 'dark' ? 12 : 8} distance={34} />
      <pointLight position={[-10, 8, 8]} color={theme === 'dark' ? '#9fe8ff' : '#87ceeb'} intensity={theme === 'dark' ? 10 : 6} distance={34} />
      <pointLight position={[12, 9, 20]} color="#ffb864" intensity={theme === 'dark' ? 10 : 7} distance={36} />

      {/* Real environment reflections -- glass facades pick up genuine directional
          highlights that visibly shift as the camera moves through the scroll. */}
      <Environment preset={theme === 'dark' ? 'night' : 'sunset'} background={false} />

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
