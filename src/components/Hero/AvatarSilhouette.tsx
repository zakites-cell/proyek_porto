import { useRef, useMemo, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { COLORS } from '@/data/constants';

export const AvatarSilhouette = memo(function AvatarSilhouette() {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  
  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: COLORS.primary,
    emissive: COLORS.secondary,
    emissiveIntensity: 0.5,
    wireframe: true,
    transparent: true,
    opacity: 0.7,
  }), []);

  const coreMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: COLORS.accent,
  }), []);

  const solidMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#0a192f',
    roughness: 0.2,
    metalness: 0.8,
  }), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.15;
      groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.2;
    }
    if (ringRef1.current) {
      ringRef1.current.rotation.x = t * 0.5;
      ringRef1.current.rotation.y = t * 0.3;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.x = -t * 0.3;
      ringRef2.current.rotation.z = t * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={[0, 1.5, 0]}>
      {/* Head */}
      <mesh position={[0, 1.3, 0]} material={solidMaterial}>
        <sphereGeometry args={[0.25, 32, 32]} />
      </mesh>
      
      {/* Core / Brain */}
      <mesh position={[0, 1.3, 0]} material={coreMaterial}>
        <sphereGeometry args={[0.08, 16, 16]} />
      </mesh>

      {/* Body */}
      <mesh position={[0, 0.2, 0]} material={solidMaterial}>
        <capsuleGeometry args={[0.35, 1.2, 16, 16]} />
      </mesh>
      
      {/* Wireframe overlay for tech look */}
      <mesh position={[0, 0.2, 0]} material={material} scale={[1.05, 1.05, 1.05]}>
        <capsuleGeometry args={[0.35, 1.2, 8, 8]} />
      </mesh>

      {/* Floating rings around avatar */}
      <mesh ref={ringRef1} position={[0, 0.6, 0]} material={material}>
        <torusGeometry args={[0.9, 0.015, 16, 50]} />
      </mesh>
      <mesh ref={ringRef2} position={[0, 0.4, 0]} material={material}>
        <torusGeometry args={[1.2, 0.01, 16, 50]} />
      </mesh>
    </group>
  );
});
