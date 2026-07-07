import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { TimelineNode } from './TimelineNode';
import { TIMELINE } from '@/data/constants';

export function HorizontalTimeline() {
  const groupRef = useRef<THREE.Group>(null);
  const lineRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.4) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -40]}>
      {/* Central timeline tube */}
      <mesh ref={lineRef} position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 20, 8]} />
        <meshBasicMaterial color="#7B61FF" transparent opacity={0.5} />
      </mesh>

      {/* Timeline Nodes */}
      {TIMELINE.map((item, index) => {
        // distribute them along the X axis
        const xOffset = -8 + (index * 16) / Math.max(TIMELINE.length - 1, 1);
        
        return (
          <group key={item.id} position={[xOffset, 0, 0]}>
            <TimelineNode item={item} index={index} />
          </group>
        );
      })}
    </group>
  );
}
