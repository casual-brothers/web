"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const preferredLocale = navigator.language?.startsWith("es") ? "es" : "en";
      // Redirect to the user's preferred locale
      router.replace(`/${preferredLocale}`);
    }
  }, [router]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", fontFamily: "sans-serif", color: "rgba(255,255,255,0.25)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase" }}>
      <span>LOADING // CARGANDO</span>
      <span style={{ fontSize: "9px", color: "#7cff00", marginTop: "8px", animation: "pulse 1.5s infinite" }}>DIVERSIÓN EN PROCESO...</span>
    </div>
  );
}
