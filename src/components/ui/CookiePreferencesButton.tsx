"use client";

import { openCookiePreferences } from "@/lib/cookieConsent";

export default function CookiePreferencesButton({ locale }: { locale: string }) {
  return (
    <button
      type="button"
      onClick={openCookiePreferences}
      className="text-left text-xs text-white/25 transition-colors hover:text-brand"
    >
      {locale === "es" ? "Configurar cookies" : "Cookie preferences"}
    </button>
  );
}
