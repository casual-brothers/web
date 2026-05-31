"use client";

import { assetPath, basePath } from "@/lib/basePath";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Send, X } from "lucide-react";
import type { Dictionary } from "@/i18n/getDictionary";
import CTASection from "@/components/sections/CTASection";

export default function CareersPageClient({ dict, locale }: { dict: Dictionary; locale: string }) {
  const data = dict.careers;

  // ─── Application Modal State ─────────────────────
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState("");
  const [applyForm, setApplyForm] = useState({ name: "", email: "", message: "" });
  const [applyStatus, setApplyStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [applyError, setApplyError] = useState("");

  const openModal = (position: string) => {
    setModalPosition(position);
    setApplyForm({ name: "", email: "", message: "" });
    setApplyStatus("idle");
    setApplyError("");
    setModalOpen(true);
  };

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    if (modalOpen) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [modalOpen, closeModal]);

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyForm.name || !applyForm.email || !applyForm.message) return;

    setApplyStatus("submitting");
    setApplyError("");

    try {
      const res = await fetch(`${basePath}/api/apply.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: applyForm.name,
          email: applyForm.email,
          message: applyForm.message,
          position: modalPosition,
          website: "", // honeypot
        }),
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok || !result.ok) throw new Error(result.error || "Failed to send");
      setApplyStatus("success");
    } catch (err: any) {
      setApplyStatus("error");
      setApplyError(err.message || "");
    }
  };

  return (
    <>
      {/* Hero Header */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={assetPath("/images/bg_careers_epic.webp")}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-55 mix-blend-screen"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #0e0e0e, transparent, #0e0e0e)' }} />
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[30%] left-[10%] w-[400px] h-[400px] rounded-full blur-[200px]" style={{ background: 'rgba(124,255,0,0.06)' }} />
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
              CAREERS
            </span>
            <div className="flex-1 h-px bg-white/5" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold uppercase leading-[0.95] tracking-tight"
          >
            {data.joinTitle}{" "}
            <span className="text-gradient-brand" style={{ backgroundImage: 'linear-gradient(135deg, #7cff00 0%, #ffffff 48%, #34b300 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' }}>{data.joinBrand}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-white/50 max-w-2xl leading-relaxed"
          >
            {data.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <span className="text-[11px] font-bold uppercase tracking-widest text-white/30">
              {locale === "es" ? "Conócenos más en:" : "Explore our culture:"}
            </span>
            <div className="flex gap-2.5">
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/company/casual-brothers-ltd/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded flex items-center justify-center text-white/40 hover:text-brand hover:bg-brand/5 border border-white/5 transition-all duration-300" title="LinkedIn">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85(3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              {/* Discord */}
              <a href="https://discord.gg/Q9QcKMjgB6" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded flex items-center justify-center text-white/40 hover:text-brand hover:bg-brand/5 border border-white/5 transition-all duration-300" title="Discord">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 01-1.873-.894.077.077 0 01-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 01.077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 01.078.009c.12.099.246.195.373.289a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.894.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.955 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z"/></svg>
              </a>
              {/* X / Twitter */}
              <a href="https://x.com/@casualbrothers" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded flex items-center justify-center text-white/40 hover:text-brand hover:bg-brand/5 border border-white/5 transition-all duration-300" title="X">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              {/* YouTube */}
              <a href="https://www.youtube.com/@CasualBrothersltd" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded flex items-center justify-center text-white/40 hover:text-brand hover:bg-brand/5 border border-white/5 transition-all duration-300" title="YouTube">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.002 3.002 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="max-w-[1400px] mx-auto px-6 pb-16 space-y-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-px bg-brand" />
          <h2 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight">
            {data.openingsTitle}
          </h2>
        </div>

        <div className="space-y-6">
          {data.jobs.map((job, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative rounded-lg border border-white/5 bg-white/[0.02] hover:border-brand-20 hover:bg-white/[0.04] transition-all duration-500 overflow-hidden"
            >
              {/* Green accent line */}
              <div className="absolute top-0 left-0 w-1 h-full" style={{ background: 'rgba(124,255,0,0.6)' }} />

              <div className="p-6 md:p-8 pl-8 md:pl-10 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-brand shrink-0" style={{ background: 'rgba(124,255,0,0.1)' }}>
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <h3 className="font-display text-xl md:text-2xl font-bold uppercase tracking-tight text-white">
                      {job.title}
                    </h3>
                  </div>

                  <p className="text-white/50 text-sm leading-relaxed">{job.description}</p>

                  <div className="pt-2">
                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-white/30 mb-3">
                      {job.requirementsTitle}
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {job.requirements.map((req, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2 text-sm text-white/40">
                          <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: 'rgba(124,255,0,0.5)' }} />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="shrink-0 w-full md:w-auto">
                  <button
                    onClick={() => openModal(job.title)}
                    className="flex items-center justify-center gap-2 px-8 py-3 bg-brand text-background text-[11px] font-bold uppercase tracking-wider rounded hover:bg-brand-hover hover:text-white transition-all duration-200 shadow-lg cursor-pointer" style={{ boxShadow: '0 10px 15px -3px rgba(124,255,0,0.1)' }}
                  >
                    {data.applyNow}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* General Application */}
      <section className="max-w-[1400px] mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-lg border border-brand-10 bg-brand-glow-3 p-8 md:p-12 text-center overflow-hidden"
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full blur-[120px]" style={{ background: 'rgba(124,255,0,0.05)' }} />
          </div>

          <div className="relative z-10 space-y-6">
            <Send className="w-10 h-10 text-brand mx-auto" />
            <p className="text-base text-white/60 max-w-2xl mx-auto leading-relaxed">
              {data.generalApplication}
            </p>
            <button
              onClick={() => openModal(locale === "es" ? "Aplicación General / Portfolio" : "General Application / Portfolio")}
              className="inline-flex items-center gap-2 px-8 py-3 border border-white/10 text-white text-[11px] font-bold uppercase tracking-wider rounded hover:bg-white/5 hover:border-white/20 transition-all duration-200 cursor-pointer"
            >
              {data.submitGeneral}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <CTASection dict={dict} locale={locale} />

      {/* ─── Application Modal ─────────────────────── */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-[min(520px,calc(100vw-32px))] max-h-[90vh] overflow-y-auto rounded-xl border border-white/8 bg-[#12131b] p-8 shadow-2xl"
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="font-display text-lg font-bold uppercase tracking-tight text-white mb-1">
                {data.applyModalTitle}
              </h3>
              <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-brand mb-6">
                {modalPosition}
              </p>

              {applyStatus === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8 space-y-4"
                >
                  <div className="w-14 h-14 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-brand mx-auto">
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-sm text-brand font-bold">{data.applyFormSuccess}</p>
                  <button
                    onClick={closeModal}
                    className="px-6 py-2 bg-white/5 border border-white/10 rounded-lg text-[11px] font-bold uppercase tracking-wider hover:bg-brand hover:text-background hover:border-brand transition-all duration-200 cursor-pointer"
                  >
                    {data.applyFormClose}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleApplySubmit} className="space-y-4">
                  {applyStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg"
                    >
                      {applyError || data.applyFormError}
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-white/30">
                        {data.applyFormName} *
                      </label>
                      <input
                        type="text"
                        required
                        value={applyForm.name}
                        onChange={(e) => setApplyForm(p => ({ ...p, name: e.target.value }))}
                        disabled={applyStatus === "submitting"}
                        className="w-full px-4 py-3 bg-white/[0.03] border border-white/8 rounded-lg focus:outline-none focus:border-brand focus:bg-white/[0.05] transition-all duration-300 text-white text-sm placeholder:text-white/20 disabled:opacity-50"
                        placeholder={data.applyFormNamePlaceholder}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-white/30">
                        {data.applyFormEmail} *
                      </label>
                      <input
                        type="email"
                        required
                        value={applyForm.email}
                        onChange={(e) => setApplyForm(p => ({ ...p, email: e.target.value }))}
                        disabled={applyStatus === "submitting"}
                        className="w-full px-4 py-3 bg-white/[0.03] border border-white/8 rounded-lg focus:outline-none focus:border-brand focus:bg-white/[0.05] transition-all duration-300 text-white text-sm placeholder:text-white/20 disabled:opacity-50"
                        placeholder={data.applyFormEmailPlaceholder}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-white/30">
                      {data.applyFormMessage} *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={applyForm.message}
                      onChange={(e) => setApplyForm(p => ({ ...p, message: e.target.value }))}
                      disabled={applyStatus === "submitting"}
                      className="w-full px-4 py-3 bg-white/[0.03] border border-white/8 rounded-lg focus:outline-none focus:border-brand focus:bg-white/[0.05] transition-all duration-300 text-white text-sm resize-none placeholder:text-white/20 disabled:opacity-50"
                      placeholder={data.applyFormMessagePlaceholder}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={applyStatus === "submitting"}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-brand text-background text-[11px] font-bold uppercase tracking-wider rounded-lg hover:bg-brand-hover hover:text-white transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    style={{ boxShadow: '0 10px 15px -3px rgba(124,255,0,0.1)' }}
                  >
                    {applyStatus === "submitting" ? data.applyFormSending : data.applyFormSubmit}
                    {applyStatus === "submitting" ? (
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
