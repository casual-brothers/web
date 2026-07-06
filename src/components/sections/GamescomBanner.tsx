import Link from "next/link";
import { ArrowRight, CalendarCheck, MapPin } from "lucide-react";

const MEETING_MAILTO =
  "mailto:contact@casualbrothers.com?subject=gamescom%202026%20meeting%20request&body=Hi%20Casual%20Brothers%2C%0A%0AWe%20would%20like%20to%20book%20a%20meeting%20at%20gamescom%202026%20in%20Cologne.%0A%0ACompany%3A%0AProject%20or%20brief%3A%0APreferred%20day%20(Aug%2026-30)%3A%0A";

export default function GamescomBanner({ locale }: { locale: string }) {
  const isEs = locale === "es";

  return (
    <section className="mx-auto max-w-[1400px] px-6 py-10">
      <div className="relative overflow-hidden rounded-lg border border-brand/30 bg-brand/[0.06]">
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand/10 blur-3xl" />
        <div className="relative z-10 grid grid-cols-1 items-center gap-8 p-8 md:p-10 lg:grid-cols-[1.2fr_auto]">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded bg-brand px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-black">
                gamescom 2026
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white/50">
                <MapPin className="h-3.5 w-3.5 text-brand" />
                {isEs ? "Koelnmesse, Colonia · 26–30 de agosto" : "Koelnmesse, Cologne · Aug 26–30"}
              </span>
            </div>
            <h2 className="font-display text-3xl font-bold uppercase leading-tight md:text-4xl">
              {isEs ? "Nos vemos en Colonia" : "Meet us in Cologne"}
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-white/55 md:text-base">
              {isEs
                ? "Nuestro equipo estara en gamescom 2026. Si eres publisher, titular de IP o estudio y quieres hablar de desarrollo completo, co-desarrollo o porting, reserva una reunion antes de que se llene la agenda."
                : "Our team will be at gamescom 2026. If you are a publisher, IP holder or studio looking at full development, co-development or porting, book a meeting before the schedule fills up."}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <a href={MEETING_MAILTO} className="btn-primary justify-center">
              <CalendarCheck className="h-4 w-4" />
              {isEs ? "Reservar reunion" : "Book a meeting"}
            </a>
            <Link href={`/${locale}/contact`} className="btn-outline justify-center">
              {isEs ? "Enviar tu brief" : "Send your brief"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
