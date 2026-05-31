"use client";

import { assetPath } from "@/lib/basePath";

import ServiceCard from "@/components/ui/ServiceCard";
import type { ServiceData } from "@/data/services";
import type { Dictionary } from "@/i18n/getDictionary";

export default function ServicesSection({
  dict,
  services,
}: {
  dict: Dictionary;
  services: ServiceData[];
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
            <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight">
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
      </div>
    </section>
  );
}
