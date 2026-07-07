import { useRef, useMemo, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { ContactForm } from '@/components/Contact/ContactForm';
import { COLORS } from '@/data/constants';

export const ContactScene = memo(function ContactScene() {
  const portalRef = useRef<THREE.Group>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);

  const portalMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: COLORS.primary,
    transparent: true,
    opacity: 0.1,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), []);

  const wireframeMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: COLORS.accent,
    wireframe: true,
    transparent: true,
    opacity: 0.3,
  }), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (portalRef.current) {
      portalRef.current.position.y = Math.sin(t) * 0.2;
    }
    if (ringRef1.current) {
      ringRef1.current.rotation.z = t * 0.2;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.z = -t * 0.3;
    }
  });

  return (
    <group position={[0, 0, -50]}>
      {/* Interactive Portal / Gate */}
      <group ref={portalRef} position={[0, 0, -5]}>
        {/* Outer Ring */}
        <mesh ref={ringRef1} material={wireframeMaterial}>
          <torusGeometry args={[4, 0.1, 16, 100]} />
        </mesh>
        
        {/* Inner Ring */}
        <mesh ref={ringRef2} material={new THREE.MeshBasicMaterial({ color: COLORS.secondary, wireframe: true, transparent: true, opacity: 0.4 })}>
          <torusGeometry args={[3.5, 0.05, 16, 100]} />
        </mesh>
        
        {/* Portal Core */}
        <mesh material={portalMaterial}>
          <circleGeometry args={[3.5, 64]} />
        </mesh>
      </group>

      {/* Floating UI overlay for the form and socials */}
      <Html
        position={[0, 0, 0]}
        center
        zIndexRange={[100, 0]}
        className="w-screen flex justify-center pointer-events-none"
      >
        <div className="pointer-events-auto">
          <ContactForm />
        </div>
      </Html>
    </group>
  );
});
