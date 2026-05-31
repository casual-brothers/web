const isProd = process.env.NODE_ENV === "production";

// During static export for casualbrothers.com/newweb, the production basePath is "/newweb".
// For local development (next dev), it is empty "" to avoid 404s.
const basePath = isProd ? "/newweb" : "";

/**
 * Prefix a public asset path with the configured basePath.
 * Usage: assetPath("/images/foo.png") → "/newweb/images/foo.png"
 */
export function assetPath(path: string): string {
  if (!basePath || !path.startsWith("/")) return path;
  return `${basePath}${path}`;
}

export { basePath };
