/** Robots prod — force la ligne Sitemap même si public/robots.txt est stale au build. */
export default defineEventHandler((event) => {
  const body = [
    "User-agent: *",
    "Allow: /",
    "",
    "Disallow: /fr/login",
    "Disallow: /en/login",
    "Disallow: /pt/login",
    "Disallow: /es/login",
    "Disallow: /fr/register",
    "Disallow: /en/register",
    "Disallow: /pt/register",
    "Disallow: /es/register",
    "",
    "Sitemap: https://batina-media.com/sitemap.xml",
    "",
  ].join("\n");

  setHeader(event, "Content-Type", "text/plain; charset=utf-8");
  setHeader(event, "Cache-Control", "public, max-age=3600, s-maxage=86400");
  return body;
});
