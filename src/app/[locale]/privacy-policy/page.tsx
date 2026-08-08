import type { Metadata } from "next";
import Link from "next/link";
import { buildCustomMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";
  return buildCustomMetadata(
    locale,
    isEs ? "Política de privacidad" : "Privacy Policy",
    isEs
      ? "Información sobre cómo Casual Brothers Ltd trata los datos de contacto, consultas comerciales y candidaturas."
      : "How Casual Brothers Ltd processes contact details, business enquiries and job applications.",
    "privacy-policy",
  );
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isEs = locale === "es";
  const sections = isEs
    ? [
        ["1. Responsable del tratamiento", <>CASUAL BROTHERS LTD (n.º 07121064), con domicilio social en 1 Scholars Walk, Horsham, England, RH12 1QH, Reino Unido, es responsable del tratamiento. Contacto: <a className="text-brand hover:underline" href="mailto:contact@casualbrothers.com">contact@casualbrothers.com</a>.</>],
        ["2. Datos que tratamos", <>Cuando nos escribes mediante los formularios tratamos tu nombre, correo electrónico, empresa, información del proyecto y mensaje. En candidaturas tratamos además el puesto solicitado y la información profesional que decidas incluir. El servidor de alojamiento puede registrar temporalmente IP, fecha, navegador, URL solicitada y datos técnicos de seguridad. No utilizamos analítica publicitaria ni elaboramos perfiles.</>],
        ["3. Finalidades y bases jurídicas", <>Tratamos consultas y propuestas para responder y adoptar medidas precontractuales solicitadas por ti; relaciones comerciales para ejecutar contratos y cumplir obligaciones legales; candidaturas para valorar tu solicitud y adoptar medidas previas a una posible contratación; y registros técnicos para nuestro interés legítimo en mantener la seguridad y disponibilidad del sitio. El contenido externo de YouTube solo se carga con tu consentimiento, que puedes retirar en cualquier momento.</>],
        ["4. Destinatarios", <>Los datos pueden ser tratados por nuestros proveedores de alojamiento, correo electrónico y soporte técnico, sujetos a obligaciones de confidencialidad y protección de datos. No vendemos datos personales. YouTube/Google solo recibe datos de conexión cuando aceptas contenido externo y cargas un vídeo; consulta nuestra <Link className="text-brand hover:underline" href={`/${locale}/cookie-policy`}>Política de cookies</Link>.</>],
        ["5. Conservación", <>Las consultas se conservan durante el tiempo necesario para responder y, normalmente, hasta 12 meses después del último contacto; la documentación contractual y fiscal, durante los plazos legales aplicables. Las candidaturas no seleccionadas se conservan hasta 6 meses tras cerrar el proceso, salvo que autorices un periodo mayor. Los registros técnicos se conservan normalmente hasta 90 días, excepto cuando deban preservarse para investigar un incidente.</>],
        ["6. Transferencias internacionales", <>CASUAL BROTHERS LTD está establecida en Reino Unido. Cuando un proveedor trate datos fuera del Reino Unido o del EEE utilizaremos una decisión de adecuación o garantías apropiadas, como cláusulas contractuales tipo, cuando sean exigibles.</>],
        ["7. Tus derechos", <>Puedes solicitar acceso, rectificación, supresión, limitación, oposición o portabilidad, y retirar un consentimiento sin afectar al tratamiento anterior. Escribe a <a className="text-brand hover:underline" href="mailto:contact@casualbrothers.com">contact@casualbrothers.com</a>. También puedes reclamar ante la <a className="text-brand hover:underline" href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener noreferrer">Information Commissioner’s Office</a> o, si procede, ante tu autoridad de control local, incluida la <a className="text-brand hover:underline" href="https://www.aepd.es/" target="_blank" rel="noopener noreferrer">AEPD</a>.</>],
        ["8. Carácter de los datos", <>Los campos marcados como obligatorios son necesarios para tramitar tu solicitud. Si no los facilitas, no podremos responder mediante el formulario. No realizamos decisiones exclusivamente automatizadas con efectos jurídicos o similares.</>],
        ["9. Seguridad y cambios", <>Aplicamos medidas razonables de seguridad y revisaremos esta política cuando cambien nuestras actividades o proveedores. Publicaremos aquí la versión vigente y su fecha de actualización.</>],
      ]
    : [
        ["1. Data controller", <>CASUAL BROTHERS LTD (company no. 07121064), registered office at 1 Scholars Walk, Horsham, England, RH12 1QH, United Kingdom, is the data controller. Contact: <a className="text-brand hover:underline" href="mailto:contact@casualbrothers.com">contact@casualbrothers.com</a>.</>],
        ["2. Data we process", <>When you use our forms, we process your name, email address, company, project information and message. For job applications, we also process the role and any professional information you choose to provide. Our hosting server may temporarily log IP address, date, browser, requested URL and technical security data. We do not use advertising analytics or profiling.</>],
        ["3. Purposes and lawful bases", <>We process enquiries and proposals to respond and take pre-contractual steps you request; business relationships to perform contracts and meet legal obligations; applications to assess your request and take steps before possible employment; and technical logs for our legitimate interest in site security and availability. External YouTube content loads only with your consent, which you may withdraw at any time.</>],
        ["4. Recipients", <>Data may be processed by our hosting, email and technical support providers under confidentiality and data-protection obligations. We do not sell personal data. YouTube/Google receives connection data only when you accept external media and load a video; see our <Link className="text-brand hover:underline" href={`/${locale}/cookie-policy`}>Cookie Policy</Link>.</>],
        ["5. Retention", <>Enquiries are kept as long as needed to respond and normally for up to 12 months after the last contact; contractual and tax records are kept for applicable statutory periods. Unsuccessful applications are kept for up to 6 months after the process closes unless you authorise longer retention. Technical logs are normally kept for up to 90 days unless preserved to investigate an incident.</>],
        ["6. International transfers", <>CASUAL BROTHERS LTD is established in the United Kingdom. Where a provider processes data outside the UK or EEA, we use an adequacy decision or appropriate safeguards, such as standard contractual clauses, where required.</>],
        ["7. Your rights", <>You may request access, correction, deletion, restriction, objection or portability, and withdraw consent without affecting earlier processing. Email <a className="text-brand hover:underline" href="mailto:contact@casualbrothers.com">contact@casualbrothers.com</a>. You may also complain to the <a className="text-brand hover:underline" href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener noreferrer">Information Commissioner’s Office</a> or, where applicable, your local supervisory authority.</>],
        ["8. Required information", <>Fields marked as required are needed to handle your request. If you do not provide them, we cannot respond through the form. We do not make solely automated decisions producing legal or similarly significant effects.</>],
        ["9. Security and changes", <>We apply reasonable security measures and will review this policy when our activities or providers change. The current version and update date will be published here.</>],
      ];

  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-32">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        <div className="relative z-10 mx-auto max-w-[1400px] space-y-4 px-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand">{isEs ? "Información legal" : "Legal information"}</p>
          <h1 className="font-display text-5xl font-bold uppercase tracking-tight md:text-6xl">{isEs ? "Política de privacidad" : "Privacy Policy"}</h1>
          <p className="max-w-2xl text-lg leading-relaxed text-white/50">{isEs ? "Cómo tratamos y protegemos tus datos personales." : "How we process and protect your personal data."}</p>
        </div>
      </section>
      <section className="mx-auto max-w-[900px] px-6 pb-24">
        <div className="space-y-8 text-sm leading-relaxed text-white/60">
          {sections.map(([title, body]) => (
            <div key={String(title)} className="space-y-3">
              <h2 className="font-display text-lg font-bold uppercase tracking-tight text-white">{title}</h2>
              <p>{body}</p>
            </div>
          ))}
          <p className="border-t border-white/5 pt-6 text-xs text-white/30">{isEs ? "Última actualización: 8 de agosto de 2026" : "Last updated: 8 August 2026"}</p>
        </div>
      </section>
    </>
  );
}
