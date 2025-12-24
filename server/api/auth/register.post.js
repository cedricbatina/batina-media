// server/api/auth/register.post.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getDb } from "../../utils/db";
import { sendVerificationEmail } from "../../utils/mailer";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, email, password } = body || {};

  if (!username || !email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: "username, email et password sont requis.",
    });
  }

  const db = await getDb(event);

  // Vérifier si l'utilisateur existe déjà
  const [existing] = await db.execute(
    "SELECT id FROM users WHERE email = ? OR username = ? LIMIT 1",
    [email, username]
  );

  if (existing.length > 0) {
    throw createError({
      statusCode: 409,
      statusMessage: "Un utilisateur avec cet email ou ce nom existe déjà.",
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const now = new Date();

  const [result] = await db.execute(
    "INSERT INTO users (username, email, password, image, date) VALUES (?, ?, ?, ?, ?)",
    [username, email, passwordHash, null, now]
  );

  const userId = result.insertId;
  const config = useRuntimeConfig();

  // Token pour vérification email
  const emailToken = jwt.sign(
    {
      sub: userId,
      type: "email_verify",
    },
    config.jwtEmailSecret,
    { expiresIn: "2d" }
  );

  await sendVerificationEmail(email, emailToken, config);

  return {
    success: true,
    message: "Compte créé. Vérifiez votre e-mail pour activer votre compte.",
  };
});
