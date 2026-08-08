import type { Metadata } from "next";
import ViewportRecalibration from "@/components/system/ViewportRecalibration";
import { fontVariables } from "../fonts";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://casualbrothers.com"),
  title: "Casual Brothers — Game Development Studio",
  description: "Casual Brothers is a game development studio for publishers and IP owners.",
  alternates: {
    canonical: "https://casualbrothers.com/en/",
    languages: { en: "https://casualbrothers.com/en/", es: "https://casualbrothers.com/es/", "x-default": "https://casualbrothers.com/en/" },
  },
  robots: { index: false, follow: true },
};

export default function RootRedirectLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${fontVariables} min-h-screen bg-background text-white antialiased`}>
        <ViewportRecalibration />
        {children}
      </body>
    </html>
  );
}
