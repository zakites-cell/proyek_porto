import { Suspense, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload, PerformanceMonitor } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { HomeScene } from '@/scenes/HomeScene';
import { AboutScene } from '@/scenes/AboutScene';
import { SkillScene } from '@/scenes/SkillScene';
import { ProjectScene } from '@/scenes/ProjectScene';
import { HorizontalTimeline } from '@/components/Timeline/HorizontalTimeline';
import { ContactScene } from '@/scenes/ContactScene';
import { CameraController } from '@/components/Camera/CameraController';
import { LoadingScreen } from '@/components/Loader/LoadingScreen';
import { HeroOverlay } from '@/components/Hero/HeroOverlay';
import { AboutPanel } from '@/components/About/AboutPanel';
import { CursorGlow } from '@/components/CursorGlow/CursorGlow';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useDevicePerformance } from '@/hooks/useDevicePerformance';
import { SECTIONS, PERFORMANCE } from '@/data/constants';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { progress, activeSection } = useScrollProgress(SECTIONS.length);
  const { tier } = useDevicePerformance();

  const [dpr, setDpr] = useState(PERFORMANCE.dpr[tier][1]);

  const handleLoadComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const enablePostProcessing = PERFORMANCE.enablePostProcessing[tier];

  return (
    <div className="relative">
      <CursorGlow />
      {/* Loading screen overlay */}
      <LoadingScreen onComplete={handleLoadComplete} />

      {/* Scrollable content area — defines scroll height */}
      <div
        className="relative"
        style={{ height: `${SECTIONS.length * 100}vh` }}
        aria-hidden="true"
      />

      {/* Fixed 3D canvas layer */}
      <div className="fixed inset-0 -z-0">
        <Canvas
          dpr={dpr}
          gl={{
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.2,
            powerPreference: 'high-performance',
          }}
          shadows={tier !== 'low'}
          camera={{
            fov: 55,
            near: 0.1,
            far: 200,
            position: [0, 2, 8],
          }}
          style={{ background: '#050816' }}
          aria-label="3D Portfolio Scene"
          role="img"
        >
          <Suspense fallback={null}>
            <CameraController scrollProgress={progress} />
            <HomeScene performanceTier={tier} />
            <AboutScene />
            <SkillScene />
            <ProjectScene />
            <HorizontalTimeline />
            <ContactScene />
            <Preload all />
            <PerformanceMonitor 
              onIncline={() => setDpr(PERFORMANCE.dpr[tier][1])} 
              onDecline={() => setDpr(PERFORMANCE.dpr[tier][0])} 
            />
            {enablePostProcessing && (
              <EffectComposer multisampling={4}>
                <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.2} />
                <Vignette eskil={false} offset={0.1} darkness={1.1} />
              </EffectComposer>
            )}
          </Suspense>
        </Canvas>
      </div>

      {/* UI overlay layer */}
      {isLoaded && (
        <>
          <HeroOverlay isVisible={activeSection === 0} />
          <AboutPanel isVisible={activeSection === 1} />
          
          {/* Scroll Indicator */}
          <div 
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-10 transition-opacity duration-500 ${
              activeSection === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <p className="glass rounded-full px-5 py-2 text-xs font-mono text-white/50 tracking-widest animate-pulse-glow flex flex-col items-center">
              <span>SCROLL TO EXPLORE</span>
              <span className="block mt-1 text-primary opacity-80">↓</span>
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
