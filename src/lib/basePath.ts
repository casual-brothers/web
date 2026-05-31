// The website is deployed at the root domain (casualbrothers.com/), so basePath is empty.
const basePath = "";


/**
 * Prefix a public asset path with the configured basePath.
 * Usage: assetPath("/images/foo.png") → "/images/foo.png"
 */
export function assetPath(path: string): string {
  if (!basePath || !path.startsWith("/")) return path;
  return `${basePath}${path}`;
}

export { basePath };
