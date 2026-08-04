import Link from "next/link";
import { ArrowRight, BadgeCheck, FileText, Users, Repeat, MonitorCheck } from "lucide-react";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import PlatformLogos from "@/components/ui/PlatformLogos";
import FeaturedCaseStudies from "@/components/sections/FeaturedCaseStudies";
import GamescomBanner from "@/components/sections/GamescomBanner";
import { assetPath } from "@/lib/basePath";
import { getLocalizedUrl, siteUrl } from "@/lib/seo";
import { featuredCaseStudySlugs, type CommercialPageData } from "@/data/commercialPages";

export default function CommercialLandingPage({
  locale,
  page,
}: {
  locale: string;
  page: CommercialPageData;
}) {
  const isEs = locale === "es";
  const pageUrl = getLocalizedUrl(locale, page.slug);
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: page.title,
    serviceType: page.h1,
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: "Worldwide",
    audience: {
      "@type": "Audience",
      audienceType: isEs
        ? "Publishers, titulares de IP, estudios financiados y equipos de produccion"
        : "Publishers, IP holders, funded studios and production teams",
    },
    description: page.metaDescription,
    url: pageUrl,
  };

  const engagementModels = [
    {
      icon: Users,
      title: isEs ? "Equipo full-cycle dedicado" : "Dedicated full-cycle team",
      body: isEs
        ? "Un equipo completo que lleva tu brief desde concepto hasta titulo lanzado, con milestones y comunicacion directa."
        : "A complete team that takes your brief from concept to shipped title, with milestone-driven delivery and direct communication.",
    },
    {
      icon: Repeat,
      title: isEs ? "Pod de co-desarrollo" : "Co-development pod",
      body: isEs
        ? "Capacidad senior multidisciplinar integrada en tu pipeline, herramientas y ritmo de produccion, sin aumentar tu carga de gestion."
        : "Senior multidisciplinary capacity embedded in your pipeline, tools and production rhythm, without adding management load.",
    },
    {
      icon: MonitorCheck,
      title: isEs ? "Porting y entrega en consola" : "Porting and console delivery",
      body: isEs
        ? "Adaptacion de plataforma con alcance cerrado y produccion preparada para los procesos de submission y certificacion de Nintendo, PlayStation y Xbox."
        : "Fixed-scope platform adaptation with production prepared for Nintendo, PlayStation and Xbox submission and certification processes.",
    },
  ];

  const relatedLinks = [
    { href: `/${locale}/case-studies`, label: isEs ? "Case studies" : "Case studies" },
    { href: `/${locale}/game-development-services`, label: isEs ? "Servicios" : "Services" },
    { href: `/${locale}/publishers`, label: isEs ? "Publishers e IPs" : "Publishers and IP holders" },
    { href: `/${locale}/contact`, label: isEs ? "Contacto" : "Contact" },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: "Home", path: "" },
          { name: page.title, path: `/${page.slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <section className="relative min-h-[82vh] pt-32 pb-20 overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <img
            src={assetPath("/images/bg_services_adventure.webp")}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-screen"
            loading="eager"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #0e0e0e 8%, rgba(14,14,14,0.82) 46%, rgba(14,14,14,0.35) 78%, #0e0e0e 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(14,14,14,0.78), transparent 46%, #0e0e0e 100%)" }} />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1fr_0.72fr]">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="h-2.5 w-2.5 rounded-full bg-brand" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/45">
                {page.eyebrow}
              </span>
              <div className="h-px w-16 bg-brand/40" />
            </div>

            <h1 className="max-w-5xl font-display text-5xl font-bold uppercase leading-[0.96] md:text-6xl lg:text-7xl">
              {page.h1}
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-white/58 md:text-xl">
              {page.intro}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href={`/${locale}/contact`} className="btn-primary">
                {page.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={`/${locale}/case-studies`} className="btn-outline">
                {isEs ? "Ver titulos lanzados" : "View shipped titles"}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {page.proof.map((item) => (
              <div key={item} className="rounded-lg border border-white/10 bg-black/30 p-5 backdrop-blur-md">
                <BadgeCheck className="h-6 w-6 text-brand" />
                <p className="mt-4 font-display text-sm font-bold uppercase tracking-[0.14em] text-white/80">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GamescomBanner locale={locale} />

      <section className="mx-auto max-w-[1400px] px-6 py-20">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {page.sections.map((section) => (
            <article key={section.title} className="rounded-lg border border-white/8 bg-white/[0.025] p-6">
              <h2 className="font-display text-2xl font-bold uppercase leading-tight">
                {section.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/48">{section.body}</p>
              <ul className="mt-6 space-y-3">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-sm text-white/58">
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <FeaturedCaseStudies locale={locale} slugs={featuredCaseStudySlugs[page.slug]} />

      <section className="mx-auto max-w-[1400px] px-6 py-16">
        <div className="mb-16 space-y-8">
          <div className="max-w-3xl space-y-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand">
              {isEs ? "COMO TRABAJAMOS" : "HOW WE WORK"}
            </p>
            <h2 className="font-display text-3xl font-bold uppercase md:text-4xl">
              {isEs ? "Modelos de colaboracion" : "Engagement models"}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {engagementModels.map((model) => (
              <div key={model.title} className="rounded-lg border border-white/8 bg-white/[0.025] p-6">
                <model.icon className="h-6 w-6 text-brand" />
                <h3 className="mt-5 font-display text-base font-bold uppercase tracking-[0.12em] text-white/85">
                  {model.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/48">{model.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 border-y border-white/8 py-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand">
              {isEs ? "SIGUIENTE PASO" : "NEXT STEP"}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold uppercase md:text-4xl">
              {isEs ? "Trae el brief. Nosotros ayudamos a convertirlo en produccion." : "Bring the brief. We help turn it into production."}
            </h2>
          </div>
          <div className="space-y-5">
            <p className="leading-relaxed text-white/50">
              {isEs
                ? "Comparte alcance, plataformas, estado del proyecto y tipo de soporte que necesitas. Si es confidencial, envia una introduccion breve y seguimos bajo NDA cuando corresponda."
                : "Share scope, platforms, production stage and the type of support you need. If the project is confidential, send a short intro first and we can continue under NDA when appropriate."}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:contact@casualbrothers.com?subject=${encodeURIComponent(isEs ? "Solicitud de capabilities deck — Casual Brothers" : "Capabilities deck request — Casual Brothers")}`}
                className="inline-flex items-center gap-2 rounded border border-brand/40 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-brand transition-colors hover:border-brand hover:bg-brand/10"
              >
                <FileText className="h-4 w-4" />
                {isEs ? "Solicitar capabilities deck" : "Request capabilities deck"}
              </a>
              {relatedLinks.map((link) => (
                <Link key={link.href} href={link.href} className="rounded border border-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white/45 transition-colors hover:border-brand hover:text-brand">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1400px] px-6 pb-16">
        <PlatformLogos />
      </div>
    </>
  );
}
