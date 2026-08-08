"use client";

import { assetPath } from "@/lib/basePath";

import { useRef, useEffect, useState, useCallback, Suspense, createContext, useContext } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

/* ─── Inner 3D model ─── */
function Model({ url }: { url: string }) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(assetPath(url));
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const maxDim = Math.max(size.x, size.y, size.z);
    const s = 2.2 / maxDim;
    scene.scale.setScalar(s);
    scene.position.set(-center.x * s, -center.y * s + 0.1, -center.z * s);
  }, [scene]);

  useEffect(() => {
    const name = names[0];
    if (name && actions[name]) {
      actions[name]!.reset().fadeIn(0.4).play();
      actions[name]!.setEffectiveTimeScale(0.8);
    }
    return () => {
      Object.values(actions).forEach(a => a?.fadeOut(0.3));
    };
  }, [actions, names]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y += 0.004;
    group.current.position.y = Math.sin(t * 0.8) * 0.04;
  });

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
}

/* ─── Context for the floating canvas system ─── */
interface ServiceViewerContextType {
  activateModel: (modelPath: string, rect: DOMRect) => void;
  deactivateModel: () => void;
}

const ServiceViewerContext = createContext<ServiceViewerContextType>({
  activateModel: () => {},
  deactivateModel: () => {},
});

export function useServiceViewer() {
  return useContext(ServiceViewerContext);
}

/* ─── Provider: wraps service cards grid, holds a single floating canvas ─── */
export function ServiceViewerProvider({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeModel, setActiveModel] = useState<string | null>(null);
  const [canvasStyle, setCanvasStyle] = useState<React.CSSProperties>({});

  const activateModel = useCallback((modelPath: string, rect: DOMRect) => {
    const container = containerRef.current;
    if (!container) return;
    const cRect = container.getBoundingClientRect();

    setCanvasStyle({
      position: "absolute",
      left: rect.left - cRect.left,
      top: rect.top - cRect.top,
      width: rect.width,
      height: rect.height,
      pointerEvents: "none",
      zIndex: 20,
      transition: "left 0.3s ease, top 0.3s ease, width 0.3s ease, height 0.3s ease",
    });
    setActiveModel(modelPath);
  }, []);

  const deactivateModel = useCallback(() => {
    setActiveModel(null);
  }, []);

  return (
    <ServiceViewerContext.Provider value={{ activateModel, deactivateModel }}>
      <div ref={containerRef} className="relative">
        {children}
        {activeModel && (
          <div style={canvasStyle}>
            <Canvas
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
              camera={{ position: [0, 0.5, 3.5], fov: 35 }}
              style={{ background: "transparent" }}
            >
              <Suspense fallback={null}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[3, 4, 5]} intensity={1.2} />
                <directionalLight position={[-2, 2, -3]} intensity={0.3} color="#7cff00" />
                <Model url={activeModel} />
                <ContactShadows
                  position={[0, -1.05, 0]}
                  opacity={0.35}
                  scale={4}
                  blur={2.5}
                  far={3}
                  color="#000"
                />
                <Environment preset="city" environmentIntensity={0.3} />
              </Suspense>
            </Canvas>
          </div>
        )}
      </div>
    </ServiceViewerContext.Provider>
  );
}
