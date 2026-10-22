/**
 * Helper to ensure assets and document links resolve properly both on root domains
 * and when deployed to GitHub Pages with repository subpaths (e.g. /portfolio/)
 */
export function getAssetPath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  if (!base) return `/${cleanPath}`;
  const cleanBase = base.endsWith("/") ? base.slice(0, -1) : base;
  return `${cleanBase}/${cleanPath}`;
}
