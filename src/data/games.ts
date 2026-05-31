export interface GameData {
  id: string;
  title: string;
  genre: string;
  logo: string;
  screenshot: string;
  featured?: boolean;
  imagePosition?: string;
}

export const gamesData: GameData[] = [
  {
    id: "dragons",
    title: "Dragons: Dawn of New Riders",
    genre: "Action • Adventure",
    logo: "/images/Dragons-dawn-of-new-riders-logo-ENG.webp",
    screenshot: "/images/Dragons-Screenshot.webp",
  },
  {
    id: "killing-floor-2",
    title: "Killing Floor 2",
    genre: "FPS • Horror",
    logo: "/images/Killing-Floor-2-Logo.webp",
    screenshot: "/images/Killing-Floor-2-Screenshot.webp",
  },
  {
    id: "hot-rod-mayhem",
    title: "Hot Rod Mayhem",
    genre: "Racing • Action",
    logo: "/images/Hot-Rod-Mayhem-Logo.webp",
    screenshot: "/images/Hot-Rod-Mayhem-Screenshot.webp",
    featured: true,
  },
  {
    id: "jumanji",
    title: "Jumanji",
    genre: "Adventure • Party",
    logo: "/images/Jumanji-Logo.webp",
    screenshot: "/images/Jumanji-Screenshot-1-scaled.webp",
    featured: true,
  },
  {
    id: "evil-dead",
    title: "Evil Dead",
    genre: "Action • Horror",
    logo: "/images/Evil-Dead-Logo.webp",
    screenshot: "/images/Evil-Dead-About-Us-Page-Image-3.webp",
    featured: true,
  },
  {
    id: "transformers",
    title: "Transformers",
    genre: "Action • Sci-Fi",
    logo: "/images/Transformers-Logo.webp",
    screenshot: "/images/Transformers-Screenshot-scaled.webp",
  },
  {
    id: "ben-10",
    title: "Ben 10",
    genre: "Action • Adventure",
    logo: "/images/Ben-10-Logo.webp",
    screenshot: "/images/Ben-10-Screenshot.webp",
  },
  {
    id: "gigantosaurus",
    title: "Gigantosaurus the Game",
    genre: "Adventure • Kids",
    logo: "/images/Gigantosaurus-the-Game-Logo.webp",
    screenshot: "/images/Gigantosaurus-the-Game-Screenshot-1.webp",
  },
  {
    id: "matchbox",
    title: "Matchbox Driving Adventures",
    genre: "Racing • Kids",
    logo: "/images/Matchbox-Logo.webp",
    screenshot: "/images/Matchbox-Driving-Adventures-Screenshot.webp",
  },
  {
    id: "3-skulls-of-the-toltecs",
    title: "3 Skulls of the Toltecs",
    genre: "Puzzle • Adventure",
    logo: "/images/3-Skulls-of-the-Toltecs-Logo.webp",
    screenshot: "/images/3-Skulls-of-the-Toltecs-Screenshot.webp",
  },
  {
    id: "addams-family",
    title: "Addams Family",
    genre: "Strategy • Simulation",
    logo: "/images/Addams-Family-Logo.webp",
    screenshot: "/images/Addams-Family-Screenshot-scaled.webp",
  },
  {
    id: "barbie",
    title: "Barbie",
    genre: "Casual • Kids",
    logo: "/images/Barbie-Logo.webp",
    screenshot: "/images/Barbie-Screenshot.webp",
    featured: true,
  },
  {
    id: "grinch",
    title: "Grinch",
    genre: "Adventure • Kids",
    logo: "/images/Grinch-Logo-scaled.webp",
    screenshot: "/images/Grinch-Screenshot-1.webp",
    featured: true,
  },
  {
    id: "ice-age",
    title: "Ice Age",
    genre: "Adventure • Platformer",
    logo: "/images/Ice-Age-Logo.webp",
    screenshot: "/images/Ice-Age-Screenshot.webp",
  },
  {
    id: "orc-attack",
    title: "Orc Attack",
    genre: "Action • Hack & Slash",
    logo: "/images/Orc-Attack-Logo.webp",
    screenshot: "/images/Orc-Attack-Screenshot.webp",
  },
  {
    id: "westerner",
    title: "Westerner",
    genre: "Adventure • Western",
    logo: "/images/Westerner-Logo.webp",
    screenshot: "/images/Westerner-Screenshot.webp",
  },
  {
    id: "trollhunters",
    title: "Trollhunters",
    genre: "Action • Adventure",
    logo: "/images/Trollhunters-Logo.webp",
    screenshot: "/images/Trollhunters-Screenshot.webp",
  },
  {
    id: "elf",
    title: "Elf",
    genre: "Adventure • Christmas",
    logo: "/images/Elf_Logo.webp",
    screenshot: "/images/Elf.webp",
  },
  {
    id: "my-little-pony",
    title: "My Little Pony",
    genre: "Casual • Kids",
    logo: "/images/My-Little-Pony-Logo.webp",
    screenshot: "/images/My-Little-Pony-Screenshot.webp",
  },
  {
    id: "monster-high",
    title: "Monster High",
    genre: "Casual • Kids",
    logo: "/images/Monster-High-Logo.webp",
    screenshot: "/images/Monster-High-Screenshot.webp",
  },
  {
    id: "bluey",
    title: "Bluey",
    genre: "Family • Kids",
    logo: "/images/ENG_Bluey_Logo_W.webp",
    screenshot: "/images/bluey.webp",
    imagePosition: "center top",
  },
  {
    id: "jojo-siwa",
    title: "Jojo Siwa",
    genre: "Casual • Music",
    logo: "/images/Jojo-Siwa-Logo.webp",
    screenshot: "/images/Jojo-Siwa-Screenshot.webp",
  },
  {
    id: "levantate",
    title: "Levantate",
    genre: "Casual • TV",
    logo: "/images/Levantate-Logo.webp",
    screenshot: "/images/Levantate-Screenshot.webp",
  },
  {
    id: "ot",
    title: "Operacion Triunfo (OT)",
    genre: "Casual • Music",
    logo: "/images/OT-Logo.webp",
    screenshot: "/images/OT-Screenshot.webp",
  },
  {
    id: "chicken-run",
    title: "Chicken Run",
    genre: "Action • Kids",
    logo: "/images/ChickenRun_ENG_logo_rgb_resize.webp",
    screenshot: "/images/ChickenRun-Screenshot.webp",
  },
];

const featured = gamesData.filter((g) => g.featured);
const hotRod = featured.find((g) => g.id === "hot-rod-mayhem");
const rest = featured.filter((g) => g.id !== "hot-rod-mayhem");
export const featuredGames = hotRod ? [hotRod, ...rest] : featured;
