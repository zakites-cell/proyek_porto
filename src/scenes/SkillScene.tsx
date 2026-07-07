import { memo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { CoreReactor } from '@/components/Skills/CoreReactor';
import { SkillOrbit } from '@/components/Skills/SkillOrbit';
import { SKILLS, SKILL_CATEGORIES } from '@/data/constants';

export const SkillScene = memo(function SkillScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -20]}>
      {/* Central Core Reactor */}
      <CoreReactor />

      {/* Orbital Rings for each category */}
      {SKILL_CATEGORIES.map((category) => {
        const categorySkills = SKILLS.filter(s => s.category === category.id);
        if (categorySkills.length === 0) return null;
        
        return (
          <SkillOrbit 
            key={category.id} 
            category={category} 
            skills={categorySkills} 
          />
        );
      })}
    </group>
  );
});
