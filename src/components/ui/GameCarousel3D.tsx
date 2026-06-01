"use client";

import { assetPath } from "@/lib/basePath";
import { motion } from "framer-motion";
import React, { useState, useEffect, useRef, useCallback } from "react";
import type { GameData } from "@/data/games";

interface GameCarousel3DProps {
  games: GameData[];
  locale: string;
}

export default function GameCarousel3D({ games, locale }: GameCarousel3DProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [logoConstraints, setLogoConstraints] = useState<{ [key: string]: string }>({});
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // 3D Parallax Tilt & Holographic Shine State
  const [activeTilt, setActiveTilt] = useState({ x: 0, y: 0 });
  const [activeShine, setActiveShine] = useState({ x: 0, y: 0 });
  const [isActiveHovered, setIsActiveHovered] = useState(false);

  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Responsive state tracking
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setIsMobile(w < 640);
      setIsTablet(w >= 640 && w < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-play logic (Advances every 5 seconds if not hovered)
  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % games.length);
  }, [games.length]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + games.length) % games.length);
  }, [games.length]);

  useEffect(() => {
    if (isHovered || isActiveHovered) {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      return;
    }

    autoPlayTimerRef.current = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isHovered, isActiveHovered, nextSlide]);

  // Drag handler for swipe gesture
  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      nextSlide();
    } else if (info.offset.x > swipeThreshold) {
      prevSlide();
    }
  };

  // Natural logo constraints logic
  const handleLogoLoad = (id: string, e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.naturalWidth && img.naturalHeight) {
      const ratio = img.naturalWidth / img.naturalHeight;
      let cls = "max-w-[80%] max-h-[80%]";
      if (ratio > 3.5) {
        cls = "max-w-[72%] max-h-[90%]";
      } else if (ratio > 2.2) {
        cls = "max-w-[94%] max-h-[98%]";
      } else if (ratio > 1.3) {
        cls = "max-w-[100%] max-h-[100%]";
      } else if (ratio > 0.75) {
        cls = "max-w-[62%] max-h-full";
      } else {
        cls = "max-w-[50%] max-h-full";
      }
      setLogoConstraints((prev) => ({ ...prev, [id]: cls }));
    }
  };

  // Holographic 3D Tilt calculation
  const handleActiveMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // cursor relative x
    const y = e.clientY - rect.top;  // cursor relative y
    
    // Normalize coordinates from -0.5 to 0.5
    const xc = x / rect.width - 0.5;
    const yc = y / rect.height - 0.5;
    
    setActiveTilt({
      x: yc * -18, // max 18 degrees vertical tilt
      y: xc * 18,  // max 18 degrees horizontal tilt
    });
    setActiveShine({ x, y });
    setIsActiveHovered(true);
  };

  const handleActiveMouseLeave = () => {
    setActiveTilt({ x: 0, y: 0 });
    setActiveShine({ x: 0, y: 0 });
    setIsActiveHovered(false);
  };

  return (
    <div
      className="relative w-full py-10 select-none overflow-visible flex flex-col items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ─── 3D Perspective Viewport with Edge Gradients ─── */}
      <div 
        className="relative w-full h-[360px] sm:h-[460px] md:h-[500px] overflow-visible flex items-center justify-center"
        style={{
          perspective: "1200px",
          transformStyle: "preserve-3d",
          // CSS Gradient Mask on left and right edges for smooth dissolve effect
          maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
      >
        {/* Draggable Inner Container: moves all cards in real time as the user drags */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.6}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 flex items-center justify-center overflow-visible"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {games.map((game, idx) => {
          // Compute circular looping offsets
          let offset = idx - activeIndex;
          const total = games.length;
          if (offset < -total / 2) offset += total;
          if (offset > total / 2) offset -= total;

          const absOffset = Math.abs(offset);
          const isActive = offset === 0;
          const isHoveredSide = hoveredIndex === idx;

          // Spatial layout spacing calculations
          const horizontalSpacing = isMobile ? 180 : isTablet ? 250 : 340;
          const xTranslation = offset * horizontalSpacing;
          const yTranslation = absOffset * (isMobile ? 4 : 8); // Cylindrical curvature downward
          
          let zTranslation = absOffset * -160; // Depth translation
          if (isActive && isActiveHovered) {
            zTranslation = 35; // Physically pops the active card forward by 35px in 3D Z-axis on hover!
          } else if (isHoveredSide) {
            zTranslation = absOffset * -160 + 40; // Pulls side card slightly forward by 40px on hover
          }

          let rotateYRotation = offset * -25;
          let rotateXRotation = 0;

          if (isActive && isActiveHovered) {
            rotateYRotation = activeTilt.y;
            rotateXRotation = activeTilt.x;
          } else if (isHoveredSide) {
            rotateYRotation = offset * -12; // Tilts side card to face the user more (from -25 to -12)
          }

          return (
            <motion.div
              key={game.id}
              onClick={() => {
                if (!isActive) {
                  setActiveIndex(idx);
                }
              }}
              onMouseEnter={() => {
                if (!isActive) {
                  setHoveredIndex(idx);
                }
              }}
              onMouseLeave={() => {
                if (isActive) {
                  handleActiveMouseLeave();
                } else {
                  setHoveredIndex(null);
                }
              }}
              onMouseMove={isActive ? handleActiveMouseMove : undefined}
              className={`absolute w-[240px] sm:w-[290px] md:w-[320px] h-[300px] sm:h-[380px] md:h-[420px] cursor-pointer`}
              style={{
                zIndex: 10 - absOffset,
                transformOrigin: "center center",
                transformStyle: "preserve-3d",
              }}
              animate={{
                x: xTranslation,
                y: yTranslation,
                z: zTranslation,
                rotateY: rotateYRotation,
                rotateX: rotateXRotation,
                scale: isActive 
                  ? (isActiveHovered ? 1.08 : 1.05) 
                  : (isHoveredSide ? 0.92 : 0.85),
                opacity: absOffset > 2 ? 0 : isActive ? 1 : (isHoveredSide ? 0.85 : 0.55),
              }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 26,
              }}
            >
              {/* ─── 1. Inner Card Box (handles rounded crop, border, shadow, screenshot, shine) ─── */}
              <motion.div
                className="absolute inset-0 rounded-2xl overflow-hidden border bg-[#12131b] transition-all duration-500"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "translateZ(0px)",
                }}
                animate={{
                  boxShadow: isActive
                    ? isActiveHovered
                      ? "0 15px 45px rgba(124, 255, 0, 0.35)"
                      : "0 10px 25px rgba(124, 255, 0, 0.12)"
                    : "0 8px 24px rgba(0, 0, 0, 0.6)",
                  borderColor: isActive
                    ? isActiveHovered
                      ? "rgba(124, 255, 0, 0.45)"
                      : "rgba(124, 255, 0, 0.15)"
                    : "rgba(255, 255, 255, 0.05)",
                }}
              >
                {game.screenshot ? (
                  <img
                    src={assetPath(game.screenshot)}
                    alt={game.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    style={game.imagePosition ? { objectPosition: game.imagePosition } : undefined}
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#0f0f12]" />
                )}

                {/* Aesthetic overlays */}
                <div 
                  className="absolute inset-0 transition-opacity duration-500" 
                  style={{
                    background: isActive
                      ? "linear-gradient(to top, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.15) 50%, transparent 100%)"
                      : "linear-gradient(to top, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.4) 100%)"
                  }} 
                />

                {/* Subtle bottom green glow on active */}
                {isActive && (
                  <div 
                    className="absolute inset-0 opacity-80 pointer-events-none" 
                    style={{
                      background: "radial-gradient(circle at bottom, rgba(124, 255, 0, 0.18) 0%, transparent 70%)"
                    }} 
                  />
                )}

                {/* Holographic Glossy Shine Overlay */}
                {isActive && isActiveHovered && (
                  <div 
                    className="absolute inset-0 pointer-events-none mix-blend-color-dodge z-30 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at ${activeShine.x}px ${activeShine.y}px, rgba(255, 255, 255, 0.28) 0%, transparent 55%)`
                    }}
                  />
                )}
              </motion.div>

              {/* ─── 2. Floating Genre Badge (outside overflow-hidden) ─── */}
              <div 
                className="absolute top-4 left-4 z-20"
                style={{ transform: "translateZ(15px)" }}
              >
                <span 
                  className={`px-3 py-1 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-brand backdrop-blur-md rounded-full border border-brand/20 shadow-[0_0_10px_rgba(124,255,0,0.12)] transition-all duration-300`}
                  style={{ background: "rgba(10,10,10,0.75)" }}
                >
                  {game.genre}
                </span>
              </div>

              {/* ─── 3. Floating Content Layer (elevated in high 3D space) ─── */}
              <div 
                className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 flex flex-col items-center text-center z-20 pointer-events-none"
                style={{ 
                  transform: "translateZ(35px)",
                  transformStyle: "preserve-3d"
                }}
              >
                {/* Game Logo with auto-scaling & gentle zero-g breathing */}
                {game.logo && (
                  <motion.div 
                    className={`w-[90%] h-16 sm:h-20 md:h-24 flex items-center justify-center mb-2 sm:mb-3`}
                    animate={isActive ? {
                      y: [0, -6, 0],
                    } : { y: 0 }}
                    transition={isActive ? {
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 3,
                      ease: "easeInOut",
                      delay: idx * 0.15,
                    } : undefined}
                  >
                    <img
                      src={assetPath(game.logo)}
                      alt={`${game.title} logo`}
                      className={`${logoConstraints[game.id] || "max-w-[80%] max-h-[80%]"} object-contain transition-transform duration-500 ${
                        isActive && isActiveHovered ? "scale-108" : ""
                      }`}
                      onLoad={(e) => handleLogoLoad(game.id, e)}
                      style={{
                        filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.85)) drop-shadow(0 0 30px rgba(0,0,0,0.65))",
                      }}
                    />
                  </motion.div>
                )}

              </div>
            </motion.div>
          );
        })}
        </motion.div>
      </div>

      {/* ─── Navigation & Bullet Indicators ─── */}
      <div className="mt-6 z-30">
        {/* Pagination bullets */}
        <div className="flex items-center gap-2.5">
          {games.map((game, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={game.id}
                onClick={() => setActiveIndex(idx)}
                className="group relative flex items-center justify-center p-1 cursor-pointer focus:outline-none"
                aria-label={`Go to slide ${idx + 1}`}
              >
                {/* Outer ring */}
                <span 
                  className={`w-3.5 h-3.5 rounded-full border transition-all duration-500 absolute ${
                    isActive 
                      ? "border-brand scale-100 opacity-100 shadow-[0_0_8px_rgba(124,255,0,0.6)]" 
                      : "border-white/10 scale-50 opacity-0 group-hover:scale-75 group-hover:opacity-40 group-hover:border-white/40"
                  }`} 
                />
                {/* Inner dot */}
                <span 
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                    isActive 
                      ? "bg-brand scale-100" 
                      : "bg-white/30 group-hover:bg-white/70"
                  }`} 
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── Premium Navigation Arrows on Side (Highly Responsive on PC & Mobile) ─── */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 flex w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/5 hover:border-brand/40 bg-black/40 backdrop-blur-md items-center justify-center text-white/40 hover:text-brand hover:shadow-[0_0_15px_rgba(124,255,0,0.15)] transition-all duration-300 z-50 cursor-pointer"
        aria-label="Previous slide"
      >
        <svg className="w-4 h-4 md:w-5 md:h-5 -ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 flex w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/5 hover:border-brand/40 bg-black/40 backdrop-blur-md items-center justify-center text-white/40 hover:text-brand hover:shadow-[0_0_15px_rgba(124,255,0,0.15)] transition-all duration-300 z-50 cursor-pointer"
        aria-label="Next slide"
      >
        <svg className="w-4 h-4 md:w-5 md:h-5 -mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
