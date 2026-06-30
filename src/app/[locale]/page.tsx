import { getDictionary } from "@/i18n/getDictionary";
import Link from "next/link";
import { featuredGames } from "@/data/games";
import { servicesData } from "@/data/services";
import HeroSection from "@/components/sections/HeroSection";
import GamesSection from "@/components/sections/GamesSection";
import ServicesSection from "@/components/sections/ServicesSection";
import AboutSection from "@/components/sections/AboutSection";
import CTASection from "@/components/sections/CTASection";
import StatsBar from "@/components/ui/StatsBar";
import { ArrowRight, BadgeCheck } from "lucide-react";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const isEs = locale === "es";
  const publisherLinks = [
    {
      href: `/${locale}/publishers`,
      title: isEs ? "Para publishers e IP holders" : "For publishers and IP holders",
      body: isEs ? "Produccion fiable para briefs sensibles, IP licenciada y equipos que necesitan lanzar." : "Reliable production for sensitive briefs, licensed IP and teams that need to ship.",
    },
    {
      href: `/${locale}/console-porting-services`,
      title: isEs ? "Console porting" : "Console porting",
      body: isEs ? "Soporte para PC, PlayStation, Xbox y Nintendo Switch con foco en riesgo tecnico." : "Support for PC, PlayStation, Xbox and Nintendo Switch with technical risk in focus.",
    },
    {
      href: `/${locale}/licensed-ip-game-development`,
      title: isEs ? "Licensed IP development" : "Licensed IP development",
      body: isEs ? "Experiencia en juegos familiares, audiencias kids y portfolio con IP de entretenimiento." : "Experience across family games, kids audiences and entertainment IP portfolio work.",
    },
  ];

  return (
    <>
      {/* HERO */}
      <HeroSection dict={dict} locale={locale} />

      <div className="max-w-[1400px] w-full mx-auto px-6 space-y-24 pb-0">
        {/* STATS */}
        <StatsBar stats={dict.home.stats} />

        {/* GAMES */}
        <GamesSection dict={dict} locale={locale} games={featuredGames} />

        {/* SERVICES */}
        <ServicesSection dict={dict} services={servicesData} locale={locale} />

        <section className="space-y-8">
          <div className="max-w-3xl space-y-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand">
              {isEs ? "BUILT FOR PUBLISHERS" : "BUILT FOR PUBLISHERS"}
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold uppercase">
              {isEs ? "Produccion preparada para equipos que necesitan lanzar" : "Production-ready support for teams that need to ship"}
            </h2>
            <p className="text-sm leading-relaxed text-white/45">
              {isEs
                ? "Full-cycle development, co-development, porting, live ops y technical art para publishers, titulares de IP y estudios financiados."
                : "Full-cycle development, co-development, porting, live ops and technical art for publishers, IP holders and funded studios."}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {publisherLinks.map((item) => (
              <Link key={item.href} href={item.href} className="group rounded-lg border border-white/8 bg-white/[0.025] p-6 transition-colors hover:border-brand/35">
                <BadgeCheck className="h-6 w-6 text-brand" />
                <h3 className="mt-5 font-display text-base font-bold uppercase tracking-[0.12em] text-white/85">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/45">{item.body}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-white/35 transition-colors group-hover:text-brand">
                  {isEs ? "Ver pagina" : "View page"}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* ABOUT — outside max-w container for full-bleed 3D */}
      <div className="mt-24">
        <AboutSection dict={dict} locale={locale} />
      </div>

      {/* FINAL CTA */}
      <CTASection dict={dict} locale={locale} />
    </>
  );
}
