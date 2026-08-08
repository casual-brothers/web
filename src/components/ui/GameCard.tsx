"use client";

import { assetPath } from "@/lib/basePath";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useCallback, useRef } from "react";
import type { GameData } from "@/data/games";

interface GameCardProps {
  game: GameData;
  index: number;
  isHero?: boolean;
  /**
   * Cuando se pasa, la tarjeta enlaza a la ficha del juego
   * (/[locale]/case-studies/[slug]/). Sin locale la tarjeta es decorativa.
   */
  locale?: string;
}

/**
 * Determines optimal CSS constraint classes for a logo based on its natural
 * aspect ratio. The goal is to normalise visual weight so that ultra-wide
 * logos (Ice Age, Westerner) don't dominate and tall/square logos
 * (My Little Pony, Barbie, Grinch) aren't dwarfed.
 *
 * The thresholds were hand-tuned against the actual logo set.
 */
function getLogoConstraints(ratio: number): string {
  if (ratio > 3.5) {
    // Ultra-wide  (e.g. "Ice Age ~4.5:1", "Killing Floor 2")
    return "max-w-[72%] max-h-[90%]";
  }
  if (ratio > 2.2) {
    // Wide  (e.g. "Westerner ~2.8:1", "Transformers", "Monster High")
    return "max-w-[94%] max-h-[98%]";
  }
  if (ratio > 1.3) {
    // Moderately wide / landscape — the "safe zone"
    return "max-w-[100%] max-h-[100%]";
  }
  if (ratio > 0.75) {
    // Square-ish  (e.g. "OT ~1:1", "Barbie", "Grinch", "Elf")
    return "max-w-[62%] max-h-full";
  }
  // Tall / portrait  (e.g. "My Little Pony ~0.6:1")
  return "max-w-[50%] max-h-full";
}

/** Measures an img element and returns the appropriate constraint class. */
function applyConstraints(img: HTMLImageElement): string | null {
  if (img.naturalWidth && img.naturalHeight) {
    const ratio = img.naturalWidth / img.naturalHeight;
    return getLogoConstraints(ratio);
  }
  return null;
}

export default function GameCard({ game, index, isHero = false, locale }: GameCardProps) {
  const [logoConstraints, setLogoConstraints] = useState("max-w-[80%] max-h-[80%]");
  const measured = useRef(false);

  // Holographic 3D Tilt & Glossy Shine Tracker State
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [shine, setShine] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  /** Ref callback — handles already-cached images that skip onLoad */
  const logoRef = useCallback((img: HTMLImageElement | null) => {
    if (!img || measured.current) return;
    if (img.complete && img.naturalWidth) {
      const cls = applyConstraints(img);
      if (cls) { setLogoConstraints(cls); measured.current = true; }
    }
  }, []);

  /** onLoad — handles fresh network loads */
  const onLogoLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    if (measured.current) return;
    const cls = applyConstraints(e.currentTarget);
    if (cls) { setLogoConstraints(cls); measured.current = true; }
  }, []);

  // Compute 3D Holographic tilt angles based on cursor offset
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // cursor relative x inside card
    const y = e.clientY - rect.top;  // cursor relative y inside card
    
    // Normalize coordinates from -0.5 to 0.5
    const xc = x / rect.width - 0.5;
    const yc = y / rect.height - 0.5;
    
    setTilt({
      x: yc * -18, // max 18 degrees vertical tilt
      y: xc * 18,  // max 18 degrees horizontal tilt
    });
    setShine({ x, y });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setShine({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const card = (
    <div
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
      className={`w-full h-full ${isHero ? 'h-full' : 'aspect-[4/5]'}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: Math.min(index * 0.05, 0.5) }}
        className="w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          animate={{
            rotateX: tilt.x,
            rotateY: tilt.y,
            scale: isHovered ? 1.06 : 1.0,
            z: isHovered ? 40 : 0, // Physically lifts the entire card forward in 3D Z-axis!
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }} // Zero delay, snappy, identical to GameCarousel3D!
          style={{
            transformStyle: "preserve-3d",
          }}
          // CRITICAL: Outermost tilting container must NOT have overflow-hidden to prevent 3D flattening
          className="group relative w-full h-full rounded-xl cursor-pointer"
        >
      {/* ─── 1. Inner Card Box (handles rounded crop, border, shadow, background and shine) ─── */}
      <motion.div
        animate={{
          boxShadow: isHovered
            ? "0 25px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(124, 255, 0, 0.25)"
            : "0 8px 24px rgba(0, 0, 0, 0.4)",
          borderColor: isHovered
            ? "rgba(124, 255, 0, 0.45)"
            : "rgba(255, 255, 255, 0.05)",
        }}
        className="absolute inset-0 rounded-xl overflow-hidden border bg-[#12131b] transition-all duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(0px)",
        }}
      >
        {/* Corner Tech Brackets (Cyber HUD Unification) */}
        <div className="absolute top-2.5 left-2.5 w-1.5 h-1.5 border-t border-l border-white/10 group-hover:border-brand/40 rounded-tl-[1px] transition-all duration-500 z-20 pointer-events-none" />
        <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 border-t border-r border-white/10 group-hover:border-brand/40 rounded-tr-[1px] transition-all duration-500 z-20 pointer-events-none" />
        <div className="absolute bottom-2.5 left-2.5 w-1.5 h-1.5 border-b border-l border-white/10 group-hover:border-brand/40 rounded-bl-[1px] transition-all duration-500 z-20 pointer-events-none" />
        <div className="absolute bottom-2.5 right-2.5 w-1.5 h-1.5 border-b border-r border-white/10 group-hover:border-brand/40 rounded-br-[1px] transition-all duration-500 z-20 pointer-events-none" />

        {/* Micro Telemetry Serial Number (Cyber HUD Unification) */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-display text-[5.5px] font-extrabold tracking-[0.2em] text-white/15 group-hover:text-brand/45 transition-colors duration-500 uppercase z-20 select-none pointer-events-none text-center">
          SERIAL // CB-GME-{game.id.toUpperCase()}
        </div>

        {/* Pulsing Active LED Indicator (Cyber HUD Unification) */}
        <div className="absolute top-3.5 right-3.5 flex items-center justify-center z-20 pointer-events-none">
          <div
            className="w-1 h-1 rounded-full bg-brand/35 group-hover:bg-brand transition-all duration-500 animate-pulse shadow-[0_0_4px_#7cff00]"
            style={{ animationDuration: "2.5s" }}
          />
        </div>

        {/* Screenshot Background */}
        {game.screenshot ? (
          <img
            src={assetPath(game.screenshot)}
            alt={game.title}
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 ${
              game.id === "bluey" ? "scale-[1.32] group-hover:scale-[1.42]" : ""
            }`}
            style={game.imagePosition ? { objectPosition: game.imagePosition } : undefined}
          />
        ) : (
          <div className="absolute inset-0 bg-[#0f0f12]" />
        )}

        {/* Soft, vibrant overlays */}
        <div className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-40" style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.2) 50%, transparent 100%)' }} />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.25) 0%, transparent 100%)' }} />

        {/* Dynamic neon green bloom on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: 'radial-gradient(circle at bottom, rgba(124,255,0,0.15) 0%, transparent 75%)' }} />

        {/* Holographic Glossy Shine */}
        {isHovered && (
          <div 
            className="absolute inset-0 pointer-events-none mix-blend-color-dodge z-30 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${shine.x}px ${shine.y}px, rgba(255, 255, 255, 0.26) 0%, transparent 60%)`
            }}
          />
        )}
      </motion.div>

      {/* ─── 2. Floating HUD/Genre Badge (elevated in 3D space, outside overflow bounds) ─── */}
      <div 
        className="absolute top-4 left-4 z-20"
        style={{ transform: "translateZ(15px)" }}
      >
        <span className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-brand backdrop-blur-md rounded-full border border-brand/20 shadow-[0_0_10px_rgba(124,255,0,0.15)] transition-all duration-300" style={{ background: 'rgba(10,10,10,0.7)' }}>
          {game.genre}
        </span>
      </div>

      {/* ─── 3. Floating Content Layer (Logo & CTA - elevated in high 3D space!) ─── */}
      <div 
        className="absolute bottom-0 left-0 right-0 p-5 flex flex-col items-center text-center z-20 pointer-events-none"
        style={{ 
          transform: "translateZ(35px)", 
          transformStyle: "preserve-3d" 
        }}
      >
        {/* Game Logo — intelligent adaptive container with zero-gravity hover float */}
        {game.logo && (
          <motion.div
            className={`${
              isHero
                ? 'w-[80%] h-32 md:h-40'
                : 'w-[95%] h-20 md:h-24'
            } flex items-center justify-center mb-3`}
            animate={isHovered ? {
              y: [0, -4, 0],
            } : { y: 0 }}
            transition={isHovered ? {
              repeat: Infinity,
              repeatType: "reverse",
              duration: 2.5,
              ease: "easeInOut"
            } : undefined}
          >
            <img
              ref={logoRef}
              src={assetPath(game.logo)}
              alt={`${game.title} logo`}
              className={`${logoConstraints} object-contain transition-transform duration-500 ${isHovered ? 'scale-108' : ''}`}
              onLoad={onLogoLoad}
              style={{
                filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.85)) drop-shadow(0 0 30px rgba(0,0,0,0.65))",
              }}
            />
          </motion.div>
        )}

        {/* Call to action — solo cuando la tarjeta es navegable */}
        {locale && (
          <span className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-brand opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {locale === "es" ? "Ver ficha" : "View case study"}
          </span>
        )}

        {/* Text title (sr-only for accessibility/SEO) */}
        <h3 className="sr-only">
          {game.title}
        </h3>
      </div>
        </motion.div>
      </motion.div>
    </div>
  );

  if (!locale) return card;

  return (
    <Link
      href={`/${locale}/case-studies/${game.id}`}
      aria-label={game.title}
      className={`block w-full ${isHero ? 'h-full' : ''} rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand`}
    >
      {card}
    </Link>
  );
}
