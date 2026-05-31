"use client";

import { assetPath } from "@/lib/basePath";

import { motion } from "framer-motion";
import { gamesData } from "@/data/games";
import GameCard from "@/components/ui/GameCard";
import CTASection from "@/components/sections/CTASection";
import type { Dictionary } from "@/i18n/getDictionary";

export default function GamesPageClient({ dict, locale }: { dict: Dictionary; locale: string }) {
  const data = dict.games;

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ isolation: 'isolate' }}>
      {/* Decorative Floating Backgrounds - Continuous gaming worlds blending together seamlessly */}
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

        {/* Global Darkener Overlay - Dims the background panorama so the cards pop with extreme clarity */}
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
            <span className="text-gradient-brand" style={{ backgroundImage: 'linear-gradient(135deg, #7cff00 0%, #ffffff 50%, #9eff24 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' }}>{data.titleBrand}</span>
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

      {/* Games Grid */}
      <section className="max-w-[1400px] w-full mx-auto px-6 pb-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {gamesData.map((game, idx) => (
            <GameCard
              key={game.id}
              game={game}
              viewGameText={dict.home.viewGame}
              index={idx}
            />
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="relative z-10">
        <CTASection dict={dict} locale={locale} />
      </div>
    </div>
  );
}
