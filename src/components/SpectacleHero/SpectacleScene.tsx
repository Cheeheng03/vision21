"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ── Helpers ──────────────────────────────────────────────────────────

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) {
  const t = Math.max(0, Math.min(1, (value - inMin) / (inMax - inMin)));
  return outMin + (outMax - outMin) * t;
}

// ── Shared materials ─────────────────────────────────────────────────
const GOLD = { color: "#b0b0b0", metalness: 0.95, roughness: 0.12 };
const DARK_GOLD = { color: "#808080", metalness: 0.9, roughness: 0.15 };
const DARK_TIP = { color: "#2a2a2a", metalness: 0.3, roughness: 0.5 };

// ── Hex lens shape ───────────────────────────────────────────────────
// Flat-top hex with soft rounded corners
//
// Key geometry (radius = 0.50, angleOffset = π/6):
//   widest X from center = cos(30°) × r = 0.433
//   top/bottom Y from center = r = 0.50
//
// Lens centers at X = ±0.55
//   → outer edge X = 0.55 + 0.433 = 0.983
//   → inner edge X = 0.55 − 0.433 = 0.117

const LENS_R = 0.50;
const LENS_CX = 0.55; // center X of each lens
const LENS_OUTER_X = LENS_CX + Math.cos(Math.PI / 6) * LENS_R; // ~0.98
const LENS_INNER_X = LENS_CX - Math.cos(Math.PI / 6) * LENS_R; // ~0.12

function createHexLensShape(radius: number): THREE.Shape {
  const shape = new THREE.Shape();
  const sides = 6;
  const angleOffset = Math.PI / 6;

  const pts: [number, number][] = [];
  for (let i = 0; i < sides; i++) {
    const a = angleOffset + (i / sides) * Math.PI * 2;
    pts.push([Math.cos(a) * radius, Math.sin(a) * radius]);
  }

  // Start at midpoint between last and first vertex
  shape.moveTo((pts[5][0] + pts[0][0]) / 2, (pts[5][1] + pts[0][1]) / 2);

  for (let i = 0; i < sides; i++) {
    const next = (i + 1) % sides;
    const [cx, cy] = pts[i];
    const midx = (pts[i][0] + pts[next][0]) / 2;
    const midy = (pts[i][1] + pts[next][1]) / 2;
    shape.quadraticCurveTo(cx * 0.88, cy * 0.88, midx, midy);
  }
  shape.closePath();
  return shape;
}

// ── Hex lens rim (extruded ring) ─────────────────────────────────────

function LensRim({
  position,
  outerR,
  innerR,
  depth,
  matProps,
}: {
  position: [number, number, number];
  outerR: number;
  innerR: number;
  depth: number;
  matProps: typeof GOLD;
}) {
  const geometry = useMemo(() => {
    const outer = createHexLensShape(outerR);
    const inner = createHexLensShape(innerR);
    outer.holes.push(new THREE.Path(inner.getPoints(64)));
    const geo = new THREE.ExtrudeGeometry(outer, {
      depth,
      bevelEnabled: true,
      bevelThickness: 0.006,
      bevelSize: 0.006,
      bevelSegments: 2,
    });
    geo.center();
    return geo;
  }, [outerR, innerR, depth]);

  return (
    <mesh position={position} geometry={geometry}>
      <meshStandardMaterial {...matProps} />
    </mesh>
  );
}

// ── Lens glass ───────────────────────────────────────────────────────

function LensGlass({ position }: { position: [number, number, number] }) {
  const geometry = useMemo(() => {
    return new THREE.ShapeGeometry(createHexLensShape(0.44), 64);
  }, []);

  return (
    <mesh position={position} geometry={geometry}>
      <meshPhysicalMaterial
        color="#6aabdb"
        transparent
        opacity={0.4}
        roughness={0.05}
        metalness={0.1}
        clearcoat={1}
        clearcoatRoughness={0}
        reflectivity={0.8}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// ── Tube helper (cylinder between two points) ────────────────────────

function Tube({
  from,
  to,
  radius,
  matProps,
}: {
  from: [number, number, number];
  to: [number, number, number];
  radius: number;
  matProps: typeof GOLD | typeof DARK_TIP;
}) {
  const { position, rotation, length } = useMemo(() => {
    const a = new THREE.Vector3(...from);
    const b = new THREE.Vector3(...to);
    const mid = a.clone().add(b).multiplyScalar(0.5);
    const dir = b.clone().sub(a);
    const len = dir.length();
    dir.normalize();
    // Rotation: default cylinder is along Y axis
    const up = new THREE.Vector3(0, 1, 0);
    const quat = new THREE.Quaternion().setFromUnitVectors(up, dir);
    const euler = new THREE.Euler().setFromQuaternion(quat);
    return {
      position: [mid.x, mid.y, mid.z] as [number, number, number],
      rotation: [euler.x, euler.y, euler.z] as [number, number, number],
      length: len,
    };
  }, [from, to]);

  return (
    <mesh position={position} rotation={rotation}>
      <cylinderGeometry args={[radius, radius, length, 12]} />
      <meshStandardMaterial {...matProps} />
    </mesh>
  );
}

// ── Complete glasses assembly ─────────────────────────────────────────

function GlassesAssembly() {
  return (
    <group>
      {/* ── Left lens ── */}
      <LensRim position={[-LENS_CX, 0, 0]} outerR={0.52} innerR={0.49} depth={0.03} matProps={GOLD} />
      <LensRim position={[-LENS_CX, 0, -0.008]} outerR={0.48} innerR={0.46} depth={0.02} matProps={DARK_GOLD} />
      <LensGlass position={[-LENS_CX, 0, 0.005]} />

      {/* ── Right lens ── */}
      <LensRim position={[LENS_CX, 0, 0]} outerR={0.52} innerR={0.49} depth={0.03} matProps={GOLD} />
      <LensRim position={[LENS_CX, 0, -0.008]} outerR={0.48} innerR={0.46} depth={0.02} matProps={DARK_GOLD} />
      <LensGlass position={[LENS_CX, 0, 0.005]} />

      {/* ── Bridge (connects inner edges of both lenses) ── */}
      <Tube
        from={[-LENS_INNER_X, 0, 0.02]}
        to={[LENS_INNER_X, 0, 0.02]}
        radius={0.02}
        matProps={GOLD}
      />

      {/* ── Left temple arm ── */}
      {/* Hinge at outer edge of left lens */}
      <mesh position={[-LENS_OUTER_X, 0, 0]}>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshStandardMaterial {...GOLD} />
      </mesh>
      {/* Arm: from hinge straight back */}
      <Tube
        from={[-LENS_OUTER_X, 0, 0]}
        to={[-LENS_OUTER_X, 0, -1.3]}
        radius={0.016}
        matProps={GOLD}
      />
      {/* Temple tip: curves down at end */}
      <Tube
        from={[-LENS_OUTER_X, 0, -1.3]}
        to={[-LENS_OUTER_X, -0.18, -1.55]}
        radius={0.02}
        matProps={DARK_TIP}
      />
      {/* Tip end cap */}
      <mesh position={[-LENS_OUTER_X, -0.18, -1.55]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial {...DARK_TIP} />
      </mesh>

      {/* ── Right temple arm ── */}
      <mesh position={[LENS_OUTER_X, 0, 0]}>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshStandardMaterial {...GOLD} />
      </mesh>
      <Tube
        from={[LENS_OUTER_X, 0, 0]}
        to={[LENS_OUTER_X, 0, -1.3]}
        radius={0.016}
        matProps={GOLD}
      />
      <Tube
        from={[LENS_OUTER_X, 0, -1.3]}
        to={[LENS_OUTER_X, -0.18, -1.55]}
        radius={0.02}
        matProps={DARK_TIP}
      />
      <mesh position={[LENS_OUTER_X, -0.18, -1.55]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial {...DARK_TIP} />
      </mesh>

    </group>
  );
}

// ── Animated wrapper ─────────────────────────────────────────────────

function GlassesModel({
  progressRef,
}: {
  progressRef: React.RefObject<number>;
}) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(() => {
    const group = groupRef.current;
    if (!group) return;

    const p = progressRef.current ?? 0;

    // Phase 1 (0–0.3): Spin 180°
    const targetRotY = mapRange(p, 0, 0.3, 0, Math.PI);
    group.rotation.y = lerp(group.rotation.y, targetRotY, 0.1);

    // Phase 2 (0.3–0.7): "Wear" — scale up and fly toward camera
    const w = typeof window !== "undefined" ? window.innerWidth : 1024;
    // Responsive scale: smaller screens start smaller
    let initScale: number;
    let midScale: number;
    let maxScale: number;
    if (w < 480) {
      initScale = 0.7; midScale = 1.0; maxScale = 3.5;
    } else if (w < 768) {
      initScale = 0.9; midScale = 1.4; maxScale = 5.0;
    } else if (w < 1024) {
      initScale = 1.2; midScale = 1.8; maxScale = 6.0;
    } else {
      initScale = 1.5; midScale = 2.0; maxScale = 8.0;
    }
    let targetScale: number;
    if (p <= 0.3) {
      targetScale = mapRange(p, 0, 0.3, initScale, midScale);
    } else if (p <= 0.7) {
      targetScale = mapRange(p, 0.3, 0.7, midScale, maxScale);
    } else {
      targetScale = maxScale;
    }
    const s = lerp(group.scale.x, targetScale, 0.1);
    group.scale.set(s, s, s);

    // Z position: approach camera during wear
    let targetZ: number;
    if (p <= 0.3) {
      targetZ = mapRange(p, 0, 0.3, -2, -0.5);
    } else if (p <= 0.7) {
      targetZ = mapRange(p, 0.3, 0.7, -0.5, 4);
    } else {
      targetZ = 4;
    }
    group.position.z = lerp(group.position.z, targetZ, 0.1);

    // Phase 3 (0.7–0.85): Fade out
    let targetOpacity: number;
    if (p <= 0.7) {
      targetOpacity = 1;
    } else {
      targetOpacity = mapRange(p, 0.7, 0.85, 1, 0);
    }
    group.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const mat = child.material as THREE.MeshStandardMaterial;
        if (mat.userData.origOpacity === undefined) {
          mat.userData.origOpacity = mat.opacity;
        }
        mat.transparent = true;
        mat.opacity = lerp(
          mat.opacity,
          (mat.userData.origOpacity ?? 1) * targetOpacity,
          0.15
        );
      }
    });
  });

  return (
    <group ref={groupRef} scale={0.7} position={[0, 0, -2]}>
      <GlassesAssembly />
    </group>
  );
}

// ── Canvas ───────────────────────────────────────────────────────────

export default function SpectacleScene({
  progressRef,
}: {
  progressRef: React.RefObject<number>;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ width: "100%", height: "100%", background: "#ffffff" }}
    >
      <color attach="background" args={["#ffffff"]} />
      <ambientLight intensity={1.2} />
      <directionalLight position={[4, 6, 5]} intensity={2.5} />
      <directionalLight position={[-4, 3, 3]} intensity={1.2} color="#ffe4b0" />
      <pointLight position={[0, 0, 6]} intensity={2} />
      <pointLight position={[0, -2, 3]} intensity={0.8} color="#ffd080" />
      <GlassesModel progressRef={progressRef} />
    </Canvas>
  );
}
