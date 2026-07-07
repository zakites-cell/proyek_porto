import { useRef, useMemo, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ProjectCube } from '@/components/Projects/ProjectCube';
import { PROJECTS } from '@/data/constants';

export const ProjectScene = memo(function ProjectScene() {
  const groupRef = useRef<THREE.Group>(null);
  
  const gridMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#050a1f',
    roughness: 0.8,
    metalness: 0.2,
    wireframe: true,
    transparent: true,
    opacity: 0.3,
  }), []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -30]}>
      {/* Abstract Grid Floor */}
      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]} material={gridMaterial}>
        <planeGeometry args={[40, 40, 20, 20]} />
      </mesh>

      {/* Project Cubes arranged in space */}
      {PROJECTS.map((project, index) => {
        const x = (index % 2 === 0 ? -1 : 1) * 3;
        const z = -Math.floor(index / 2) * 4;
        const y = Math.sin(index) * 1.5 + 1;
        
        return (
          <group key={project.id} position={[x, y, z]}>
            <ProjectCube project={project} />
          </group>
        );
      })}
    </group>
  );
});
