"use client";

import { assetPath } from "@/lib/basePath";

import { motion } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import { fullDevGames, coDevGames, consoleDevGames } from "@/data/games";
import type { GameData } from "@/data/games";
import GameCard from "@/components/ui/GameCard";
import CTASection from "@/components/sections/CTASection";
import type { Dictionary } from "@/i18n/getDictionary";

type CategoryKey = "full" | "codev" | "console";

interface CategorySection {
  key: CategoryKey;
  games: GameData[];
  titleKey: "categoryFull" | "categoryCodev" | "categoryConsole";
  descKey: "categoryFullDesc" | "categoryCodevDesc" | "categoryConsoleDesc";
  icon: React.ReactNode;
}

const RocketIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

const HandshakeIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="m11 17 2 2a1 1 0 1 0 3-3" />
    <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
    <path d="m21 3 1 11h-2" />
    <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
    <path d="M3 4h8" />
  </svg>
);

const GamepadIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <line x1="6" x2="10" y1="11" y2="11" />
    <line x1="8" x2="8" y1="9" y2="13" />
    <line x1="15" x2="15.01" y1="12" y2="12" />
    <line x1="18" x2="18.01" y1="10" y2="10" />
    <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5Z" />
  </svg>
);

const categories: CategorySection[] = [
  {
    key: "full",
    games: fullDevGames,
    titleKey: "categoryFull",
    descKey: "categoryFullDesc",
    icon: <RocketIcon />,
  },
  {
    key: "codev",
    games: coDevGames,
    titleKey: "categoryCodev",
    descKey: "categoryCodevDesc",
    icon: <HandshakeIcon />,
  },
  {
    key: "console",
    games: consoleDevGames,
    titleKey: "categoryConsole",
    descKey: "categoryConsoleDesc",
    icon: <GamepadIcon />,
  },
];

export default function GamesPageClient({ dict, locale }: { dict: Dictionary; locale: string }) {
  const data = dict.games;
  const [activeTab, setActiveTab] = useState<CategoryKey>("full");
  const sectionRefs = useRef<Record<CategoryKey, HTMLElement | null>>({
    full: null,
    codev: null,
    console: null,
  });
  const tabBarRef = useRef<HTMLDivElement>(null);
  const isScrollingProgrammatically = useRef(false);

  // Track which section is in view for tab highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingProgrammatically.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const key = entry.target.getAttribute("data-category") as CategoryKey;
            if (key) setActiveTab(key);
          }
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    for (const key of Object.keys(sectionRefs.current) as CategoryKey[]) {
      const el = sectionRefs.current[key];
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToCategory = useCallback((key: CategoryKey) => {
    setActiveTab(key);
    const el = sectionRefs.current[key];
    if (!el) return;

    isScrollingProgrammatically.current = true;

    const tabBarHeight = tabBarRef.current?.offsetHeight ?? 60;
    const headerOffset = 80 + tabBarHeight + 24; // navbar + sticky tabs + gap
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({ top, behavior: "smooth" });

    // Reset programmatic flag after scroll completes
    setTimeout(() => {
      isScrollingProgrammatically.current = false;
    }, 800);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ isolation: 'isolate' }}>
      {/* Decorative Floating Backgrounds */}
      <div 
        className="absolute inset-0 bottom-[350px] pointer-events-none -z-10"
        style={{ 
          maskImage: "linear-gradient(to bottom, black 90%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 90%, transparent 100%)"
        }}
      >
        {/* Top Segment (RPG) */}
        <div className="absolute top-0 -left-[8%] w-[116%] aspect-[16/10] opacity-80 mix-blend-screen">
          <img 
            src={assetPath("/images/bg_games_rpg.webp")} 
            alt="" 
            className="w-full h-full object-cover" 
            style={{ 
              maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)"
            }}
          />
        </div>
        
        {/* Upper Mid Segment (Sci-Fi) */}
        <div className="absolute top-[23%] -left-[8%] w-[116%] aspect-[16/10] opacity-75 mix-blend-screen">
          <img 
            src={assetPath("/images/bg_games_scifi.webp")} 
            alt="" 
            className="w-full h-full object-cover" 
            style={{ 
              maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)"
            }}
          />
        </div>

        {/* Lower Mid Segment (Racing) */}
        <div className="absolute top-[46%] -left-[8%] w-[116%] aspect-[16/10] opacity-80 mix-blend-screen">
          <img 
            src={assetPath("/images/bg_games_racing.webp")} 
            alt="" 
            className="w-full h-full object-cover" 
            style={{ 
              maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)"
            }}
          />
        </div>

        {/* Bottom Segment (Platformer) */}
        <div className="absolute top-[68%] -left-[8%] w-[116%] aspect-[16/10] opacity-80 mix-blend-screen">
          <img 
            src={assetPath("/images/bg_games_platformer.webp")} 
            alt="" 
            className="w-full h-full object-cover" 
            style={{ 
              maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)"
            }}
          />
        </div>

        {/* Global Darkener Overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: 'rgba(14, 14, 14, 0.50)' }} />
      </div>

      {/* Hero Header */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 -z-20">
          <img
            src={assetPath("/images/Hot-Rod-Mayhem-Screenshot.webp")}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-[0.80] mix-blend-screen"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #0e0e0e, rgba(14,14,14,0.7), #0e0e0e)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #0e0e0e, rgba(14,14,14,0.5), transparent)' }} />
        </div>

        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] rounded-full blur-[200px]" style={{ background: 'rgba(124,255,0,0.08)' }} />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 relative z-10 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="w-2 h-2 rounded-full bg-brand" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
              PORTFOLIO
            </span>
            <div className="flex-1 h-px bg-white/5" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold uppercase leading-[0.95] tracking-tight"
          >
            {data.title}{" "}
            <span className="text-gradient-brand">{data.titleBrand}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-white/50 max-w-xl leading-relaxed"
          >
            {data.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Sticky Category Tab Bar */}
      <div 
        ref={tabBarRef}
        className="sticky top-[64px] z-40 border-b border-white/5"
        style={{ 
          background: 'rgba(14, 14, 14, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-1">
            {categories.map((cat) => {
              const isActive = activeTab === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => scrollToCategory(cat.key)}
                  className={`relative flex items-center gap-2.5 px-5 py-3.5 text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 whitespace-nowrap cursor-pointer rounded-t-lg ${
                    isActive
                      ? "text-brand"
                      : "text-white/35 hover:text-white/70"
                  }`}
                >
                  <span className={`transition-colors duration-300 ${isActive ? "text-brand" : "text-white/25"}`}>
                    {cat.icon}
                  </span>
                  {data[cat.titleKey]}
                  <span className={`ml-1 text-[9px] font-extrabold px-1.5 py-0.5 rounded-full transition-all duration-300 ${
                    isActive 
                      ? "bg-brand/15 text-brand" 
                      : "bg-white/5 text-white/30"
                  }`}>
                    {cat.games.length}
                  </span>
                  {/* Active indicator line */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-brand rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Category Sections */}
      <div className="relative z-10">
        {categories.map((cat, catIdx) => (
          <section
            key={cat.key}
            ref={(el) => { sectionRefs.current[cat.key] = el; }}
            data-category={cat.key}
            className="max-w-[1400px] w-full mx-auto px-6 pt-16 pb-8"
          >
            {/* Category Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-10"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg border border-brand/20 text-brand" style={{ background: 'rgba(124,255,0,0.06)' }}>
                  {cat.icon}
                </div>
                <div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight text-white">
                    {data[cat.titleKey]}
                  </h2>
                  <p className="text-sm text-white/35 mt-0.5">
                    {data[cat.descKey]}
                  </p>
                </div>
                <div className="flex-1 h-px bg-white/5 ml-4" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-white/20">
                  {cat.games.length} {cat.games.length === 1 ? "title" : "titles"}
                </span>
              </div>
            </motion.div>

            {/* Games Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {cat.games.map((game, idx) => (
                <GameCard
                  key={game.id}
                  game={game}
                  index={catIdx * 10 + idx}
                />
              ))}
            </div>

            {/* Section divider (not on last section) */}
            {catIdx < categories.length - 1 && (
              <div className="mt-16 flex items-center gap-4">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
              </div>
            )}
          </section>
        ))}
      </div>

      {/* CTA */}
      <div className="relative z-10">
        <CTASection dict={dict} locale={locale} />
      </div>
    </div>
  );
}
