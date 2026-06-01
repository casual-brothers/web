import type { Metadata } from "next";
import { getDictionary } from "@/i18n/getDictionary";
import { getSeoAlternates } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "es" ? "Política de Cookies" : "Cookie Policy",
    alternates: getSeoAlternates(locale, "cookie-policy"),
  };
}

export default async function CookiePolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const isEs = locale === "es";

  return (
    <>
      {/* Hero Header */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #0e0e0e, rgba(14,14,14,0.9), #0e0e0e)' }} />
        <div className="max-w-[1400px] mx-auto px-6 relative z-10 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-brand" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
              {isEs ? "INFORMACIÓN LEGAL" : "LEGAL INFORMATION"}
            </span>
            <div className="flex-1 h-px bg-white/5" />
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold uppercase leading-[0.95] tracking-tight">
            {isEs ? "POLÍTICA DE " : "COOKIE "}
            <span className="text-gradient-brand" style={{ backgroundImage: 'linear-gradient(135deg, #7cff00 0%, #ffffff 50%, #9eff24 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' }}>COOKIES</span>
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-[900px] mx-auto px-6 pb-24">
        <div className="space-y-8 text-white/60 text-sm leading-relaxed">

          <div className="space-y-3">
            <p>
              {isEs
                ? "En cumplimiento con lo dispuesto en el artículo 22.2 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), el Reglamento (UE) 2016/679 (GDPR) y la UK Privacy and Electronic Communications Regulations (PECR), esta Política de Cookies describe cómo Casual Brothers Ltd. utiliza cookies y tecnologías similares."
                : "In compliance with the EU General Data Protection Regulation (GDPR) and the UK Privacy and Electronic Communications Regulations (PECR), this Cookie Policy describes how Casual Brothers Ltd. uses cookies and similar technologies."}
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-lg font-bold uppercase tracking-tight text-white">
              {isEs ? "1. ¿Qué son las cookies?" : "1. What are cookies?"}
            </h2>
            <p>
              {isEs
                ? "Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Se utilizan ampliamente para hacer que los sitios web funcionen de manera más eficiente, así como para proporcionar información a los propietarios del sitio."
                : "Cookies are small text files that are stored on your device when you visit a website. They are widely used to make websites work more efficiently, as well as to provide information to the website owners."}
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-lg font-bold uppercase tracking-tight text-white">
              {isEs ? "2. Tipos de cookies que utilizamos" : "2. Types of cookies we use"}
            </h2>

            <div className="rounded-lg border border-white/5 bg-white/[0.02] overflow-x-auto">
              <table className="w-full text-sm min-w-[500px] md:min-w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left p-4 text-white/80 font-bold text-xs uppercase tracking-wider">{isEs ? "Tipo" : "Type"}</th>
                    <th className="text-left p-4 text-white/80 font-bold text-xs uppercase tracking-wider">{isEs ? "Finalidad" : "Purpose"}</th>
                    <th className="text-left p-4 text-white/80 font-bold text-xs uppercase tracking-wider">{isEs ? "Duración" : "Duration"}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="p-4 text-white/60">{isEs ? "Técnicas" : "Essential"}</td>
                    <td className="p-4 text-white/40">{isEs ? "Necesarias para el funcionamiento del sitio web" : "Necessary for the website to function properly"}</td>
                    <td className="p-4 text-white/40">{isEs ? "Sesión" : "Session"}</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-4 text-white/60">{isEs ? "Preferencias" : "Preferences"}</td>
                    <td className="p-4 text-white/40">{isEs ? "Recordar tus preferencias de idioma y consentimiento" : "Remember your language and consent preferences"}</td>
                    <td className="p-4 text-white/40">{isEs ? "1 año" : "1 year"}</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-white/60">{isEs ? "Analíticas" : "Analytics"}</td>
                    <td className="p-4 text-white/40">{isEs ? "Analizar el tráfico y el comportamiento de los usuarios" : "Analyze traffic and user behavior"}</td>
                    <td className="p-4 text-white/40">{isEs ? "2 años" : "2 years"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-lg font-bold uppercase tracking-tight text-white">
              {isEs ? "3. Gestión de cookies" : "3. Managing cookies"}
            </h2>
            <p>
              {isEs
                ? "Puedes configurar tu navegador para rechazar cookies o para que te avise cuando se envíen. Sin embargo, algunas funciones del sitio web podrían no funcionar correctamente sin cookies. También puedes modificar tu consentimiento en cualquier momento a través del banner de cookies del sitio."
                : "You can configure your browser to reject cookies or to alert you when cookies are being sent. However, some features of the website may not function properly without cookies. You can also modify your consent at any time through the cookie banner on the site."}
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-lg font-bold uppercase tracking-tight text-white">
              {isEs ? "4. Cookies de terceros" : "4. Third-party cookies"}
            </h2>
            <p>
              {isEs
                ? "Nuestro sitio web puede incluir funcionalidades proporcionadas por terceros (como herramientas de análisis o redes sociales) que pueden establecer sus propias cookies. No tenemos control sobre estas cookies de terceros."
                : "Our website may include functionality provided by third parties (such as analytics tools or social networks) which may set their own cookies. We have no control over these third-party cookies."}
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-lg font-bold uppercase tracking-tight text-white">
              {isEs ? "5. Contacto" : "5. Contact"}
            </h2>
            <p>
              {isEs
                ? "Si tienes preguntas sobre nuestra Política de Cookies, contáctanos en "
                : "If you have questions about our Cookie Policy, contact us at "}
              <a href="mailto:contact@casualbrothers.com" className="text-brand hover:underline">contact@casualbrothers.com</a>.
            </p>
          </div>

          <p className="text-white/30 text-xs pt-4">
            {isEs ? "Última actualización: Mayo 2026" : "Last updated: May 2026"}
          </p>
        </div>
      </section>
    </>
  );
}
