import { useRef, useMemo, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { COLORS } from '@/data/constants';

interface FloatingParticlesProps {
  count?: number;
  area?: number;
}

export const FloatingParticles = memo(function FloatingParticles({
  count = 80,
  area = 30,
}: FloatingParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, speeds, offsets } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const off = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * area;
      pos[i * 3 + 1] = (Math.random() - 0.5) * area * 0.6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * area;

      spd[i] = 0.2 + Math.random() * 0.5;
      off[i] = Math.random() * Math.PI * 2;
    }

    return { positions: pos, speeds: spd, offsets: off };
  }, [count, area]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const posAttr = geo.getAttribute('position');
    const t = clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const baseY = positions[i * 3 + 1]!;
      posAttr.setY(
        i,
        baseY + Math.sin(t * speeds[i]! + offsets[i]!) * 1.5,
      );
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions.slice(), 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={1.8}
        sizeAttenuation
        transparent
        opacity={0.5}
        color={COLORS.primary}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
});
