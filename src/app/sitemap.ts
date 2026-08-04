import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/caseStudies";
import { getLocalizedUrl } from "@/lib/seo";

export const dynamic = "force-static";

const locales = ["en", "es"] as const;

const pages = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "games", changeFrequency: "monthly", priority: 0.9 },
  { path: "case-studies", changeFrequency: "monthly", priority: 0.9 },
  { path: "publishers", changeFrequency: "monthly", priority: 0.9 },
  { path: "game-development-services", changeFrequency: "monthly", priority: 0.9 },
  { path: "co-development-game-studio", changeFrequency: "monthly", priority: 0.9 },
  { path: "console-porting-services", changeFrequency: "monthly", priority: 0.9 },
  { path: "licensed-ip-game-development", changeFrequency: "monthly", priority: 0.9 },
  { path: "unity-game-development-studio", changeFrequency: "monthly", priority: 0.9 },
  { path: "resources", changeFrequency: "monthly", priority: 0.8 },
  { path: "services", changeFrequency: "monthly", priority: 0.8 },
  { path: "game-development-company", changeFrequency: "monthly", priority: 0.9 },
  { path: "about", changeFrequency: "monthly", priority: 0.7 },
  { path: "careers", changeFrequency: "monthly", priority: 0.6 },
  { path: "contact", changeFrequency: "monthly", priority: 0.7 },
  { path: "privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "cookie-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "legal-notice", changeFrequency: "yearly", priority: 0.3 },
] as const;

function localizedAlternates(path: string) {
  return {
    languages: {
      en: getLocalizedUrl("en", path),
      es: getLocalizedUrl("es", path),
      "x-default": getLocalizedUrl("en", path),
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pageEntries: MetadataRoute.Sitemap = pages.flatMap((page) =>
    locales.map((locale) => ({
      url: getLocalizedUrl(locale, page.path),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: localizedAlternates(page.path),
    })),
  );

  const caseStudyEntries: MetadataRoute.Sitemap = caseStudies.flatMap((study) => {
    const path = `case-studies/${study.slug}`;
    return locales.map((locale) => ({
      url: getLocalizedUrl(locale, path),
      changeFrequency: "yearly" as const,
      priority: 0.6,
      alternates: localizedAlternates(path),
    }));
  });

  return [...pageEntries, ...caseStudyEntries];
}
