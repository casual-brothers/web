import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },

  // ── Subdirectorio de publicación ──────────────────────────────
  // Mientras la web esté en casualbrothers.com/newweb/, dejar esto activo en producción.
  // Cuando la web se mueva a la raíz (casualbrothers.com/), comentar o eliminar esta línea.
  ...(isProd ? { basePath: "/newweb" } : {}),
};

export default nextConfig;
