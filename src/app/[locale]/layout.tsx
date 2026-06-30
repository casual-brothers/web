import type { Metadata } from "next";
import Link from "next/link";
import "../globals.css";
import { assetPath, basePath } from "@/lib/basePath";
import { getDictionary } from "@/i18n/getDictionary";
import { i18n } from "@/i18n/config";
import CookieBanner from "@/components/ui/CookieBanner";
import ScrollHeader from "@/components/ui/ScrollHeader";
import HeaderNav from "@/components/ui/HeaderNav";
import JsonLd from "@/components/seo/JsonLd";
import { getDefaultSeo, getSeoAlternates, siteUrl } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const seo = getDefaultSeo(locale);
  return {
    metadataBase: new URL(siteUrl),
    title: seo.title,
    description: seo.description,
    keywords: [
      "game development studio",
      "casual game company",
      "casual game developers",
      "casual game development company",
      "hybrid casual game development",
      "co-development",
      "game porting",
      "console porting",
      "Unity development",
      "Unreal Engine",
      "live ops",
      "AA game studio",
      "Casual Brothers",
      "video game development UK",
    ],
    authors: [{ name: "Casual Brothers", url: "https://casualbrothers.com" }],
    creator: "Casual Brothers",
    publisher: "Casual Brothers",
    icons: {
      icon: `${basePath}/images/branding/cb-icon-01.svg`,
      shortcut: `${basePath}/images/branding/cb-icon-01.svg`,
      apple: `${basePath}/images/branding/cb-icon-01.svg`,
    },
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_ES" : "en_GB",
      alternateLocale: locale === "es" ? "en_GB" : "es_ES",
      siteName: "Casual Brothers",
      title: `${seo.title} | Casual Brothers`,
      description: seo.description,
      url: `${siteUrl}/${locale}`,
      images: [
        {
          url: `${basePath}/images/branding/og-cover.png`,
          width: 1200,
          height: 630,
          alt: "Casual Brothers — Game Development Studio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@casualbrothers",
      creator: "@casualbrothers",
      title: `${seo.title} | Casual Brothers`,
      description: seo.description,
      images: [`${basePath}/images/branding/og-cover.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: getSeoAlternates(locale),
  };
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  const navLinks = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/games`, label: dict.nav.games },
    { href: `/${locale}/services`, label: dict.nav.services },
    { href: `/${locale}/publishers`, label: "PUBLISHERS" },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/careers`, label: dict.nav.careers },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];
  const footerSeoLinks = [
    { href: `/${locale}/game-development-services`, label: locale === "es" ? "Game Development Services" : "Game Development Services" },
    { href: `/${locale}/co-development-game-studio`, label: locale === "es" ? "Co-Development" : "Co-Development" },
    { href: `/${locale}/console-porting-services`, label: locale === "es" ? "Console Porting" : "Console Porting" },
    { href: `/${locale}/licensed-ip-game-development`, label: locale === "es" ? "Licensed IP Game Development" : "Licensed IP Game Development" },
    { href: `/${locale}/unity-game-development-studio`, label: locale === "es" ? "Unity Game Development" : "Unity Game Development" },
    { href: `/${locale}/case-studies`, label: "Case Studies" },
    { href: `/${locale}/resources`, label: "Resources" },
    { href: `/${locale}/publishers`, label: locale === "es" ? "Publishers e IP holders" : "Publishers" },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  return (
    <>
      {/* ========== SEO ========== */}
      <JsonLd />

      {/* ========== HEADER ========== */}
      <ScrollHeader>
        <HeaderNav
          navLinks={navLinks}
          locale={locale}
          ctaLabel={dict.nav.workWithUs}
          logoSrc={assetPath("/images/branding/cb-digital-w.webp")}
        />
      </ScrollHeader>

      {/* ========== MAIN ========== */}
      <main className="flex-1 flex flex-col">
        {children}
      </main>

      {/* ========== FOOTER ========== */}
      <footer className="border-t border-white/5 bg-background">
        <div className="max-w-[1400px] mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="space-y-4">
              <img src={assetPath("/images/branding/cb-digital-w.webp")} alt="Casual Brothers" className="h-10 w-auto" />
              <p className="text-sm text-white/40 max-w-xs">
                {locale === "es"
                  ? "Game development studio para publishers, titulares de IP y estudios financiados."
                  : "Game development studio for publishers, IP holders and funded studios."}
              </p>
            </div>

            {/* Navigation */}
            <div className="space-y-4">
              <h4 className="font-display text-xs font-bold uppercase tracking-widest text-white/25">Navigation</h4>
              <div className="grid grid-cols-2 gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-white/40 hover:text-brand transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href={`/${locale}/game-development-company`}
                  className="text-sm text-white/40 hover:text-brand transition-colors duration-300 col-span-2 mt-1 pt-1 border-t border-white/5 font-semibold text-brand/80"
                >
                  {locale === 'es' ? 'Compañía de Desarrollo de Videojuegos' : 'Game Development Company'}
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-display text-xs font-bold uppercase tracking-widest text-white/25">Services</h4>
              <div className="grid grid-cols-1 gap-2">
                {footerSeoLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-white/40 hover:text-brand transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Social / Legal */}
            <div className="space-y-4">
              <h4 className="font-display text-xs font-bold uppercase tracking-widest text-white/25">Connect</h4>
              <div className="flex gap-3">
                {/* LinkedIn */}
                <a href="https://www.linkedin.com/company/casual-brothers-ltd/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded bg-white/5 flex items-center justify-center text-white/30 hover:text-brand transition-all duration-300" style={{ background: 'rgba(124,255,0,0.1)' }} title="LinkedIn">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                {/* Discord */}
                <a href="https://discord.gg/Q9QcKMjgB6" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded bg-white/5 flex items-center justify-center text-white/30 hover:text-brand transition-all duration-300" style={{ background: 'rgba(124,255,0,0.1)' }} title="Discord">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 01-1.873-.894.077.077 0 01-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 01.077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 01.078.009c.12.099.246.195.373.289a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.894.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.955 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z"/></svg>
                </a>
                {/* X / Twitter */}
                <a href="https://x.com/@casualbrothers" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded bg-white/5 flex items-center justify-center text-white/30 hover:text-brand transition-all duration-300" style={{ background: 'rgba(124,255,0,0.1)' }} title="X">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                {/* YouTube */}
                <a href="https://www.youtube.com/@CasualBrothersltd" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded bg-white/5 flex items-center justify-center text-white/30 hover:text-brand transition-all duration-300" style={{ background: 'rgba(124,255,0,0.1)' }} title="YouTube">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.002 3.002 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/25 pt-2">
                <Link href={`/${locale}/privacy-policy`} className="hover:text-brand transition-colors duration-300">
                  {dict.footer.privacyPolicy}
                </Link>
                <Link href={`/${locale}/cookie-policy`} className="hover:text-brand transition-colors duration-300">
                  {locale === 'es' ? 'Política de Cookies' : 'Cookie Policy'}
                </Link>
                <Link href={`/${locale}/legal-notice`} className="hover:text-brand transition-colors duration-300">
                  {locale === 'es' ? 'Aviso Legal' : 'Legal Notice'}
                </Link>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-6 border-t border-white/5 text-center">
            <p className="text-xs text-white/15">
              &copy; {new Date().getFullYear()} Casual Brothers. {dict.footer.rights}
            </p>
          </div>
        </div>
      </footer>

      {/* Cookie Banner */}
      <CookieBanner locale={locale} />
    </>
  );
}
