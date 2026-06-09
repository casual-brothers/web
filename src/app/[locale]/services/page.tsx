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

      {/* Platforms */}
      <div className="max-w-[1400px] mx-auto px-6 pb-16">
        <PlatformLogos />
      </div>

      {/* CTA */}
      <CTASection dict={dict} locale={locale} />
    </>
  );
}
