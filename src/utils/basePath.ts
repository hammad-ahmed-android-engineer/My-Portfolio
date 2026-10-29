/**
 * Helper to ensure assets and document links resolve properly both on root domains,
 * public folder static images, external cloud storage, CDNs, or subpaths.
 */
export function getAssetPath(path?: string): string {
  if (!path) return "";
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:")
  ) {
    return path;
  }
  const raw = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const base = raw === "/" ? "" : raw.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  if (!base) return `/${cleanPath}`;
  return `${base}/${cleanPath}`;
}

/**
 * Resolves a project's image from the /public folder based on its database image field,
 * id, or title so static images in /public always render cleanly.
 */
export function resolveProjectPublicImage(
  image?: string,
  id?: string,
  title?: string
): string {
  const key = `${id ?? ""} ${title ?? ""} ${image ?? ""}`.toLowerCase();

  if (key.includes("sar") || key.includes("yamama") || key.includes("hajj")) {
    return getAssetPath("/yamamacm.jpg");
  }
  if (key.includes("sharehands") || key.includes("share hands")) {
    return getAssetPath("/media_apps.jpg");
  }
  if (
    key.includes("saas") ||
    key.includes("orderfast") ||
    key.includes("menuplus") ||
    key.includes("shater") ||
    key.includes("tomooh") ||
    key.includes("ecommerce")
  ) {
    return getAssetPath("/saas-apps.jpg");
  }
  if (key.includes("edge") || key.includes("lighting") || key.includes("wallpaper")) {
    return getAssetPath("/edge-lighting.jpg");
  }
  if (key.includes("toolbox") || key.includes("sensor") || key.includes("utility")) {
    return getAssetPath("/toolbox.jpg");
  }
  if (key.includes("audio") || key.includes("media") || key.includes("bible")) {
    return getAssetPath("/audiobooks_app.jpg");
  }

  if (image && !image.startsWith("http")) {
    return getAssetPath(image);
  }

  return getAssetPath("/saas-apps.jpg");
}

/**
 * Resolves the profile avatar image from the /public folder.
 */
export function resolveAvatarPublicImage(avatarUrl?: string): string {
  if (avatarUrl && avatarUrl.startsWith("/")) {
    return getAssetPath(avatarUrl);
  }
  return getAssetPath("/profilePic.jpg");
}

