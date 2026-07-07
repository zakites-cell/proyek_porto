import { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSpring, a } from '@react-spring/three';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import type { TimelineItem } from '@/types';
import { COLORS } from '@/data/constants';

interface TimelineNodeProps {
  item: TimelineItem;
  index: number;
}

export function TimelineNode({ item, index }: TimelineNodeProps) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);

  const { scale } = useSpring({
    scale: hovered ? 1.5 : 1,
    config: { mass: 1, tension: 280, friction: 20 }
  });

  const nodeColor = 
    item.type === 'education' ? COLORS.primary :
    item.type === 'work' ? COLORS.secondary :
    COLORS.accent;

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.5 + index;
      meshRef.current.rotation.z = clock.getElapsedTime() * 0.2;
    }
  });

  // Alternate placing the tooltip above or below the line
  const isTop = index % 2 === 0;

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
      >
        <octahedronGeometry args={[0.4, 0]} />
        <meshStandardMaterial 
          color="#0a192f" 
          emissive={nodeColor}
          emissiveIntensity={hovered ? 2 : 1}
          roughness={0.2}
          metalness={0.8}
        />
      </a.mesh>

      {/* HTML tooltip showing the timeline information */}
      <Html
        position={[0, isTop ? 1.2 : -1.2, 0]}
        center
        distanceFactor={12}
        zIndexRange={[100, 0]}
        className={`pointer-events-none transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-60'}`}
      >
        <div 
          className="glass rounded-xl p-4 w-64 shadow-lg text-left relative"
          style={{ 
            borderColor: `${nodeColor}40`, 
            boxShadow: hovered ? `0 0 20px ${nodeColor}30` : 'none' 
          }}
        >
          {/* Connector line */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 w-0.5"
            style={{ 
              height: '30px', 
              top: isTop ? '100%' : '-30px',
              backgroundColor: `${nodeColor}60` 
            }}
          />

          <span 
            className="text-xs font-mono px-2 py-1 rounded-md mb-2 inline-block bg-white/10"
            style={{ color: nodeColor }}
          >
            {item.date}
          </span>
          <h4 className="font-bold text-white mb-1 text-lg leading-tight">
            {item.title}
          </h4>
          <p className="text-white/60 text-xs leading-relaxed">
            {item.description}
          </p>
        </div>
      </Html>
    </group>
  );
}
