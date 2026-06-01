import { Metadata } from "next";

/**
 * Genera el objeto `alternates` (canonical y hreflang alternos) para los metadatos de Next.js
 * de forma dinámica e independiente para cada página y su idioma.
 *
 * @param locale - Código del idioma actual ('en' o 'es')
 * @param path - Ruta relativa de la página (ej: 'about', 'games/my-game', etc.)
 */
export function getSeoAlternates(locale: string, path: string = ""): Metadata["alternates"] {
  const cleanPath = path ? `/${path}` : "";
  return {
    canonical: `https://casualbrothers.com/${locale}${cleanPath}`,
    languages: {
      en: `https://casualbrothers.com/en${cleanPath}`,
      es: `https://casualbrothers.com/es${cleanPath}`,
    },
  };
}
