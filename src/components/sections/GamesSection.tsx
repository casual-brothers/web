"use client";

import Link from "next/link";
import GameCarousel3D from "@/components/ui/GameCarousel3D";
import type { GameData } from "@/data/games";
import type { Dictionary } from "@/i18n/getDictionary";

export default function GamesSection({
  dict,
  locale,
  games,
}: {
  dict: Dictionary;
  locale: string;
  games: GameData[];
}) {
  return (
    <section id="games" className="space-y-6 overflow-visible">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-brand" />
            <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight">
              {dict.home.gamesTitle}
            </h2>
          </div>
          <p className="text-sm text-white/40 ml-11">
            {dict.home.gamesSubtitle}
          </p>
        </div>
        <Link
          href={`/${locale}/games`}
          className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-brand hover:text-brand-hover transition-colors shrink-0"
        >
          {dict.home.viewAllGames}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>

      {/* 3D Interactive Perspective Carousel */}
      <div className="w-full overflow-visible">
        <GameCarousel3D
          games={games}
          viewGameText={dict.home.viewGame}
          locale={locale}
        />
      </div>
    </section>
  );
}
