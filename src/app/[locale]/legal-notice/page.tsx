import type { Metadata } from "next";
import { buildCustomMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";
  return buildCustomMetadata(locale, isEs ? "Aviso legal" : "Legal Notice", isEs ? "Datos societarios, condiciones de uso y propiedad intelectual de Casual Brothers Ltd." : "Company details, terms of use and intellectual property information for Casual Brothers Ltd.", "legal-notice");
}

export default async function LegalNoticePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
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
            {isEs ? "AVISO " : "LEGAL "}
            <span className="text-gradient-brand">{isEs ? "LEGAL" : "NOTICE"}</span>
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-[900px] mx-auto px-6 pb-24">
        <div className="space-y-8 text-white/60 text-sm leading-relaxed">

          <div className="rounded-lg border border-white/5 bg-white/[0.02] p-6 md:p-8 space-y-3">
            <h2 className="font-display text-lg font-bold uppercase tracking-tight text-white">
              {isEs ? "Datos identificativos" : "Company Information"}
            </h2>
            <div className="space-y-1">
              <p><strong className="text-white/80">{isEs ? "Razón Social" : "Company Name"}:</strong> Casual Brothers Ltd.</p>
              <p><strong className="text-white/80">{isEs ? "Domicilio Social" : "Registered Office"}:</strong> 1 Scholars Walk, Horsham, England, RH12 1QH, United Kingdom</p>
              <p><strong className="text-white/80">{isEs ? "Número de Registro" : "Company Number"}:</strong> 07121064</p>
              <p><strong className="text-white/80">{isEs ? "Registro" : "Place of Registration"}:</strong> {isEs ? "Inglaterra y Gales" : "England and Wales"}</p>
              <p><strong className="text-white/80">Email:</strong> <a href="mailto:contact@casualbrothers.com" className="text-brand hover:underline">contact@casualbrothers.com</a></p>
              <p><strong className="text-white/80">{isEs ? "Actividad" : "Activity"}:</strong> {isEs ? "Desarrollo de videojuegos y software interactivo" : "Video game and interactive software development"}</p>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-lg font-bold uppercase tracking-tight text-white">
              {isEs ? "1. Objeto" : "1. Purpose"}
            </h2>
            <p>
              {isEs
                ? "El presente Aviso Legal regula el uso del sitio web casualbrothers.com (en adelante, el \"Sitio Web\"), del que es titular Casual Brothers Ltd. La navegación por el Sitio Web atribuye la condición de usuario del mismo e implica la aceptación plena y sin reservas de todas y cada una de las disposiciones incluidas en este Aviso Legal."
                : "This Legal Notice governs the use of the website casualbrothers.com (hereinafter, the \"Website\"), owned by Casual Brothers Ltd. Browsing the Website grants the status of user and implies full and unreserved acceptance of all provisions included in this Legal Notice."}
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-lg font-bold uppercase tracking-tight text-white">
              {isEs ? "2. Propiedad Intelectual e Industrial" : "2. Intellectual Property"}
            </h2>
            <p>
              {isEs
                ? "Todos los contenidos del Sitio Web, incluyendo textos, fotografías, gráficos, imágenes, iconos, tecnología, software, enlaces, logotipos, marcas y demás contenidos audiovisuales o sonoros, así como su diseño gráfico y códigos fuente, son propiedad intelectual de Casual Brothers Ltd. o de sus licenciantes, sin que puedan entenderse cedidos al usuario ninguno de los derechos de explotación reconocidos por la normativa vigente sobre propiedad intelectual."
                : "All content on the Website, including texts, photographs, graphics, images, icons, technology, software, links, logos, trademarks, and other audiovisual or sound content, as well as its graphic design and source code, are the intellectual property of Casual Brothers Ltd. or its licensors. No exploitation rights recognized by current intellectual property regulations are transferred to the user."}
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-lg font-bold uppercase tracking-tight text-white">
              {isEs ? "3. Exclusión de Responsabilidad" : "3. Limitation of Liability"}
            </h2>
            <p>
              {isEs
                ? "Casual Brothers Ltd. no se hace responsable de los daños y perjuicios de cualquier naturaleza que pudieran derivarse de la falta de disponibilidad o continuidad del funcionamiento del Sitio Web. Asimismo, no garantiza la ausencia de virus u otros elementos que pudieran causar daños en los sistemas informáticos del usuario."
                : "Casual Brothers Ltd. shall not be held liable for any damages that may arise from the lack of availability or continuity of the Website. Furthermore, it does not guarantee the absence of viruses or other elements that could damage the user's computer systems."}
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-lg font-bold uppercase tracking-tight text-white">
              {isEs ? "4. Legislación Aplicable" : "4. Applicable Law"}
            </h2>
            <p>
              {isEs
                ? "Este Aviso Legal se rige por las leyes de Inglaterra y Gales. Nada de lo aquí indicado limita los derechos imperativos que correspondan a un usuario conforme a la normativa aplicable."
                : "This Legal Notice is governed by the laws of England and Wales. Nothing in this notice limits any mandatory rights available to a user under applicable law."}
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-lg font-bold uppercase tracking-tight text-white">
              {isEs ? "5. Modificaciones" : "5. Modifications"}
            </h2>
            <p>
              {isEs
                ? "Casual Brothers Ltd. se reserva el derecho de modificar el presente Aviso Legal en cualquier momento. Dichas modificaciones serán publicadas en el Sitio Web y entrarán en vigor desde su publicación."
                : "Casual Brothers Ltd. reserves the right to modify this Legal Notice at any time. Such modifications will be published on the Website and will take effect from the date of publication."}
            </p>
          </div>

          <p className="text-white/30 text-xs pt-4">
            {isEs ? "Última actualización: 8 de agosto de 2026" : "Last updated: 8 August 2026"}
          </p>
        </div>
      </section>
    </>
  );
}
