// server/api/auth/login.post.js
import bcrypt from "bcrypt";
import { getDb } from "../../utils/db";
import {
  createSessionToken,
  setSessionCookie,
} from "../../utils/authSession";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body || {};

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: "email et password sont requis.",
    });
  }

  const db = await getDb(event);
  const [rows] = await db.execute(
    "SELECT id, username, email, password, role, email_verified FROM users WHERE email = ? LIMIT 1",
    [email]
  );

  if (rows.length === 0) {
    throw createError({
      statusCode: 401,
      statusMessage: "Identifiants invalides.",
    });
  }

  const user = rows[0];

  if (!user.email_verified) {
    throw createError({
      statusCode: 403,
      statusMessage: "Veuillez d’abord vérifier votre adresse e-mail.",
    });
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    throw createError({
      statusCode: 401,
      statusMessage: "Identifiants invalides.",
    });
  }

  const config = useRuntimeConfig();

  const safeUser = {
    id: user.id,
    email: user.email,
    username: user.username,
    role: user.role || "user",
  };

  const token = createSessionToken(safeUser, config.jwtSecret);
  setSessionCookie(event, token);

  return {
    success: true,
    user: safeUser,
  };
});
