/**
 * Définitions produits écosystème (URLs, statuts, footer).
 * Aligné batina-os/ecosystem/SEO-LINKS-MATRIX.md
 */
export const ECOSYSTEM_PRODUCT_DEFS = [
  {
    code: "longoka",
    slug: "longoka",
    status: "prod",
    mainUrl: "https://longoka.com",
    footer: true,
    sortOrder: 1,
  },
  {
    code: "lexikongo",
    slug: "lexikongo",
    status: "prod",
    mainUrl: "https://lexikongo.fr",
    footer: true,
    sortOrder: 2,
  },
  {
    code: "lexilingala",
    slug: "lexilingala",
    status: "prod",
    mainUrl: "https://lexilingala.com",
    footer: true,
    sortOrder: 3,
  },
  {
    code: "madizi",
    slug: "madizi",
    status: "prod",
    mainUrl: "https://madizi.com",
    footer: false,
    sortOrder: 4,
  },
  {
    code: "sonekeno",
    slug: "sonekeno",
    status: "beta",
    mainUrl: "https://sonekeno.vercel.app",
    footer: true,
    sortOrder: 5,
  },
];

export function getFooterProductDefs() {
  return ECOSYSTEM_PRODUCT_DEFS.filter((p) => p.footer).sort(
    (a, b) => a.sortOrder - b.sortOrder
  );
}
