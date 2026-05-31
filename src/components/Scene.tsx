"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import PlaceholderObject from "./PlaceholderObject";

export default function Scene() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 bg-black pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#0e0e0e"]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <Environment preset="city" />
        <PlaceholderObject />
        {/* Desactivar zoom en la web final para evitar que el usuario se pierda, dejar solo rotación */}
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
