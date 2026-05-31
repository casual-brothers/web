import { getDictionary } from "@/i18n/getDictionary";

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
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
            {dict.privacy.title}{" "}
            <span className="text-gradient-brand" style={{ backgroundImage: 'linear-gradient(135deg, #7cff00 0%, #ffffff 48%, #34b300 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' }}>{dict.privacy.titleBrand}</span>
          </h1>
          <p className="text-lg text-white/50 max-w-xl leading-relaxed">
            {dict.privacy.intro}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-[900px] mx-auto px-6 pb-24">
        <div className="space-y-8 text-white/60 text-sm leading-relaxed">

          <p>{dict.privacy.fullIntro}</p>

          <div className="space-y-3">
            <h2 className="font-display text-lg font-bold uppercase tracking-tight text-white">
              {isEs ? "1. Información que recopilamos" : "1. Information We Collect"}
            </h2>
            <p>{isEs ? "Podemos recopilar los siguientes tipos de datos personales:" : "We may collect the following types of personal data:"}</p>
            <ul className="list-none space-y-2 ml-0">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: 'rgba(124,255,0,0.5)' }} />
                <span><strong className="text-white/80">{isEs ? "Información de contacto" : "Contact Information"}:</strong> {isEs ? "Nombre, email, teléfono y datos similares cuando rellenas un formulario o nos contactas directamente." : "Name, email, phone number, and similar data when you fill out a form or contact us directly."}</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: 'rgba(124,255,0,0.5)' }} />
                <span><strong className="text-white/80">{isEs ? "Datos de uso" : "Usage Data"}:</strong> {isEs ? "Información sobre cómo usas nuestro sitio web, como tu dirección IP, tipo de navegador y páginas visitadas." : "Information about how you use our website, such as your IP address, browser type, and pages viewed."}</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: 'rgba(124,255,0,0.5)' }} />
                <span><strong className="text-white/80">Cookies:</strong> {isEs ? "Utilizamos cookies para mejorar tu experiencia de navegación." : "We use cookies to enhance your browsing experience."}</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-lg font-bold uppercase tracking-tight text-white">
              {isEs ? "2. Cómo utilizamos tu información" : "2. How We Use Your Information"}
            </h2>
            <ul className="list-none space-y-2">
              {(isEs
                ? ["Proporcionar y mejorar nuestros servicios.", "Responder a tus consultas o solicitudes.", "Enviar actualizaciones o newsletters (con tu consentimiento).", "Analizar el uso del sitio web para mejorar la experiencia.", "Cumplir con obligaciones legales bajo el UK DPA 2018, GDPR y la LOPDGDD española."]
                : ["Provide and improve our services.", "Respond to your inquiries or requests.", "Send you updates or newsletters (with your consent).", "Analyze usage of our website to enhance user experience.", "Comply with legal obligations under the UK DPA 2018, GDPR, and the Spanish LOPDGDD."]
              ).map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: 'rgba(124,255,0,0.5)' }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-lg font-bold uppercase tracking-tight text-white">
              {isEs ? "3. Compartición de datos" : "3. How We Share Your Information"}
            </h2>
            <p>{isEs ? "No vendemos, comerciamos ni alquilamos tu información personal a terceros." : "We do not sell, trade, or rent your personal information to third parties."}</p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-lg font-bold uppercase tracking-tight text-white">
              {isEs ? "4. Seguridad de datos" : "4. Data Security"}
            </h2>
            <p>{isEs ? "Implementamos medidas técnicas y organizativas apropiadas para proteger tus datos personales contra accesos no autorizados, pérdidas o divulgación." : "We implement appropriate technical and organizational measures to protect your personal data from unauthorized access, loss, or disclosure."}</p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-lg font-bold uppercase tracking-tight text-white">
              {isEs ? "5. Tus derechos" : "5. Your Rights"}
            </h2>
            <p>
              {isEs
                ? "Bajo el GDPR, el UK DPA 2018 y la LOPDGDD, tienes los siguientes derechos: Acceso, Rectificación, Supresión, Limitación del tratamiento, Oposición y Portabilidad de datos."
                : "Under the GDPR, UK DPA 2018, and the Spanish LOPDGDD, you have the following rights: Access, Rectification, Erasure, Restriction, Objection, and Data Portability."}
            </p>
            <p>
              {isEs ? "Para ejercer cualquiera de estos derechos, contáctanos en " : "To exercise any of these rights, please contact us at "}
              <a href="mailto:contact@casualbrothers.com" className="text-brand hover:underline">contact@casualbrothers.com</a>.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-lg font-bold uppercase tracking-tight text-white">
              {isEs ? "6. Transferencias internacionales" : "6. International Transfers"}
            </h2>
            <p>
              {isEs
                ? "Tus datos pueden ser tratados en el Reino Unido y en el Espacio Económico Europeo. Ambas jurisdicciones ofrecen un nivel adecuado de protección de datos según la normativa vigente."
                : "Your data may be processed in the United Kingdom and the European Economic Area. Both jurisdictions offer an adequate level of data protection under applicable regulations."}
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-lg font-bold uppercase tracking-tight text-white">
              {isEs ? "7. Contacto" : "7. Contact Us"}
            </h2>
            <address className="not-italic space-y-1">
              <p><strong className="text-white/80">Casual Brothers Ltd.</strong></p>
              <p>Email: <a href="mailto:contact@casualbrothers.com" className="text-brand hover:underline">contact@casualbrothers.com</a></p>
              <p>{isEs ? "Dirección" : "Address"}: 1 Scholars Walk, Horsham, RH12 1AS, United Kingdom</p>
            </address>
          </div>

          <p className="text-white/30 text-xs pt-4">
            {isEs ? "Última actualización: Mayo 2026" : "Last updated: May 2026"}
          </p>
        </div>
      </section>
    </>
  );
}
