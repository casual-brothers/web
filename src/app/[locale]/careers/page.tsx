import { getDictionary } from "@/i18n/getDictionary";
import CareersPageClient from "./CareersPageClient";

import type { Metadata } from "next";
import { getSeoAlternates } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return {
    title: dict.nav.careers,
    description: dict.careers.intro,
    alternates: getSeoAlternates(locale, "careers"),
  };
}

export default async function CareersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return <CareersPageClient dict={dict} locale={locale} />;
}
