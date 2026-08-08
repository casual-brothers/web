import { Inter, Montserrat } from "next/font/google";

export const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
export const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800", "900"],
});
export const fontVariables = `${inter.variable} ${montserrat.variable}`;
