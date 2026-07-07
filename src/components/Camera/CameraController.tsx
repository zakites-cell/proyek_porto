import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { SECTIONS } from '@/data/constants';

interface CameraControllerProps {
  scrollProgress: number;
}

export function CameraController({ scrollProgress }: CameraControllerProps) {
  const { camera } = useThree();
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  
  // Use GSAP quickTo for performant continuous animation
  const posQ = useRef({
    x: gsap.quickTo(camera.position, "x", { duration: 0.8, ease: "power2.out" }),
    y: gsap.quickTo(camera.position, "y", { duration: 0.8, ease: "power2.out" }),
    z: gsap.quickTo(camera.position, "z", { duration: 0.8, ease: "power2.out" }),
  });
  
  const lookQ = useRef({
    x: gsap.quickTo(currentLookAt.current, "x", { duration: 0.8, ease: "power2.out" }),
    y: gsap.quickTo(currentLookAt.current, "y", { duration: 0.8, ease: "power2.out" }),
    z: gsap.quickTo(currentLookAt.current, "z", { duration: 0.8, ease: "power2.out" }),
  });

  useEffect(() => {
    if (SECTIONS[0]) {
      camera.position.set(...SECTIONS[0].cameraPosition);
      currentLookAt.current.set(...SECTIONS[0].cameraLookAt);
      camera.lookAt(currentLookAt.current);
    }
  }, [camera]);

  useFrame(({ pointer }) => {
    const totalWaypoints = SECTIONS.length;
    const scaledProgress = scrollProgress * (totalWaypoints - 1);
    const waypointIndex = Math.min(Math.floor(scaledProgress), totalWaypoints - 1);
    const nextWaypointIndex = Math.min(waypointIndex + 1, totalWaypoints - 1);
    const waypointFraction = scaledProgress - waypointIndex;

    const currentWaypoint = SECTIONS[waypointIndex];
    const nextWaypoint = SECTIONS[nextWaypointIndex];

    if (currentWaypoint && nextWaypoint) {
      const targetPos = new THREE.Vector3().lerpVectors(
        new THREE.Vector3(...currentWaypoint.cameraPosition),
        new THREE.Vector3(...nextWaypoint.cameraPosition),
        waypointFraction
      );

      const targetLook = new THREE.Vector3().lerpVectors(
        new THREE.Vector3(...currentWaypoint.cameraLookAt),
        new THREE.Vector3(...nextWaypoint.cameraLookAt),
        waypointFraction
      );

      // Mouse parallax (smaller for smoothness)
      const parallaxX = pointer.x * 0.3;
      const parallaxY = pointer.y * 0.15;

      posQ.current.x(targetPos.x + parallaxX);
      posQ.current.y(targetPos.y + parallaxY);
      posQ.current.z(targetPos.z);
      
      lookQ.current.x(targetLook.x);
      lookQ.current.y(targetLook.y);
      lookQ.current.z(targetLook.z);
      
      camera.lookAt(currentLookAt.current);
    }
  });

  return null;
}
