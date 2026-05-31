"use client";

import { useEffect, useState } from "react";

export default function ScrollHeader({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl border-b border-brand-8 shadow-[0_1px_20px_rgba(124,255,0,0.03)]" + " bg-[rgba(14,14,14,0.9)]"
          : "backdrop-blur-md border-b border-white/5" + " bg-[rgba(14,14,14,0.6)]"
      }`}
    >
      {children}
    </header>
  );
}
