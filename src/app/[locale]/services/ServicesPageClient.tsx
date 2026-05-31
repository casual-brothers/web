"use client";

import { assetPath } from "@/lib/basePath";
import { Suspense, useRef, useEffect, createRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { View, useGLTF, useAnimations, ContactShadows, Environment } from "@react-three/drei";
import { motion } from "framer-motion";
import { Gamepad2, Users, MonitorSmartphone, Headset, Palette, type LucideIcon } from "lucide-react";
import * as THREE from "three";

const iconMap: Record<string, LucideIcon> = {
  Gamepad2,
  Users,
  MonitorSmartphone,
  Headset,
  Palette,
};

/** Shared 3D model component — auto-scaled, centered, gentle rotation */
function ServiceModel({ url }: { url: string }) {
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
    const s = 3.2 / maxDim;
    scene.scale.setScalar(s);
    scene.position.set(-center.x * s, -center.y * s, -center.z * s);
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

  useFrame(() => {
    if (!group.current) return;
    group.current.rotation.y += 0.003;
  });

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
}

interface ServicesPageClientProps {
  locale: string;
  dict: {
    home: { servicesLabel: string };
    nav: { workWithUs: string };
    services: Array<{ title: string; description: string }>;
  };
  services: Array<{ id: string; iconName: string; modelPath: string }>;
}

export default function ServicesPageClient({ locale, dict, services }: ServicesPageClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Hero model ref + 4 grid card refs
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRefs = useRef(services.slice(1).map(() => createRef<HTMLDivElement>()));

  const heroService = services[0];
  const heroDict = dict.services[0];
  const gridServices = services.slice(1);
  const gridDict = dict.services.slice(1);

  return (
    <div ref={containerRef} className="relative">
      {/* 1. Hero Section: Full Game Development */}
      <section className="relative pt-32 pb-20 overflow-hidden min-h-[85vh] flex items-center">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={assetPath("/images/bg_services_adventure.webp")}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-[0.12] mix-blend-screen"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #0e0e0e, transparent, #0e0e0e)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #0e0e0e, rgba(14,14,14,0.4), transparent)' }} />
        </div>

        <div className="max-w-[1400px] w-full mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Hero Content (Left) */}
          <div className="flex-1 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-brand animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
                {dict.home.servicesLabel}
              </span>
              <div className="w-12 h-px bg-white/10" />
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold uppercase leading-[0.95] tracking-tight"
            >
              {heroDict.title}
            </motion.h1>

            <p className="text-lg md:text-xl text-white/50 max-w-xl leading-relaxed">
              {heroDict.description}
            </p>

            <div className="pt-4">
              <a
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-3 px-8 py-4 bg-brand text-black font-bold uppercase tracking-wider text-sm rounded hover:bg-brand-light hover:scale-105 transition-all duration-300"
              >
                {dict.nav.workWithUs}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Hero 3D Model (Right) */}
          <div className="flex-1 w-full max-w-[600px] aspect-square relative group mt-10 lg:mt-0">
            <div className="absolute inset-10 rounded-full blur-[100px]" style={{ background: 'rgba(124,255,0,0.1)' }} />
            <div
              ref={heroRef}
              className="absolute inset-0 rounded-2xl bg-white/[0.01] border border-white/5 overflow-hidden backdrop-blur-sm"
            />
          </div>
        </div>
      </section>

      {/* 2. Specialized Services Grid (2x2) */}
      <section className="max-w-[1400px] mx-auto px-6 pb-24 relative mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 relative z-10">
          {gridServices.map((service, idx) => {
            const Icon = iconMap[service.iconName] || Gamepad2;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative rounded-2xl overflow-hidden glass-card border border-white/5 transition-colors duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
                <div className="absolute inset-0 group-hover:opacity-100 opacity-0 transition-colors duration-500" style={{ background: 'rgba(124,255,0,0.05)' }} />

                <div className="relative p-6 sm:p-8 flex flex-col md:flex-row gap-6 sm:gap-8 items-center md:items-stretch h-full">
                  {/* 3D Model Area (Left side) */}
                  <div
                    ref={gridRefs.current[idx]}
                    className="w-32 h-32 md:w-[180px] md:h-[180px] lg:w-[220px] lg:h-[220px] shrink-0 rounded-xl border border-white/5 relative overflow-hidden shadow-[inset_0_2px_20px_rgba(0,0,0,0.5)]"
                    style={{ background: 'rgba(14,14,14,0.8)' }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(to top, rgba(124,255,0,0.05), transparent, transparent)' }} />
                  </div>

                  {/* Content Area (Right side) */}
                  <div className="flex-1 flex flex-col gap-4 text-center md:text-left justify-center">
                    <div className="flex items-center gap-3 justify-center md:justify-start">
                      <div className="w-8 h-px group-hover:w-12 group-hover:bg-brand transition-all duration-300" style={{ background: 'rgba(124,255,0,0.3)' }} />
                      <Icon className="w-4 h-4 group-hover:text-brand transition-colors duration-300" style={{ color: 'rgba(124,255,0,0.7)' }} />
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wide text-white group-hover:text-brand transition-colors duration-300">
                      {gridDict[idx].title}
                    </h3>

                    <p className="text-white/50 leading-relaxed text-sm sm:text-base">
                      {gridDict[idx].description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Single shared Canvas — all service models render via View portals */}
      <Canvas
        className="!fixed !top-0 !left-0 !w-full !h-full pointer-events-none"
        style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 10 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        eventSource={containerRef as React.RefObject<HTMLDivElement>}
      >
        <Suspense fallback={null}>
          {/* Hero model */}
          <View track={heroRef as React.RefObject<HTMLElement>}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[3, 4, 5]} intensity={1.2} />
            <directionalLight position={[-2, 2, -3]} intensity={0.3} color="#7cff00" />
            <ServiceModel url={heroService.modelPath} />
            <ContactShadows position={[0, -1.05, 0]} opacity={0.35} scale={4} blur={2.5} far={3} color="#000" />
            <Environment preset="city" environmentIntensity={0.3} />
          </View>

          {/* Grid models */}
          {gridServices.map((service, idx) => (
            <View key={service.id} track={gridRefs.current[idx] as React.RefObject<HTMLElement>}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[3, 4, 5]} intensity={1.2} />
              <directionalLight position={[-2, 2, -3]} intensity={0.3} color="#7cff00" />
              <ServiceModel url={service.modelPath} />
              <ContactShadows position={[0, -1.05, 0]} opacity={0.35} scale={4} blur={2.5} far={3} color="#000" />
              <Environment preset="city" environmentIntensity={0.3} />
            </View>
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
}
