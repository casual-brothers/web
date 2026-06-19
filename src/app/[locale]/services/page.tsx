import { getDictionary } from "@/i18n/getDictionary";
import { servicesData } from "@/data/services";
import PlatformLogos from "@/components/ui/PlatformLogos";
import CTASection from "@/components/sections/CTASection";
import PremiumServiceCard from "@/components/ui/PremiumServiceCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { assetPath } from "@/lib/basePath";

import GamingStudioGraphic from "@/components/ui/GamingStudioGraphic";

import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(locale, "services", "services");
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const isEs = locale === "es";

  const heroService = servicesData[0];
  const heroDict = dict.services[0];
  const gridServices = servicesData.slice(1);
  const gridDict = dict.services.slice(1);

  return (
    <>
      {/* 1. Hero Section: Full Game Development */}
      <section className="relative pt-32 pb-20 overflow-hidden min-h-[85vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src={assetPath("/images/bg_services_adventure.webp")}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-[0.65] mix-blend-screen"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #0e0e0e, transparent, #0e0e0e)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #0e0e0e, rgba(14,14,14,0.4), transparent)' }} />
        </div>

        <div className="max-w-[1400px] w-full mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-brand animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
                {dict.home.servicesLabel}
              </span>
              <div className="w-12 h-px bg-white/10" />
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold uppercase leading-[0.95] tracking-tight">
              {heroDict.title}
            </h1>

            <p className="text-lg md:text-xl text-white/50 max-w-xl leading-relaxed">
              {heroDict.description}
            </p>

            <div className="pt-4">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-3 px-8 py-4 bg-brand text-black font-bold uppercase tracking-wider text-sm rounded hover:bg-brand-light hover:scale-105 transition-all duration-300"
              >
                {dict.nav.workWithUs}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Hero visual — Interactive HUD Controller Graphic */}
          <div className="flex-1 w-full max-w-[600px] aspect-square relative mt-10 lg:mt-0 flex items-center justify-center">
            <GamingStudioGraphic />
          </div>
        </div>
      </section>

      {/* 2. Specialized Services Grid (2x2) */}
      <section className="max-w-[1400px] mx-auto px-6 pb-24 relative mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 relative z-10">
          {gridServices.map((service, idx) => (
            <PremiumServiceCard
              key={service.id}
              iconName={service.iconName}
              title={gridDict[idx].title}
              description={gridDict[idx].description}
              index={idx}
            />
          ))}
        </div>
      </section>

      {/* 3. SEO / B2B fit: visible search-intent copy for publishers */}
      <section className="relative px-6 py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, rgba(124,255,0,0.035), transparent)" }} />
        <div className="max-w-[1400px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-start">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-brand" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
                {isEs ? "PARTNER DE PRODUCCION" : "PRODUCTION PARTNER"}
              </span>
              <div className="w-12 h-px bg-white/10" />
            </div>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold uppercase leading-[0.98] tracking-tight">
              {isEs ? "Una game development company para publishers que necesitan lanzar." : "A casual game development company built for publishers who need to ship."}
            </h2>
          </div>

          <div className="space-y-6 text-white/55 leading-relaxed">
            <p className="text-base md:text-lg">
              {isEs
                ? "Casual Brothers combina desarrollo completo de videojuegos, co-desarrollo, porting y live ops para equipos que necesitan capacidad senior sin aumentar el riesgo de produccion. Trabajamos con IPs de entretenimiento, juegos familiares, proyectos casual e hibrido-casual y lanzamientos multiplataforma."
                : "Casual Brothers combines full-cycle game development, co-development, porting, and live ops for teams that need senior production capacity without adding delivery risk. We work across entertainment IPs, family games, casual and hybrid-casual projects, and multi-platform launches."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(isEs
                ? ["50+ especialistas remotos", "15+ titulos lanzados", "100M+ descargas"]
                : ["50+ remote specialists", "15+ shipped titles", "100M+ downloads"]
              ).map((item) => (
                <div key={item} className="border-l border-brand/50 pl-4 py-1">
                  <p className="font-display text-xs font-bold uppercase tracking-[0.16em] text-white/80">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-sm text-white/40">
              {isEs
                ? "Si buscas casual game developers, un partner de co-development o una game development company capaz de llevar un brief sensible hasta certificacion, esta es la conversacion que merece abrirse."
                : "If you are looking for casual game developers, a co-development partner, or a game development company that can take a sensitive brief through certification, this is the conversation worth opening."}
            </p>

            <Link
              href={`/${locale}/contact`}
              className="btn-outline inline-flex"
            >
              {dict.nav.workWithUs}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Platforms */}
      <div className="max-w-[1400px] mx-auto px-6 pb-16">
        <PlatformLogos />
      </div>

      {/* CTA */}
      <CTASection dict={dict} locale={locale} />
    </>
  );
}
