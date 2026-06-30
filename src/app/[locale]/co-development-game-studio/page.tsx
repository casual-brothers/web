import type { Metadata } from "next";
import CommercialLandingPage from "@/components/sections/CommercialLandingPage";
import { commercialPages } from "@/data/commercialPages";
import { buildCustomMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = locale === "es" ? "es" : "en";
  const page = commercialPages[safeLocale]["co-development-game-studio"];
  return buildCustomMetadata(locale, page.title, page.metaDescription, page.slug);
}

export default async function CoDevelopmentGameStudioPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const safeLocale = locale === "es" ? "es" : "en";
  return <CommercialLandingPage locale={safeLocale} page={commercialPages[safeLocale]["co-development-game-studio"]} />;
}
