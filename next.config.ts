import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  allowedDevOrigins: ["192.168.1.37"],

  // ── Subdirectorio de publicación ──────────────────────────────
  // Configuración eliminada: la web se despliega en la raíz absoluta (casualbrothers.com/).

};

export default nextConfig;
