import type { Metadata } from "next";
import CookiePreferencesButton from "@/components/ui/CookiePreferencesButton";
import { buildCustomMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";
  return buildCustomMetadata(locale, isEs ? "Política de cookies" : "Cookie Policy", isEs ? "Información sobre el almacenamiento necesario y el contenido externo de YouTube utilizado por Casual Brothers." : "Information about necessary storage and external YouTube media used by Casual Brothers.", "cookie-policy");
}

export default async function CookiePolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isEs = locale === "es";
  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-32">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        <div className="relative z-10 mx-auto max-w-[1400px] space-y-4 px-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand">{isEs ? "Información legal" : "Legal information"}</p>
          <h1 className="font-display text-5xl font-bold uppercase tracking-tight md:text-6xl">{isEs ? "Política de cookies" : "Cookie Policy"}</h1>
          <p className="max-w-2xl text-lg leading-relaxed text-white/50">{isEs ? "Control claro sobre el almacenamiento y los contenidos externos." : "Clear control over storage and external media."}</p>
        </div>
      </section>
      <section className="mx-auto max-w-[900px] px-6 pb-24">
        <div className="space-y-8 text-sm leading-relaxed text-white/60">
          <div className="space-y-3"><h2 className="font-display text-lg font-bold uppercase text-white">{isEs ? "1. Qué utilizamos" : "1. What we use"}</h2><p>{isEs ? "La web no utiliza actualmente cookies de analítica ni publicidad. Guardamos una preferencia en el almacenamiento local del navegador para recordar si has aceptado o rechazado el contenido externo. Este almacenamiento es necesario para respetar tu elección." : "The site does not currently use analytics or advertising cookies. We store one preference in your browser’s local storage to remember whether you accepted or rejected external media. This storage is necessary to respect your choice."}</p></div>
          <div className="overflow-x-auto rounded-lg border border-white/10"><table className="w-full text-left"><thead className="bg-white/5 text-white"><tr><th className="p-4">{isEs ? "Elemento" : "Item"}</th><th className="p-4">{isEs ? "Finalidad" : "Purpose"}</th><th className="p-4">{isEs ? "Duración" : "Duration"}</th></tr></thead><tbody><tr className="border-t border-white/10"><td className="p-4 font-mono text-brand">cb-cookie-consent</td><td className="p-4">{isEs ? "Recordar si aceptas o rechazas YouTube" : "Remember whether you accept or reject YouTube"}</td><td className="p-4">{isEs ? "Hasta que borres los datos del sitio o cambies la preferencia" : "Until you clear site data or change the preference"}</td></tr></tbody></table></div>
          <div className="space-y-3"><h2 className="font-display text-lg font-bold uppercase text-white">{isEs ? "2. YouTube" : "2. YouTube"}</h2><p>{isEs ? "Los vídeos, sus miniaturas y el reproductor no se solicitan a YouTube hasta que aceptas contenido externo. Después de aceptar, Google/YouTube puede recibir tu dirección IP, datos del navegador y la página visitada, y utilizar sus propias tecnologías conforme a sus políticas. Utilizamos el modo de privacidad mejorada de YouTube para el reproductor." : "Videos, thumbnails and the player are not requested from YouTube until you accept external media. After acceptance, Google/YouTube may receive your IP address, browser data and visited page, and use its own technologies under its policies. We use YouTube’s privacy-enhanced player mode."}</p></div>
          <div className="space-y-3"><h2 className="font-display text-lg font-bold uppercase text-white">{isEs ? "3. Cambiar tu elección" : "3. Change your choice"}</h2><p>{isEs ? "Puedes aceptar, rechazar o retirar tu consentimiento en cualquier momento. Al rechazar, los vídeos permanecen bloqueados." : "You can accept, reject or withdraw consent at any time. When rejected, videos remain blocked."}</p><CookiePreferencesButton locale={locale} /></div>
          <div className="space-y-3"><h2 className="font-display text-lg font-bold uppercase text-white">{isEs ? "4. Contacto" : "4. Contact"}</h2><p><a className="text-brand hover:underline" href="mailto:contact@casualbrothers.com">contact@casualbrothers.com</a></p></div>
          <p className="border-t border-white/5 pt-6 text-xs text-white/30">{isEs ? "Última actualización: 8 de agosto de 2026" : "Last updated: 8 August 2026"}</p>
        </div>
      </section>
    </>
  );
}
