import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { buildCustomMetadata } from "@/lib/seo";

const topics = [
  "How to choose a game co-development partner",
  "What publishers should expect from a console porting studio",
  "Developing licensed IP games for family audiences",
  "Unity console development: production risks and solutions",
  "Technical art pipelines for stylized games",
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildCustomMetadata(
    locale,
    "Game Development Resources for Publishers",
    "A planned resource hub from Casual Brothers for publishers and studios evaluating co-development, console porting, licensed IP production and technical art.",
    "resources",
  );
}

export default async function ResourcesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isEs = locale === "es";

  return (
    <>
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: "Home", path: "" },
          { name: "Resources", path: "/resources" },
        ]}
      />
      <section className="mx-auto max-w-[1100px] px-6 pt-32 pb-24">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand">
          {isEs ? "RESOURCES" : "RESOURCES"}
        </p>
        <h1 className="mt-4 font-display text-5xl font-bold uppercase leading-[0.96] md:text-6xl">
          {isEs ? "Game development resources para publishers" : "Game development resources for publishers"}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/52">
          {isEs
            ? "Base editorial para futuras guias de produccion. No publicamos articulos incompletos: estos temas quedan preparados para contenido aprobado."
            : "Editorial foundation for future production guides. We do not publish thin articles: these topics are prepared for approved long-form content."}
        </p>

        <div className="mt-12 grid grid-cols-1 gap-4">
          {topics.map((topic) => (
            <div key={topic} className="rounded-lg border border-white/8 bg-white/[0.025] p-5">
              <p className="font-display text-sm font-bold uppercase tracking-[0.12em] text-white/80">{topic}</p>
              <p className="mt-2 text-sm text-white/40">
                {isEs ? "Pendiente de contenido completo aprobado." : "Pending approved full-length content."}
              </p>
            </div>
          ))}
        </div>

        <Link href={`/${locale}/contact`} className="btn-primary mt-10 inline-flex">
          {isEs ? "Hablar de produccion" : "Discuss production support"}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </>
  );
}
