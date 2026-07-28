"use client";

import { assetPath } from "@/lib/basePath";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface NavLink {
  href: string;
  label: string;
}

interface MobileMenuProps {
  navLinks: NavLink[];
  locale: string;
  ctaLabel: string;
}

export default function MobileMenu({ navLinks, locale, ctaLabel }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // The portal can only be attached after the client has mounted.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- The body portal does not exist during SSR.
    setMounted(true);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open]);

  const overlay = (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 lg:hidden"
          style={{ zIndex: 9998 }}
        >
          {/* Solid backdrop — no content leaking through */}
          <div
            className="absolute inset-0"
            style={{ background: '#0e0e0e' }}
            onClick={() => setOpen(false)}
          />

          {/* Subtle brand atmosphere */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(124,255,0,0.06) 0%, transparent 70%)' }}
          />

          {/* Menu Content */}
          <nav className="relative z-10 flex h-full flex-col items-center justify-center px-8">
            {/* Logo at top */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-6 left-6"
            >
              <Image
                src={assetPath("/images/branding/cb-digital-w-640.webp")}
                alt="Casual Brothers"
                width={640}
                height={154}
                decoding="async"
                className="h-10 w-auto opacity-60"
              />
            </motion.div>

            {/* Close button at top right */}
            <motion.button
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>

            {/* Nav Links */}
            <div className="flex flex-col items-center gap-1 w-full max-w-sm">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, delay: 0.08 + i * 0.05 }}
                    className="w-full"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`block w-full text-center py-3.5 font-display text-xl font-bold uppercase tracking-[0.2em] transition-colors duration-300 border-b border-white/5 ${
                        isActive
                          ? "text-brand"
                          : "text-white/60 hover:text-brand"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.08 + navLinks.length * 0.05 }}
              className="mt-8"
            >
              <Link
                href={`/${locale}/contact`}
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-3 px-8 py-4 bg-brand text-background text-sm font-bold uppercase tracking-wider rounded hover:bg-brand-hover hover:text-white transition-all duration-300"
                style={{ boxShadow: '0 10px 30px -5px rgba(124,255,0,0.25)' }}
              >
                {ctaLabel}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>

            {/* Social Links inside Mobile Menu */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="absolute bottom-16 flex gap-4"
            >
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/company/casual-brothers-ltd/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center text-white/45 hover:text-brand border border-white/5 transition-all duration-300" style={{ background: 'rgba(124,255,0,0.06)' }} title="LinkedIn">
                <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85(3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              {/* Discord */}
              <a href="https://discord.gg/Q9QcKMjgB6" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center text-white/45 hover:text-brand border border-white/5 transition-all duration-300" style={{ background: 'rgba(124,255,0,0.06)' }} title="Discord">
                <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 01-1.873-.894.077.077 0 01-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 01.077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 01.078.009c.12.099.246.195.373.289a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.894.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.955 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z"/></svg>
              </a>
              {/* X / Twitter */}
              <a href="https://x.com/@casualbrothers" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center text-white/45 hover:text-brand border border-white/5 transition-all duration-300" style={{ background: 'rgba(124,255,0,0.06)' }} title="X">
                <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              {/* YouTube */}
              <a href="https://www.youtube.com/@CasualBrothersltd" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center text-white/45 hover:text-brand border border-white/5 transition-all duration-300" style={{ background: 'rgba(124,255,0,0.06)' }} title="YouTube">
                <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.002 3.002 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </motion.div>

            {/* Bottom Branding */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute bottom-6 text-[10px] uppercase tracking-[0.3em] text-white/10"
            >
              Casual Brothers
            </motion.p>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* Hamburger Button — visible on < lg only */}
      <button
        id="mobile-menu-toggle"
        onClick={() => setOpen((v) => !v)}
        className="lg:hidden relative w-10 h-10 flex items-center justify-center"
        style={{ zIndex: open ? 9999 : undefined }}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        <div className="relative w-5 h-4 flex flex-col justify-between">
          <span
            className={`block h-[2px] bg-white rounded-full transition-all duration-300 origin-center ${
              open ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`block h-[2px] bg-white rounded-full transition-all duration-300 ${
              open ? "opacity-0 scale-x-0" : ""
            }`}
          />
          <span
            className={`block h-[2px] bg-white rounded-full transition-all duration-300 origin-center ${
              open ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </div>
      </button>

      {/* Portal overlay to body — escapes header stacking context */}
      {mounted && createPortal(overlay, document.body)}
    </>
  );
}
