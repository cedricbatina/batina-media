// server/api/contact.post.js
import { defineEventHandler, readBody, createError } from "h3";
import { useRuntimeConfig } from "#imports";
import { getDb } from "../utils/db";
import { sendContactEmail } from "../utils/mailer";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const org = (body.org || "").trim();
  const projectType = (body.projectType || "").trim();
  const budget = (body.budget || "").trim();
  const timeline = (body.timeline || "").trim();
  const message = (body.message || "").trim();
  const locale = (body.locale || "fr").slice(0, 8);

  // Validation min (alignée sur le front)
  if (!name || !email || !message) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing required fields",
    });
  }

  const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!emailPattern.test(email)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid email",
    });
  }

  // 1) Insert dans la base
  const db = await getDb(event);
  await db.query(
    `
      INSERT INTO contact_messages
        (name, email, org, project_type, budget, timeline, message, locale, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `,
    [name, email, org, projectType, budget, timeline, message, locale]
  );

  // 2) Notification admin par email
  try {
    await sendContactEmail(
      { name, email, org, projectType, budget, timeline, message, locale },
      config
    );
  } catch (err) {
    console.error("[/api/contact] Error while sending contact email:", err);
    // on ne fait pas échouer la requête pour ça, l’insert DB est déjà fait
  }

  return { ok: true };
});
