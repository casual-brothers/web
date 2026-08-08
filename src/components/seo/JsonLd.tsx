export default function JsonLd() {
  const organizationId = "https://casualbrothers.com/#organization";
  const websiteId = "https://casualbrothers.com/#website";

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: "Casual Brothers",
        legalName: "Casual Brothers Ltd.",
        url: "https://casualbrothers.com/",
        logo: "https://casualbrothers.com/images/branding/cb-digital-w.webp",
        image: "https://casualbrothers.com/images/branding/og-cover-1200x630.png",
        description:
          "Game development studio for publishers and IP owners, specializing in full-cycle development, co-development, porting, live ops, and art/tech production. 15+ titles shipped, 100M+ downloads.",
        foundingDate: "2014",
        address: {
          "@type": "PostalAddress",
          streetAddress: "1 Scholars Walk",
          addressLocality: "Horsham",
          postalCode: "RH12 1AS",
          addressCountry: "GB",
        },
        sameAs: [
          "https://www.linkedin.com/company/casual-brothers-ltd/",
          "https://discord.gg/Q9QcKMjgB6",
          "https://x.com/@casualbrothers",
          "https://www.youtube.com/@CasualBrothersltd",
        ],
        numberOfEmployees: {
          "@type": "QuantitativeValue",
          minValue: 50,
        },
        knowsAbout: [
          "Game Development",
          "Casual Game Development",
          "Hybrid Casual Game Development",
          "Co-Development",
          "Game Porting",
          "Console Porting",
          "Live Ops",
          "Unity",
          "Unreal Engine",
          "Art Production",
          "Technical Art",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          email: "contact@casualbrothers.com",
          contactType: "business development",
          availableLanguage: ["en", "es"],
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: "https://casualbrothers.com/",
        name: "Casual Brothers",
        inLanguage: ["en", "es"],
        publisher: {
          "@id": organizationId,
        },
      },
      {
        "@type": "OfferCatalog",
        "@id": "https://casualbrothers.com/#services",
        name: "Game Development Services",
        provider: {
          "@id": organizationId,
        },
        itemListElement: [
          "Full-cycle game development",
          "Game co-development",
          "Console and PC porting",
          "Live ops and growth support",
          "Art and technical art production",
        ].map((name) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name,
            serviceType: name,
            provider: {
              "@id": organizationId,
            },
            areaServed: "Worldwide",
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
