/**
 * URL publique Batina Media.
 * Ignore APP_BASE_URL=localhost (souvent collé par erreur sur Vercel)
 * pour ne plus générer un sitemap en http://localhost:3008.
 */
export function resolveSiteUrl(env = process.env) {
  const onVercel = Boolean(env.VERCEL || env.VERCEL_ENV);
  const isProd = env.NODE_ENV === "production" || onVercel;
  const configuredUrls = [
    env.APP_BASE_URL,
    env.NUXT_PUBLIC_SITE_URL,
    env.NUXT_PUBLIC_APP_BASE_URL,
  ];
  const publicUrl = configuredUrls
    .map((value) => String(value || "").trim().replace(/\/+$/, ""))
    .find((value) => {
      if (!value || /localhost|127\.0\.0\.1/i.test(value)) return false;
      if (/^https?:\/\/0\.0\.0\.0/i.test(value)) return false;
      try {
        const parsed = new URL(value);
        return parsed.protocol === "http:" || parsed.protocol === "https:";
      } catch {
        return false;
      }
    });

  if (publicUrl) return publicUrl;
  if (isProd) return "https://batina-media.com";
  return "http://localhost:3008";
}
