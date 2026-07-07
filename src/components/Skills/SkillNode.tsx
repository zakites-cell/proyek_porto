import { useState, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSpring, a } from '@react-spring/three';
import * as THREE from 'three';
import { SkillTooltip } from './SkillTooltip';
import type { Skill } from '@/types';

interface SkillNodeProps {
  skill: Skill;
  color: string;
}

export function SkillNode({ skill, color }: SkillNodeProps) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Spring animation for scale and glow when hovered
  const { scale, emissiveIntensity } = useSpring({
    scale: hovered ? 1.5 : 1,
    emissiveIntensity: hovered ? 2 : 0.5,
    config: { mass: 1, tension: 280, friction: 20 }
  });

  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#0a192f',
    emissive: color,
    roughness: 0.2,
    metalness: 0.8,
  }), [color]);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Counter-rotate against the orbit to keep the node facing mostly forward/upright
      // but let's just give it a nice internal spin
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.5;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.8;
    }
  });

  return (
    <group>
      <a.mesh
        ref={meshRef}
        scale={scale as any}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
        material={material}
      >
        <dodecahedronGeometry args={[0.3, 0]} />
        <a.meshStandardMaterial 
          color="#0a192f" 
          emissive={color}
          emissiveIntensity={emissiveIntensity as any}
          roughness={0.2}
          metalness={0.8}
        />
      </a.mesh>
      
      {/* Glow effect */}
      <a.mesh scale={scale as any}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <a.meshBasicMaterial 
          color={color}
          transparent
          opacity={hovered ? 0.3 : 0.1}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </a.mesh>

      {hovered && <SkillTooltip skill={skill} color={color} />}
    </group>
  );
}
