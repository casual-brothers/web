export default function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Casual Brothers",
    url: "https://casualbrothers.com",
    logo: "https://casualbrothers.com/images/branding/cb-digital-w.webp",
    description:
      "Game development studio specializing in full-cycle development, co-development, porting, and live ops. 15+ titles shipped, 100M+ downloads.",
    foundingDate: "2014",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Horsham",
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
      minValue: 20,
    },
    knowsAbout: [
      "Game Development",
      "Co-Development",
      "Game Porting",
      "Live Ops",
      "Unity",
      "Unreal Engine",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
