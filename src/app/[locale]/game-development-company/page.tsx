import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Gamepad2, MonitorSmartphone, Palette, Rocket, ShieldCheck, Users } from "lucide-react";
import CTASection from "@/components/sections/CTASection";
import PlatformLogos from "@/components/ui/PlatformLogos";
import { assetPath } from "@/lib/basePath";
import { getDictionary } from "@/i18n/getDictionary";
import { getPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(locale, "gameDevelopmentCompany", "game-development-company");
}

const capabilities = [
  { icon: Gamepad2, en: "Full-cycle game development", es: "Desarrollo completo de videojuegos" },
  { icon: Users, en: "Co-development for production teams", es: "Co-desarrollo para equipos de produccion" },
  { icon: MonitorSmartphone, en: "Console, PC, and mobile porting", es: "Porting para consola, PC y movil" },
  { icon: Rocket, en: "Live ops, updates, and launch support", es: "Live ops, updates y soporte de lanzamiento" },
  { icon: Palette, en: "Art, VFX, animation, and tech art", es: "Arte, VFX, animacion y tech art" },
  { icon: ShieldCheck, en: "Certification-aware delivery", es: "Entrega orientada a certificacion" },
];

const proofStats = [
  { value: "50+", en: "remote specialists", es: "especialistas remotos" },
  { value: "15+", en: "titles shipped", es: "titulos lanzados" },
  { value: "100M+", en: "downloads worldwide", es: "descargas mundiales" },
  { value: "10+", en: "years shipping", es: "anos lanzando" },
];

export default async function GameDevelopmentCompanyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const isEs = locale === "es";

  const copy = {
    eyebrow: isEs ? "CASUAL GAME DEVELOPMENT COMPANY" : "CASUAL GAME DEVELOPMENT COMPANY",
    titleA: isEs ? "Casual game developers" : "Casual game developers",
    titleB: isEs ? "para publishers que necesitan lanzar." : "for publishers who need to ship.",
    intro: isEs
      ? "Casual Brothers es una casual game development company que ayuda a publishers, titulares de IP y estudios a convertir briefs complejos en juegos lanzados. Cubrimos desarrollo completo, co-desarrollo, porting, live ops y arte/tech con un equipo remoto de 50+ especialistas."
      : "Casual Brothers is a casual game development company helping publishers, IP owners, and studios turn complex briefs into shipped games. We cover full-cycle development, co-development, porting, live ops, and art/tech production with a remote team of 50+ specialists.",
    primaryCta: isEs ? "Enviar brief confidencial" : "Send a confidential brief",
    secondaryCta: isEs ? "Ver juegos lanzados" : "See shipped games",
    trust: isEs
      ? "Pensado para equipos que necesitan capacidad senior, menos riesgo de produccion y comunicacion clara desde el primer sprint."
      : "Built for teams that need senior capacity, lower production risk, and clear communication from the first sprint.",
    fitTitle: isEs ? "Cuando tiene sentido hablar con nosotros" : "When it makes sense to talk to us",
    fitItems: isEs
      ? [
          "Necesitas una casual game company que pueda integrarse con tu pipeline sin frenar al equipo.",
          "Tienes una IP sensible y necesitas ejecucion fiable, documentada y lista para certificacion.",
          "Buscas casual game developers con experiencia real en juegos familiares, multiplataforma e hibrido-casual.",
          "Comparas casual game studios y necesitas un partner con escala, procesos y resultados lanzados.",
        ]
      : [
          "You need a casual game company that can integrate with your pipeline without slowing the team down.",
          "You have a sensitive IP and need reliable, documented, certification-aware execution.",
          "You are looking for casual game developers with real experience in family, multi-platform, and hybrid-casual games.",
          "You are comparing casual game studios and need a partner with scale, process, and shipped results.",
        ],
    processTitle: isEs ? "Como reducimos riesgo" : "How we reduce risk",
    process: isEs
      ? [
          ["Brief claro", "Alineamos alcance, plataformas, riesgos y calendario antes de prometer capacidad."],
          ["Equipo ajustado", "Asignamos perfiles segun necesidad real: engineering, art, tech art, QA, production o live ops."],
          ["Entrega visible", "Trabajamos con milestones, comunicacion directa y feedback rapido para evitar sorpresas tarde."],
        ]
      : [
          ["Clear brief", "We align scope, platforms, risks, and timeline before promising capacity."],
          ["Right-sized team", "We assign the needed mix: engineering, art, tech art, QA, production, or live ops."],
          ["Visible delivery", "We work through milestones, direct communication, and fast feedback to avoid late surprises."],
        ],
  };
  const searchIntent = isEs
    ? [
        ["Casual game company", "Para publishers que necesitan un equipo externo capaz de asumir desarrollo, porting o live ops sin convertir el proyecto en una apuesta."],
        ["Casual game development company", "Produccion completa y co-desarrollo para juegos casual, familiares, hibrido-casual y multiplataforma."],
        ["Casual game developers", "Perfiles senior de engineering, art, tech art, QA y production trabajando como extension del equipo del cliente."],
        ["Casual game studios", "Un estudio remoto de 50+ especialistas con 15+ titulos lanzados y experiencia con IPs de entretenimiento."],
      ]
    : [
        ["Casual game company", "For publishers that need an external team able to take on development, porting, or live ops without turning the project into a gamble."],
        ["Casual game development company", "Full production and co-development for casual, family, hybrid-casual, and multi-platform games."],
        ["Casual game developers", "Senior engineering, art, tech art, QA, and production profiles working as an extension of the client's team."],
        ["Casual game studios", "A remote studio of 50+ specialists with 15+ shipped titles and entertainment IP experience."],
      ];
  const faqs = isEs
    ? [
        {
          question: "Is Casual Brothers a casual game development company?",
          answer: "Yes. Casual Brothers desarrolla juegos casual, familiares, hibrido-casual y multiplataforma para publishers, titulares de IP y estudios que necesitan capacidad senior.",
        },
        {
          question: "Can you work as external casual game developers?",
          answer: "Yes. Podemos integrarnos como equipo de co-desarrollo, porting, live ops, arte, tech art, QA o produccion segun el alcance del proyecto.",
        },
        {
          question: "What makes Casual Brothers different from other casual game studios?",
          answer: "Combinamos 50+ especialistas remotos, 15+ titulos lanzados, 100M+ descargas y experiencia en IPs de entretenimiento con comunicacion directa y milestones claros.",
        },
      ]
    : [
        {
          question: "Is Casual Brothers a casual game development company?",
          answer: "Yes. Casual Brothers develops casual, family, hybrid-casual, and multi-platform games for publishers, IP owners, and studios that need senior production capacity.",
        },
        {
          question: "Can you work as external casual game developers?",
          answer: "Yes. We can integrate as a co-development, porting, live ops, art, tech art, QA, or production team depending on the project's scope.",
        },
        {
          question: "What makes Casual Brothers different from other casual game studios?",
          answer: "We combine 50+ remote specialists, 15+ shipped titles, 100M+ downloads, and entertainment IP experience with direct communication and clear milestones.",
        },
      ];
  const pageUrl = `https://casualbrothers.com/${locale}/game-development-company`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: isEs ? "Game development company para publishers" : "Game development company for publishers",
        serviceType: "Game development",
        provider: {
          "@id": "https://casualbrothers.com/#organization",
        },
        areaServed: "Worldwide",
        audience: {
          "@type": "Audience",
          audienceType: isEs ? "Publishers, titulares de IP y estudios de videojuegos" : "Publishers, IP owners, and game studios",
        },
        description: copy.intro,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: isEs ? "Servicios de desarrollo de videojuegos" : "Game development services",
          itemListElement: capabilities.map(({ en, es }) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: isEs ? es : en,
            },
          })),
        },
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: isEs ? "Game Development Company para Publishers" : "Game Development Company for Publishers",
        inLanguage: locale,
        isPartOf: {
          "@id": "https://casualbrothers.com/#website",
        },
        about: {
          "@id": `${pageUrl}#service`,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="relative min-h-[88vh] pt-32 pb-20 overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <img
            src={assetPath("/images/bg_cta_brand.webp")}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-70 mix-blend-screen"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #0e0e0e 8%, rgba(14,14,14,0.82) 44%, rgba(14,14,14,0.32) 72%, #0e0e0e 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(14,14,14,0.72), transparent 45%, #0e0e0e 100%)" }} />
        </div>

        <div className="max-w-[1400px] w-full mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-14 items-center">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-brand animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/45">
                {copy.eyebrow}
              </span>
              <div className="w-16 h-px bg-brand/40" />
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase leading-[0.95] max-w-5xl">
              {copy.titleA}
              <br />
              <span className="text-gradient-brand">
                {copy.titleB}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/58 max-w-2xl leading-relaxed">
              {copy.intro}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href={`/${locale}/contact`} className="btn-primary inline-flex">
                {copy.primaryCta}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href={`/${locale}/games`} className="btn-outline inline-flex">
                {copy.secondaryCta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {proofStats.map((stat) => (
              <div key={stat.value} className="rounded-lg border border-white/10 bg-black/30 p-5 backdrop-blur-md">
                <p className="font-display text-4xl md:text-5xl font-black text-brand">{stat.value}</p>
                <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/45">
                  {isEs ? stat.es : stat.en}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 py-20 space-y-10">
        <div className="max-w-3xl space-y-3">
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase">
            {isEs ? "Casual game development company para lanzar con menos friccion" : "A casual game development company built to ship with less friction"}
          </h2>
          <p className="text-white/45 leading-relaxed">{copy.trust}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {capabilities.map(({ icon: Icon, en, es }) => (
            <div key={en} className="rounded-lg border border-white/8 bg-white/[0.025] p-6">
              <Icon className="w-7 h-7 text-brand" />
              <p className="mt-5 font-display text-sm font-bold uppercase tracking-[0.14em] text-white/85">
                {isEs ? es : en}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16">
          <div className="space-y-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand">
              {isEs ? "BUSQUEDAS QUE RESOLVEMOS" : "SEARCH INTENT WE MATCH"}
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold uppercase">
              {isEs ? "Para quien busca casual game developers de verdad" : "For teams searching for real casual game developers"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {searchIntent.map(([title, text]) => (
              <article key={title} className="rounded-lg border border-white/8 bg-white/[0.025] p-5">
                <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-white/90">
                  {title}
                </h3>
                <p className="mt-3 text-sm text-white/45 leading-relaxed">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, rgba(124,255,0,0.03), transparent)" }} />
        <div className="max-w-[1400px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="space-y-6">
            <h2 className="font-display text-3xl md:text-4xl font-bold uppercase">
              {copy.fitTitle}
            </h2>
            <div className="space-y-4">
              {copy.fitItems.map((item) => (
                <div key={item} className="flex gap-4">
                  <BadgeCheck className="w-5 h-5 text-brand shrink-0 mt-1" />
                  <p className="text-white/55 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="font-display text-3xl md:text-4xl font-bold uppercase">
              {copy.processTitle}
            </h2>
            <div className="space-y-4">
              {copy.process.map(([title, text], idx) => (
                <div key={title} className="rounded-lg border border-white/8 bg-white/[0.025] p-6">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-xs font-black text-brand">0{idx + 1}</span>
                    <h3 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-white/90">
                      {title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm text-white/45 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 py-10">
        <PlatformLogos />
      </div>

      <section className="max-w-[1000px] mx-auto px-6 py-16">
        <div className="space-y-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase">
            {isEs ? "Preguntas frecuentes para publishers" : "Publisher FAQ"}
          </h2>
          {faqs.map((faq) => (
            <details key={faq.question} className="group rounded-lg border border-white/8 bg-white/[0.025] p-5">
              <summary className="cursor-pointer font-display text-sm font-bold uppercase tracking-[0.12em] text-white/85">
                {faq.question}
              </summary>
              <p className="mt-4 text-sm text-white/50 leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <CTASection dict={dict} locale={locale} />
    </>
  );
}
