import { gamesData, type GameData } from "@/data/games";

export interface CaseStudyData {
  game: GameData;
  slug: string;
  shortDescription: string;
  scopeLabel: string;
  audience: string;
  services: string[];
  platforms: string[];
  engine?: string;
  releaseYear?: string;
  youtubeUrl?: string;
  externalLinks: { label: string; href: string }[];
  challenge: string;
  contribution: string;
  productionValue: string;
}

const categoryScope: Record<GameData["category"], { label: string; services: string[] }> = {
  full: {
    label: "Shipped title in full development portfolio",
    services: ["Full-cycle game development", "Gameplay production", "Art and technical production"],
  },
  codev: {
    label: "Shipped title in co-development portfolio",
    services: ["Co-development", "Production support", "Engineering and content support"],
  },
  console: {
    label: "Shipped title in console development portfolio",
    services: ["Console development", "Platform support", "Optimization support"],
  },
};

function inferAudience(genre: string) {
  if (/kids|family|casual/i.test(genre)) return "Family and casual audiences";
  return "Commercial game audiences";
}

export const caseStudies: CaseStudyData[] = gamesData.map((game) => {
  const scope = categoryScope[game.category];

  return {
    game,
    slug: game.id,
    shortDescription: `${game.title} is a shipped portfolio title from Casual Brothers, presented as production proof for publishers, IP holders and studios reviewing development support.`,
    scopeLabel: scope.label,
    audience: inferAudience(game.genre),
    services: scope.services,
    platforms: [],
    externalLinks: [],
    challenge:
      "Commercial game production requires clear scope, reliable delivery, platform awareness and the ability to protect quality under real milestone pressure.",
    contribution:
      "This case study currently uses confirmed portfolio data only. Add exact role, platform, engine, trailer and store-link details in src/data/caseStudies.ts when legally approved.",
    productionValue:
      "The title contributes to Casual Brothers' shipped portfolio proof across family, licensed, casual, co-development and console-oriented production work.",
    // TODO manual CMS fields per game: exact role/scope, platforms, engine, release year,
    // YouTube trailer URL, publisher/client names if legally allowed, external store links,
    // and approved case-study body copy.
  };
});

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
