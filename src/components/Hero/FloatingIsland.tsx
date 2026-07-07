import { useRef, useMemo, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { COLORS } from '@/data/constants';

export const FloatingIsland = memo(function FloatingIsland() {
  const groupRef = useRef<THREE.Group>(null);
  const crystalRef = useRef<THREE.Mesh>(null);

  const rockMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1a1a2e',
        roughness: 0.9,
        metalness: 0.1,
        flatShading: true,
      }),
    [],
  );

  const topMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#0a192f',
        roughness: 0.7,
        metalness: 0.2,
        flatShading: true,
      }),
    [],
  );

  const crystalMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: COLORS.primary,
        emissive: COLORS.primary,
        emissiveIntensity: 0.8,
        roughness: 0.1,
        metalness: 0.9,
        transparent: true,
        opacity: 0.85,
      }),
    [],
  );

  const glowMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: COLORS.primary,
        transparent: true,
        opacity: 0.15,
        side: THREE.BackSide,
      }),
    [],
  );

  const edgeGeometry = useMemo(() => {
    const geo = new THREE.TorusGeometry(2.2, 0.02, 8, 64);
    return geo;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.4) * 0.3;
      groupRef.current.rotation.y = t * 0.05;
    }
    if (crystalRef.current) {
      crystalRef.current.rotation.y = t * 0.8;
      crystalRef.current.position.y = 1.0 + Math.sin(t * 1.2) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Main island body — top flat area */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow material={topMaterial}>
        <cylinderGeometry args={[2.5, 2, 0.4, 8]} />
      </mesh>

      {/* Island rock base — tapered cone underneath */}
      <mesh position={[0, -0.8, 0]} castShadow material={rockMaterial}>
        <coneGeometry args={[2.2, 1.5, 8]} />
      </mesh>

      {/* Stalactite underneath */}
      <mesh position={[0, -2.0, 0]} material={rockMaterial}>
        <coneGeometry args={[0.8, 1.5, 6]} />
      </mesh>

      {/* Smaller rock formations */}
      <mesh position={[1.2, 0.15, 0.8]} castShadow material={rockMaterial}>
        <dodecahedronGeometry args={[0.35, 0]} />
      </mesh>
      <mesh position={[-1.0, 0.12, -0.6]} castShadow material={rockMaterial}>
        <dodecahedronGeometry args={[0.25, 0]} />
      </mesh>
      <mesh position={[0.5, 0.1, -1.2]} castShadow material={rockMaterial}>
        <dodecahedronGeometry args={[0.2, 0]} />
      </mesh>

      {/* Central crystal */}
      <mesh ref={crystalRef} position={[0, 1.0, 0]} castShadow material={crystalMaterial}>
        <octahedronGeometry args={[0.5, 0]} />
      </mesh>

      {/* Crystal glow sphere */}
      <mesh position={[0, 1.0, 0]} material={glowMaterial}>
        <sphereGeometry args={[0.9, 16, 16]} />
      </mesh>

      {/* Orbit ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} material={crystalMaterial}>
        <primitive object={edgeGeometry} attach="geometry" />
      </mesh>
    </group>
  );
});
