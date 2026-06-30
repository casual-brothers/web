"use client";

import { assetPath } from "@/lib/basePath";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState, useEffect, useSyncExternalStore } from "react";
import { motion } from "framer-motion";

// Avoids mounting heavy 3D canvas on mobile/tablet where it's not visible
const subscribeResize = (cb: () => void) => { window.addEventListener("resize", cb); return () => window.removeEventListener("resize", cb); };
const getIsDesktop = () => window.innerWidth >= 1024;
const getIsDesktopServer = () => false;
function useIsDesktop() { return useSyncExternalStore(subscribeResize, getIsDesktop, getIsDesktopServer); }
import type { Dictionary } from "@/i18n/getDictionary";
import PlatformLogos from "@/components/ui/PlatformLogos";

const Scene3DWrapper = dynamic(() => import("@/components/3d/Scene3DWrapper"), { ssr: false });
const HeroModel3D = dynamic(() => import("@/components/3d/HeroModel3D"), { ssr: false });

const cinematic = { ease: [0.22, 1, 0.36, 1] as const };
const partyShapes = ["👾", "🪙", "🍒", "❤️", "🎮", "⭐"];
const seededRatio = (seed: number) => {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
};

export default function HeroSection({ dict, locale }: { dict: Dictionary; locale: string }) {
  const [partyMode, setPartyMode] = useState(false);
  const isDesktop = useIsDesktop();

  // Keyboard Konami Code Cheat listener (Unlocks Retro Party Mode!)
  useEffect(() => {
    const konamiSequence = [
      "ArrowUp", "ArrowUp",
      "ArrowDown", "ArrowDown",
      "ArrowLeft", "ArrowRight",
      "ArrowLeft", "ArrowRight",
      "b", "a"
    ];
    let inputSequence: string[] = [];

    const handleKeyDown = (e: KeyboardEvent) => {
      inputSequence.push(e.key);
      inputSequence = inputSequence.slice(-konamiSequence.length);

      if (JSON.stringify(inputSequence) === JSON.stringify(konamiSequence)) {
        setPartyMode(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <section
      className={`relative min-h-screen flex items-center transition-all duration-1000 ${
        partyMode ? "party-rainbow-mode" : ""
      }`}
      style={{ overflow: "visible" }}
    >
      {/* Background container — overflow hidden to prevent bleed into sections below */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Background Image with camera drift */}
        <div className="absolute -inset-[4%]" style={{ animation: 'hero-drift-x 29s ease-in-out infinite, hero-drift-y 19s ease-in-out infinite' }}>
          <img
            src={assetPath("/images/bg_hero_fantasy.webp")}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-70 mix-blend-screen"
          />
        </div>
        {/* Dark overlays for readability — stronger left gradient to protect title text */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #0e0e0e 10%, rgba(14,14,14,0.7) 40%, rgba(14,14,14,0.15) 65%, transparent 80%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0e0e0e, transparent, rgba(14,14,14,0.6))' }} />
      </div>

      {/* Keyframes moved to globals.css for performance */}

      {/* Ambient green glow — subtle and cinematic */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] right-[20%] w-[500px] h-[500px] rounded-full blur-[250px]" style={{ background: 'rgba(124,255,0,0.05)' }} />
      </div>

      {/* ============================================
          3D MODEL LAYER — Full-bleed, behind text
          Covers right ~65% of the hero and extends 
          120px BELOW the section for that "loose" feel.
          ============================================ */}
      {isDesktop && (
        <motion.div
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ...cinematic }}
          className="absolute z-10 animate-grab-guide"
          style={{
            top: "-40px",
            bottom: "0px",
            left: "30%",
            right: "-40px",
            willChange: "transform",
            transform: "translateZ(0)",
          }}
        >
          <Scene3DWrapper className="absolute inset-0" interactive>
            <HeroModel3D />
          </Scene3DWrapper>

          {/* Bottom fade — smooth blend before console icons section */}
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none z-10"
            style={{
              height: "30%",
              background: "linear-gradient(to top, #0e0e0e 5%, rgba(14,14,14,0.7) 35%, transparent 100%)",
            }}
          />
        </motion.div>
      )}

      {/* Konami falling pixel elements (Party Mode!) */}
      {partyMode && (
        <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
          {Array.from({ length: 45 }).map((_, i) => {
            const left = seededRatio(i + 1) * 100;
            const delay = seededRatio(i + 11) * 8;
            const duration = 4 + seededRatio(i + 21) * 5;
            const scale = 0.5 + seededRatio(i + 31) * 0.8;
            const shape = partyShapes[i % partyShapes.length];

            return (
              <div
                key={i}
                className="absolute text-2xl"
                style={{
                  left: `${left}%`,
                  top: `-50px`,
                  animation: `fall ${duration}s linear ${delay}s infinite`,
                  transform: `scale(${scale})`,
                  filter: "drop-shadow(0 0 8px rgba(124,255,0,0.5))",
                }}
              >
                {shape}
              </div>
            );
          })}
          <style>{`
            @keyframes fall {
              0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
              }
              10% { opacity: 1; }
              90% { opacity: 1; }
              100% {
                transform: translateY(110vh) rotate(360deg);
                opacity: 0;
              }
            }
          `}</style>
        </div>
      )}

      {/* Text Content — on top of 3D model (pointer-events-none lets events reach the 3D mascot behind) */}
      <div className="max-w-[1400px] w-full mx-auto px-6 pt-24 pb-28 lg:pb-32 relative z-20 pointer-events-none">
        <div className="max-w-xl space-y-8 pointer-events-auto">
          {/* Label - Premium Game Studio Pill Badge */}
          <motion.div
            initial={false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ...cinematic }}
            className="inline-flex items-center gap-3 bg-brand/[0.08] border border-brand/25 px-4 py-2 rounded-full backdrop-blur-md shadow-[0_4px_20px_rgba(124,255,0,0.06)] w-fit"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-brand animate-pulse shadow-[0_0_10px_#7cff00]" />
            <span className="text-[11.5px] font-display font-extrabold uppercase tracking-[0.22em] text-white">
              {dict.home.heroLabel}
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ...cinematic }}
            className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase leading-[0.95]"
          >
            {dict.home.heroLine1}
            <br />
            <span className="text-gradient-brand">{dict.home.heroLine2}</span>
            <br />
            {dict.home.heroLine3}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ...cinematic }}
            className="text-base md:text-lg text-white/50 max-w-lg leading-relaxed"
          >
            {dict.home.heroSubtitle}{" "}
            <span className="text-brand font-medium">{dict.home.heroHighlight1}</span>{" "}
            {dict.home.heroAnd}{" "}
            <span className="text-brand font-medium">{dict.home.heroHighlight2}</span>
            {dict.home.heroDot}
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ...cinematic }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <Link href={`/${locale}/contact`} className="btn-primary">
              {dict.home.workWithUs}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href={`/${locale}/case-studies`} className="btn-outline">
              {dict.home.viewGames}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-36 z-30 pointer-events-none" style={{ background: 'linear-gradient(to top, #0e0e0e, transparent)' }} />

      {/* Platform Logos floating at the very bottom of the Hero */}
      <div className="relative lg:absolute bottom-0 left-0 right-0 w-full z-40 mt-12 lg:mt-0">
        <div className="max-w-[1400px] mx-auto px-6">
          <PlatformLogos />
        </div>
      </div>
    </section>
  );
}
