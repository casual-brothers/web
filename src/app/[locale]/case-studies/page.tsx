import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { assetPath } from "@/lib/basePath";
import { buildCustomMetadata } from "@/lib/seo";
import { caseStudies } from "@/data/caseStudies";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildCustomMetadata(
    locale,
    "Game Development Case Studies",
    "Explore shipped games and production case studies from Casual Brothers across licensed IP, family games, console development, co-development and porting.",
    "case-studies",
  );
}

export default async function CaseStudiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isEs = locale === "es";

  return (
    <>
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: "Home", path: "" },
          { name: "Case Studies", path: "/case-studies" },
        ]}
      />

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={assetPath("/images/bg_games_platformer.webp")} alt="" className="absolute inset-0 h-full w-full object-cover opacity-55 mix-blend-screen" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #0e0e0e, rgba(14,14,14,0.72), #0e0e0e)" }} />
        </div>
        <div className="relative z-10 mx-auto max-w-[1400px] px-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand">
            {isEs ? "PORTFOLIO INDEXABLE" : "INDEXABLE PORTFOLIO"}
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl font-bold uppercase leading-[0.96] md:text-6xl lg:text-7xl">
            {isEs ? "Game development case studies" : "Game development case studies"}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/52">
            {isEs
              ? "Titulos lanzados y pruebas de portfolio para publishers, titulares de IP y estudios que evaluan desarrollo, co-desarrollo, porting y soporte de produccion."
              : "Shipped titles and portfolio proof for publishers, IP holders and studios evaluating development, co-development, porting and production support."}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-24">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <article key={study.slug} className="overflow-hidden rounded-lg border border-white/8 bg-white/[0.025]">
              <img
                src={assetPath(study.game.screenshot)}
                alt={`${study.game.title} gameplay screenshot - Casual Brothers shipped game portfolio`}
                className="aspect-video w-full object-cover"
                loading="lazy"
              />
              <div className="space-y-4 p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">{study.scopeLabel}</p>
                <h2 className="font-display text-xl font-bold uppercase">{study.game.title}</h2>
                <p className="text-sm leading-relaxed text-white/48">{study.shortDescription}</p>
                <Link href={`/${locale}/case-studies/${study.slug}`} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-white/55 transition-colors hover:text-brand">
                  {isEs ? "Ver case study" : "View case study"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
