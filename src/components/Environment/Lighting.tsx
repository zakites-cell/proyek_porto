import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { COLORS } from '@/data/constants';

interface LightingProps {
  enableShadows?: boolean;
}

export function Lighting({ enableShadows = true }: LightingProps) {
  const directionalRef = useRef<THREE.DirectionalLight>(null);
  const pointRef1 = useRef<THREE.PointLight>(null);
  const pointRef2 = useRef<THREE.PointLight>(null);

  const primaryColor = useMemo(() => new THREE.Color(COLORS.primary), []);
  const secondaryColor = useMemo(() => new THREE.Color(COLORS.secondary), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (pointRef1.current) {
      pointRef1.current.intensity = 1.5 + Math.sin(t * 0.5) * 0.3;
    }
    if (pointRef2.current) {
      pointRef2.current.intensity = 1.0 + Math.sin(t * 0.7 + 1) * 0.2;
    }
  });

  return (
    <>
      <ambientLight intensity={0.15} color="#1a1a3e" />

      <directionalLight
        ref={directionalRef}
        position={[5, 8, 5]}
        intensity={0.6}
        color="#e0e8ff"
        castShadow={enableShadows}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.001}
      />

      <pointLight
        ref={pointRef1}
        position={[-4, 3, 2]}
        intensity={1.5}
        color={primaryColor}
        distance={20}
        decay={2}
      />

      <pointLight
        ref={pointRef2}
        position={[4, 2, -3]}
        intensity={1.0}
        color={secondaryColor}
        distance={15}
        decay={2}
      />
    </>
  );
}
