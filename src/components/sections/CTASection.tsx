"use client";

import { assetPath } from "@/lib/basePath";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Dictionary } from "@/i18n/getDictionary";

export default function CTASection({ dict, locale }: { dict: Dictionary; locale: string }) {
  return (
    <section className="relative py-40 lg:py-48 mt-24 overflow-hidden">
      {/* Pure dark base */}
      <div className="absolute inset-0 bg-[#0e0e0e]" />

      {/* Camera drift wrapper — slow cinematic movement */}
      <div className="absolute -inset-[5%]" style={{ animation: 'drift-x 23s ease-in-out infinite, drift-y 17s ease-in-out infinite' }}>
        {/* Idle layer — always visible stars & clouds */}
        <Image
          src={assetPath("/images/callaction_off.webp")}
          alt=""
          fill
          sizes="100vw"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen"
        />

        {/* Lightning layers — flash on top of idle */}
        <Image
          src={assetPath("/images/callaction.webp")}
          alt=""
          fill
          sizes="100vw"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          className="absolute inset-0 w-full h-full object-cover mix-blend-screen"
          style={{ animation: 'storm-a 7s ease-in-out infinite' }}
        />
        <Image
          src={assetPath("/images/callaction.webp")}
          alt=""
          fill
          sizes="100vw"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          className="absolute inset-0 w-full h-full object-cover mix-blend-screen"
          style={{ animation: 'storm-b 11s ease-in-out infinite' }}
        />
        <Image
          src={assetPath("/images/callaction.webp")}
          alt=""
          fill
          sizes="100vw"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          className="absolute inset-0 w-full h-full object-cover mix-blend-screen blur-[2px] scale-105"
          style={{ animation: 'storm-c 5s ease-in-out infinite' }}
        />
      </div>

      {/* Edge fades for text readability */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #0e0e0e, transparent, #0e0e0e)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(14,14,14,0.6), transparent, rgba(14,14,14,0.6))' }} />

      {/* Keyframes moved to globals.css for performance */}

      {/* Top border */}
      <div className="absolute top-0 left-6 right-6 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(124,255,0,0.15), transparent)' }} />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold uppercase leading-[0.95] tracking-tight">
              {dict.home.ctaTitle1}
              <br />
              <span className="text-gradient-brand">{dict.home.ctaTitle2}</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4 md:text-right"
          >
            <p className="text-base text-white/45 max-w-sm">
              {dict.home.ctaSubtitle}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="btn-primary inline-flex"
            >
              {dict.nav.workWithUs}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-6 right-6 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(124,255,0,0.15), transparent)' }} />
    </section>
  );
}
