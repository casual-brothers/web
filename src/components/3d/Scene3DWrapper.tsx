"use client";

import React, { Suspense, Component } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

/**
 * ErrorBoundary — Catches 3D/WebGL errors so the rest of the page still works.
 */
class Scene3DErrorBoundary extends Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error) {
    console.warn("[Scene3D] Caught error, hiding 3D scene:", error.message);
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

interface Scene3DWrapperProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}

export default function Scene3DWrapper({ children, className = "", interactive = false }: Scene3DWrapperProps) {
  return (
    <Scene3DErrorBoundary>
      <div className={`${interactive ? 'pointer-events-auto' : 'pointer-events-none'} ${className}`} style={{ touchAction: interactive ? "none" : undefined }}>
        <Canvas
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          camera={{ position: [0, 0.3, 4.2], fov: 45 }}
          style={{ background: "transparent" }}
        >
          <Suspense fallback={null}>
            {children}
          </Suspense>
        </Canvas>
      </div>
    </Scene3DErrorBoundary>
  );
}
