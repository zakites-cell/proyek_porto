import { useState, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSpring, a } from '@react-spring/three';
import * as THREE from 'three';
import { ProjectDetail } from './ProjectDetail';
import type { Project } from '@/types';

interface ProjectCubeProps {
  project: Project;
}

export function ProjectCube({ project }: ProjectCubeProps) {
  const [active, setActive] = useState(false);
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  // Spring animation for opening the cube and hovering
  const { openSpring, hoverSpring, emissiveIntensity } = useSpring({
    openSpring: active ? 1 : 0,
    hoverSpring: hovered ? 1 : 0,
    emissiveIntensity: active || hovered ? 2 : 0.5,
    config: { mass: 1, tension: 170, friction: 26 }
  });

  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#0a192f',
    emissive: project.color,
    roughness: 0.1,
    metalness: 0.8,
    transparent: true,
    opacity: 0.9,
  }), [project.color]);

  const coreMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: project.color,
  }), [project.color]);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
    if (coreRef.current) {
      coreRef.current.rotation.x = -clock.getElapsedTime() * 0.5;
      coreRef.current.rotation.y = clock.getElapsedTime() * 0.8;
    }
  });

  // Calculate face positions based on open state
  const faceOffset = openSpring.to([0, 1], [0.5, 1.2]);

  return (
    <group>
      <a.group 
        ref={meshRef}
        scale={hoverSpring.to([0, 1], [1, 1.2])}
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
        onClick={(e) => {
          e.stopPropagation();
          setActive(!active);
        }}
      >
        <a.meshStandardMaterial 
          color="#0a192f" 
          emissive={project.color}
          emissiveIntensity={emissiveIntensity as any}
          roughness={0.1}
          metalness={0.8}
        />
        
        {/* Core data crystal */}
        <mesh ref={coreRef} material={coreMaterial}>
          <octahedronGeometry args={[0.3, 0]} />
        </mesh>

        {/* 6 Faces of the cube that separate when opened */}
        <a.mesh position-z={faceOffset} material={material}>
          <planeGeometry args={[1, 1]} />
        </a.mesh>
        <a.mesh position-z={faceOffset.to(v => -v)} rotation-y={Math.PI} material={material}>
          <planeGeometry args={[1, 1]} />
        </a.mesh>
        <a.mesh position-x={faceOffset} rotation-y={Math.PI / 2} material={material}>
          <planeGeometry args={[1, 1]} />
        </a.mesh>
        <a.mesh position-x={faceOffset.to(v => -v)} rotation-y={-Math.PI / 2} material={material}>
          <planeGeometry args={[1, 1]} />
        </a.mesh>
        <a.mesh position-y={faceOffset} rotation-x={-Math.PI / 2} material={material}>
          <planeGeometry args={[1, 1]} />
        </a.mesh>
        <a.mesh position-y={faceOffset.to(v => -v)} rotation-x={Math.PI / 2} material={material}>
          <planeGeometry args={[1, 1]} />
        </a.mesh>

        {/* Edges */}
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(1, 1, 1)]} />
          <a.lineBasicMaterial color={project.color} transparent opacity={hoverSpring.to([0,1],[0.2,0.8])} />
        </lineSegments>
      </a.group>

      {/* Project Detail HTML Modal */}
      {active && (
        <ProjectDetail 
          project={project} 
          onClose={() => setActive(false)} 
        />
      )}
    </group>
  );
}
