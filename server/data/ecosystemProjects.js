import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ECOSYSTEM_PRODUCT_DEFS } from "../../app/config/ecosystemProducts.js";

const LOCALES = ["fr", "en", "pt", "es"];
const localeCache = new Map();
const dataDir = dirname(fileURLToPath(import.meta.url));
const localesDir = join(dataDir, "../../i18n/locales");

function loadLocaleMessages(locale) {
  const code = LOCALES.includes(locale) ? locale : "fr";
  if (localeCache.has(code)) return localeCache.get(code);

  const filePath = join(localesDir, `${code}.json`);
  const messages = JSON.parse(readFileSync(filePath, "utf8"));
  localeCache.set(code, messages);
  return messages;
}

function productCopy(messages, code) {
  const products = messages?.ecosystem?.products || {};
  return products[code] || {};
}

export async function getFallbackProjects(locale = "fr") {
  const messages = loadLocaleMessages(locale);

  return ECOSYSTEM_PRODUCT_DEFS.map((def, index) => {
    const copy = productCopy(messages, def.code);
    return {
      id: `fallback-${def.code}`,
      slug: def.slug,
      code: def.code,
      status: def.status,
      visibility: "public",
      mainUrl: def.mainUrl,
      name: copy.name || def.code,
      shortLabel: copy.shortLabel || "",
      oneLiner: copy.oneLiner || "",
      description: copy.description || "",
      meta: copy.meta || "",
      techSummary: copy.tech || "",
      tags: Array.isArray(copy.tags)
        ? copy.tags.map((label, tagIndex) => ({
            id: `${def.code}-tag-${tagIndex}`,
            slug: `${def.code}-${tagIndex}`,
            category: "domain",
            label,
          }))
        : [],
      links: [],
      derivatives: [],
      _sortOrder: def.sortOrder ?? index,
    };
  }).sort((a, b) => a._sortOrder - b._sortOrder);
}

export async function mergeWithEcosystemFallback(dbProjects, locale = "fr") {
  const fallback = await getFallbackProjects(locale);
  if (!Array.isArray(dbProjects) || !dbProjects.length) {
    return fallback.map(({ _sortOrder, ...project }) => project);
  }

  const byCode = new Map(
    dbProjects.map((project) => [String(project.code || "").toLowerCase(), project])
  );

  for (const item of fallback) {
    const key = item.code.toLowerCase();
    if (!byCode.has(key)) {
      const { _sortOrder, ...project } = item;
      byCode.set(key, project);
    }
  }

  return Array.from(byCode.values()).sort((a, b) => {
    const orderA =
      ECOSYSTEM_PRODUCT_DEFS.find((d) => d.code === a.code)?.sortOrder ?? 999;
    const orderB =
      ECOSYSTEM_PRODUCT_DEFS.find((d) => d.code === b.code)?.sortOrder ?? 999;
    return orderA - orderB;
  });
}

export { getFooterProductDefs } from "../../app/config/ecosystemProducts.js";
