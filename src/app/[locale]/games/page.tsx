import type { Metadata } from "next";
import { getDictionary } from "@/i18n/getDictionary";
import GamesPageClient from "./GamesPageClient";
import { getPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(locale, "games", "games");
}

export default async function GamesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return <GamesPageClient dict={dict} locale={locale} />;
}
