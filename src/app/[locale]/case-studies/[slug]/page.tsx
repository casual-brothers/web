import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BadgeCheck } from "lucide-react";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import LiteYouTubeEmbed from "@/components/ui/LiteYouTubeEmbed";
import { assetPath } from "@/lib/basePath";
import { buildCustomMetadata, getLocalizedUrl, siteUrl } from "@/lib/seo";
import { caseStudies, getCaseStudy } from "@/data/caseStudies";

export async function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return buildCustomMetadata(
    locale,
    `${study.game.title} Case Study`,
    `${study.game.title} is a shipped Casual Brothers portfolio title presented with confirmed production context for publishers and studios.`,
    `case-studies/${study.slug}`,
  );
}

export default async function CaseStudyPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  const isEs = locale === "es";
  const pageUrl = getLocalizedUrl(locale, `case-studies/${study.slug}`);
  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: study.game.title,
    image: `${siteUrl}${study.game.screenshot}`,
    url: pageUrl,
    description: study.shortDescription,
    genre: study.game.genre,
    gamePlatform: study.platforms.length ? study.platforms : undefined,
  };

  return (
    <>
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: "Home", path: "" },
          { name: "Case Studies", path: "/case-studies" },
          { name: study.game.title, path: `/case-studies/${study.slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />

      <section className="relative min-h-[78vh] pt-32 pb-20 overflow-hidden flex items-end">
        <div className="absolute inset-0">
          <img
            src={assetPath(study.game.screenshot)}
            alt={`${study.game.title} cover image - Casual Brothers game development case study`}
            className="absolute inset-0 h-full w-full object-cover opacity-55 mix-blend-screen"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #0e0e0e 8%, rgba(14,14,14,0.82) 48%, rgba(14,14,14,0.28) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(14,14,14,0.5), transparent 42%, #0e0e0e 100%)" }} />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-10 px-6 lg:grid-cols-[1fr_0.45fr] lg:items-end">
          <div className="space-y-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand">{study.scopeLabel}</p>
            <h1 className="font-display text-5xl font-bold uppercase leading-[0.96] md:text-6xl lg:text-7xl">
              {study.game.title}
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-white/58">{study.shortDescription}</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/35 p-6 backdrop-blur-md">
            <img src={assetPath(study.game.logo)} alt={`${study.game.title} logo`} className="max-h-28 w-auto object-contain" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] grid-cols-1 gap-8 px-6 py-20 lg:grid-cols-[0.75fr_1.25fr]">
        <aside className="space-y-5">
          <InfoBlock title={isEs ? "Scope" : "Scope"} items={[study.scopeLabel]} />
          <InfoBlock title={isEs ? "Genero" : "Genre"} items={[study.game.genre]} />
          <InfoBlock title={isEs ? "Audiencia" : "Audience"} items={[study.audience]} />
          <InfoBlock title={isEs ? "Servicios" : "Services"} items={study.services} />
          <InfoBlock title={isEs ? "Plataformas" : "Platforms"} items={study.platforms.length ? study.platforms : [isEs ? "Pendiente de confirmar" : "To be confirmed"]} />
        </aside>

        <div className="space-y-10">
          <TextSection title={isEs ? "Challenge" : "Challenge"} body={study.challenge} />
          <TextSection title={isEs ? "Contribution" : "Contribution"} body={study.contribution} />
          <TextSection title={isEs ? "Production value" : "Production value"} body={study.productionValue} />

          {study.youtubeUrl && (
            <section className="space-y-4">
              <h2 className="font-display text-3xl font-bold uppercase">{isEs ? "Trailer / Gameplay" : "Trailer / Gameplay"}</h2>
              <p className="text-sm leading-relaxed text-white/50">
                {isEs
                  ? "Mira footage de este titulo lanzado y revisa el tipo de produccion en la que Casual Brothers puede contribuir."
                  : "Watch footage from this shipped title and explore the type of production work Casual Brothers can contribute to."}
              </p>
              <LiteYouTubeEmbed url={study.youtubeUrl} title={`${study.game.title} trailer`} />
            </section>
          )}

          <div className="rounded-lg border border-brand/20 bg-brand/[0.06] p-6">
            <h2 className="font-display text-2xl font-bold uppercase">
              {isEs ? "Necesitas un partner fiable para tu proximo titulo?" : "Need a reliable development partner for your next title?"}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/55">
              {isEs
                ? "Envia un brief confidencial con plataformas, alcance y estado de produccion. Podemos responder con el siguiente paso mas claro."
                : "Send a confidential brief with platforms, scope and production stage. We can respond with the clearest next step."}
            </p>
            <Link href={`/${locale}/contact`} className="btn-primary mt-6 inline-flex">
              {isEs ? "Enviar brief" : "Send project brief"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-lg border border-white/8 bg-white/[0.025] p-5">
      <h2 className="font-display text-xs font-bold uppercase tracking-[0.16em] text-white/35">{title}</h2>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm text-white/58">
            <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function TextSection({ title, body }: { title: string; body: string }) {
  return (
    <section>
      <h2 className="font-display text-3xl font-bold uppercase">{title}</h2>
      <p className="mt-4 leading-relaxed text-white/55">{body}</p>
    </section>
  );
}
