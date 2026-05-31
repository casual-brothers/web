"use client";

import { assetPath } from "@/lib/basePath";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

interface GLBModelProps {
  /** Ruta al modelo .glb (relativa a /public) */
  modelPath: string;
  /** Escala del modelo */
  scale?: number;
  /** Posición [x, y, z] */
  position?: [number, number, number];
  /** Rotación [x, y, z] en radianes */
  rotation?: [number, number, number];
  /** Nombre de la animación a reproducir (si no se indica, reproduce la primera) */
  animationName?: string;
  /** Velocidad de la animación (1 = normal) */
  animationSpeed?: number;
  /** Si debe rotar automáticamente */
  autoRotate?: boolean;
  /** Velocidad de rotación automática */
  autoRotateSpeed?: number;
  /** Si debe seguir el ratón */
  followMouse?: boolean;
}

/**
 * GLBModel — Componente genérico para cargar modelos .glb con animaciones
 * 
 * Uso:
 * ```tsx
 * <Canvas>
 *   <GLBModel 
 *     modelPath="/models/character.glb"
 *     scale={1.5}
 *     animationName="idle"
 *     autoRotate
 *   />
 * </Canvas>
 * ```
 * 
 * El modelo .glb debe estar en la carpeta /public/models/
 * Soporta modelos con múltiples animaciones embebidas (de Mixamo, Blender, etc.)
 */
export default function GLBModel({
  modelPath,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  animationName,
  animationSpeed = 1,
  autoRotate = false,
  autoRotateSpeed = 0.3,
  followMouse = true,
}: GLBModelProps) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(assetPath(modelPath));
  const { actions, names } = useAnimations(animations, group);

  // Reproducir animación
  useEffect(() => {
    const targetName = animationName || names[0];
    if (targetName && actions[targetName]) {
      const action = actions[targetName];
      if (action) {
        action.reset().fadeIn(0.5).play();
        action.setEffectiveTimeScale(animationSpeed);
      }
    }

    return () => {
      // Cleanup: detener todas las animaciones
      Object.values(actions).forEach((action) => {
        if (action) action.fadeOut(0.5);
      });
    };
  }, [actions, names, animationName, animationSpeed]);

  useFrame((state) => {
    if (!group.current) return;
    const time = state.clock.getElapsedTime();

    if (autoRotate) {
      group.current.rotation.y += autoRotateSpeed * 0.01;
    }

    if (followMouse) {
      const mouseX = state.pointer.x;
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        mouseX * 0.5 + (autoRotate ? time * autoRotateSpeed * 0.1 : 0),
        0.03
      );
    }
  });

  return (
    <group ref={group} position={position} rotation={rotation} scale={scale}>
      <primitive object={scene} />
    </group>
  );
}
