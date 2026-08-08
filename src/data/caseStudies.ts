import { gamesData, type GameData } from "@/data/games";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * FICHAS DE JUEGO / GAME CASE STUDIES
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Cada juego de `games.ts` genera automáticamente una ficha en
 * /[locale]/case-studies/[slug]/ pensada como material de presentación
 * para publishers.
 *
 * Para rellenar un juego, añade una entrada en `gameOverrides` más abajo.
 * TODOS los campos son opcionales: lo que no rellenes simplemente no se
 * renderiza en la página (no deja huecos ni textos de relleno).
 *
 * Un juego sin override sigue teniendo página válida, con el texto genérico
 * por categoría, pero no aparecerá marcado como ficha completa.
 */

/** Texto en los dos idiomas del sitio. */
export type Localized = { en: string; es: string };

/** Lista de textos en los dos idiomas del sitio. */
export type LocalizedList = { en: string[]; es: string[] };

export interface ExternalLink {
  /** Etiqueta visible: "Steam", "Nintendo eShop", "App Store"… */
  label: string;
  href: string;
}

/** Devuelve la variante de idioma correcta, con caída a inglés. */
export function t(value: Localized | undefined, locale: string): string {
  if (!value) return "";
  return locale === "es" ? value.es : value.en;
}

/** Igual que `t`, para listas. */
export function tList(value: LocalizedList | undefined, locale: string): string[] {
  if (!value) return [];
  return locale === "es" ? value.es : value.en;
}

/**
 * Datos que se rellenan a mano por juego.
 * Solo información confirmada y legalmente publicable: muchos títulos son
 * IP licenciada y el nombre del cliente puede estar bajo NDA.
 */
export interface GameOverride {
  /**
   * Color de acento de la ficha, en hex.
   * Si se omite se usa el extraído automáticamente del key art (`gameAccents`).
   * Sobrescríbelo a mano cuando el color de marca del juego no coincida con
   * el tono dominante de su captura (p. ej. Barbie o Grinch).
   */
  accent?: string;
  /** Gancho de 1–2 frases. Es lo primero que lee un publisher. */
  pitch?: Localized;
  /** De qué va el juego: 2–4 frases. */
  description?: Localized;
  /** Rol exacto de Casual Brothers en la producción. */
  role?: Localized;
  platforms?: string[];
  engine?: string;
  releaseYear?: string;
  releaseDate?: string;
  status?: "released" | "upcoming";
  /** Publisher o cliente, solo si está aprobado publicarlo. */
  publisher?: string;
  /** URL de YouTube (watch, youtu.be o embed: el player las acepta todas). */
  youtubeUrl?: string;
  /** Rutas en /public para la galería. Si se omite, se usa el screenshot. */
  gallery?: string[];
  /** Imagen panorámica alternativa para la banda visual bajo la introducción. */
  secondaryImage?: string;
  /** Tiendas y webs oficiales. */
  externalLinks?: ExternalLink[];
  challenge?: Localized;
  contribution?: Localized;
  productionValue?: Localized;
}

/**
 * Acentos extraídos automáticamente del tono dominante de cada key art
 * (script: sharp + agrupación por franja de tono, ponderada por saturación).
 * Son un punto de partida sensato, no dogma: si un juego tiene un color de
 * marca claro que su captura no refleja, ponle `accent` en su override.
 */
const gameAccents: Record<string, string> = {
  marupoyo: "#eee149",
  "hot-rod-mayhem": "#e2654f",
  "grinch-2-saving-christmas": "#9cdf3a",
  "hasbro-games-junior-collection": "#46aae1",
  "cat-in-the-hat": "#3b8adf",
  grinch: "#3ad0df",
  westerner: "#df9b3a",
  matchbox: "#6ad8e7",
  "3-skulls-of-the-toltecs": "#dfa53a",
  "orc-attack": "#dfa83a",
  elf: "#3a4fdf",
  levantate: "#3a4fdf",
  ot: "#e1374a",
  "gigantosaurus-world": "#5cdff4",
  "killing-floor-2": "#3a81df",
  "monster-high": "#df3ad0",
  "evil-dead": "#df513a",
  bluey: "#e17e44",
  barbie: "#49ace1",
  "ice-age": "#df743a",
  gigantosaurus: "#c3df3a",
  "jojo-siwa": "#a83adf",
  jumanji: "#6ad4e7",
  dragons: "#3adf7e",
  "chicken-run": "#3a77df",
  transformers: "#df763a",
  "ben-10": "#50d4e2",
  "addams-family": "#dfa83a",
  trollhunters: "#3a9ddf",
  "my-little-pony": "#e7b26a",
};

/** Verde de marca: acento por defecto si un juego no tiene color propio. */
const BRAND_ACCENT = "#7cff00";

/** "#e2654f" → "226, 101, 79", para usar en rgba(var(--accent-rgb), α). */
export function hexToRgbChannels(hex: string): string {
  const clean = hex.replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const int = Number.parseInt(full, 16);
  if (Number.isNaN(int)) return "124, 255, 0";
  return `${(int >> 16) & 255}, ${(int >> 8) & 255}, ${int & 255}`;
}

export interface CaseStudyData extends GameOverride {
  game: GameData;
  slug: string;
  /** Siempre resuelto: override manual → extraído del arte → verde marca. */
  accent: string;
  shortDescription: Localized;
  scopeLabel: Localized;
  audience: Localized;
  services: LocalizedList;
  /** true si el juego tiene override propio: permite priorizar los completos. */
  isDetailed: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Textos por defecto según categoría
// ─────────────────────────────────────────────────────────────────────────────

const categoryScope: Record<GameData["category"], { label: Localized; services: LocalizedList }> = {
  full: {
    label: {
      en: "Full development",
      es: "Desarrollo completo",
    },
    services: {
      en: ["Full-cycle game development", "Gameplay production", "Art and technical production"],
      es: ["Desarrollo completo del juego", "Producción de gameplay", "Producción artística y técnica"],
    },
  },
  codev: {
    label: {
      en: "Co-development",
      es: "Co-desarrollo",
    },
    services: {
      en: ["Co-development", "Production support", "Engineering and content support"],
      es: ["Co-desarrollo", "Apoyo a producción", "Soporte de ingeniería y contenido"],
    },
  },
  console: {
    label: {
      en: "Console development",
      es: "Desarrollo en consola",
    },
    services: {
      en: ["Console development", "Platform support", "Optimization and certification"],
      es: ["Desarrollo en consola", "Soporte de plataforma", "Optimización y certificación"],
    },
  },
};

function inferAudience(genre: string): Localized {
  if (/kids|family|casual/i.test(genre)) {
    return { en: "Family and casual audiences", es: "Público familiar y casual" };
  }
  return { en: "Core game audiences", es: "Público gamer core" };
}

// ─────────────────────────────────────────────────────────────────────────────
// Fichas rellenadas a mano
// ─────────────────────────────────────────────────────────────────────────────

const gameOverrides: Record<string, GameOverride> = {
  "hot-rod-mayhem": {
    pitch: {
      en: "A chaos-fuelled arcade racer built and shipped in-house — 15 cars, wild power-ups and gravity-defying stunt tracks.",
      es: "Un arcade racer de caos puro desarrollado y lanzado en casa: 15 coches, power-ups salvajes y circuitos de acrobacias que desafían la gravedad.",
    },
    description: {
      en: "Hot Rod Mayhem is an arcade racer built around readable, high-energy fun: drift through gravity-defying turns, battle rivals with power-ups, or take on stunt challenges solo. Each of the 15 cars — from the Blazing Bullet to the Crimson Cruiser — has its own speed, handling and personality, so the roster rewards experimentation rather than a single optimal pick. The game was designed to be picked up in seconds and still hold depth for players chasing clean laps.",
      es: "Hot Rod Mayhem es un arcade racer construido alrededor de una diversión legible y de alta energía: derrapa en curvas imposibles, machaca a tus rivales con power-ups o enfréntate a los retos de acrobacias en solitario. Cada uno de los 15 coches —del Blazing Bullet al Crimson Cruiser— tiene su velocidad, manejo y personalidad, así que el garaje premia experimentar en vez de quedarse con una única opción óptima. El juego está diseñado para entenderse en segundos y seguir teniendo fondo para quien busca la vuelta perfecta.",
    },
    role: {
      en: "Original IP developed end to end by Casual Brothers: concept, gameplay, art, engineering, platform certification and launch.",
      es: "IP propia desarrollada de principio a fin por Casual Brothers: concepto, gameplay, arte, ingeniería, certificación de plataforma y lanzamiento.",
    },
    platforms: ["Nintendo Switch", "PlayStation 4", "PlayStation 5", "Xbox One", "Xbox Series X|S", "PC"],
    releaseYear: "2025",
    releaseDate: "2025-04-15",
    status: "released",
    publisher: "Casual Brothers Ltd.",
    youtubeUrl: "https://www.youtube.com/watch?v=pwo7EibsYhk",
    gallery: ["/images/Hot-Rod-Mayhem-Screenshot-1.webp"],
    externalLinks: [
      { label: "Nintendo eShop", href: "https://www.nintendo.com/us/store/products/hot-rod-mayhem-switch/" },
      { label: "Steam", href: "https://store.steampowered.com/app/3062040/Hot_Rod_Mayhem/" },
      { label: "Xbox", href: "https://www.xbox.com/en-US/games/store/hot-rod-mayhem/9P5TWZN4G3FB" },
    ],
    challenge: {
      en: "Arcade racing lives or dies on feel. The challenge was making 15 distinct cars that all feel good to drive while keeping the handling readable enough for a family audience, and holding a stable frame rate on Switch with heavy stunt geometry and power-up VFX on screen.",
      es: "Un arcade racer se sostiene o se hunde por el tacto. El reto era que 15 coches distintos se sintieran bien todos, manteniendo un manejo lo bastante legible para público familiar, y sostener un frame rate estable en Switch con geometría de acrobacias pesada y VFX de power-ups en pantalla.",
    },
    contribution: {
      en: "Full-cycle production in-house: design, art pipeline, vehicle physics, track authoring, UI, optimization and Nintendo certification — with the whole team under one roof and one milestone plan.",
      es: "Producción de ciclo completo en casa: diseño, pipeline de arte, física de vehículos, autoría de circuitos, UI, optimización y certificación de Nintendo, con todo el equipo bajo un mismo techo y un mismo plan de hitos.",
    },
    productionValue: {
      en: "Hot Rod Mayhem is proof that Casual Brothers can own a commercial title from blank page to a certified console release, not just contribute to someone else's pipeline.",
      es: "Hot Rod Mayhem demuestra que Casual Brothers puede llevar un título comercial desde la página en blanco hasta un lanzamiento certificado en consola, no solo aportar dentro del pipeline de otro.",
    },
  },

  marupoyo: {
    pitch: {
      en: "A tilt-based platformer about a chick born too round to walk — he can only roll. Two play modes, one for cozy players and one for challenge hunters.",
      es: "Un plataformas de inclinación sobre un pollito nacido demasiado redondo para caminar: solo puede rodar. Dos modos de juego, uno para jugar tranquilo y otro para cazadores de retos.",
    },
    description: {
      en: "Marupoyo is a chick born so round he can't walk — only roll. Mocked for his clumsiness, he becomes his village's only hope when a tornado scatters his family across the kingdom. Guided by the Queen of Nature, he rolls through forests, icy mountains, deserts and volcanoes to stop an exiled Alchemist whose experiments are tearing the world apart. Family Mode removes death entirely for players who want a cozy run; Gamer Mode adds speed, hazards, time trials and badges for finishing without losing a life — or without ever touching the brakes.",
      es: "Marupoyo es un pollito nacido tan redondo que no puede andar: solo rodar. Tras ser el hazmerreír por su torpeza, se convierte en la única esperanza de su aldea cuando un tornado dispersa a su familia por todo el reino. Guiado por la Reina de la Naturaleza, rueda por bosques, montañas heladas, desiertos y volcanes para detener a un Alquimista exiliado cuyos experimentos están destrozando el mundo. El Modo Familiar elimina la muerte por completo para quien quiera una partida tranquila; el Modo Gamer añade velocidad, peligros, contrarreloj e insignias por terminar sin perder una vida — o sin tocar el freno ni una vez.",
    },
    role: {
      en: "Original IP developed end to end by Casual Brothers, including the dual-mode design that lets one build serve both family and core players.",
      es: "IP propia desarrollada de principio a fin por Casual Brothers, incluido el diseño de modo dual que permite que una misma build sirva a público familiar y a jugadores core.",
    },
    platforms: ["Nintendo Switch 2"],
    releaseYear: "2026",
    releaseDate: "2026-11-26",
    status: "upcoming",
    publisher: "Casual Brothers Ltd.",
    youtubeUrl: "https://www.youtube.com/watch?v=K9njOxhigCU",
    externalLinks: [
      { label: "Nintendo", href: "https://www.nintendo.com/en-gb/Games/Nintendo-Switch-2-games/Marupoyo-The-Round-Chick-s-Adventure-3150492.html" },
    ],
    challenge: {
      en: "A character who can only roll removes the platformer's core verb — jumping on demand. Every level had to be authored around momentum instead of precision, and the same geometry had to stay fair in a no-death family run and demanding in a timed expert run.",
      es: "Un personaje que solo puede rodar elimina el verbo central del plataformas: saltar cuando quieras. Cada nivel tuvo que diseñarse alrededor del momento en vez de la precisión, y la misma geometría tenía que seguir siendo justa en una partida familiar sin muertes y exigente en una partida experta a contrarreloj.",
    },
    contribution: {
      en: "In-house design, art direction, physics tuning, level authoring, accessibility modes and platform delivery across Switch and Switch 2.",
      es: "Diseño, dirección de arte, ajuste de físicas, autoría de niveles, modos de accesibilidad y entrega de plataforma en Switch y Switch 2, todo interno.",
    },
    productionValue: {
      en: "Marupoyo shows the studio building an original character IP with a distinctive mechanic and a difficulty structure that widens the addressable audience instead of splitting it.",
      es: "Marupoyo muestra al estudio construyendo una IP de personaje original con una mecánica distintiva y una estructura de dificultad que amplía el público objetivo en vez de dividirlo.",
    },
  },

  "3-skulls-of-the-toltecs": {
    pitch: {
      en: "A classic point-and-click adventure rebuilt for modern players, driven by character, puzzles and a strong western comic voice.",
      es: "Una aventura gráfica clásica adaptada para jugadores actuales, impulsada por personajes, puzles y una voz western muy reconocible.",
    },
    description: {
      en: "Follow Fenimore Fillmore through a treasure hunt shaped by dialogue, exploration and puzzle solving. The page positions the title as part of Casual Brothers' heritage in authored adventure games.",
      es: "Acompaña a Fenimore Fillmore en una búsqueda del tesoro construida sobre diálogos, exploración y resolución de puzles. La ficha sitúa el título dentro de la herencia de Casual Brothers en aventuras con autoría propia.",
    },
    platforms: ["PC"],
    releaseYear: "1996",
    status: "released",
  },

  "orc-attack": {
    pitch: {
      en: "A comic co-op beat-'em-up where four orcs turn flatulence into a ridiculous, readable combat system.",
      es: "Un beat-'em-up cooperativo y cómico donde cuatro orcos convierten las flatulencias en un sistema de combate tan absurdo como legible.",
    },
    description: {
      en: "Orc Attack is an early Casual Brothers action project built around four-player co-op, exaggerated characters and a deliberately irreverent tone.",
      es: "Orc Attack es un proyecto de acción temprano de Casual Brothers construido alrededor del cooperativo para cuatro jugadores, personajes exagerados y un tono deliberadamente irreverente.",
    },
    platforms: ["PC", "PlayStation 3", "Xbox 360"],
    releaseYear: "2013",
    status: "released",
    publisher: "Casual Brothers",
  },

  elf: {
    pitch: {
      en: "A festive platforming adventure about becoming a Scout Elf, restoring Christmas Spirit and helping Santa save the season.",
      es: "Una aventura festiva de plataformas sobre convertirse en Scout Elf, recuperar el espíritu navideño y ayudar a Santa a salvar la temporada.",
    },
    description: {
      en: "Train at the North Pole, explore magical levels, complete minigames and customize a Scout Elf hero across a family-friendly Christmas adventure.",
      es: "Entrena en el Polo Norte, explora niveles mágicos, completa minijuegos y personaliza a tu héroe Scout Elf en una aventura navideña para toda la familia.",
    },
    role: {
      en: "Developed by Casual Brothers with Outright Games and The Lumistella Company.",
      es: "Desarrollado por Casual Brothers junto a Outright Games y The Lumistella Company.",
    },
    platforms: ["Nintendo Switch", "PlayStation 4", "PlayStation 5", "Xbox One", "Xbox Series X|S", "PC"],
    releaseYear: "2025",
    status: "released",
    publisher: "Outright Games",
    youtubeUrl: "https://www.youtube.com/watch?v=nkbZZP8jYZU",
  },

  levantate: {
    pitch: {
      en: "A Spanish karaoke and party game built around the songs, clips and show energy of Levántate: All Stars.",
      es: "Un juego español de karaoke y fiesta construido alrededor de las canciones, videoclips y energía televisiva de Levántate: All Stars.",
    },
    description: {
      en: "Sing alone or with up to three friends, compete in show mode and use the multimedia mode to revisit official clips and favourite songs from the programme.",
      es: "Canta solo o con hasta tres amigos, compite en el modo show y usa el modo multimedia para volver a los videoclips oficiales y a las canciones favoritas del programa.",
    },
    platforms: ["Nintendo Switch"],
    releaseYear: "2017",
    status: "released",
    publisher: "BadLand Publishing",
    externalLinks: [{ label: "Nintendo", href: "https://www.nintendo.com/es-es/Juegos/Juegos-de-Nintendo-Switch/Levantate-All-Stars-1309079.html" }],
  },

  ot: {
    pitch: {
      en: "A TV-show karaoke experience that turns Operación Triunfo 2017 into a local party for up to four players.",
      es: "Una experiencia de karaoke televisivo que convierte Operación Triunfo 2017 en una fiesta local para hasta cuatro jugadores.",
    },
    description: {
      en: "Sing the edition's best-known songs, compete in Show mode, duet in Karaoke mode and revisit memorable moments in Multimedia mode.",
      es: "Canta las canciones más conocidas de la edición, compite en el Modo Show, canta a dúo en Karaoke y revive momentos memorables en el Modo Multimedia.",
    },
    role: {
      en: "Developed by Casual Brothers with BadLand Publishing, Gestmusic, RTVE and El Ocho.",
      es: "Desarrollado por Casual Brothers junto a BadLand Publishing, Gestmusic, RTVE y El Ocho.",
    },
    platforms: ["Nintendo Switch", "PlayStation 4"],
    releaseYear: "2018",
    status: "released",
    publisher: "BadLand Publishing",
    externalLinks: [{ label: "Nintendo", href: "https://www.nintendo.com/es-es/Juegos/Juegos-de-Nintendo-Switch/Operacion-Triunfo-2017-1476924.html" }],
  },

  "grinch-2-saving-christmas": {
    pitch: {
      en: "A festive 3D platforming adventure where the Grinch and Max turn a Christmas tree into a co-op mission.",
      es: "Una aventura festiva de plataformas 3D donde el Grinch y Max convierten un árbol de Navidad en una misión cooperativa.",
    },
    description: {
      en: "Explore Who-ville, Mt. Crumpit and the Grinch's Cave while collecting ornaments, mastering Rocket Skates and solving accessible platforming challenges. The local co-op structure lets one player take the Grinch and another play as Max.",
      es: "Explora Villaquién, el Monte Crumpit y la Cueva del Grinch mientras recoges adornos, dominas los patines a reacción y superas retos de plataformas accesibles. La cooperativa local permite que un jugador controle al Grinch y otro a Max.",
    },
    role: {
      en: "Developed by Casual Brothers with Outright Games for a licensed, family-focused console and PC release.",
      es: "Desarrollado por Casual Brothers junto a Outright Games para un lanzamiento familiar licenciado en consola y PC.",
    },
    platforms: ["Nintendo Switch", "PlayStation 4", "PlayStation 5", "Xbox Series X|S", "PC"],
    releaseYear: "2026",
    releaseDate: "2026-09-18",
    status: "upcoming",
    publisher: "Outright Games",
    youtubeUrl: "https://www.youtube.com/watch?v=QmsSdyo4BzQ",
    externalLinks: [{ label: "Official game page", href: "https://outrightgames.com/game/the-grinch-2-saving-christmas/" }],
  },

  "hasbro-games-junior-collection": {
    pitch: {
      en: "Three classic Hasbro Junior games brought together in a colourful, easy-to-learn local multiplayer collection.",
      es: "Tres juegos clásicos de Hasbro Junior reunidos en una colección colorida, accesible y pensada para multijugador local.",
    },
    description: {
      en: "Monopoly Jr., Cluedo Jr. and The Game of Life Jr. become a compact digital collection with custom avatars, unlockable rewards and play for up to four people on one console.",
      es: "Monopoly Junior, Cluedo Junior y The Game of Life Junior forman una colección digital compacta con avatares personalizables, recompensas desbloqueables y partidas de hasta cuatro personas en una consola.",
    },
    role: {
      en: "Developed by Casual Brothers with Outright Games and Hasbro, with a focus on readable family play and fast local sessions.",
      es: "Desarrollado por Casual Brothers junto a Outright Games y Hasbro, con foco en partidas familiares legibles y sesiones locales rápidas.",
    },
    platforms: ["Nintendo Switch", "Nintendo Switch 2", "PlayStation 4", "PlayStation 5", "Xbox Series X|S", "PC"],
    releaseYear: "2026",
    releaseDate: "2026-11-06",
    status: "upcoming",
    publisher: "Outright Games",
    youtubeUrl: "https://www.youtube.com/watch?v=XCBjoeFX-e4",
    externalLinks: [{ label: "Official game page", href: "https://outrightgames.com/game/hasbro-games-junior-collection/" }],
  },

  "cat-in-the-hat": {
    pitch: {
      en: "A playful party collection inspired by Dr. Seuss, built around fast rounds, approachable controls and four-player mayhem.",
      es: "Una colección de party games inspirada en Dr. Seuss, construida sobre rondas rápidas, controles accesibles y caos para cuatro jugadores.",
    },
    description: {
      en: "Choose between Find The Cat and a set of minigames including cake decorating and snowball throwing. Different difficulty levels and simple controls make the experience easy to share across the whole family.",
      es: "Elige entre Find The Cat y un conjunto de minijuegos de decoración de tartas y lanzamiento de bolas de nieve. Los distintos niveles de dificultad y los controles sencillos hacen que sea fácil compartirlo en familia.",
    },
    role: {
      en: "Developed by Casual Brothers with Outright Games as a family party game based on the Dr. Seuss property.",
      es: "Desarrollado por Casual Brothers junto a Outright Games como party game familiar basado en la propiedad de Dr. Seuss.",
    },
    platforms: ["Nintendo Switch", "PlayStation 5", "Xbox Series X|S", "PC"],
    releaseYear: "2026",
    status: "upcoming",
    publisher: "Outright Games",
    youtubeUrl: "https://www.youtube.com/watch?v=ocSG0OKEGog",
    secondaryImage: "/images/Cat-In-The-Hat-Screenshot.webp",
    externalLinks: [{ label: "Official game page", href: "https://outrightgames.com/game/the-cat-in-the-hat-rainy-day-mayhem/" }],
  },

  grinch: {
    pitch: {
      en: "A stealthy 2D Christmas platformer that turns the Grinch's present-stealing plan into a readable, characterful adventure.",
      es: "Un plataformas 2D navideño y sigiloso que convierte el plan del Grinch para robar regalos en una aventura clara y con personalidad.",
    },
    description: {
      en: "Sneak through Who-ville, use the Santa Costume and Candy Cane Lasso, and combine snowballs with stealth to grab every present. The game balances a strong licensed identity with an approachable platforming loop.",
      es: "Avanza a escondidas por Villaquién, usa el disfraz de Santa y el lazo de bastón de caramelo, y combina bolas de nieve con sigilo para robar todos los regalos. El juego equilibra una identidad licenciada potente con un bucle de plataformas accesible.",
    },
    role: {
      en: "Developed by Casual Brothers with Outright Games for a multi-platform licensed launch.",
      es: "Desarrollado por Casual Brothers junto a Outright Games para un lanzamiento multiplataforma licenciado.",
    },
    platforms: ["Nintendo Switch", "PlayStation 4", "PlayStation 5", "Xbox One", "Xbox Series X|S", "PC"],
    releaseYear: "2023",
    status: "released",
    publisher: "Outright Games",
    youtubeUrl: "https://www.youtube.com/watch?v=J8ej4nZaCs0",
    externalLinks: [{ label: "Official game page", href: "https://outrightgames.com/game/the-grinch-christmas-adventures/" }],
  },

  westerner: {
    pitch: {
      en: "A characterful western adventure with a clear authored world, comic tone and classic point-and-click DNA.",
      es: "Una aventura western con un mundo propio reconocible, tono cómico y ADN clásico de aventura gráfica.",
    },
    description: {
      en: "Westerner is presented as a portfolio example of Casual Brothers' earlier adventure work, with emphasis on world-building, character animation and puzzle-led progression.",
      es: "Westerner se presenta como una muestra del trabajo de aventura de Casual Brothers, con énfasis en construcción de mundo, animación de personajes y progresión basada en puzles.",
    },
    platforms: ["PC"],
    releaseYear: "2004",
    status: "released",
  },

  matchbox: {
    pitch: {
      en: "A competitive driving adventure with six locations, rescue missions, local co-op and authentic Matchbox vehicles.",
      es: "Una aventura de conducción competitiva con seis localizaciones, misiones de rescate, cooperativo local y vehículos Matchbox auténticos.",
    },
    description: {
      en: "Drive through city, beach, mountain, arctic, jungle and volcano locations in Adventure Mode, then switch to Competition Mode for 14 tracks. The structure keeps the toy-inspired fantasy readable while giving players room to improve.",
      es: "Conduce por ciudad, playa, montaña, ártico, jungla y volcán en el Modo Aventura, y cambia al Modo Competición para recorrer 14 pistas. La estructura mantiene clara la fantasía de juguete y deja espacio para mejorar.",
    },
    role: {
      en: "Developed by Casual Brothers with Outright Games and Mattel, from vehicle handling through platform delivery.",
      es: "Desarrollado por Casual Brothers junto a Outright Games y Mattel, desde el manejo de vehículos hasta la entrega multiplataforma.",
    },
    platforms: ["Nintendo Switch", "PlayStation 4", "PlayStation 5", "Xbox One", "Xbox Series X|S", "PC"],
    releaseYear: "2024",
    status: "released",
    publisher: "Outright Games",
    youtubeUrl: "https://www.youtube.com/watch?v=HsdQDLtuycg",
    externalLinks: [{ label: "Official game page", href: "https://outrightgames.com/game/matchbox-driving-adventures/" }],
  },

  "killing-floor-2": {
    pitch: {
      en: "A high-intensity co-development contribution for a wave-based horror FPS built around weapon feel, enemy readability and co-op pressure.",
      es: "Una contribución de co-desarrollo de alta intensidad para un FPS de horror por oleadas centrado en el tacto de las armas, la lectura de enemigos y la presión cooperativa.",
    },
    description: {
      en: "Killing Floor 2 is represented here as co-development work inside a demanding live game pipeline, where performance, combat feedback and repeatable encounters have to remain consistent under pressure.",
      es: "Killing Floor 2 se representa aquí como trabajo de co-desarrollo dentro de un pipeline exigente, donde el rendimiento, la respuesta del combate y los encuentros repetibles deben mantenerse consistentes bajo presión.",
    },
    platforms: ["PlayStation 4", "PlayStation 5", "Xbox One", "Xbox Series X|S", "PC"],
    releaseYear: "2016",
    status: "released",
    publisher: "Tripwire Interactive",
  },

  "monster-high": {
    pitch: {
      en: "A spooky school mystery where character creation, exploration and readable platforming meet a strong fashion-doll identity.",
      es: "Un misterio escolar monstruoso donde la creación de personajes, la exploración y las plataformas legibles se encuentran con una fuerte identidad de muñecas de moda.",
    },
    description: {
      en: "Create a unique monster, explore the halls of Monster High and join Clawdeen, Draculaura and Frankie to uncover the Hidden Rooms. The experience combines accessible exploration with a strong customization loop.",
      es: "Crea un monstruo único, explora los pasillos de Monster High y únete a Clawdeen, Draculaura y Frankie para descubrir las Salas Ocultas. La experiencia combina exploración accesible con un potente bucle de personalización.",
    },
    role: {
      en: "Co-developed by Casual Brothers and Petoons Studio with Outright Games and Mattel.",
      es: "Co-desarrollado por Casual Brothers y Petoons Studio junto a Outright Games y Mattel.",
    },
    platforms: ["Nintendo Switch", "PlayStation 4", "PlayStation 5", "Xbox One", "Xbox Series X|S", "PC"],
    releaseYear: "2024",
    status: "released",
    publisher: "Outright Games",
    youtubeUrl: "https://www.youtube.com/watch?v=VMd9QxjQIlc",
    externalLinks: [{ label: "Official game page", href: "https://outrightgames.com/game/monster-high-skulltimate-secrets/" }],
  },

  "evil-dead": {
    pitch: {
      en: "A horror co-development project that brings iconic characters, asymmetrical multiplayer and heavy combat feedback together.",
      es: "Un proyecto de co-desarrollo de horror que reúne personajes icónicos, multijugador asimétrico y una respuesta de combate contundente.",
    },
    description: {
      en: "Evil Dead: The Game puts survivors and the Kandarian Demon on opposite sides of a tense multiplayer match. The case study highlights production in a licensed horror universe with demanding combat and atmosphere requirements.",
      es: "Evil Dead: The Game enfrenta a supervivientes y al Demonio Kandariano en partidas multijugador tensas. El caso muestra producción dentro de un universo de horror licenciado con exigencias altas de combate y atmósfera.",
    },
    platforms: ["PlayStation 4", "PlayStation 5", "Xbox One", "Xbox Series X|S", "PC"],
    releaseYear: "2022",
    status: "released",
    publisher: "Saber Interactive",
    youtubeUrl: "https://www.youtube.com/watch?v=RFn01wcLLgk",
    externalLinks: [{ label: "Official game page", href: "https://www.evildeadthegame.com/esp/" }],
  },

  bluey: {
    pitch: {
      en: "A warm, accessible co-development project that translates Bluey's everyday imagination into four-player family play.",
      es: "Un proyecto de co-desarrollo cercano y accesible que convierte la imaginación cotidiana de Bluey en juego familiar para cuatro jugadores.",
    },
    description: {
      en: "Explore the Heeler House, the Creek and the beach across a brand-new story, with familiar games such as Keepy Uppy, Chattermax Chase and Ground is Lava. Collectibles, costumes and local co-op keep the experience welcoming for young players.",
      es: "Explora la casa de los Heeler, el arroyo y la playa en una historia nueva, con juegos conocidos como Keepy Uppy, Chattermax Chase y El suelo es lava. Los coleccionables, disfraces y el cooperativo local hacen que la experiencia sea acogedora para los más pequeños.",
    },
    role: {
      en: "Co-developed by Casual Brothers and Artax Games with Outright Games and BBC Studios/Ludo Studio licensing.",
      es: "Co-desarrollado por Casual Brothers y Artax Games junto a Outright Games bajo licencia de BBC Studios/Ludo Studio.",
    },
    platforms: ["Nintendo Switch", "PlayStation 4", "PlayStation 5", "Xbox One", "Xbox Series X|S", "PC"],
    releaseYear: "2023",
    status: "released",
    publisher: "Outright Games",
    youtubeUrl: "https://www.youtube.com/watch?v=nC7dKKQ7ZqQ",
    externalLinks: [{ label: "Official game page", href: "https://outrightgames.com/game/bluey-the-videogame/" }],
  },

  barbie: {
    pitch: {
      en: "A bright, social adventure about restoring a community landmark through quests, minigames and creative customization.",
      es: "Una aventura luminosa y social sobre recuperar un espacio comunitario mediante misiones, minijuegos y personalización creativa.",
    },
    description: {
      en: "Barbie Project Friendship turns the Malibu Waves Community Center into a playful hub for quests, activities and unlockable style upgrades, with a tone designed to welcome players and families.",
      es: "Barbie Project Friendship convierte el Malibu Waves Community Center en un espacio de misiones, actividades y mejoras de estilo desbloqueables, con un tono pensado para jugadores y familias.",
    },
    platforms: ["Nintendo Switch", "PlayStation 4", "PlayStation 5", "Xbox One", "Xbox Series X|S", "PC"],
    releaseYear: "2024",
    status: "released",
    publisher: "Mindscape",
    youtubeUrl: "https://www.youtube.com/watch?v=KMiRszuKHw0",
  },

  "ice-age": {
    pitch: {
      en: "A character-led 3D platforming adventure where Scrat chases Crystal Nuts through classic Ice Age locations.",
      es: "Una aventura de plataformas 3D protagonizada por Scrat, que persigue las Nueces de Cristal por localizaciones clásicas de Ice Age.",
    },
    description: {
      en: "Climb, dig, sneak and slide through four stages, face prehistoric enemies and discover hidden abilities in a compact family adventure built around Scrat's expressive physical comedy.",
      es: "Trepa, excava, escóndete y deslízate por cuatro fases, enfréntate a enemigos prehistóricos y descubre habilidades ocultas en una aventura familiar compacta construida alrededor de la comedia física de Scrat.",
    },
    platforms: ["Nintendo Switch", "PlayStation 4", "Xbox One", "PC"],
    releaseYear: "2019",
    status: "released",
    publisher: "Bandai Namco Entertainment Europe",
    youtubeUrl: "https://www.youtube.com/watch?v=1h9utBJ0gAM",
  },

  "gigantosaurus-world": {
    pitch: {
      en: "A colourful prehistoric world built around exploration, friendly characters and an approachable family-first adventure loop.",
      es: "Un mundo prehistórico lleno de color construido alrededor de la exploración, personajes cercanos y un bucle de aventura familiar accesible.",
    },
    description: {
      en: "Gigantosaurus World is presented as a separate portfolio entry from Gigantosaurus: The Game, giving the studio a place to show its experience with large-scale licensed worlds and family-oriented interaction.",
      es: "Gigantosaurus World se presenta como una entrada de portfolio distinta de Gigantosaurus: The Game, para mostrar la experiencia del estudio con mundos licenciados amplios e interacción orientada a familias.",
    },
    platforms: ["Nintendo Switch", "PlayStation 4", "Xbox One", "PC"],
    status: "released",
    publisher: "Outright Games",
    youtubeUrl: "https://www.youtube.com/watch?v=r504D8u7DqM",
  },

  gigantosaurus: {
    pitch: {
      en: "A colourful dinosaur adventure combining exploration, puzzles, racing and four-player family play.",
      es: "Una aventura de dinosaurios llena de color que combina exploración, puzles, carreras y juego familiar para cuatro jugadores.",
    },
    description: {
      en: "Play as Rocky, Tiny, Mazu or Bill, explore the prehistoric world, solve puzzles and switch into racing challenges. The project translates the show's ensemble of characters into a readable co-op adventure.",
      es: "Juega como Rocky, Tiny, Mazu o Bill, explora el mundo prehistórico, resuelve puzles y cambia a retos de carreras. El proyecto convierte el reparto de la serie en una aventura cooperativa clara.",
    },
    platforms: ["Nintendo Switch", "PlayStation 4", "Xbox One", "PC"],
    releaseYear: "2020",
    status: "released",
    publisher: "Outright Games",
    youtubeUrl: "https://www.youtube.com/watch?v=bAwn30euRgY",
  },

  "jojo-siwa": {
    pitch: {
      en: "A rhythm-led adventure where movement, music and collectible style turn JoJo Siwa's worlds into a playable party.",
      es: "Una aventura guiada por el ritmo donde movimiento, música y estilo coleccionable convierten los mundos de JoJo Siwa en una fiesta jugable.",
    },
    description: {
      en: "Run through ten fantasy lands, perform dance routines, collect bows and unlock vehicles while listening to JoJo's songs. The design links simple platforming actions to a bright, music-first progression loop.",
      es: "Recorre diez mundos de fantasía, ejecuta coreografías, recoge lazos y desbloquea vehículos mientras escuchas canciones de JoJo. El diseño conecta acciones de plataformas sencillas con una progresión luminosa centrada en la música.",
    },
    platforms: ["Nintendo Switch", "PlayStation 4", "PlayStation 5", "Xbox One", "PC"],
    releaseYear: "2022",
    status: "released",
    publisher: "Outright Games",
    youtubeUrl: "https://www.youtube.com/watch?v=zzQI-8fE-vI",
    externalLinks: [{ label: "Official game page", href: "https://outrightgames.com/game/jojo-siwa-worldwide-party/" }],
  },

  jumanji: {
    pitch: {
      en: "A co-op action adventure that turns Jumanji's four playable heroes into a compact, replayable team challenge.",
      es: "Una aventura de acción cooperativa que convierte a los cuatro héroes jugables de Jumanji en un reto de equipo compacto y rejugable.",
    },
    description: {
      en: "Choose Dr. Bravestone, Ruby, Mouse or Professor Oberon, combine their abilities and work together online, in split-screen or with AI teammates to escape the game.",
      es: "Elige a Bravestone, Ruby, Mouse o el profesor Oberon, combina sus habilidades y coopera online, a pantalla dividida o con compañeros controlados por la IA para escapar del juego.",
    },
    platforms: ["Nintendo Switch", "PlayStation 4", "Xbox One", "PC"],
    releaseYear: "2019",
    status: "released",
    publisher: "Outright Games",
    youtubeUrl: "https://www.youtube.com/watch?v=0uDpcF1SHHg",
  },

  dragons: {
    pitch: {
      en: "A focused action adventure about rebuilding a dragon sanctuary through exploration, combat and light puzzle solving.",
      es: "Una aventura de acción concentrada en reconstruir un santuario de dragones mediante exploración, combate y puzles ligeros.",
    },
    description: {
      en: "Recover Scribbler's memories, build a friendship with Patch, unlock new abilities and swap between rider and dragon to cross Havenholme, Valka's Mountain and Blood Briar Island.",
      es: "Recupera la memoria de Scribbler, crea un vínculo con Patch, desbloquea nuevas habilidades y alterna entre jinete y dragón para recorrer Havenholme, la Montaña de Valka y Blood Briar Island.",
    },
    platforms: ["Nintendo Switch", "PlayStation 4", "Xbox One", "PC"],
    releaseYear: "2019",
    status: "released",
    publisher: "Outright Games",
    youtubeUrl: "https://www.youtube.com/watch?v=a9HHW-gecxY",
  },

  "chicken-run": {
    pitch: {
      en: "A stealth-and-strategy adventure where a brave chicken crew infiltrates twisted farms and brings its flock home.",
      es: "Una aventura de sigilo y estrategia donde un equipo de gallinas se infiltra en granjas retorcidas para liberar a su bandada.",
    },
    description: {
      en: "Sneak, solve puzzles and coordinate the flock across a new Chicken Run story, with a compact co-op structure and the series' characteristic comic timing.",
      es: "Infíltrate, resuelve puzles y coordina a la bandada en una nueva historia de Chicken Run, con una estructura cooperativa compacta y el característico humor de la saga.",
    },
    platforms: ["Nintendo Switch", "PlayStation 5", "Xbox Series X|S", "PC"],
    releaseYear: "2025",
    status: "released",
    publisher: "Outright Games",
    youtubeUrl: "https://www.youtube.com/watch?v=GOUTUOaPMs8",
  },

  transformers: {
    pitch: {
      en: "A tactical Transformers experience where squad composition, cover and Energon abilities drive every turn.",
      es: "Una experiencia táctica de Transformers donde la composición del escuadrón, la cobertura y las habilidades de Energon marcan cada turno.",
    },
    description: {
      en: "Lead Bumblebee, Windblade, Optimus Prime and the Autobots from Central City to Cybertron, then take the battle into local arcade modes against the Decepticons.",
      es: "Lidera a Bumblebee, Windblade, Optimus Prime y los Autobots desde Central City hasta Cybertron, y lleva la batalla a los modos arcade locales contra los Decepticons.",
    },
    platforms: ["Nintendo Switch", "PlayStation 4", "Xbox One", "PC"],
    releaseYear: "2020",
    status: "released",
    publisher: "Outright Games",
    youtubeUrl: "https://www.youtube.com/watch?v=w0ofljv4uoM",
  },

  "ben-10": {
    pitch: {
      en: "A 3D Ben 10 adventure that combines alien transformations, combat, exploration and local co-op with Kevin 11.",
      es: "Una aventura 3D de Ben 10 que combina transformaciones alienígenas, combate, exploración y cooperativo local con Kevin 11.",
    },
    description: {
      en: "Travel through a European road-trip adventure, unlock alien forms, solve puzzles and stop Hex's plan with the Omnitrix — with drop-in, drop-out co-op for a second player.",
      es: "Recorre una aventura de road trip europeo, desbloquea formas alienígenas, resuelve puzles y detén el plan de Hex con el Omnitrix, con cooperativo local para un segundo jugador.",
    },
    platforms: ["Nintendo Switch", "PlayStation 4", "Xbox One", "PC"],
    releaseYear: "2020",
    status: "released",
    publisher: "Outright Games",
    youtubeUrl: "https://www.youtube.com/watch?v=SVkS4zfcIcg",
  },

  "addams-family": {
    pitch: {
      en: "A four-player 3D platforming adventure where the Addams family protects its mansion through puzzles and competitive minigames.",
      es: "Una aventura de plataformas 3D para cuatro jugadores donde la familia Addams protege su mansión con puzles y minijuegos competitivos.",
    },
    description: {
      en: "Play as Wednesday, Pugsley, Gomez or Morticia, use each character's special ability and piece together the mansion's history while playing solo or together on one screen.",
      es: "Juega como Wednesday, Pugsley, Gomez o Morticia, usa la habilidad especial de cada personaje y reconstruye la historia de la mansión en solitario o juntos en la misma pantalla.",
    },
    platforms: ["Nintendo Switch", "PlayStation 4", "Xbox One", "PC"],
    releaseYear: "2021",
    status: "released",
    publisher: "Outright Games",
    youtubeUrl: "https://www.youtube.com/watch?v=noyzvGi4pRI",
    externalLinks: [{ label: "Official game page", href: "https://outrightgames.com/us/games/the-addams-family-mansion-mayhem/" }],
  },

  trollhunters: {
    pitch: {
      en: "A time-bending action platformer where Jim Lake Jr. and Claire defend Arcadia together on the couch.",
      es: "Un plataformas de acción con viajes temporales donde Jim Lake Jr. y Claire defienden Arcadia juntos desde el sofá.",
    },
    description: {
      en: "Stop Porgon the Trickster Troll, upgrade armour and abilities, and combine the strengths of the Trollhunters in a compact adventure with local co-op.",
      es: "Detén a Porgon el Troll Embaucador, mejora la armadura y las habilidades, y combina las fortalezas de los Trollhunters en una aventura compacta con cooperativo local.",
    },
    platforms: ["Nintendo Switch", "PlayStation 4", "Xbox One", "PC"],
    releaseYear: "2020",
    status: "released",
    publisher: "Outright Games",
    youtubeUrl: "https://www.youtube.com/watch?v=xb3de_08GJs",
    externalLinks: [{ label: "Official game page", href: "https://outrightgames.com/game/trollhunters-defenders-of-arcadia/" }],
  },

  "my-little-pony": {
    pitch: {
      en: "A friendship-led adventure about bringing magic back to Maretime Bay through quests, fashion and playful minigames.",
      es: "Una aventura guiada por la amistad sobre devolver la magia a Maretime Bay con misiones, moda y minijuegos.",
    },
    description: {
      en: "Play as Sunny, explore Maretime Bay, help friends prepare the festival, customize your pony and invite a second player into local multiplayer activities.",
      es: "Juega como Sunny, explora Maretime Bay, ayuda a tus amigos a preparar el festival, personaliza tu poni e invita a un segundo jugador a las actividades multijugador locales.",
    },
    platforms: ["Nintendo Switch", "PlayStation 4", "Xbox One", "PC"],
    releaseYear: "2022",
    status: "released",
    publisher: "Outright Games",
    youtubeUrl: "https://www.youtube.com/watch?v=WNh4wrdYYjA",
    externalLinks: [{ label: "Official game page", href: "https://outrightgames.com/game/my-little-pony-a-maretime-bay-adventure/" }],
  },
};

// ─────────────────────────────────────────────────────────────────────────────

export const caseStudies: CaseStudyData[] = gamesData.map((game) => {
  const scope = categoryScope[game.category];
  const override = gameOverrides[game.id];

  return {
    game,
    slug: game.id,
    accent: override?.accent ?? gameAccents[game.id] ?? BRAND_ACCENT,
    scopeLabel: scope.label,
    audience: inferAudience(game.genre),
    services: scope.services,
    isDetailed: Boolean(override),
    shortDescription:
      override?.pitch ?? {
        en: `${game.title} is a shipped title from the Casual Brothers portfolio, presented as production proof for publishers, IP holders and studios.`,
        es: `${game.title} es un título lanzado del portfolio de Casual Brothers, presentado como prueba de producción para publishers, titulares de IP y estudios.`,
      },
    description: override?.description ?? {
      en: `${game.title} is part of the Casual Brothers ${scope.label.en.toLowerCase()} portfolio. Its ${game.genre.toLowerCase()} positioning reflects the studio's experience delivering audience-focused games for publishers, IP owners and platform holders.`,
      es: `${game.title} forma parte del portfolio de ${scope.label.es.toLowerCase()} de Casual Brothers. Su propuesta ${game.genre.toLowerCase()} refleja la experiencia del estudio creando juegos orientados a audiencias concretas para publishers, titulares de IP y plataformas.`,
    },
    role: override?.role ?? {
      en: `Casual Brothers contributed to this ${scope.label.en.toLowerCase()} title as part of its shipped games portfolio. Public production credits are available on request.`,
      es: `Casual Brothers participó en este título de ${scope.label.es.toLowerCase()} como parte de su portfolio de juegos lanzados. Los créditos públicos de producción están disponibles bajo petición.`,
    },
    challenge: {
      en: `${game.title} required a production approach that kept its ${game.genre.toLowerCase()} identity readable while protecting quality, scope and delivery across the target audience and platforms.`,
      es: `${game.title} exigió un enfoque de producción capaz de mantener clara su identidad ${game.genre.toLowerCase()} y proteger calidad, alcance y entrega para su audiencia y plataformas objetivo.`,
    },
    contribution: {
      en: `The public breakdown for Casual Brothers' contribution to ${game.title} is intentionally concise. Contact the studio for the approved scope, team composition and delivery context.`,
      es: `El desglose público de la contribución de Casual Brothers en ${game.title} es deliberadamente conciso. Contacta con el estudio para conocer el alcance aprobado, el equipo y el contexto de entrega.`,
    },
    productionValue: {
      en: `${game.title} adds production proof in ${game.genre.toLowerCase()} work and shows how Casual Brothers integrates with real commercial game pipelines.`,
      es: `${game.title} aporta experiencia demostrable en producción ${game.genre.toLowerCase()} y muestra cómo Casual Brothers se integra en pipelines comerciales reales.`,
    },
    ...override,
  };
});

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}

/** Fichas con contenido propio, para destacarlas primero en listados. */
export const detailedCaseStudies = caseStudies.filter((study) => study.isDetailed);
