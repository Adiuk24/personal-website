'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

const R = 2;

// Places Arif actually worked or sold into, per his CV.
const PLACES = [
  { name: 'Dhaka', detail: 'everjobs · Joycalls · tapmad', lat: 23.81, lon: 90.41, home: true },
  { name: 'London', detail: 'Nuffield Health · GlobalData', lat: 51.51, lon: -0.13 },
  { name: 'Peterlee', detail: 'VBITES', lat: 54.76, lon: -1.33 },
  { name: 'Dubai', detail: 'MENA campaign', lat: 25.2, lon: 55.27 },
  { name: 'Riyadh', detail: 'MENA campaign', lat: 24.71, lon: 46.68 },
  { name: 'Doha', detail: 'MENA campaign', lat: 25.29, lon: 51.53 },
  { name: 'Cairo', detail: 'MENA campaign', lat: 30.04, lon: 31.24 },
];

// The career path, in order.
const ROUTE: [string, string][] = [
  ['Dhaka', 'London'],
  ['London', 'Peterlee'],
  ['London', 'Dubai'],
  ['Dubai', 'Riyadh'],
  ['Riyadh', 'Doha'],
  ['Doha', 'Cairo'],
  ['Cairo', 'Dhaka'],
];

function toVec(lat: number, lon: number, radius = R) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function Arc({ from, to }: { from: THREE.Vector3; to: THREE.Vector3 }) {
  const geometry = useMemo(() => {
    // Lift the control point off the surface so the arc reads as a flight path.
    const mid = from.clone().add(to).multiplyScalar(0.5);
    const lift = 1 + from.distanceTo(to) * 0.22;
    mid.normalize().multiplyScalar(R * lift);
    const curve = new THREE.QuadraticBezierCurve3(from, mid, to);
    return new THREE.BufferGeometry().setFromPoints(curve.getPoints(48));
  }, [from, to]);

  return (
    <primitive
      object={new THREE.Line(
        geometry,
        new THREE.LineBasicMaterial({ color: '#F27D26', transparent: true, opacity: 0.55 }),
      )}
    />
  );
}

function Marker({
  place,
  onHover,
}: {
  place: (typeof PLACES)[number];
  onHover: (p: (typeof PLACES)[number] | null) => void;
}) {
  const pos = useMemo(() => toVec(place.lat, place.lon, R * 1.01), [place]);
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current || !place.home) return;
    // Home city gently pulses so the eye lands on Dhaka first.
    const s = 1 + Math.sin(clock.elapsedTime * 2) * 0.25;
    ref.current.scale.setScalar(s);
  });

  return (
    <mesh
      ref={ref}
      position={pos}
      onPointerOver={e => { e.stopPropagation(); onHover(place); }}
      onPointerOut={() => onHover(null)}
    >
      <sphereGeometry args={[place.home ? 0.055 : 0.038, 16, 16]} />
      <meshBasicMaterial color={place.home ? '#F27D26' : '#ffffff'} />
    </mesh>
  );
}

function Globe({ onHover }: { onHover: (p: (typeof PLACES)[number] | null) => void }) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.06;
  });

  const arcs = useMemo(
    () =>
      ROUTE.map(([a, b]) => {
        const pa = PLACES.find(p => p.name === a)!;
        const pb = PLACES.find(p => p.name === b)!;
        return { key: `${a}-${b}`, from: toVec(pa.lat, pa.lon), to: toVec(pb.lat, pb.lon) };
      }),
    [],
  );

  return (
    <group ref={group} rotation={[0, -1.2, 0.35]}>
      {/* Wireframe shell — monochrome to match the site, not a photoreal earth. */}
      <mesh>
        <sphereGeometry args={[R, 40, 28]} />
        <meshBasicMaterial color="#2a2a28" wireframe transparent opacity={0.55} />
      </mesh>
      <mesh>
        <sphereGeometry args={[R * 0.995, 48, 32]} />
        <meshBasicMaterial color="#050505" />
      </mesh>

      {arcs.map(a => (
        <Arc key={a.key} from={a.from} to={a.to} />
      ))}
      {PLACES.map(p => (
        <Marker key={p.name} place={p} onHover={onHover} />
      ))}
    </group>
  );
}

export default function CareerGlobe() {
  const [hovered, setHovered] = useState<(typeof PLACES)[number] | null>(null);

  return (
    <div className="relative w-full h-[420px] md:h-[560px]">
      <Canvas camera={{ position: [0, 0, 6.2], fov: 42 }} dpr={[1, 2]}>
        <Globe onHover={setHovered} />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          rotateSpeed={0.4}
          minPolarAngle={Math.PI / 3.2}
          maxPolarAngle={Math.PI / 1.6}
        />
      </Canvas>

      <div className="pointer-events-none absolute bottom-4 left-0 right-0 text-center min-h-[46px]">
        {hovered ? (
          <>
            <p className="text-white font-serif text-xl">{hovered.name}</p>
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#F27D26] mt-1">
              {hovered.detail}
            </p>
          </>
        ) : (
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30">
            Drag to rotate · hover a city
          </p>
        )}
      </div>
    </div>
  );
}
