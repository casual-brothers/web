import { assetPath } from "@/lib/basePath";
import { getDictionary } from "@/i18n/getDictionary";
import { teamData } from "@/data/team";
import StatsBar from "@/components/ui/StatsBar";
import TeamGrid from "@/components/ui/TeamGrid";
import CTASection from "@/components/sections/CTASection";

import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(locale, "about", "about");
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <>
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden min-h-[85vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src={assetPath("/images/bg_about_fantasy.webp")}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-75"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #0e0e0e, transparent, #0e0e0e)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #0e0e0e 5%, rgba(14,14,14,0.6) 40%, rgba(14,14,14,0.3) 70%, transparent 100%)' }} />
        </div>

        <div className="max-w-[1400px] w-full mx-auto px-6 relative z-10">
          <div className="max-w-2xl space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-brand animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
                {dict.home.aboutLabel}
              </span>
              <div className="w-12 h-px bg-white/10" />
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold uppercase leading-[0.95] tracking-tight">
              {dict.home.aboutTitle1}
              <br />
              {dict.home.aboutTitle2}{" "}
              <span className="text-gradient-brand">{dict.home.aboutTitle3}</span>
            </h1>

            <p className="text-lg md:text-xl text-white/50 max-w-xl leading-relaxed">
              {dict.home.aboutText}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Stats Section */}
      <div className="max-w-[1400px] mx-auto px-6 py-20 relative z-20 -mt-10">
        <StatsBar stats={dict.home.stats} />
      </div>

      {/* 3. Team Section */}
      <section className="relative pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, rgba(124, 255, 0, 0.02), transparent)' }} />
        <div className="max-w-[1400px] mx-auto px-6 relative z-10 space-y-16">
          <div className="space-y-4 text-center">
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-px" style={{ background: 'rgba(124,255,0,0.5)' }} />
              <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-widest">
                {dict.about.teamTitle}
              </h2>
              <div className="w-12 h-px" style={{ background: 'rgba(124,255,0,0.5)' }} />
            </div>
            <p className="text-sm text-white/40 uppercase tracking-widest">
              {dict.about.teamSubtitle}
            </p>
          </div>

          <TeamGrid members={teamData} locale={locale} />
        </div>
      </section>

      {/* CTA */}
      <CTASection dict={dict} locale={locale} />
    </>
  );
}
