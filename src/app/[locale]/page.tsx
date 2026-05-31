import { getDictionary } from "@/i18n/getDictionary";
import Link from "next/link";
import { featuredGames } from "@/data/games";
import { servicesData } from "@/data/services";
import HeroSection from "@/components/sections/HeroSection";
import GamesSection from "@/components/sections/GamesSection";
import ServicesSection from "@/components/sections/ServicesSection";
import AboutSection from "@/components/sections/AboutSection";
import CTASection from "@/components/sections/CTASection";
import StatsBar from "@/components/ui/StatsBar";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <>
      {/* HERO */}
      <HeroSection dict={dict} locale={locale} />

      <div className="max-w-[1400px] w-full mx-auto px-6 space-y-24 pb-0">
        {/* STATS */}
        <StatsBar stats={dict.home.stats} />

        {/* GAMES */}
        <GamesSection dict={dict} locale={locale} games={featuredGames} />

        {/* SERVICES */}
        <ServicesSection dict={dict} services={servicesData} />
      </div>

      {/* ABOUT — outside max-w container for full-bleed 3D */}
      <div className="mt-24">
        <AboutSection dict={dict} locale={locale} />
      </div>

      {/* FINAL CTA */}
      <CTASection dict={dict} locale={locale} />
    </>
  );
}
