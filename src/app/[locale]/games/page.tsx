import type { Metadata } from "next";
import { getDictionary } from "@/i18n/getDictionary";
import GamesPageClient from "./GamesPageClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return {
    title: dict.nav.games,
    description: dict.games.subtitle,
  };
}

export default async function GamesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return <GamesPageClient dict={dict} locale={locale} />;
}
