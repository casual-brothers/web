"use client";

import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface NavLink {
  href: string;
  label: string;
}

interface HeaderNavProps {
  navLinks: NavLink[];
  locale: string;
  ctaLabel: string;
  logoSrc: string;
}

export default function HeaderNav({ navLinks, locale, ctaLabel, logoSrc }: HeaderNavProps) {
  return (
    <nav className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
      {/* Logo */}
      <Link href={`/${locale}`} className="flex items-center gap-3 group shrink-0">
        <img
          src={logoSrc}
          alt="Casual Brothers"
          className="h-11 w-auto group-hover:brightness-125 transition-all duration-300"
        />
      </Link>

      {/* Desktop Nav — hidden below lg */}
      <div className="hidden lg:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/50 hover:text-brand transition-colors duration-300"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <LanguageSwitcher currentLocale={locale} />
        <Link
          href={`/${locale}/contact`}
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-brand text-background text-[11px] font-bold uppercase tracking-wider rounded hover:bg-brand-hover hover:text-white transition-all duration-300 shadow-lg"
          style={{ boxShadow: '0 10px 15px -3px rgba(124,255,0,0.1)' }}
        >
          {ctaLabel}
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>

        {/* Mobile hamburger — visible below lg */}
        <MobileMenu navLinks={navLinks} locale={locale} ctaLabel={ctaLabel} />
      </div>
    </nav>
  );
}
