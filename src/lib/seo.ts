import { Metadata } from "next";

export const siteUrl = "https://casualbrothers.com";

function cleanSeoPath(path: string = "") {
  return path.split("/").filter(Boolean).join("/");
}

/**
 * Devuelve la URL publica y canonica de una pagina localizada.
 * El sitio usa `trailingSlash: true`, por lo que todas las rutas HTML
 * deben terminar en `/` para evitar redirecciones y senales SEO duplicadas.
 */
export function getLocalizedUrl(locale: string, path: string = "") {
  const safeLocale = locale === "es" ? "es" : "en";
  const cleanPath = cleanSeoPath(path);
  return `${siteUrl}/${safeLocale}/${cleanPath ? `${cleanPath}/` : ""}`;
}

const defaultDescriptions = {
  en: "Casual Brothers is a game development studio helping publishers and IP holders build, co-develop and port licensed, family and multiplatform games across PC, console and mobile.",
  es: "Casual Brothers es un estudio de desarrollo de videojuegos que ayuda a publishers y titulares de IP a crear, co-desarrollar y portar juegos licenciados, familiares y multiplataforma para PC, consola y movil.",
};

const pageSeo = {
  en: {
    home: {
      title: "Casual Brothers | Game Development Studio for Publishers",
      description: defaultDescriptions.en,
    },
    games: {
      title: "Shipped Games Portfolio",
      description:
        "Explore Casual Brothers' shipped games across full development, co-development, console porting, kids entertainment, racing, adventure, and global entertainment IPs.",
    },
    services: {
      title: "Game Development Services",
      description:
        "Full-cycle game development, co-development, console and PC porting, live ops, and art/tech support for publishers, IP owners, and game studios.",
    },
    gameDevelopmentCompany: {
      title: "Casual Game Development Company",
      description:
        "Casual game development company for publishers and IP owners: full-cycle production, co-development, console porting, live ops, and art/tech support from a 50+ specialist remote studio.",
    },
    about: {
      title: "About the Studio",
      description:
        "Meet Casual Brothers: a remote game development studio with 50+ specialists, 15+ shipped titles, and production experience for major entertainment IPs.",
    },
    careers: {
      title: "Game Development Careers",
      description:
        "Join a remote game development team shipping commercial Unity and Unreal projects across PC, console, mobile, and major entertainment IPs.",
    },
    contact: {
      title: "Contact a Game Development Partner",
      description:
        "Talk to Casual Brothers about full game development, co-development, porting, live ops, art production, or a confidential publisher brief.",
    },
  },
  es: {
    home: {
      title: "Casual Brothers | Estudio de Desarrollo para Publishers",
      description: defaultDescriptions.es,
    },
    games: {
      title: "Portfolio de Juegos Lanzados",
      description:
        "Explora los juegos lanzados por Casual Brothers: desarrollo completo, co-desarrollo, porting a consola, entretenimiento familiar, racing, aventura e IPs globales.",
    },
    services: {
      title: "Servicios de Desarrollo de Videojuegos",
      description:
        "Desarrollo completo de videojuegos, co-desarrollo, porting para consola y PC, live ops y soporte de arte/tech para publishers, titulares de IP y estudios.",
    },
    gameDevelopmentCompany: {
      title: "Casual Game Development Company para Publishers",
      description:
        "Casual game development company para publishers y titulares de IP: desarrollo completo, co-desarrollo, porting a consola, live ops y soporte de arte/tech con 50+ especialistas remotos.",
    },
    about: {
      title: "Sobre el Estudio",
      description:
        "Conoce Casual Brothers: estudio remoto de desarrollo de videojuegos con 50+ especialistas, 15+ titulos lanzados y experiencia con grandes IPs de entretenimiento.",
    },
    careers: {
      title: "Empleo en Desarrollo de Videojuegos",
      description:
        "Unete a un equipo remoto de desarrollo de videojuegos que lanza proyectos comerciales en Unity y Unreal para PC, consola, movil e IPs reconocidas.",
    },
    contact: {
      title: "Contacta con un Partner de Desarrollo de Videojuegos",
      description:
        "Habla con Casual Brothers sobre desarrollo completo, co-desarrollo, porting, live ops, produccion artistica o un brief confidencial para publishers.",
    },
  },
} as const;

export type SeoPage = keyof typeof pageSeo.en;
export type SeoLocale = keyof typeof pageSeo;

/**
 * Genera el objeto `alternates` (canonical y hreflang alternos) para los metadatos de Next.js
 * de forma dinámica e independiente para cada página y su idioma.
 *
 * @param locale - Código del idioma actual ('en' o 'es')
 * @param path - Ruta relativa de la página (ej: 'about', 'games/my-game', etc.)
 */
export function getSeoAlternates(locale: string, path: string = ""): Metadata["alternates"] {
  return {
    canonical: getLocalizedUrl(locale, path),
    languages: {
      en: getLocalizedUrl("en", path),
      es: getLocalizedUrl("es", path),
      "x-default": getLocalizedUrl("en", path),
    },
  };
}

export function getPageSeo(locale: string, page: SeoPage) {
  const safeLocale: SeoLocale = locale === "es" ? "es" : "en";
  return pageSeo[safeLocale][page];
}

export function getDefaultSeo(locale: string) {
  const safeLocale: SeoLocale = locale === "es" ? "es" : "en";
  return pageSeo[safeLocale].home;
}

export function getPageMetadata(locale: string, page: SeoPage, path: string = ""): Metadata {
  const seo = getPageSeo(locale, page);

  return {
    title: seo.title,
    description: seo.description,
    alternates: getSeoAlternates(locale, path),
    openGraph: {
      title: `${seo.title} | Casual Brothers`,
      description: seo.description,
      url: getLocalizedUrl(locale, path),
    },
    twitter: {
      title: `${seo.title} | Casual Brothers`,
      description: seo.description,
    },
  };
}

export function buildCustomMetadata(
  locale: string,
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: getSeoAlternates(locale, path),
    openGraph: {
      type: "website",
      siteName: "Casual Brothers",
      title: `${title} | Casual Brothers`,
      description,
      url: getLocalizedUrl(locale, path),
      images: [
        {
          url: "/images/branding/og-cover.png",
          width: 1200,
          height: 630,
          alt: "Casual Brothers game development studio portfolio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Casual Brothers`,
      description,
      images: ["/images/branding/og-cover.png"],
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
  };
}
