import {
  AVENUES,
  CROSS_STREETS,
  CITY_HALF_X,
  CITY_HALF_Z,
  STREET_WIDTH,
  ROAD_WIDTH,
  COLORS,
} from './cityConfig';

export default function StreetNetwork() {
  return (
    <group>
      {/* Ground fill beneath the whole grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[CITY_HALF_X * 2 + 6, CITY_HALF_Z * 2 + 6]} />
        <meshStandardMaterial color={COLORS.ground} roughness={0.95} />
      </mesh>

      {/* Avenues (run along Z) */}
      {AVENUES.map((x) => (
        <group key={`ave-${x}`}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[x, 0, 0]}>
            <planeGeometry args={[STREET_WIDTH, CITY_HALF_Z * 2]} />
            <meshStandardMaterial color={COLORS.sidewalk} roughness={0.9} />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.003, 0]}>
            <planeGeometry args={[ROAD_WIDTH, CITY_HALF_Z * 2]} />
            <meshStandardMaterial color={COLORS.road} roughness={0.75} metalness={0.15} />
          </mesh>
          {x === 0 && (
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.006, 0]}>
              <planeGeometry args={[0.06, CITY_HALF_Z * 2]} />
              <meshBasicMaterial color={COLORS.roadLine} toneMapped={false} />
            </mesh>
          )}
        </group>
      ))}

      {/* Cross streets (run along X) */}
      {CROSS_STREETS.map((z) => (
        <group key={`cross-${z}`}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, z]}>
            <planeGeometry args={[CITY_HALF_X * 2, STREET_WIDTH]} />
            <meshStandardMaterial color={COLORS.sidewalk} roughness={0.9} />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.004, z]}>
            <planeGeometry args={[CITY_HALF_X * 2, ROAD_WIDTH]} />
            <meshStandardMaterial color={COLORS.road} roughness={0.75} metalness={0.15} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
