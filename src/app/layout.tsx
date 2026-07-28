import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import ViewportRecalibration from "@/components/system/ViewportRecalibration";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://casualbrothers.com"),
  title: {
    default: "Casual Brothers — Game Development Studio",
    template: "%s | Casual Brothers",
  },
  description:
    "We make games worth remembering. 15+ titles shipped, 100M+ downloads. Game development, co-development, porting, and live ops for the world's biggest entertainment IPs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body suppressHydrationWarning className={`${inter.variable} ${montserrat.variable} antialiased min-h-screen flex flex-col relative bg-background text-white`}>
        <ViewportRecalibration />
        {children}
      </body>
    </html>
  );
}
