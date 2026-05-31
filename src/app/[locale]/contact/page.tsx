import { getDictionary } from "@/i18n/getDictionary";
import ContactPageClient from "./ContactPageClient";

import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return {
    title: dict.nav.contact,
    description: dict.contact.subtitle,
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return <ContactPageClient dict={dict} />;
}
