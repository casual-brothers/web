"use client";

import { assetPath, basePath } from "@/lib/basePath";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Globe } from "lucide-react";
import type { Dictionary } from "@/i18n/getDictionary";

export default function ContactPageClient({ dict }: { dict: Dictionary }) {
  const data = dict.contact;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    type: "GENERAL" as "GENERAL" | "BUSINESS",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorDetails, setErrorDetails] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setErrorDetails(
        dict.nav.contact === "CONTACTO"
          ? "Por favor, rellena todos los campos obligatorios."
          : "Please fill in all required fields."
      );
      return;
    }

    setStatus("submitting");
    setErrorDetails("");

    try {
      const response = await fetch(`${basePath}/api/contact.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          type: formData.type,
          website: "", // honeypot
        }),
      });

      const resultData = await response.json().catch(() => ({}));

      if (response.ok && resultData.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "", type: "GENERAL" });
      } else {
        throw new Error(resultData.error || "Failed to send message.");
      }
    } catch (err: any) {
      console.error("Error submitting contact form:", err);
      setStatus("error");
      setErrorDetails(err.message || "");
    }
  };

  return (
    <>
      {/* Hero Header */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={assetPath("/images/bg_contact_texture.webp")}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-55 mix-blend-screen"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #0e0e0e, rgba(14,14,14,0.8), #0e0e0e)' }} />
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] right-[20%] w-[400px] h-[400px] rounded-full blur-[200px]" style={{ background: 'rgba(124,255,0,0.05)' }} />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 relative z-10 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="w-2 h-2 rounded-full bg-brand" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
              CONTACT
            </span>
            <div className="flex-1 h-px bg-white/5" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold uppercase leading-[0.95] tracking-tight"
          >
            {data.title}{" "}
            <span className="text-gradient-brand" style={{ backgroundImage: 'linear-gradient(135deg, #7cff00 0%, #ffffff 50%, #9eff24 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' }}>{data.titleBrand}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-white/50 max-w-xl leading-relaxed"
          >
            {data.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-[1400px] mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Left: Info Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Get in Touch */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight">
                {data.getInTouch}
              </h2>
              <p className="text-sm text-white/50 leading-relaxed">{data.text1}</p>
              <p className="text-sm text-white/40 leading-relaxed">{data.text2}</p>
            </motion.div>

            {/* Direct Contact */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6"
            >
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-white/30">
                {data.directContact}
              </h3>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center text-brand shrink-0" style={{ background: 'rgba(124,255,0,0.1)' }}>
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-white/30">{data.email}</p>
                  <a
                    href="mailto:contact@casualbrothers.com"
                    className="text-white hover:text-brand transition-colors text-sm"
                  >
                    contact@casualbrothers.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center text-brand shrink-0" style={{ background: 'rgba(124,255,0,0.1)' }}>
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-white/30">{data.address}</p>
                  <p className="text-white text-sm">{data.addressValue}</p>
                </div>
              </div>

              {/* Social Networks Connect */}
              <div className="pt-6 border-t border-white/5 space-y-4">
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-white/30">
                  {dict.nav.contact === "CONTACTO" ? "REDES SOCIALES" : "CONNECT WITH US"}
                </h3>
                <div className="flex gap-3">
                  {/* LinkedIn */}
                  <a href="https://www.linkedin.com/company/casual-brothers-ltd/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center text-white/30 hover:text-brand hover:border-brand/40 border border-transparent transition-all duration-300" style={{ background: 'rgba(124,255,0,0.1)' }} title="LinkedIn">
                    <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85(3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                  {/* Discord */}
                  <a href="https://discord.gg/Q9QcKMjgB6" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center text-white/30 hover:text-brand hover:border-brand/40 border border-transparent transition-all duration-300" style={{ background: 'rgba(124,255,0,0.1)' }} title="Discord">
                    <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 01-1.873-.894.077.077 0 01-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 01.077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 01.078.009c.12.099.246.195.373.289a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.894.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.955 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z"/></svg>
                  </a>
                  {/* X / Twitter */}
                  <a href="https://x.com/@casualbrothers" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center text-white/30 hover:text-brand hover:border-brand/40 border border-transparent transition-all duration-300" style={{ background: 'rgba(124,255,0,0.1)' }} title="X">
                    <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  {/* YouTube */}
                  <a href="https://www.youtube.com/@CasualBrothersltd" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center text-white/30 hover:text-brand hover:border-brand/40 border border-transparent transition-all duration-300" style={{ background: 'rgba(124,255,0,0.1)' }} title="YouTube">
                    <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.002 3.002 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Form Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="rounded-lg border border-white/5 bg-white/[0.02] p-6 md:p-8 space-y-6">
              <h2 className="font-display text-xl font-bold uppercase tracking-tight">
                {data.sendMessage}
              </h2>

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 px-4 space-y-6 flex flex-col items-center justify-center"
                >
                  <div className="w-16 h-16 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-brand">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display text-2xl font-bold uppercase text-brand tracking-tight">
                      {data.formSuccessTitle}
                    </h3>
                    <p className="text-sm text-white/60 max-w-sm mx-auto leading-relaxed">
                      {data.formSuccessMessage}
                    </p>
                  </div>
                  <button
                    onClick={() => setStatus("idle")}
                    className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-[11px] font-bold uppercase tracking-wider hover:bg-brand hover:text-background hover:border-brand transition-all duration-200 cursor-pointer"
                  >
                    {data.formSendAnother}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg space-y-1"
                    >
                      <p className="font-bold uppercase tracking-wider">{data.formErrorTitle}</p>
                      <p>{errorDetails || data.formErrorMessage}</p>
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-[11px] font-bold uppercase tracking-widest text-white/30">
                        {data.formName} *
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        disabled={status === "submitting"}
                        className="w-full px-4 py-3 bg-white/[0.03] border border-white/8 rounded-lg focus:outline-none focus:border-brand focus:bg-white/[0.05] transition-all duration-300 text-white text-sm placeholder:text-white/20 disabled:opacity-50"
                        placeholder={data.formNamePlaceholder}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-[11px] font-bold uppercase tracking-widest text-white/30">
                        {data.formEmail} *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        disabled={status === "submitting"}
                        className="w-full px-4 py-3 bg-white/[0.03] border border-white/8 rounded-lg focus:outline-none focus:border-brand focus:bg-white/[0.05] transition-all duration-300 text-white text-sm placeholder:text-white/20 disabled:opacity-50"
                        placeholder={data.formEmailPlaceholder}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="type" className="text-[11px] font-bold uppercase tracking-widest text-white/30">
                        {data.formType}
                      </label>
                      <select
                        id="type"
                        value={formData.type}
                        onChange={handleChange}
                        disabled={status === "submitting"}
                        className="w-full px-4 py-3 bg-white/[0.03] border border-white/8 rounded-lg focus:outline-none focus:border-brand focus:bg-white/[0.05] transition-all duration-300 text-white text-sm disabled:opacity-50 cursor-pointer appearance-none"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='rgba(255,255,255,0.4)' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10l-5 5z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center' }}
                      >
                        <option value="GENERAL" className="bg-[#12131b] text-white">{data.formTypeGeneral}</option>
                        <option value="BUSINESS" className="bg-[#12131b] text-white">{data.formTypeBusiness}</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-[11px] font-bold uppercase tracking-widest text-white/30">
                        {data.formSubject}
                      </label>
                      <input
                        type="text"
                        id="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        disabled={status === "submitting"}
                        className="w-full px-4 py-3 bg-white/[0.03] border border-white/8 rounded-lg focus:outline-none focus:border-brand focus:bg-white/[0.05] transition-all duration-300 text-white text-sm placeholder:text-white/20 disabled:opacity-50"
                        placeholder={data.formSubjectPlaceholder}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-[11px] font-bold uppercase tracking-widest text-white/30">
                      {data.formMessage} *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      disabled={status === "submitting"}
                      className="w-full px-4 py-3 bg-white/[0.03] border border-white/8 rounded-lg focus:outline-none focus:border-brand focus:bg-white/[0.05] transition-all duration-300 text-white text-sm resize-none placeholder:text-white/20 disabled:opacity-50"
                      placeholder={data.formMessagePlaceholder}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-brand text-background text-[11px] font-bold uppercase tracking-wider rounded-lg hover:bg-brand-hover hover:text-white transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    style={{ boxShadow: '0 10px 15px -3px rgba(124,255,0,0.1)' }}
                  >
                    {status === "submitting" ? data.formSending : data.formSubmit}
                    {status === "submitting" ? (
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
