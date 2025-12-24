// server/api/projects/index.get.js
import { defineEventHandler, getQuery } from "h3";
import { getDb } from "../../utils/db"; // <-- import nommé, chemin relatif

export default defineEventHandler(async (event) => {
  try {
    // 1) Connexion DB (dans le try !)
    const db = await getDb(event);

    const query = getQuery(event);
    const locale = query.locale || "fr";

    // 2) Projets + textes localisés
    const [projectRows] = await db.query(
      `
      SELECT
        p.id,
        p.slug,
        p.code,
        p.status,
        p.visibility,
        p.main_url,
        i.name,
        i.short_label,
        i.one_liner,
        i.description,
        i.meta,
        i.tech_summary
      FROM projects p
      LEFT JOIN project_i18n i
        ON i.project_id = p.id
       AND i.locale = ?
      WHERE p.visibility = 'public'
      ORDER BY p.id ASC
      `,
      [locale]
    );

    // Aucun projet public → on renvoie un tableau vide (pas d'erreur)
    if (!projectRows.length) {
      return [];
    }

    const projectIds = projectRows.map((p) => p.id);
    const placeholders = projectIds.map(() => "?").join(", ");

    // 3) Tags associés
    const [tagRows] = await db.query(
      `
      SELECT
        pt.project_id,
        t.id AS tag_id,
        t.slug,
        t.category,
        t.label
      FROM project_tags pt
      INNER JOIN tags t ON t.id = pt.tag_id
      WHERE pt.project_id IN (${placeholders})
      ORDER BY t.category, t.label
      `,
      projectIds
    );

    // 4) Liens (site principal, docs, etc.)
    const [linkRows] = await db.query(
      `
      SELECT
        project_id,
        kind,
        label,
        url,
        sort_order
      FROM project_links
      WHERE project_id IN (${placeholders})
      ORDER BY sort_order ASC, id ASC
      `,
      projectIds
    );

    // 5) Dérivés (livres, cahiers, jeux, etc.)
    const [derivativeRows] = await db.query(
      `
      SELECT
        project_id,
        derivative_type,
        title,
        description,
        medium,
        language_code,
        status,
        url,
        sort_order
      FROM project_derivatives
      WHERE project_id IN (${placeholders})
      ORDER BY project_id ASC, sort_order ASC
      `,
      projectIds
    );

    // 6) Regrouper les données
    const tagsByProject = {};
    tagRows.forEach((row) => {
      if (!tagsByProject[row.project_id]) tagsByProject[row.project_id] = [];
      tagsByProject[row.project_id].push({
        id: row.tag_id,
        slug: row.slug,
        category: row.category,
        label: row.label,
      });
    });

    const linksByProject = {};
    linkRows.forEach((row) => {
      if (!linksByProject[row.project_id]) linksByProject[row.project_id] = [];
      linksByProject[row.project_id].push({
        kind: row.kind,
        label: row.label,
        url: row.url,
      });
    });

    const derivativesByProject = {};
    derivativeRows.forEach((row) => {
      if (!derivativesByProject[row.project_id]) {
        derivativesByProject[row.project_id] = [];
      }
      derivativesByProject[row.project_id].push({
        type: row.derivative_type,
        title: row.title,
        description: row.description,
        medium: row.medium,
        language: row.language_code,
        status: row.status,
        url: row.url,
      });
    });

    const projects = projectRows.map((p) => ({
      id: p.id,
      slug: p.slug,
      code: p.code,
      status: p.status,
      visibility: p.visibility,
      mainUrl: p.main_url,
      name: p.name,
      shortLabel: p.short_label,
      oneLiner: p.one_liner,
      description: p.description,
      meta: p.meta,
      techSummary: p.tech_summary,
      tags: tagsByProject[p.id] || [],
      links: linksByProject[p.id] || [],
      derivatives: derivativesByProject[p.id] || [],
    }));

    return projects;
  } catch (err) {
    console.error("[api/projects/index.get] Erreur :", err);
    // On **ne renvoie pas d'erreur HTTP** pour ne pas déclencher `error` côté vue
    return [];
  }
});
