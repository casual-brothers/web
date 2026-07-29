"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { i18n } from "@/i18n/config";

export function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const pathname = usePathname();

  function getLocalePath(newLocale: string) {
    // Replace the current locale prefix with the new one
    const segments = pathname.split("/");
    segments[1] = newLocale;
    return segments.join("/");
  }

  return (
    <div className="ml-0 flex items-center gap-0.5 overflow-hidden rounded-full border border-white/10 sm:ml-4 sm:gap-1">
      {i18n.locales.map((locale) => (
        <Link
          key={locale}
          href={getLocalePath(locale)}
          className={`px-2 py-1.5 text-[10px] font-bold uppercase transition-all duration-200 sm:px-3 sm:text-xs ${
            locale === currentLocale
              ? "bg-brand text-background"
              : "text-white/50 hover:text-white hover:bg-white/10"
          }`}
        >
          {locale}
        </Link>
      ))}
    </div>
  );
}
