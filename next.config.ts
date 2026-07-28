import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },

  // ── Subdirectorio de publicación ──────────────────────────────
  // Configuración eliminada: la web se despliega en la raíz absoluta (casualbrothers.com/).

};

export default nextConfig;
