import { getDictionary } from "@/i18n/getDictionary";
import CareersPageClient from "./CareersPageClient";

import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(locale, "careers", "careers");
}

export default async function CareersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return <CareersPageClient dict={dict} locale={locale} />;
}
