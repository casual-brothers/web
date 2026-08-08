"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  COOKIE_PREFERENCES_EVENT,
  readCookieConsent,
  saveCookieConsent,
} from "@/lib/cookieConsent";

interface CookieBannerProps {
  locale: string;
}

export default function CookieBanner({ locale }: CookieBannerProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = readCookieConsent();
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const openPreferences = () => setVisible(true);
    window.addEventListener(COOKIE_PREFERENCES_EVENT, openPreferences);
    return () => window.removeEventListener(COOKIE_PREFERENCES_EVENT, openPreferences);
  }, []);

  const accept = () => {
    saveCookieConsent("accepted");
    setVisible(false);
  };

  const reject = () => {
    saveCookieConsent("rejected");
    setVisible(false);
  };

  if (!visible) return null;

  const isEs = locale === "es";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 animate-slide-up">
      <div className="max-w-[1400px] mx-auto">
        <div className="rounded-lg border border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 shadow-2xl shadow-black/50">
          {/* Text */}
          <div className="flex-1 space-y-1">
            <p className="text-sm text-white/70 leading-relaxed">
              {isEs
                ? "Solo usamos almacenamiento necesario para recordar tus preferencias. YouTube se carga únicamente si aceptas el contenido externo."
                : "We only use necessary storage to remember your preferences. YouTube loads only if you accept external media."}
              {" "}
              <Link
                href={`/${locale}/cookie-policy`}
                className="text-brand hover:underline"
              >
                {isEs ? "Política de Cookies" : "Cookie Policy"}
              </Link>
            </p>
          </div>

          {/* Buttons */}
          <div className="grid w-full grid-cols-2 gap-3 md:w-auto md:min-w-[250px] shrink-0">
            <button
              onClick={reject}
              className="px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-white border border-white/30 rounded hover:bg-white/10 transition-all"
            >
              {isEs ? "Rechazar" : "Reject"}
            </button>
            <button
              onClick={accept}
              className="px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-background bg-brand border border-brand rounded hover:bg-brand-hover hover:text-white transition-all"
            >
              {isEs ? "Aceptar" : "Accept"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
