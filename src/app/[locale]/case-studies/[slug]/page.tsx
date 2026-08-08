import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import LiteYouTubeEmbed from "@/components/ui/LiteYouTubeEmbed";
import PlatformBadge from "@/components/ui/PlatformBadge";
import { assetPath } from "@/lib/basePath";
import { buildCustomMetadata, getLocalizedUrl, siteUrl } from "@/lib/seo";
import { caseStudies, getCaseStudy, hexToRgbChannels, t, tList } from "@/data/caseStudies";

export async function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return buildCustomMetadata(
    locale,
    locale === "es" ? `Caso de estudio: ${study.game.title}` : `${study.game.title} Case Study`,
    t(study.shortDescription, locale),
    `case-studies/${study.slug}`,
    study.game.screenshot,
  );
}

export default async function CaseStudyPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  const isEs = locale === "es";
  const pageUrl = getLocalizedUrl(locale, `case-studies/${study.slug}`);

  // El acento del juego se propaga por CSS custom property, siguiendo la misma
  // convencion que --brand-rgb en globals.css.
  const accentVars = {
    "--accent": study.accent,
    "--accent-rgb": hexToRgbChannels(study.accent),
  } as CSSProperties;

  // Siguiente titulo del portfolio, para que la ficha no sea un callejon sin salida.
  const currentIndex = caseStudies.findIndex((s) => s.slug === study.slug);
  const nextStudy = caseStudies[(currentIndex + 1) % caseStudies.length];

  const gallery = study.gallery?.length ? study.gallery : [];

  // Datos duros de la cabecera. Se omite lo que no este confirmado.
  const facts = [
    { label: isEs ? "Alcance" : "Scope", value: t(study.scopeLabel, locale) },
    { label: isEs ? "Género" : "Genre", value: study.game.genre },
    study.engine ? { label: isEs ? "Motor" : "Engine", value: study.engine } : null,
    study.releaseYear
      ? {
          label:
            study.status === "upcoming"
              ? isEs
                ? "Próximo lanzamiento"
                : "Upcoming release"
              : isEs
                ? "Lanzamiento"
                : "Release",
          value: study.releaseYear,
        }
      : null,
    study.publisher
      ? {
          label: "Publisher",
          value: study.publisher,
          logo: study.publisher === "Outright Games" ? "/images/branding/outright-games-logo.png" : undefined,
        }
      : null,
  ].filter(Boolean) as { label: string; value: string; logo?: string }[];

  const productionBlocks = [
    { title: isEs ? "El reto" : "Challenge", body: t(study.challenge, locale) },
    { title: isEs ? "Nuestra aportación" : "Contribution", body: t(study.contribution, locale) },
    { title: isEs ? "Valor de producción" : "Production value", body: t(study.productionValue, locale) },
  ].filter((block) => block.body);

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: study.game.title,
    image: `${siteUrl}${study.game.screenshot}`,
    url: pageUrl,
    description: t(study.shortDescription, locale),
    genre: study.game.genre,
    gamePlatform: study.platforms?.length ? study.platforms : undefined,
    datePublished: study.status === "released" ? study.releaseDate || study.releaseYear : undefined,
    publisher: study.publisher ? { "@type": "Organization", name: study.publisher } : undefined,
    sameAs: study.externalLinks?.length ? study.externalLinks.map((link) => link.href) : undefined,
    trailer: study.youtubeUrl
      ? { "@type": "VideoObject", url: study.youtubeUrl, name: `${study.game.title} trailer` }
      : undefined,
    author: { "@type": "Organization", name: "Casual Brothers", url: siteUrl },
  };

  return (
    <div style={accentVars}>
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: isEs ? "Inicio" : "Home", path: "" },
          { name: isEs ? "Casos de estudio" : "Case Studies", path: "/case-studies" },
          { name: study.game.title, path: `/case-studies/${study.slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />

      {/* ═══ HERO CINEMATOGRÁFICO ═══════════════════════════════════════════ */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden pt-32 pb-16">
        {/* Key art a sangre */}
        <div className="absolute inset-0">
          <img
            src={assetPath(study.game.screenshot)}
            alt={isEs ? `Arte principal de ${study.game.title}` : `${study.game.title} key art`}
            className="absolute inset-0 h-full w-full scale-105 object-cover"
            style={study.game.imagePosition ? { objectPosition: study.game.imagePosition } : undefined}
            fetchPriority="high"
          />
          {/* Oscurecido en capas: legibilidad sin matar el arte */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0e0e0e 4%, rgba(14,14,14,0.55) 45%, rgba(14,14,14,0.35) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #0e0e0e 0%, rgba(14,14,14,0.6) 42%, transparent 85%)" }} />
          {/* Halo del color del juego */}
          <div
            className="absolute -bottom-1/3 left-1/2 h-[70vh] w-[70vw] -translate-x-1/2 rounded-full blur-[160px]"
            style={{ background: "rgba(var(--accent-rgb), 0.16)" }}
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6">
          {/* Migas */}
          <nav className="mb-10 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/30">
            <Link href={`/${locale}/games`} className="transition-colors hover:text-white/70">
              {isEs ? "Portfolio" : "Portfolio"}
            </Link>
            <span>/</span>
            <span style={{ color: "var(--accent)" }}>{t(study.scopeLabel, locale)}</span>
          </nav>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              {/* El logo ES el titulo. El h1 de texto queda para SEO y lectores. */}
              <h1 className="sr-only">{study.game.title}</h1>
              {study.game.logo ? (
                <img
                  src={assetPath(study.game.logo)}
                  alt={`${study.game.title} logo`}
                  className="max-h-[190px] w-auto max-w-[min(100%,560px)] object-contain object-left"
                  style={{ filter: "drop-shadow(0 12px 40px rgba(0,0,0,0.9))" }}
                />
              ) : (
                <p className="font-display text-6xl font-bold uppercase leading-[0.95]">{study.game.title}</p>
              )}

              <p className="mt-8 max-w-2xl text-xl leading-relaxed text-white/75 md:text-2xl">
                {t(study.shortDescription, locale)}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                {study.youtubeUrl && (
                  <a href="#trailer" className="btn-primary inline-flex">
                    {isEs ? "Ver trailer" : "Watch trailer"}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                )}
                {study.externalLinks?.map((link) => (
                  <PlatformBadge
                    key={link.href}
                    platform={link.label}
                    href={link.href}
                    compact
                  />
                ))}
              </div>
            </div>

            {/* Plataformas y año, alineados abajo a la derecha */}
            <div className="flex flex-wrap items-end gap-x-10 gap-y-6 lg:justify-end">
              {study.releaseYear && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                    {study.status === "upcoming"
                      ? isEs
                        ? "Próximo lanzamiento"
                        : "Upcoming release"
                      : isEs
                        ? "Lanzamiento"
                        : "Release"}
                  </p>
                  <p className="font-display text-4xl font-bold leading-none" style={{ color: "var(--accent)" }}>
                    {study.releaseYear}
                  </p>
                </div>
              )}
              {study.platforms && study.platforms.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                    {isEs ? "Plataformas" : "Platforms"}
                  </p>
                  <div className="mt-3 flex max-w-[520px] flex-wrap gap-2 lg:justify-end">
                    {study.platforms.map((platform) => (
                      <PlatformBadge key={platform} platform={platform} compact />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FRANJA DE DATOS ════════════════════════════════════════════════ */}
      <section className="border-y border-white/8 bg-white/[0.02]">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-px px-6 md:grid-cols-3 lg:grid-cols-6">
          {facts.map((fact) => (
            <div key={fact.label} className="py-7 pr-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/30">{fact.label}</p>
              {fact.logo ? (
                <Image
                  src={fact.logo}
                  alt={fact.value}
                  width={120}
                  height={115}
                  className="mt-3 h-10 w-auto max-w-[132px] object-contain object-left"
                />
              ) : (
                <p className="mt-2 text-sm font-semibold leading-snug text-white/80">{fact.value}</p>
              )}
            </div>
          ))}
          {study.platforms && study.platforms.length > 0 && (
            <div className="col-span-2 border-t border-white/8 py-7 md:col-span-3 lg:col-span-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/30">
                {isEs ? "Plataformas disponibles" : "Available platforms"}
              </p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {study.platforms.map((platform) => (
                  <PlatformBadge key={platform} platform={platform} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ═══ TRAILER — el pitch real de un juego ════════════════════════════ */}
      {study.youtubeUrl && (
        <section id="trailer" className="relative scroll-mt-24 overflow-hidden py-20">
          <div
            className="absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[180px]"
            style={{ background: "rgba(var(--accent-rgb), 0.10)" }}
          />
          <div className="relative mx-auto max-w-[1200px] px-6">
            <div className="mb-8 flex items-center gap-4">
              <span className="h-px w-12" style={{ background: "var(--accent)" }} />
              <h2 className="font-display text-sm font-bold uppercase tracking-[0.22em]" style={{ color: "var(--accent)" }}>
                {isEs ? "Trailer oficial" : "Official trailer"}
              </h2>
            </div>
            <div
              className="overflow-hidden rounded-xl"
              style={{ boxShadow: "0 40px 100px rgba(0,0,0,0.6), 0 0 70px rgba(var(--accent-rgb), 0.14)" }}
            >
              <LiteYouTubeEmbed url={study.youtubeUrl} title={`${study.game.title} trailer`} />
            </div>
          </div>
        </section>
      )}

      {/* ═══ DE QUÉ VA + NUESTRO ROL ════════════════════════════════════════ */}
      {(study.description || study.role) && (
        <section className="mx-auto max-w-[1400px] px-6 py-20">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.3fr_0.7fr]">
            {study.description && (
              <div>
                <SectionLabel>{isEs ? "De qué va" : "About the game"}</SectionLabel>
                <p className="mt-6 text-lg leading-relaxed text-white/65">{t(study.description, locale)}</p>
              </div>
            )}
            {study.role && (
              <div
                className="h-fit rounded-xl border p-7"
                style={{ borderColor: "rgba(var(--accent-rgb), 0.22)", background: "rgba(var(--accent-rgb), 0.05)" }}
              >
                <SectionLabel>{isEs ? "Nuestro rol" : "Our role"}</SectionLabel>
                <p className="mt-5 leading-relaxed text-white/70">{t(study.role, locale)}</p>
                <ul className="mt-6 space-y-2 border-t border-white/10 pt-5">
                  {tList(study.services, locale).map((service) => (
                    <li key={service} className="flex items-start gap-2.5 text-sm text-white/55">
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full" style={{ background: "var(--accent)" }} />
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ═══ BANDA A SANGRE — exprime la captura única ══════════════════════ */}
      <section className="relative h-[45vh] overflow-hidden md:h-[60vh]">
        <img
          src={assetPath(study.secondaryImage || study.game.screenshot)}
          alt={isEs ? `Gameplay de ${study.game.title}` : `${study.game.title} gameplay`}
          className="h-full w-full scale-110 object-cover"
          style={study.game.imagePosition ? { objectPosition: study.game.imagePosition } : undefined}
          loading="lazy"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #0e0e0e 0%, transparent 22%, transparent 78%, #0e0e0e 100%)" }} />
      </section>

      {/* ═══ PRODUCCIÓN — datos, no muro de texto ═══════════════════════════ */}
      <section className="mx-auto max-w-[1400px] px-6 py-20">
        <SectionLabel>{isEs ? "Producción" : "Production"}</SectionLabel>
        <div className="mt-10 grid grid-cols-1 gap-px md:grid-cols-3">
          {productionBlocks.map((block, i) => (
            <article key={block.title} className="border-t border-white/10 pr-8 pt-6">
              <span className="font-display text-5xl font-bold leading-none" style={{ color: "rgba(var(--accent-rgb), 0.35)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-lg font-bold uppercase tracking-wide text-white">{block.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/50">{block.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ═══ GALERÍA — solo si hay arte que enseñar ═════════════════════════ */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-[1400px] px-6 pb-20">
          <SectionLabel>{isEs ? "Galería" : "Gallery"}</SectionLabel>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {gallery.map((image) => (
              <img
                key={image}
                src={assetPath(image)}
                alt={isEs ? `Captura de gameplay de ${study.game.title}` : `${study.game.title} gameplay screenshot`}
                className="aspect-video w-full rounded-lg border border-white/8 object-cover"
                loading="lazy"
              />
            ))}
          </div>
        </section>
      )}

      {/* ═══ CTA ═══════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-[1400px] px-6 pb-20">
        <div
          className="rounded-xl border p-10 text-center"
          style={{ borderColor: "rgba(var(--accent-rgb), 0.22)", background: "rgba(var(--accent-rgb), 0.05)" }}
        >
          <h2 className="mx-auto max-w-2xl font-display text-2xl font-bold uppercase leading-tight md:text-3xl">
            {isEs ? "¿Necesitas un partner fiable para tu próximo título?" : "Need a reliable development partner for your next title?"}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/55">
            {isEs
              ? "Envíanos un brief confidencial con plataformas, alcance y estado de producción. Te respondemos con el siguiente paso más claro."
              : "Send a confidential brief with platforms, scope and production stage. We can respond with the clearest next step."}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href={`/${locale}/contact`} className="btn-primary inline-flex">
              {isEs ? "Enviar brief" : "Send project brief"}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href={`/${locale}/games`} className="btn-outline inline-flex">
              {isEs ? "Ver todo el portfolio" : "View full portfolio"}
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ SIGUIENTE TÍTULO ══════════════════════════════════════════════ */}
      {nextStudy && nextStudy.slug !== study.slug && (
        <Link
          href={`/${locale}/case-studies/${nextStudy.slug}`}
          className="group relative block h-[38vh] overflow-hidden border-t border-white/8"
        >
          <img
            src={assetPath(nextStudy.game.screenshot)}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-35 transition-all duration-700 group-hover:scale-105 group-hover:opacity-55"
            loading="lazy"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #0e0e0e 10%, rgba(14,14,14,0.6) 60%, rgba(14,14,14,0.3) 100%)" }} />
          <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-center px-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">
              {isEs ? "Siguiente título" : "Next title"}
            </p>
            <p className="mt-3 font-display text-3xl font-bold uppercase leading-tight text-white transition-colors md:text-5xl">
              {nextStudy.game.title}
            </p>
            <span
              className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] transition-transform duration-300 group-hover:translate-x-1"
              style={{ color: nextStudy.accent }}
            >
              {isEs ? "Ver ficha" : "View case study"}
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </Link>
      )}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <span className="h-px w-12" style={{ background: "var(--accent)" }} />
      <h2 className="font-display text-sm font-bold uppercase tracking-[0.22em]" style={{ color: "var(--accent)" }}>
        {children}
      </h2>
    </div>
  );
}
