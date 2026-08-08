"use client";

/* Three.js interaction is intentionally imperative; these values are mutated by the render loop. */
/* eslint-disable react-hooks/immutability, react-hooks/purity, @typescript-eslint/no-explicit-any */

import { assetPath } from "@/lib/basePath";

import { useRef, useEffect, useCallback, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useAnimations, Bounds } from "@react-three/drei";
import * as THREE from "three";

/**
 * HeroModel3D — Modelo hero interactivo con spring-back
 * 
 * Features:
 * - Auto-fit responsive via <Bounds> (se adapta a cualquier tamaño de pantalla)
 * - Drag to rotate (arrastrar para girar)
 * - Spring-back al soltar (vuelve suavemente a la posición idle)
 * - Float animation que nunca clipea (clamped dentro del viewport)
 * - Iluminación cinematográfica con brand green
 */
export default function HeroModel3D({ onReady }: { onReady?: () => void }) {
  return (
    <>
      {/* === Cinematic Lighting === */}
      <ambientLight intensity={0.5} />

      <directionalLight
        position={[5, 8, 5]}
        intensity={2.5}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      <directionalLight
        position={[-4, 3, -2]}
        intensity={0.8}
        color="#e0e8ff"
      />

      <pointLight position={[0, 2, -4]} intensity={4} color="#7cff00" distance={15} />
      <pointLight position={[0, -2, 3]} intensity={2} color="#7cff00" distance={10} />

      <spotLight
        position={[0, 6, 2]}
        angle={0.5}
        penumbra={0.8}
        intensity={2.5}
        color="#7cff00"
        distance={18}
      />

      {/* Ground glow */}
      <mesh position={[0, -2.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[4, 64]} />
        <meshBasicMaterial color="#7cff00" transparent opacity={0.08} />
      </mesh>

      {/* 
        Bounds: margin 1.2 = 20% padding around model 
        Esto deja espacio para el float sin que se salga del viewport.
        clip=true evita que se renderice fuera del frustum.
      */}
      <Bounds fit clip observe margin={1.2}>
        <HeroModelInner onReady={onReady} />
      </Bounds>

      {/* Magical dust particles — in front of and behind the model */}
      <MagicDustCloud />
    </>
  );
}

/**
 * HeroModelInner — Modelo interactivo con drag-to-rotate y spring-back
 */
function HeroModelInner({ onReady }: { onReady?: () => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(assetPath("/models/HeroCasual.glb"));
  const { actions, names } = useAnimations(animations, groupRef);
  const { gl } = useThree();

  // ========== Drag State (refs for performance — no re-renders) ==========
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const dragRotation = useRef({ x: 0, y: 0 }); // accumulated drag rotation
  const currentRotation = useRef({ x: 0, y: 0 }); // current smooth rotation

  // Limits
  const MAX_DRAG_ROT_X = 0.6;          // ~34° up/down
  const IDLE_ROT_Y_MAX = 0.15;         // idle auto-rotation clamp
  const FLOAT_AMPLITUDE = 0.03;        // very subtle float
  const SPRING_SPEED = 0.04;           // how fast it snaps back (0-1)
  const DRAG_SENSITIVITY = 0.008;      // how responsive the drag feels

  // Play first animation if any
  useEffect(() => {
    if (names.length > 0 && actions[names[0]]) {
      actions[names[0]]!.reset().fadeIn(0.5).play();
    }
    return () => {
      Object.values(actions).forEach((action) => {
        if (action) action.fadeOut(0.3);
      });
    };
  }, [actions, names]);

  // Traverse to adjust materials
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
    onReady?.();
  }, [scene, onReady]);

  // ========== Pointer Handlers ==========
  const onPointerDown = useCallback((e: any) => {
    e.stopPropagation?.();
    isDragging.current = true;
    // Capture from current smooth rotation so there's no jump
    dragRotation.current.x = currentRotation.current.x;
    dragRotation.current.y = currentRotation.current.y;
    dragStart.current = { x: (e as any).clientX ?? (e as any).x ?? 0, y: (e as any).clientY ?? (e as any).y ?? 0 };
    // Change cursor
    gl.domElement.style.cursor = "grabbing";
  }, [gl]);

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
    gl.domElement.style.cursor = "grab";
  }, [gl]);

  const onPointerMove = useCallback((e: THREE.Event) => {
    if (!isDragging.current) return;
    const clientX = (e as any).clientX ?? (e as any).x ?? 0;
    const clientY = (e as any).clientY ?? (e as any).y ?? 0;
    const deltaX = clientX - dragStart.current.x;
    const deltaY = clientY - dragStart.current.y;
    
    dragRotation.current.y += deltaX * DRAG_SENSITIVITY;
    dragRotation.current.x = THREE.MathUtils.clamp(
      dragRotation.current.x + deltaY * DRAG_SENSITIVITY,
      -MAX_DRAG_ROT_X,
      MAX_DRAG_ROT_X
    );

    dragStart.current = { x: clientX, y: clientY };
  }, []);

  // Also listen for pointer events on the canvas (for when pointer leaves the mesh)
  useEffect(() => {
    const canvas = gl.domElement;
    
    const handleGlobalUp = () => {
      if (isDragging.current) {
        isDragging.current = false;
        canvas.style.cursor = "grab";
      }
    };

    const handleGlobalMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const deltaX = e.movementX;
      const deltaY = e.movementY;
      
      dragRotation.current.y += deltaX * DRAG_SENSITIVITY;
      dragRotation.current.x = THREE.MathUtils.clamp(
        dragRotation.current.x + deltaY * DRAG_SENSITIVITY,
        -MAX_DRAG_ROT_X,
        MAX_DRAG_ROT_X
      );
    };

    canvas.style.cursor = "grab";
    window.addEventListener("pointerup", handleGlobalUp);
    window.addEventListener("pointermove", handleGlobalMove);

    return () => {
      window.removeEventListener("pointerup", handleGlobalUp);
      window.removeEventListener("pointermove", handleGlobalMove);
      canvas.style.cursor = "";
    };
  }, [gl]);

  // ========== Animation Loop ==========
  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    if (isDragging.current) {
      // While dragging: follow the drag rotation smoothly
      currentRotation.current.y = THREE.MathUtils.lerp(
        currentRotation.current.y,
        dragRotation.current.y,
        0.15 // fast follow while dragging
      );
      currentRotation.current.x = THREE.MathUtils.lerp(
        currentRotation.current.x,
        dragRotation.current.x,
        0.15
      );
    } else {
      // Idle: gentle auto-rotation + spring back to center
      const idleTargetY = Math.sin(time * 0.2) * IDLE_ROT_Y_MAX;
      const idleTargetX = 0;

      // Spring back — lerp toward idle target
      currentRotation.current.y = THREE.MathUtils.lerp(
        currentRotation.current.y,
        idleTargetY,
        SPRING_SPEED
      );
      currentRotation.current.x = THREE.MathUtils.lerp(
        currentRotation.current.x,
        idleTargetX,
        SPRING_SPEED
      );
    }

    // Apply rotation
    groupRef.current.rotation.y = currentRotation.current.y;
    groupRef.current.rotation.x = currentRotation.current.x;

    // Subtle float — only when idle for a natural "breathing" feel
    const floatIntensity = isDragging.current ? 0 : 1;
    groupRef.current.position.y = Math.sin(time * 0.8) * FLOAT_AMPLITUDE * floatIntensity;
  });

  return (
    <group
      ref={groupRef}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerMove={onPointerMove}
      onClick={(e) => {
        e.stopPropagation();
        if (typeof window !== "undefined" && (window as any).cb_mascot_click) {
          (window as any).cb_mascot_click();
        }
      }}
      onPointerMissed={() => {
        isDragging.current = false;
        gl.domElement.style.cursor = "grab";
      }}
    >
      <primitive object={scene} />
    </group>
  );
}


/** Magical dust cloud — tiny glowing particles drifting around the model with GPU-accelerated performance */
function MagicDustCloud() {
  const count = 90;
  const pointsRef = useRef<THREE.Points>(null);

  // Generate deterministic random positions spread around the model once
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Spread in a wide volume: x[-3.5,3.5] y[-2.0,3.5] z[-2.5,2.5]
      pos[i * 3] = (Math.random() - 0.5) * 7;
      pos[i * 3 + 1] = -2.0 + Math.random() * 5.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();

    // 100% GPU-accelerated high performance drift: rotate the entire cloud
    pointsRef.current.rotation.y = time * 0.015;
    pointsRef.current.rotation.x = Math.sin(time * 0.04) * 0.08;

    // Gentle opacity pulse on the whole cloud
    const mat = pointsRef.current.material as THREE.PointsMaterial;
    mat.opacity = 0.35 + Math.sin(time * 0.5) * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#7cff00"
        size={0.026}
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Model loads lazily when the component mounts — no eager preload
// to avoid blocking page load with an 87MB download.
