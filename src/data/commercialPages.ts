export type Locale = "en" | "es";

export type CommercialPageSlug =
  | "publishers"
  | "game-development-services"
  | "co-development-game-studio"
  | "console-porting-services"
  | "licensed-ip-game-development"
  | "unity-game-development-studio";

export interface CommercialPageData {
  slug: CommercialPageSlug;
  title: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  proof: string[];
  sections: {
    title: string;
    body: string;
    bullets: string[];
  }[];
  cta: string;
}

// Shipped titles surfaced as proof on each landing. Slugs must exist in src/data/games.ts.
export const featuredCaseStudySlugs: Record<CommercialPageSlug, string[]> = {
  publishers: ["marupoyo", "hot-rod-mayhem", "grinch-2-saving-christmas", "hasbro-games-junior-collection"],
  "game-development-services": ["hot-rod-mayhem", "marupoyo", "grinch", "matchbox"],
  "co-development-game-studio": ["killing-floor-2", "bluey", "barbie", "ice-age"],
  "console-porting-services": ["transformers", "jumanji", "chicken-run", "my-little-pony"],
  "licensed-ip-game-development": ["barbie", "bluey", "my-little-pony", "grinch"],
  "unity-game-development-studio": ["hot-rod-mayhem", "gigantosaurus-world", "marupoyo", "jojo-siwa"],
};

export const commercialPages: Record<Locale, Record<CommercialPageSlug, CommercialPageData>> = {
  en: {
    publishers: {
      slug: "publishers",
      title: "Game Development Partner for Publishers and IP Holders",
      metaDescription:
        "Casual Brothers helps publishers and IP holders build, co-develop and port licensed, family and multiplatform games across PC, console and mobile.",
      eyebrow: "PUBLISHER PRODUCTION PARTNER",
      h1: "Game development partner for publishers and IP holders",
      intro:
        "Casual Brothers supports publishers, IP holders and funded studios that need reliable production capacity across full development, co-development, porting, live ops and technical art.",
      proof: ["15+ shipped titles", "100M+ players reached", "PC, console and mobile experience"],
      sections: [
        {
          title: "Who we help",
          body: "We work best with teams that already know what they need to ship and want a partner who can reduce execution risk.",
          bullets: ["Game publishers", "IP holders", "Funded studios", "Production teams needing senior support"],
        },
        {
          title: "What we deliver",
          body: "The studio can support a project from concept through launch or integrate into a specific production lane.",
          bullets: ["Full-cycle development", "Co-development", "Console and PC porting", "Live ops", "Technical art"],
        },
        {
          title: "Why Casual Brothers",
          body: "Our portfolio includes shipped family, licensed and multiplatform titles. We focus on clear communication, production discipline and practical problem solving.",
          bullets: ["Shipped portfolio proof", "Family and licensed IP experience", "Remote senior team", "Milestone-driven production"],
        },
      ],
      cta: "Send us your project brief",
    },
    "game-development-services": {
      slug: "game-development-services",
      title: "Game Development Services: Full-Cycle, Co-Dev, Porting and Live Ops",
      metaDescription:
        "Full-cycle game development, co-development, technical art, live ops and production support from a studio with a shipped multiplatform portfolio.",
      eyebrow: "GAME DEVELOPMENT SERVICES",
      h1: "Game development services for publishers and studios",
      intro:
        "A focused production partner for teams that need development capacity, specialist support or a reliable path from brief to shipped game.",
      proof: ["Full-cycle production", "Co-development support", "Art, tech art and live ops"],
      sections: [
        {
          title: "Full-cycle game development",
          body: "Support from early production planning through playable delivery, content production, QA feedback and launch support.",
          bullets: ["Concept and prototype support", "Gameplay systems", "UI/UX implementation", "Content production"],
        },
        {
          title: "Production support disciplines",
          body: "Flexible support for internal teams that need specific senior disciplines without increasing management load.",
          bullets: ["Engineering support", "Technical art", "Gameplay systems", "Production communication"],
        },
        {
          title: "Console and PC delivery",
          body: "Multiplatform delivery needs planning, optimization and careful platform adaptation from the start.",
          bullets: ["PC, PlayStation, Xbox and Nintendo Switch experience", "Input and UI adaptation", "Performance-focused production", "Launch support"],
        },
      ],
      cta: "Talk to us about production support",
    },
    "co-development-game-studio": {
      slug: "co-development-game-studio",
      title: "Game Co-Development Studio | Embedded Production Support",
      metaDescription:
        "Casual Brothers provides co-development support for studios and production teams, helping them scale gameplay, engineering, art, UI and console delivery.",
      eyebrow: "CO-DEVELOPMENT",
      h1: "Game co-development partner for production teams",
      intro:
        "Scale your internal team with a co-development partner that can plug into real production workflows, tools and milestones.",
      proof: ["Embedded production support", "Senior multidisciplinary capacity", "Clear milestones and communication"],
      sections: [
        {
          title: "When to use co-development",
          body: "Co-development is useful when the core team needs more capacity, specialist skills or parallel delivery without losing ownership.",
          bullets: ["Gameplay feature support", "Art and content production", "UI implementation", "Platform delivery support"],
        },
        {
          title: "How we integrate",
          body: "We align around the project pipeline, communication rhythm and milestone expectations before scaling production.",
          bullets: ["Shared tools and documentation", "Direct communication", "Clear ownership per task", "Regular milestone review"],
        },
        {
          title: "Disciplines supported",
          body: "The team can provide production support across engineering, art, technical art, QA feedback loops and release preparation.",
          bullets: ["Engineering", "Art and animation", "Technical art", "Production and live ops support"],
        },
      ],
      cta: "Discuss co-development needs",
    },
    "console-porting-services": {
      slug: "console-porting-services",
      title: "Console Porting Services for PC, PlayStation, Xbox and Nintendo Switch",
      metaDescription:
        "Console porting and optimization services for PC, PlayStation, Xbox and Nintendo Switch games, with production support from an experienced game development studio.",
      eyebrow: "CONSOLE PORTING",
      h1: "Console porting services for PC, PlayStation, Xbox and Nintendo Switch",
      intro:
        "Porting is production work: platform adaptation, performance, UI/input changes, testing feedback and release support need a steady technical process.",
      proof: ["Console and PC experience", "Platform adaptation", "Performance-focused delivery"],
      sections: [
        {
          title: "Porting overview",
          body: "We support teams that need to bring shipped or in-development games to additional platforms without derailing the main production plan.",
          bullets: ["PC", "PlayStation", "Xbox", "Nintendo Switch"],
        },
        {
          title: "Technical risk reduction",
          body: "Every platform has different constraints. We focus on finding risks early and keeping production decisions visible.",
          bullets: ["Performance profiling", "Memory and load considerations", "Input adaptation", "UI and screen readability"],
        },
        {
          title: "Release support",
          body: "Where applicable, we help teams prepare builds, fix platform-specific issues and respond to late production feedback.",
          bullets: ["Build preparation", "Optimization passes", "Bug fixing", "Launch support"],
        },
      ],
      cta: "Plan a porting conversation",
    },
    "licensed-ip-game-development": {
      slug: "licensed-ip-game-development",
      title: "Licensed IP Game Development Studio",
      metaDescription:
        "Casual Brothers helps IP holders and brand teams develop family-friendly and licensed IP games across PC, console and mobile.",
      eyebrow: "LICENSED IP DEVELOPMENT",
      h1: "Licensed IP game development studio",
      intro:
        "Licensed and family-focused games need careful production: tone, audience fit, platform constraints and brand expectations all matter.",
      proof: ["Family-friendly portfolio", "Licensed IP experience", "Multiplatform production support"],
      sections: [
        {
          title: "Brand-safe production",
          body: "We treat licensed IP work as a trust exercise: clear approvals, careful implementation and production choices that protect the property.",
          bullets: ["Tone and audience awareness", "Approval-friendly production", "Clear review loops", "Documented delivery"],
        },
        {
          title: "Family and kids audiences",
          body: "Our portfolio includes family and kids-oriented shipped titles, giving us practical experience with accessibility, readability and age-appropriate play.",
          bullets: ["Family-friendly gameplay", "Readable UX", "Platform-aware controls", "Accessible production thinking"],
        },
        {
          title: "Multiplatform development",
          body: "Licensed games often need broad platform coverage. We support PC, console and mobile production needs with a delivery-focused workflow.",
          bullets: ["PC", "Console", "Mobile", "Post-launch support"],
        },
      ],
      cta: "Talk about your licensed IP",
    },
    "unity-game-development-studio": {
      slug: "unity-game-development-studio",
      title: "Unity Game Development Studio for Console and PC",
      metaDescription:
        "Unity game development services for studios building and shipping games across PC, console and mobile.",
      eyebrow: "UNITY DEVELOPMENT",
      h1: "Unity game development studio for console and PC",
      intro:
        "Unity projects need a team that can balance fast production, maintainable tooling, technical art workflows and multiplatform performance.",
      proof: ["Gameplay and tools support", "Technical art pipelines", "Multiplatform production"],
      sections: [
        {
          title: "Unity production experience",
          body: "We support Unity projects across gameplay, UI, content production, optimization and release preparation.",
          bullets: ["Gameplay systems", "UI/UX", "Tools and workflows", "Production support"],
        },
        {
          title: "Console and multiplatform workflows",
          body: "Unity delivery across PC, console and mobile benefits from early technical planning and disciplined optimization.",
          bullets: ["Platform-specific optimization", "Input adaptation", "Build workflows", "Performance passes"],
        },
        {
          title: "Technical art pipelines",
          body: "Technical art connects visual ambition with performance reality, especially on multiplatform projects.",
          bullets: ["Shader and VFX support", "Asset integration", "Animation workflows", "Performance-aware content"],
        },
      ],
      cta: "Discuss Unity production support",
    },
  },
  es: {
    publishers: {
      slug: "publishers",
      title: "Partner de Desarrollo de Videojuegos para Publishers e IPs",
      metaDescription:
        "Casual Brothers ayuda a publishers y titulares de IP a desarrollar, co-desarrollar y portar juegos licenciados, familiares y multiplataforma para PC, consola y movil.",
      eyebrow: "PARTNER PARA PUBLISHERS",
      h1: "Partner de desarrollo de videojuegos para publishers y titulares de IP",
      intro:
        "Casual Brothers apoya a publishers, titulares de IP y estudios financiados que necesitan capacidad fiable en desarrollo completo, co-desarrollo, porting, live ops y technical art.",
      proof: ["15+ titulos lanzados", "100M+ jugadores alcanzados", "Experiencia en PC, consola y movil"],
      sections: [
        {
          title: "A quien ayudamos",
          body: "Trabajamos mejor con equipos que ya saben que necesitan lanzar y quieren un partner que reduzca riesgo de ejecucion.",
          bullets: ["Publishers", "Titulares de IP", "Estudios financiados", "Equipos de produccion que necesitan soporte senior"],
        },
        {
          title: "Que entregamos",
          body: "El estudio puede apoyar un proyecto desde concepto hasta lanzamiento o integrarse en una linea concreta de produccion.",
          bullets: ["Desarrollo completo", "Co-desarrollo", "Porting para consola y PC", "Live ops", "Technical art"],
        },
        {
          title: "Por que Casual Brothers",
          body: "Nuestro portfolio incluye titulos familiares, licenciados y multiplataforma lanzados. Nos centramos en comunicacion clara, disciplina de produccion y soluciones practicas.",
          bullets: ["Portfolio lanzado", "Experiencia en IP familiar/licenciada", "Equipo remoto senior", "Produccion por milestones"],
        },
      ],
      cta: "Envia tu brief de proyecto",
    },
    "game-development-services": {
      slug: "game-development-services",
      title: "Servicios de Desarrollo de Videojuegos: Full-Cycle, Co-Dev, Porting y Live Ops",
      metaDescription:
        "Desarrollo completo, co-desarrollo, technical art, live ops y soporte de produccion de un estudio con portfolio multiplataforma lanzado.",
      eyebrow: "SERVICIOS DE DESARROLLO",
      h1: "Servicios de desarrollo de videojuegos para publishers y estudios",
      intro:
        "Un partner de produccion para equipos que necesitan capacidad de desarrollo, soporte especializado o un camino fiable desde brief hasta juego lanzado.",
      proof: ["Produccion completa", "Soporte de co-desarrollo", "Arte, technical art y live ops"],
      sections: [
        {
          title: "Desarrollo completo",
          body: "Soporte desde planificacion temprana hasta entregables jugables, produccion de contenido, feedback de QA y apoyo de lanzamiento.",
          bullets: ["Concepto y prototipo", "Sistemas de gameplay", "Implementacion UI/UX", "Produccion de contenido"],
        },
        {
          title: "Disciplinas de soporte",
          body: "Apoyo flexible para equipos internos que necesitan perfiles senior concretos sin aumentar la carga de gestion.",
          bullets: ["Engineering", "Technical art", "Gameplay systems", "Comunicacion de produccion"],
        },
        {
          title: "Entrega en consola y PC",
          body: "La entrega multiplataforma requiere planificacion, optimizacion y adaptacion de plataforma desde el inicio.",
          bullets: ["Experiencia en PC, PlayStation, Xbox y Nintendo Switch", "Adaptacion de input y UI", "Produccion orientada a rendimiento", "Soporte de lanzamiento"],
        },
      ],
      cta: "Hablemos de soporte de produccion",
    },
    "co-development-game-studio": {
      slug: "co-development-game-studio",
      title: "Estudio de Co-Desarrollo de Videojuegos | Soporte de Produccion Integrado",
      metaDescription:
        "Casual Brothers ofrece soporte de co-desarrollo para estudios y equipos de produccion, ayudando a escalar gameplay, engineering, arte, UI y entrega en consola.",
      eyebrow: "CO-DESARROLLO",
      h1: "Partner de co-desarrollo para equipos de produccion",
      intro:
        "Escala tu equipo interno con un partner de co-desarrollo capaz de integrarse en workflows, herramientas y milestones reales.",
      proof: ["Soporte integrado", "Capacidad senior multidisciplinar", "Milestones y comunicacion clara"],
      sections: [
        {
          title: "Cuando usar co-desarrollo",
          body: "El co-desarrollo ayuda cuando el equipo principal necesita capacidad extra, especializacion o entrega paralela sin perder control.",
          bullets: ["Gameplay features", "Arte y contenido", "Implementacion UI", "Soporte de plataformas"],
        },
        {
          title: "Como nos integramos",
          body: "Alineamos pipeline, ritmo de comunicacion y expectativas de milestones antes de escalar produccion.",
          bullets: ["Herramientas y documentacion compartidas", "Comunicacion directa", "Ownership claro por tarea", "Revision regular de milestones"],
        },
        {
          title: "Disciplinas soportadas",
          body: "El equipo puede apoyar engineering, arte, technical art, feedback loops de QA y preparacion de release.",
          bullets: ["Engineering", "Arte y animacion", "Technical art", "Produccion y live ops"],
        },
      ],
      cta: "Hablar de co-desarrollo",
    },
    "console-porting-services": {
      slug: "console-porting-services",
      title: "Servicios de Porting para PC, PlayStation, Xbox y Nintendo Switch",
      metaDescription:
        "Servicios de porting y optimizacion para juegos de PC, PlayStation, Xbox y Nintendo Switch con soporte de produccion de un estudio experimentado.",
      eyebrow: "CONSOLE PORTING",
      h1: "Servicios de porting para PC, PlayStation, Xbox y Nintendo Switch",
      intro:
        "El porting es produccion: adaptacion de plataforma, rendimiento, cambios de UI/input, feedback de testing y soporte de release necesitan proceso tecnico estable.",
      proof: ["Experiencia en consola y PC", "Adaptacion de plataforma", "Entrega orientada a rendimiento"],
      sections: [
        {
          title: "Porting overview",
          body: "Apoyamos a equipos que necesitan llevar juegos lanzados o en desarrollo a nuevas plataformas sin descarrilar el plan principal.",
          bullets: ["PC", "PlayStation", "Xbox", "Nintendo Switch"],
        },
        {
          title: "Reduccion de riesgo tecnico",
          body: "Cada plataforma tiene constraints distintos. Nos centramos en detectar riesgos pronto y mantener visibles las decisiones de produccion.",
          bullets: ["Performance profiling", "Memoria y cargas", "Adaptacion de input", "Lectura de UI y pantalla"],
        },
        {
          title: "Soporte de lanzamiento",
          body: "Cuando aplica, ayudamos a preparar builds, resolver issues especificos de plataforma y responder a feedback tardio de produccion.",
          bullets: ["Preparacion de builds", "Pases de optimizacion", "Bug fixing", "Launch support"],
        },
      ],
      cta: "Planificar una conversacion de porting",
    },
    "licensed-ip-game-development": {
      slug: "licensed-ip-game-development",
      title: "Estudio de Desarrollo de Juegos con IP Licenciada",
      metaDescription:
        "Casual Brothers ayuda a titulares de IP y equipos de marca a desarrollar juegos familiares y licenciados para PC, consola y movil.",
      eyebrow: "DESARROLLO DE IP LICENCIADA",
      h1: "Estudio de desarrollo de juegos con IP licenciada",
      intro:
        "Los juegos licenciados y familiares requieren produccion cuidadosa: tono, audiencia, plataformas y expectativas de marca importan.",
      proof: ["Portfolio familiar", "Experiencia con IP licenciada", "Soporte multiplataforma"],
      sections: [
        {
          title: "Produccion segura para marca",
          body: "Tratamos el trabajo con IP licenciada como un ejercicio de confianza: aprobaciones claras, implementacion cuidada y decisiones que protegen la propiedad.",
          bullets: ["Tono y audiencia", "Produccion preparada para aprobaciones", "Review loops claros", "Entrega documentada"],
        },
        {
          title: "Audiencias familiares e infantiles",
          body: "Nuestro portfolio incluye titulos familiares e infantiles lanzados, con experiencia practica en accesibilidad, lectura y juego apropiado.",
          bullets: ["Gameplay familiar", "UX legible", "Controles adaptados", "Pensamiento accesible"],
        },
        {
          title: "Desarrollo multiplataforma",
          body: "Los juegos licenciados suelen necesitar cobertura amplia de plataformas. Apoyamos necesidades de PC, consola y movil.",
          bullets: ["PC", "Consola", "Movil", "Soporte post-lanzamiento"],
        },
      ],
      cta: "Hablar sobre tu IP licenciada",
    },
    "unity-game-development-studio": {
      slug: "unity-game-development-studio",
      title: "Estudio de Desarrollo Unity para Consola y PC",
      metaDescription:
        "Servicios de desarrollo Unity para estudios que crean y lanzan juegos para PC, consola y movil.",
      eyebrow: "UNITY DEVELOPMENT",
      h1: "Estudio de desarrollo Unity para consola y PC",
      intro:
        "Los proyectos Unity necesitan equilibrar produccion rapida, tooling mantenible, technical art y rendimiento multiplataforma.",
      proof: ["Gameplay y tools", "Pipelines de technical art", "Produccion multiplataforma"],
      sections: [
        {
          title: "Experiencia de produccion Unity",
          body: "Apoyamos proyectos Unity en gameplay, UI, contenido, optimizacion y preparacion de release.",
          bullets: ["Gameplay systems", "UI/UX", "Tools y workflows", "Soporte de produccion"],
        },
        {
          title: "Workflows multiplataforma",
          body: "La entrega Unity en PC, consola y movil mejora con planificacion tecnica temprana y optimizacion disciplinada.",
          bullets: ["Optimizacion por plataforma", "Adaptacion de input", "Build workflows", "Pases de rendimiento"],
        },
        {
          title: "Technical art pipelines",
          body: "Technical art conecta ambicion visual con realidad de rendimiento, especialmente en proyectos multiplataforma.",
          bullets: ["Shaders y VFX", "Integracion de assets", "Workflows de animacion", "Contenido orientado a rendimiento"],
        },
      ],
      cta: "Hablar de soporte Unity",
    },
  },
};
