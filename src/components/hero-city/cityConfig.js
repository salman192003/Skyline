import * as THREE from 'three';

// Deterministic PRNG (mulberry32) so the city layout is stable across reloads
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---------------------------------------------------------------------------
// Grid layout: a real street grid of avenues (run along Z) and cross streets
// (run along X), forming city blocks. The main avenue (index 0) is the
// camera's path through the city.
// ---------------------------------------------------------------------------
export const STREET_WIDTH = 2.2;
export const ROAD_WIDTH = 1.5; // asphalt width inside each street corridor
export const SIDEWALK_WIDTH = (STREET_WIDTH - ROAD_WIDTH) / 2;
export const BLOCK_SIZE = 6;
export const CELL = BLOCK_SIZE + STREET_WIDTH;

const AVENUE_RANGE = 3; // avenues at index -3..3 (7 total, main avenue = index 0)
const CROSS_RANGE = 5; // cross streets at index -5..5 (11 total)

export const AVENUES = [];
for (let i = -AVENUE_RANGE; i <= AVENUE_RANGE; i++) AVENUES.push(i * CELL);

export const CROSS_STREETS = [];
for (let j = -CROSS_RANGE; j <= CROSS_RANGE; j++) CROSS_STREETS.push(j * CELL);

export const CITY_HALF_X = AVENUE_RANGE * CELL + BLOCK_SIZE / 2;
export const CITY_HALF_Z = CROSS_RANGE * CELL + BLOCK_SIZE / 2;
export const ROAD_LENGTH = CITY_HALF_Z * 2;

// Realistic glass curtain-wall tones, from darker to lighter/more reflective --
// this is the GLASS (window panel) palette. The structural frame/mullion
// color is fixed and neutral (see FRAME_COLOR) so every building reads as a
// dark frame holding lighter glass panels, not a solid colored block.
const GLASS_PALETTE = ['#3f4a55', '#4a5b6e', '#55606c', '#5b6b7a', '#6b7c8f', '#7c8fa3', '#8fa8bd'];
const FRAME_COLOR = '#1b1e22';
// Occupied-window glow: warm office/residential light
const LIT_PALETTE = ['#ffe3b0', '#ffb864', '#fff2d9'];
const LOBBY_COLOR = '#ffedc2';

const FLOOR_HEIGHT = 0.26;
const TIER_ORDER = ['low', 'mid', 'high', 'landmark'];
const TIER_FLOORS = {
  low: [2, 8],
  mid: [8, 20],
  high: [20, 40],
  landmark: [40, 68],
};

// Downtown sits near the camera's street-level path; buildings taper down in
// height the further a block is from it, forming a real skyline silhouette
// instead of skyscrapers scattered uniformly everywhere.
const DOWNTOWN_CENTER = { x: 0, z: 4 };
const DOWNTOWN_RADIUS = Math.min(CITY_HALF_X, CITY_HALF_Z) * 0.85;

function downtownFactor(x, z) {
  const dx = x - DOWNTOWN_CENTER.x;
  const dz = z - DOWNTOWN_CENTER.z;
  const dist = Math.sqrt(dx * dx + dz * dz);
  return Math.max(0, 1 - dist / DOWNTOWN_RADIUS);
}

function pickTier(rand, factor) {
  const r = rand();
  if (factor > 0.75) {
    if (r < 0.28) return 'landmark';
    if (r < 0.72) return 'high';
    if (r < 0.95) return 'mid';
    return 'low';
  }
  if (factor > 0.45) {
    if (r < 0.12) return 'landmark';
    if (r < 0.48) return 'high';
    if (r < 0.85) return 'mid';
    return 'low';
  }
  if (factor > 0.2) {
    if (r < 0.08) return 'high';
    if (r < 0.4) return 'mid';
    return 'low';
  }
  return r < 0.08 ? 'mid' : 'low';
}

function pickRoofType(rand, tier) {
  const r = rand();
  if (tier === 'landmark') return r < 0.8 ? 'spire' : 'setback';
  if (tier === 'high') return r < 0.5 ? 'setback' : r < 0.7 ? 'pyramid' : 'flat';
  if (tier === 'mid') return r < 0.3 ? 'setback' : 'flat';
  return r < 0.1 ? 'setback' : 'flat';
}

function makeBuilding(rand, cx, cz, lotWidth, lotDepth, tier) {
  const [minF, maxF] = TIER_FLOORS[tier];
  const floors = Math.round(minF + Math.pow(rand(), 1.4) * (maxF - minF));
  const height = floors * FLOOR_HEIGHT;
  const glassColor = GLASS_PALETTE[Math.floor(rand() * GLASS_PALETTE.length)];
  const litColor = LIT_PALETTE[Math.floor(rand() * LIT_PALETTE.length)];
  const litRatio = 0.24 + rand() * 0.4;

  // Podium + setback tower massing for taller buildings -- a real skyscraper
  // typology, not a single uniform extrusion top to bottom.
  const hasPodium = (tier === 'high' || tier === 'landmark') && floors > 10;
  let podiumFloors = 0;
  let roofWidth = lotWidth;
  let roofDepth = lotDepth;

  if (hasPodium) {
    podiumFloors = 3 + Math.floor(rand() * 2);
    roofWidth = lotWidth * (0.6 + rand() * 0.15);
    roofDepth = lotDepth * (0.6 + rand() * 0.15);
  }

  return {
    x: cx,
    z: cz,
    width: lotWidth,
    depth: lotDepth,
    height,
    floors,
    tier,
    glassColor,
    litColor,
    litRatio,
    hasPodium,
    podiumHeight: podiumFloors * FLOOR_HEIGHT,
    podiumFloors,
    towerFloors: floors - podiumFloors,
    roofWidth,
    roofDepth,
    roofType: pickRoofType(rand, tier),
  };
}

function generateBuildings(seed = 7) {
  const rand = mulberry32(seed);
  const buildings = [];

  for (let i = 0; i < AVENUES.length - 1; i++) {
    const xMin = AVENUES[i] + STREET_WIDTH / 2;
    const xMax = AVENUES[i + 1] - STREET_WIDTH / 2;

    for (let j = 0; j < CROSS_STREETS.length - 1; j++) {
      const zMin = CROSS_STREETS[j] + STREET_WIDTH / 2;
      const zMax = CROSS_STREETS[j + 1] - STREET_WIDTH / 2;
      const blockCx = (xMin + xMax) / 2;
      const blockCz = (zMin + zMax) / 2;
      const blockTier = pickTier(rand, downtownFactor(blockCx, blockCz));

      // Landmark blocks occasionally get merged into one full-block tower --
      // real skyscrapers occupy large footprints, not a quarter of a lot.
      if (blockTier === 'landmark' && rand() < 0.65) {
        const margin = 0.7;
        buildings.push(
          makeBuilding(rand, blockCx, blockCz, xMax - xMin - margin * 2, zMax - zMin - margin * 2, 'landmark')
        );
        continue;
      }

      // Otherwise subdivide into a 2x2 lot grid, occasionally leaving a plaza gap.
      const lots = 2;
      const lotW = (xMax - xMin) / lots;
      const lotD = (zMax - zMin) / lots;

      for (let lx = 0; lx < lots; lx++) {
        for (let lz = 0; lz < lots; lz++) {
          if (rand() > 0.85) continue;

          // Individual lots mostly follow the block's tier, occasionally dip one
          // tier lower -- clusters of similar buildings, not uniform sameness.
          const tierIdx = TIER_ORDER.indexOf(blockTier);
          const lotTier = rand() < 0.2 && tierIdx > 0 ? TIER_ORDER[tierIdx - 1] : blockTier;

          const margin = 0.35;
          const width = Math.max(1.2, lotW - margin * 2 - rand() * 0.4);
          const depth = Math.max(1.2, lotD - margin * 2 - rand() * 0.4);
          const cx = xMin + lotW * (lx + 0.5);
          const cz = zMin + lotD * (lz + 0.5);

          buildings.push(makeBuilding(rand, cx, cz, width, depth, lotTier));
        }
      }
    }
  }

  const sorted = [...buildings].sort((a, b) => b.height - a.height);
  sorted.slice(0, 5).forEach((b, i) => {
    b.hasBeacon = true;
    b.beaconPhase = i * 1.3;
  });

  return buildings;
}

// Expand each logical building into 1 (simple box) or 2 (podium + tower)
// renderable massing parts.
function buildingToParts(b) {
  if (!b.hasPodium) {
    return [
      {
        x: b.x,
        z: b.z,
        width: b.width,
        depth: b.depth,
        yBase: 0,
        height: b.height,
        floors: b.floors,
        glassColor: b.glassColor,
        litColor: b.litColor,
        litRatio: b.litRatio,
        grounded: true,
      },
    ];
  }
  return [
    {
      x: b.x,
      z: b.z,
      width: b.width,
      depth: b.depth,
      yBase: 0,
      height: b.podiumHeight,
      floors: b.podiumFloors,
      glassColor: b.glassColor,
      litColor: b.litColor,
      litRatio: b.litRatio,
      grounded: true,
    },
    {
      x: b.x,
      z: b.z,
      width: b.roofWidth,
      depth: b.roofDepth,
      yBase: b.podiumHeight,
      height: b.height - b.podiumHeight,
      floors: b.towerFloors,
      glassColor: b.glassColor,
      litColor: b.litColor,
      litRatio: b.litRatio,
      grounded: false,
    },
  ];
}

// One glass curtain-wall grid per facade, on all four sides of every building.
const FACES = [
  { axis: 'x', sign: 1 },
  { axis: 'x', sign: -1 },
  { axis: 'z', sign: 1 },
  { axis: 'z', sign: -1 },
];

// Precompute per-window world transforms for a single instanced draw call across all
// building massing parts. Full-coverage glass grid (mullion frame + glass panels)
// wrapping every facade, not a single street-facing wall of sparse "lit window" dots.
function generateWindows(parts) {
  const windows = [];

  parts.forEach((p) => {
    const rand = mulberry32(Math.round((p.x + 1000) * 97 + (p.z + 1000) * 31 + p.yBase * 53));
    const rows = Math.max(1, p.floors);
    const margin = 0.06;
    const cellH = (p.height - margin * 2) / rows;

    // Target bay width close to the floor height so cells come out roughly
    // square by default; individual panels then vary from there below.
    const targetBay = cellH * 1.8;

    FACES.forEach(({ axis, sign }) => {
      const span = axis === 'x' ? p.depth : p.width;
      const cols = Math.max(1, Math.round(span / targetBay));
      const cellSpan = span / (cols + 1);
      const rotY = axis === 'x' ? (sign > 0 ? Math.PI / 2 : -Math.PI / 2) : sign > 0 ? 0 : Math.PI;

      for (let r = 0; r < rows; r++) {
        const isGroundFloor = p.grounded && r === 0;
        const y = p.yBase + margin + cellH * (r + 0.5);

        for (let c = 0; c < cols; c++) {
          const lit = !isGroundFloor && rand() < p.litRatio;
          const panelColor = isGroundFloor ? LOBBY_COLOR : lit ? p.litColor : p.glassColor;
          const along = -span / 2 + cellSpan * (c + 1);

          const x = axis === 'x' ? p.x + sign * (p.width / 2 + 0.015) : p.x + along;
          const z = axis === 'x' ? p.z + along : p.z + sign * (p.depth / 2 + 0.015);

          // Mostly square panels, with a minority of wide/tall rectangular ones
          const shapeRoll = rand();
          const side = Math.min(cellSpan, cellH) * 0.82;
          let w = side;
          let h = side;
          if (!isGroundFloor) {
            if (shapeRoll > 0.85) {
              w = cellSpan * 0.88;
              h = cellH * 0.5;
            } else if (shapeRoll > 0.7) {
              w = cellSpan * 0.5;
              h = cellH * 0.88;
            }
          } else {
            w = cellSpan * 0.9;
            h = cellH * 0.8;
          }

          windows.push({
            x,
            y,
            z,
            rotY,
            w,
            h,
            color: panelColor,
            lit: lit || isGroundFloor,
          });
        }
      }
    });
  });

  return windows;
}

// Sparse: only every other avenue/cross-street is lit, with wide spacing, and
// skipped wherever a light would land in a crossing street's road bed --
// keeps every pole cleanly on a sidewalk, never on asphalt.
function generateStreetlights(spacing = 13) {
  const lights = [];
  const clearance = ROAD_WIDTH / 2 + 0.3;

  AVENUES.forEach((x, idx) => {
    if (idx % 2 !== 0) return;
    for (let z = -CITY_HALF_Z + spacing / 2; z <= CITY_HALF_Z - spacing / 2; z += spacing) {
      if (CROSS_STREETS.some((cz) => Math.abs(z - cz) < clearance)) continue;
      lights.push({ x: x - STREET_WIDTH / 2 + 0.1, z });
      lights.push({ x: x + STREET_WIDTH / 2 - 0.1, z });
    }
  });
  CROSS_STREETS.forEach((z, idx) => {
    if (idx % 2 !== 0) return;
    for (let x = -CITY_HALF_X + spacing / 2; x <= CITY_HALF_X - spacing / 2; x += spacing) {
      if (AVENUES.some((ax) => Math.abs(x - ax) < clearance)) continue;
      lights.push({ x, z: z - STREET_WIDTH / 2 + 0.1 });
      lights.push({ x, z: z + STREET_WIDTH / 2 - 0.1 });
    }
  });
  return lights;
}

function generateIntersections() {
  const list = [];
  AVENUES.forEach((x) => {
    CROSS_STREETS.forEach((z) => {
      list.push({ x: x + STREET_WIDTH / 2 + 0.25, z: z + STREET_WIDTH / 2 + 0.25 });
    });
  });
  return list;
}

// Cars distributed across every avenue and every cross street, two lanes each,
// each lane looping continuously along its own street.
function generateTraffic(seed = 33) {
  const rand = mulberry32(seed);
  const cars = [];

  AVENUES.forEach((x) => {
    [-1, 1].forEach((lane) => {
      for (let i = 0; i < 2; i++) {
        cars.push({
          axis: 'z',
          fixed: x + (lane * ROAD_WIDTH) / 4,
          length: CITY_HALF_Z * 2,
          offset: rand() * CITY_HALF_Z * 2,
          dir: lane,
          speed: 2 + rand() * 1.5,
        });
      }
    });
  });

  CROSS_STREETS.forEach((z) => {
    [-1, 1].forEach((lane) => {
      for (let i = 0; i < 2; i++) {
        cars.push({
          axis: 'x',
          fixed: z + (lane * ROAD_WIDTH) / 4,
          length: CITY_HALF_X * 2,
          offset: rand() * CITY_HALF_X * 2,
          dir: lane,
          speed: 2 + rand() * 1.5,
        });
      }
    });
  });

  return cars;
}

// A subset of intersections get a street-name sign post (kept sparse to avoid clutter)
function generateRoadSigns() {
  const signs = [];
  AVENUES.forEach((x, i) => {
    CROSS_STREETS.forEach((z, j) => {
      if ((i + j) % 3 !== 0) return;
      signs.push({ x: x - (STREET_WIDTH / 2 + 0.3), z: z - (STREET_WIDTH / 2 + 0.3) });
    });
  });
  return signs;
}

// Zebra crossings on a sparse subset of intersections, one crossing per
// selected intersection (stripes running across the avenue's road bed).
function generateCrosswalks() {
  const stripes = [];
  const stripeCount = 6;
  const stripeGap = ROAD_WIDTH / stripeCount;

  AVENUES.forEach((x, i) => {
    CROSS_STREETS.forEach((z, j) => {
      if ((i + j) % 2 !== 0) return;

      // Crossing over the avenue (stripes run along x, laid out along z)
      const edgeZ = z - STREET_WIDTH / 2 - 0.35;
      for (let s = 0; s < stripeCount; s++) {
        const sx = x - ROAD_WIDTH / 2 + stripeGap * (s + 0.5);
        stripes.push({ x: sx, z: edgeZ, axis: 'x' });
      }

      // Crossing over the cross street (stripes run along z, laid out along x)
      const edgeX = x - STREET_WIDTH / 2 - 0.35;
      for (let s = 0; s < stripeCount; s++) {
        const sz = z - ROAD_WIDTH / 2 + stripeGap * (s + 0.5);
        stripes.push({ x: edgeX, z: sz, axis: 'z' });
      }
    });
  });

  return stripes;
}

function generatePedestrians(seed = 21, count = 26) {
  const rand = mulberry32(seed);
  const nearAvenues = AVENUES.filter((x) => Math.abs(x) <= CELL * 1.5);
  const walkers = [];

  for (let i = 0; i < count; i++) {
    const avenue = nearAvenues[Math.floor(rand() * nearAvenues.length)];
    const side = rand() > 0.5 ? 1 : -1;
    const x = avenue + side * (STREET_WIDTH / 2 - SIDEWALK_WIDTH / 2);
    walkers.push({
      x,
      zCenter: (rand() - 0.5) * CITY_HALF_Z * 1.2,
      range: 8 + rand() * 10,
      speed: 0.3 + rand() * 0.3,
      phase: rand() * Math.PI * 2,
    });
  }

  return walkers;
}

export const BUILDINGS = generateBuildings(7);
export const BUILDING_PARTS = BUILDINGS.flatMap(buildingToParts);
export const WINDOWS = generateWindows(BUILDING_PARTS);
export const BEACON_BUILDINGS = BUILDINGS.filter((b) => b.hasBeacon);
export { FRAME_COLOR };
export const STREETLIGHTS = generateStreetlights();
export const INTERSECTIONS = generateIntersections();
export const TRAFFIC = generateTraffic();
export const ROAD_SIGNS = generateRoadSigns();
export const CROSSWALK_STRIPES = generateCrosswalks();
export const PEDESTRIANS = generatePedestrians();

// Camera keyframes: wide, distant establishing view -> down the main avenue -> in
// close on a single glowing window, as if the camera itself becomes that light.
export const SIDE_VIEW_POS = new THREE.Vector3(50, 24, 40);
export const SIDE_VIEW_TARGET = new THREE.Vector3(0, 7, 0);

export const INTO_CITY_POS = new THREE.Vector3(0.7, 2.7, 24);
export const INTO_CITY_TARGET = new THREE.Vector3(0, 2.3, -18);

// Find a window that genuinely fronts the open main avenue (not one facing into
// the narrow gap toward a neighboring lot) and turn it into the destination the
// camera arrives at -- lit bright green, larger than its neighbors. Restricting
// the search to buildings whose near edge actually hugs x=0 guarantees the
// final shot has open street in front of it, with nothing blocking the view.
function findPortalWindow(buildings, windows, targetZ = -26) {
  const candidates = buildings.filter((b) => {
    const innerEdge = Math.abs(b.x) - b.width / 2;
    return innerEdge > 0 && innerEdge < STREET_WIDTH / 2 + 0.6;
  });
  if (candidates.length === 0) return null;

  let building = candidates[0];
  let bestDz = Infinity;
  candidates.forEach((b) => {
    const dz = Math.abs(b.z - targetZ);
    if (dz < bestDz) {
      bestDz = dz;
      building = b;
    }
  });

  const sign = building.x > 0 ? -1 : 1;
  const expectedRotY = sign > 0 ? Math.PI / 2 : -Math.PI / 2;
  const faceX = building.x + sign * (building.width / 2 + 0.015);

  let best = null;
  let bestDy = Infinity;
  windows.forEach((w) => {
    if (Math.abs(w.rotY - expectedRotY) > 0.01) return;
    if (Math.abs(w.x - faceX) > 0.05) return;
    if (Math.abs(w.z - building.z) > building.depth / 2 + 0.1) return;
    const dy = Math.abs(w.y - 2.2);
    if (dy < bestDy) {
      bestDy = dy;
      best = w;
    }
  });

  return best;
}

// Find portal windows for each beat of the journey
const BEAT_WINDOWS = {
  education: findPortalWindow(BUILDINGS, WINDOWS, -8),     // Education & Hobbies
  experience: findPortalWindow(BUILDINGS, WINDOWS, -16),   // Experience
  projects: findPortalWindow(BUILDINGS, WINDOWS, -22),     // Cool Projects
  research: findPortalWindow(BUILDINGS, WINDOWS, -28),     // Research & Teaching
  contact: findPortalWindow(BUILDINGS, WINDOWS, -34),      // How to get in touch?
};

// Legacy export: the last window (contact beat endpoint)
const PORTAL_WINDOW = BEAT_WINDOWS.contact || findPortalWindow(BUILDINGS, WINDOWS);
if (PORTAL_WINDOW) {
  PORTAL_WINDOW.color = '#3dff7a';
  PORTAL_WINDOW.lit = true;
  PORTAL_WINDOW.w *= 1.8;
  PORTAL_WINDOW.h *= 1.8;
  PORTAL_WINDOW.portal = true;
}
export { PORTAL_WINDOW, BEAT_WINDOWS };

const portalNormal = PORTAL_WINDOW
  ? new THREE.Vector3(Math.sin(PORTAL_WINDOW.rotY), 0, Math.cos(PORTAL_WINDOW.rotY))
  : new THREE.Vector3(0, 0, 1);

export const FINAL_CAMERA_TARGET = PORTAL_WINDOW
  ? new THREE.Vector3(PORTAL_WINDOW.x, PORTAL_WINDOW.y, PORTAL_WINDOW.z)
  : INTO_CITY_TARGET.clone();

export const FINAL_CAMERA_POS = PORTAL_WINDOW
  ? new THREE.Vector3(
      PORTAL_WINDOW.x + portalNormal.x * 0.85,
      PORTAL_WINDOW.y,
      PORTAL_WINDOW.z + portalNormal.z * 0.85
    )
  : INTO_CITY_POS.clone();

export const COLORS = {
  ground: '#0c0d10',
  sidewalk: '#71757d',
  road: '#0a0b0e',
  roadLine: '#5a5d64',
  emissiveRed: '#FF0000',
  background: '#05060c',
  fog: '#05060c',
  ambientSky: '#3a4a6b',
  ambientGround: '#050506',
  lampGlow: '#ffdca8',
  trafficRed: '#ff3b30',
  trafficYellow: '#ffcc33',
  trafficGreen: '#3ddc84',
  signPlate: '#1c5fbf',
  crosswalk: '#c7cad1',
  skyHorizon: '#05060c',
  skyGlow: '#4a3420',
  skyZenith: '#1a1f3d',
  moon: '#fdf6e3',
};

export function easeInOutExpo(x) {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  return x < 0.5 ? Math.pow(2, 20 * x - 10) / 2 : (2 - Math.pow(2, -20 * x + 10)) / 2;
}

export function remap(value, inMin, inMax, outMin = 0, outMax = 1) {
  const t = Math.min(1, Math.max(0, (value - inMin) / (inMax - inMin)));
  return outMin + t * (outMax - outMin);
}

// Journey waypoints: intro → 5 beats → outro
// Each beat (except intro) has a window lit in its accent color
export const JOURNEY_WAYPOINTS = [
  {
    id: 'intro',
    pos: SIDE_VIEW_POS.clone(),
    target: SIDE_VIEW_TARGET.clone(),
    window: null,
    color: null,
  },
  {
    id: 'education',
    pos: null, // computed from window
    target: null,
    window: BEAT_WINDOWS.education,
    color: '#FFB864', // --accent-amber
  },
  {
    id: 'experience',
    pos: null,
    target: null,
    window: BEAT_WINDOWS.experience,
    color: '#FF0000', // --primary (red)
  },
  {
    id: 'projects',
    pos: null,
    target: null,
    window: BEAT_WINDOWS.projects,
    color: '#22C3EE', // --accent-cyan
  },
  {
    id: 'research',
    pos: null,
    target: null,
    window: BEAT_WINDOWS.research,
    color: '#3DFF7A', // --accent-green
  },
  {
    id: 'contact',
    pos: null,
    target: null,
    window: BEAT_WINDOWS.contact,
    color: '#3DFF7A', // --accent-green (reuse)
  },
];

// Compute pos/target from window for each beat
JOURNEY_WAYPOINTS.forEach((waypoint) => {
  if (waypoint.window) {
    const windowNormal = new THREE.Vector3(
      Math.sin(waypoint.window.rotY),
      0,
      Math.cos(waypoint.window.rotY)
    );
    waypoint.target = new THREE.Vector3(waypoint.window.x, waypoint.window.y, waypoint.window.z);
    waypoint.pos = new THREE.Vector3(
      waypoint.window.x + windowNormal.x * 0.85,
      waypoint.window.y,
      waypoint.window.z + windowNormal.z * 0.85
    );
  }
});
