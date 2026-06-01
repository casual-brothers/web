import { getDictionary } from "@/i18n/getDictionary";
import ContactPageClient from "./ContactPageClient";

import type { Metadata } from "next";
import { getSeoAlternates } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return {
    title: dict.nav.contact,
    description: dict.contact.subtitle,
    alternates: getSeoAlternates(locale, "contact"),
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return <ContactPageClient dict={dict} />;
}
