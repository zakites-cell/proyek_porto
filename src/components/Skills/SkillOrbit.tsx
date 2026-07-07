import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SkillNode } from './SkillNode';
import type { Skill } from '@/types';

interface SkillOrbitProps {
  category: { id: string; label: string; color: string; orbitRadius: number };
  skills: Skill[];
}

export function SkillOrbit({ category, skills }: SkillOrbitProps) {
  const orbitGroup = useRef<THREE.Group>(null);
  
  // Calculate rotation speed based on radius (inner faster, outer slower)
  const speed = useMemo(() => 0.5 / category.orbitRadius, [category.orbitRadius]);
  
  // Random starting phase
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);

  // Subtle tilt for orbit plane
  const tiltX = useMemo(() => (Math.random() - 0.5) * 0.4, []);
  const tiltZ = useMemo(() => (Math.random() - 0.5) * 0.4, []);

  useFrame(({ clock }) => {
    if (orbitGroup.current) {
      orbitGroup.current.rotation.y = clock.getElapsedTime() * speed + phase;
    }
  });

  return (
    <group rotation={[tiltX, 0, tiltZ]}>
      {/* Orbital Path Line */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[category.orbitRadius, 0.015, 16, 64]} />
        <meshBasicMaterial color={category.color} transparent opacity={0.2} />
      </mesh>

      <group ref={orbitGroup}>
        {skills.map((skill, index) => {
          const angle = (index / skills.length) * Math.PI * 2;
          const x = Math.cos(angle) * category.orbitRadius;
          const z = Math.sin(angle) * category.orbitRadius;
          
          return (
            <group key={skill.name} position={[x, 0, z]}>
              <SkillNode skill={skill} color={category.color} />
            </group>
          );
        })}
      </group>
    </group>
  );
}
