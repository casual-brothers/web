import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { caseStudies } from "@/data/caseStudies";
import { assetPath } from "@/lib/basePath";

export default function FeaturedCaseStudies({
  locale,
  slugs,
}: {
  locale: string;
  slugs: string[];
}) {
  const isEs = locale === "es";
  // Keep the selected titles in the same canonical sequence as /games.
  // Landing pages only choose which titles appear; the portfolio owns their order.
  const selectedSlugs = new Set(slugs);
  const studies = caseStudies.filter((study) => selectedSlugs.has(study.slug));

  if (studies.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1400px] px-6 py-16">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl space-y-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand">
            {isEs ? "PRUEBA DE PRODUCCION" : "PRODUCTION PROOF"}
          </p>
          <h2 className="font-display text-3xl font-bold uppercase md:text-4xl">
            {isEs ? "Titulos lanzados relevantes" : "Relevant shipped titles"}
          </h2>
        </div>
        <Link
          href={`/${locale}/case-studies`}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-white/45 transition-colors hover:text-brand"
        >
          {isEs ? "Ver todos los case studies" : "View all case studies"}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {studies.map((study) => (
          <Link
            key={study.slug}
            href={`/${locale}/case-studies/${study.slug}`}
            className="group overflow-hidden rounded-lg border border-white/8 bg-white/[0.025] transition-colors hover:border-brand/35"
          >
            <div className="relative aspect-video overflow-hidden">
              <img
                src={assetPath(study.game.screenshot)}
                alt={study.game.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            </div>
            <div className="space-y-2 p-5">
              <h3 className="font-display text-sm font-bold uppercase tracking-[0.1em] text-white/85">
                {study.game.title}
              </h3>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/35">
                {study.game.genre}
              </p>
              <span className="inline-flex items-center gap-2 pt-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white/30 transition-colors group-hover:text-brand">
                {isEs ? "Ver case study" : "View case study"}
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
