// server/api/auth/verify-email.get.js
import jwt from "jsonwebtoken";
import { getDb } from "../../utils/db";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const token = query.token;

  if (!token) {
    throw createError({
      statusCode: 400,
      statusMessage: "Token de vérification manquant.",
    });
  }

  const config = useRuntimeConfig();
  let payload;

  try {
    payload = jwt.verify(token, config.jwtEmailSecret);
  } catch {
    throw createError({
      statusCode: 400,
      statusMessage: "Token invalide ou expiré.",
    });
  }

  if (payload.type !== "email_verify") {
    throw createError({
      statusCode: 400,
      statusMessage: "Type de token invalide.",
    });
  }

  const db = await getDb(event);
  await db.execute("UPDATE users SET email_verified = 1 WHERE id = ?", [
    payload.sub,
  ]);

  // Tu peux soit renvoyer du JSON, soit rediriger vers /login
  // Ici: simple JSON, le front gèrera l'UX
  return {
    success: true,
    message: "Adresse e-mail vérifiée. Vous pouvez maintenant vous connecter.",
  };
});
