import { useRef, useMemo, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { COLORS } from '@/data/constants';

export const AboutScene = memo(function AboutScene() {
  const groupRef = useRef<THREE.Group>(null);
  const hologramRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const gridMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#050a1f',
    roughness: 0.8,
    metalness: 0.2,
    wireframe: true,
    transparent: true,
    opacity: 0.3,
  }), []);

  const hologramMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: COLORS.primary,
    transparent: true,
    opacity: 0.15,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), []);

  const coreMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: COLORS.secondary,
  }), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.1;
    }
    if (hologramRef.current) {
      hologramRef.current.rotation.y = t * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.sin(t * 0.5) * 0.2 + Math.PI / 2;
      ringRef.current.rotation.z = t * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -10]}>
      {/* Abstract Grid Room/Environment */}
      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]} material={gridMaterial}>
        <planeGeometry args={[40, 40, 20, 20]} />
      </mesh>
      
      <mesh position={[0, 10, -15]} material={gridMaterial}>
        <planeGeometry args={[40, 20, 20, 10]} />
      </mesh>

      {/* Holographic Projector Base */}
      <mesh position={[0, -1, 0]} material={new THREE.MeshStandardMaterial({ color: '#0a192f', roughness: 0.5 })}>
        <cylinderGeometry args={[0.8, 1, 0.4, 16]} />
      </mesh>

      <mesh position={[0, -0.75, 0]} material={coreMaterial}>
        <cylinderGeometry args={[0.5, 0.5, 0.1, 16]} />
      </mesh>

      {/* Holographic Display Area */}
      <mesh ref={hologramRef} position={[0, 1.5, 0]} material={hologramMaterial}>
        <cylinderGeometry args={[2, 0.5, 4, 32, 1, true]} />
      </mesh>

      {/* Rotating Data Rings */}
      <mesh ref={ringRef} position={[0, 1.5, 0]} rotation={[Math.PI / 2, 0, 0]} material={new THREE.MeshBasicMaterial({ color: COLORS.accent, transparent: true, opacity: 0.4, wireframe: true })}>
        <torusGeometry args={[2.5, 0.05, 16, 64]} />
      </mesh>
    </group>
  );
});
