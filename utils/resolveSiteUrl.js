/**
 * URL publique Batina Media.
 * Ignore APP_BASE_URL=localhost (souvent collé par erreur sur Vercel)
 * pour ne plus générer un sitemap en http://localhost:3008.
 */
export function resolveSiteUrl(env = process.env) {
  const raw = String(
    env.APP_BASE_URL || env.NUXT_PUBLIC_SITE_URL || env.NUXT_PUBLIC_APP_BASE_URL || ""
  ).trim();
  const cleaned = raw.replace(/\/+$/, "");
  const isLocal =
    !cleaned ||
    /localhost|127\.0\.0\.1/i.test(cleaned) ||
    /^https?:\/\/0\.0\.0\.0/i.test(cleaned);

  const onVercel = Boolean(env.VERCEL || env.VERCEL_ENV);
  const isProd = env.NODE_ENV === "production" || onVercel;

  if (!isLocal) return cleaned;
  if (isProd) return "https://batina-media.com";
  return cleaned || "http://localhost:3008";
}
