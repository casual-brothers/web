"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface CookieBannerProps {
  locale: string;
}

export default function CookieBanner({ locale }: CookieBannerProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cb-cookie-consent");
    if (!consent) {
      // Small delay so it doesn't flash on load
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cb-cookie-consent", "accepted");
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem("cb-cookie-consent", "rejected");
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
                ? "Utilizamos cookies propias y de terceros para mejorar tu experiencia de navegación y analizar el tráfico del sitio."
                : "We use our own and third-party cookies to improve your browsing experience and analyze site traffic."}
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
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={reject}
              className="px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-white/50 border border-white/10 rounded hover:bg-white/5 hover:text-white/70 transition-all"
            >
              {isEs ? "Rechazar" : "Reject"}
            </button>
            <button
              onClick={accept}
              className="px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-background bg-brand rounded hover:bg-brand-hover hover:text-white transition-all shadow-lg" style={{ boxShadow: '0 10px 15px -3px rgba(124,255,0,0.1)' }}
            >
              {isEs ? "Aceptar" : "Accept"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
