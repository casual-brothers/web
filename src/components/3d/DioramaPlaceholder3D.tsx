"use client";

import { assetPath } from "@/lib/basePath";

import { useFrame } from "@react-three/fiber";
import { PresentationControls, useGLTF, Center } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * DioramaPlaceholder3D — Clean diorama showcase with gentle float & drag rotation.
 * No mini-game, just the model presented elegantly.
 */
export default function DioramaPlaceholder3D() {
  const groupRef = useRef<THREE.Group>(null);

  // Gentle float animation
  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime;
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.08;
      groupRef.current.rotation.y = Math.sin(t * 0.18) * 0.08;
    }
  });

  return (
    <PresentationControls
      global
      speed={1.2}
      damping={0.18}
      snap
      rotation={[0.12, 0, 0]}
      polar={[-Math.PI / 7, Math.PI / 7]}
      azimuth={[-Math.PI / 4, Math.PI / 4]}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 5, 2]} intensity={1.6} color="#ffffff" />
      <directionalLight position={[-2, 3, 3]} intensity={0.6} color="#ffffff" />
      <pointLight position={[0, 3, 0]} intensity={2.2} color="#7cff00" distance={7} />

      <group ref={groupRef} position={[0, -0.75, 0]} scale={1.05}>
        <DioramaModel />
      </group>
    </PresentationControls>
  );
}

/** Real GLB diorama model */
function DioramaModel() {
  const { scene } = useGLTF(assetPath("/models/DioramaGame.glb"));

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        if (mesh.material instanceof THREE.MeshStandardMaterial) {
          mesh.material.envMapIntensity = 0.8;
          mesh.material.needsUpdate = true;
        }
      }
    });
  }, [scene]);

  return (
    <Center>
      <primitive object={scene} scale={2.2} />
    </Center>
  );
}
