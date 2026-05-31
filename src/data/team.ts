export interface TeamMember {
  id: string;
  name: string;
  role: string;
  roleEs: string;
  description: string;
  descriptionEs: string;
  avatar: string;
}

const male = "/images/team/avatar-placeholder.webp";
const female = "/images/team/avatar-female-placeholder.webp";

export const teamData: TeamMember[] = [
  {
    id: "belen-jimenez",
    name: "Belen Jimenez",
    role: "CEO & Founder",
    roleEs: "CEO y Fundadora",
    description: "Absolute owner and leader driving Casual Brothers' global success and strategic growth.",
    descriptionEs: "Dueña absoluta y líder que impulsa el éxito global y el crecimiento estratégico de Casual Brothers.",
    avatar: "/images/team/belen-jimenez.webp",
  },
  {
    id: "hernan-castillo",
    name: "Hernan Castillo",
    role: "Studio Head & Executive Producer",
    roleEs: "Director del Estudio y Productor Ejecutivo",
    description: "Leads the studio's vision and publisher relationships across 15+ shipped titles.",
    descriptionEs: "Lidera la visión del estudio y las relaciones con publishers en más de 15 títulos lanzados.",
    avatar: "/images/team/hernan-castillo.webp",
  },
  {
    id: "xavi-espejo",
    name: "Xavi Espejo",
    role: "Senior Producer",
    roleEs: "Productor Senior",
    description: "Drives production pipelines ensuring every milestone ships on time and on budget.",
    descriptionEs: "Gestiona los pipelines de producción asegurando entregas puntuales y en presupuesto.",
    avatar: "/images/team/xavi-espejo.webp",
  },
  {
    id: "israel-fernandez",
    name: "Israel Fernandez",
    role: "Art Director",
    roleEs: "Director de Arte",
    description: "Defines the visual identity and art direction across all studio projects.",
    descriptionEs: "Define la identidad visual y dirección artística de todos los proyectos del estudio.",
    avatar: "/images/team/israel-fernandez.webp",
  },
  {
    id: "jose-manuel-vilchez",
    name: "Jose Manuel Vilchez",
    role: "Technical Director",
    roleEs: "Director Técnico",
    description: "Architects core systems and oversees all engineering across platforms.",
    descriptionEs: "Diseña los sistemas centrales y supervisa toda la ingeniería multiplataforma.",
    avatar: "/images/team/jose-manuel-vilchez.webp",
  },
];

