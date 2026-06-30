"use client";

import { assetPath } from "@/lib/basePath";
import Link from "next/link";
import ServiceCard from "@/components/ui/ServiceCard";
import type { ServiceData } from "@/data/services";
import type { Dictionary } from "@/i18n/getDictionary";

export default function ServicesSection({
  dict,
  services,
  locale,
}: {
  dict: Dictionary;
  services: ServiceData[];
  locale: string;
}) {
  return (
    <section id="services" className="relative -mx-6 px-6 py-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={assetPath("/images/bg_services_adventure.webp")}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-70 mix-blend-screen"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #0e0e0e, transparent, #0e0e0e)' }} />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10 space-y-10">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-brand" />
            <h2 className="font-display text-3xl md:text-4xl font-bold uppercase">
              {dict.home.servicesLabel}
            </h2>
          </div>
          <p className="text-sm text-white/40 ml-11">
            {dict.home.servicesSubtitle}
          </p>
        </div>

        {/* Service Cards — icons only, photos coming soon */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {services.map((service, idx) => (
            <ServiceCard
              key={service.id}
              iconName={service.iconName}
              title={dict.services[idx].title}
              description={dict.services[idx].description}
              index={idx}
            />
          ))}
        </div>

        {/* B2B Partner CTA Banner */}
        <div className="mt-16 p-8 rounded bg-white/[0.02] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-brand/20 transition-all duration-500">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="font-display text-base font-bold text-white uppercase tracking-wider">
              {locale === 'es' ? '¿Buscas una Casual Game Development Company?' : 'Looking for a Casual Game Development Company?'}
            </h4>
            <p className="text-sm text-white/45 max-w-2xl">
              {locale === 'es' 
                ? 'Conoce a nuestros casual game developers, capacidades de producción, pipelines y cómo reducimos riesgos para publishers e IP owners.' 
                : 'Explore our casual game developers, B2B production pipelines, team capacity, and how we de-risk game delivery for publishers & IP owners.'}
            </p>
          </div>
          <Link
            href={`/${locale}/game-development-company`}
            className="shrink-0 px-6 py-3 bg-brand text-background hover:bg-brand-hover hover:text-white text-xs font-bold uppercase tracking-widest rounded transition-all duration-300 shadow-md"
          >
            {locale === 'es' ? 'Ver Casual Game Developers' : 'View Casual Game Developers'}
          </Link>
        </div>
      </div>
    </section>
  );
}
