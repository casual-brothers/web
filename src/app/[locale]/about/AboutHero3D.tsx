"use client";

import dynamic from "next/dynamic";

const Scene3DWrapper = dynamic(() => import("@/components/3d/Scene3DWrapper"), { ssr: false });
const DioramaPlaceholder3D = dynamic(() => import("@/components/3d/DioramaPlaceholder3D"), { ssr: false });

export default function AboutHero3D() {
  return (
    <div className="flex-1 w-full max-w-[600px] aspect-square relative mt-10 lg:mt-0 rounded-2xl overflow-hidden glass-card border border-white/5">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top right, rgba(124,255,0,0.05), transparent)' }} />
      <Scene3DWrapper className="absolute inset-0" interactive={true}>
        <DioramaPlaceholder3D />
      </Scene3DWrapper>
      
      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-white/20 pointer-events-none">
        <span>Interactive 3D Diorama</span>
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
          Live Render
        </span>
      </div>
    </div>
  );
}
