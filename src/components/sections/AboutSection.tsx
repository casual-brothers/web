"use client";

import { assetPath } from "@/lib/basePath";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Dictionary } from "@/i18n/getDictionary";
import GamingStudioGraphic from "@/components/ui/GamingStudioGraphic";

export default function AboutSection({ dict, locale }: { dict: Dictionary; locale: string }) {
  return (
    <section id="about" className="relative py-28 px-6 overflow-hidden">
      {/* Background — full section */}
      <div className="absolute inset-0">
        <img
          src={assetPath("/images/about-bg.webp")}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-75"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #0e0e0e, transparent, #0e0e0e)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #0e0e0e 5%, rgba(14,14,14,0.5) 45%, rgba(14,14,14,0.3) 70%, transparent 100%)' }} />
      </div>

      {/* Content — two columns: text left, graphic right */}
      <div className="max-w-[1400px] mx-auto relative z-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Left: text + CTA */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex-1 space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-brand" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
              {dict.home.aboutLabel}
            </span>
            <div className="w-12 h-px bg-white/5" />
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-[0.95] tracking-tight">
            {dict.home.aboutTitle1}
            <br />
            {dict.home.aboutTitle2}{" "}
            <span className="text-gradient-brand" style={{ backgroundImage: 'linear-gradient(135deg, #7cff00 0%, #ffffff 50%, #9eff24 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' }}>{dict.home.aboutTitle3}</span>
          </h2>

          <p className="text-lg text-white/50 leading-relaxed max-w-lg">
            {dict.home.aboutText}
          </p>

          <Link
            href={`/${locale}/about`}
            className="btn-outline inline-flex"
          >
            {dict.home.aboutCta}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>

        {/* Right: Interactive Cyber Gamepad HUD Graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex-1 flex justify-center items-center"
        >
          <GamingStudioGraphic />
        </motion.div>
      </div>
    </section>
  );
}
