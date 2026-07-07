import { memo } from 'react';
import { FloatingIsland } from '@/components/Hero/FloatingIsland';
import { AvatarSilhouette } from '@/components/Hero/AvatarSilhouette';
import { StarField } from '@/components/Environment/StarField';
import { FloatingParticles } from '@/components/Environment/FloatingParticles';
import { Lighting } from '@/components/Environment/Lighting';
import type { PerformanceTier } from '@/hooks/useDevicePerformance';
import { PERFORMANCE } from '@/data/constants';

interface HomeSceneProps {
  performanceTier: PerformanceTier;
}

export const HomeScene = memo(function HomeScene({
  performanceTier,
}: HomeSceneProps) {
  const particleCount = PERFORMANCE.maxParticles[performanceTier];
  const enableShadows = PERFORMANCE.enableShadows[performanceTier];

  return (
    <>
      <Lighting enableShadows={enableShadows} />

      {/* Thin fog for depth */}
      <fog attach="fog" args={['#050816', 15, 60]} />

      {/* Background stars */}
      <StarField count={particleCount} radius={80} />

      {/* Atmospheric floating particles */}
      <FloatingParticles
        count={Math.min(Math.floor(particleCount * 0.03), 100)}
        area={30}
      />

      {/* Central floating island */}
      <FloatingIsland />
      
      {/* Hero Avatar */}
      <AvatarSilhouette />
    </>
  );
});
