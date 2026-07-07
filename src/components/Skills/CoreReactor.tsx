import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { COLORS } from '@/data/constants';

export function CoreReactor() {
  const coreRef = useRef<THREE.Mesh>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  
  const coreMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: COLORS.primary,
    emissive: COLORS.primary,
    emissiveIntensity: 2,
    roughness: 0.1,
    metalness: 0.8,
  }), []);

  const shellMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: COLORS.secondary,
    emissive: COLORS.secondary,
    emissiveIntensity: 0.5,
    wireframe: true,
    transparent: true,
    opacity: 0.5,
  }), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.x = t * 0.5;
      coreRef.current.rotation.y = t * 0.8;
      const pulse = 1 + Math.sin(t * 2) * 0.1;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }
    if (shellRef.current) {
      shellRef.current.rotation.x = -t * 0.2;
      shellRef.current.rotation.z = t * 0.3;
    }
  });

  return (
    <group>
      <mesh ref={coreRef} material={coreMaterial}>
        <icosahedronGeometry args={[1, 1]} />
      </mesh>
      
      <mesh ref={shellRef} material={shellMaterial}>
        <icosahedronGeometry args={[1.5, 2]} />
      </mesh>

      {/* Point light for local illumination */}
      <pointLight color={COLORS.primary} intensity={2} distance={10} decay={2} />
    </group>
  );
}
