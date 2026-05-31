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
    <div className="flex items-center gap-1 ml-4 border border-white/10 rounded-full overflow-hidden">
      {i18n.locales.map((locale) => (
        <Link
          key={locale}
          href={getLocalePath(locale)}
          className={`px-3 py-1.5 text-xs font-bold uppercase transition-all duration-200 ${
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
