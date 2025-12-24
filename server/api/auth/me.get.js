// server/api/auth/me.get.js
import { getDb } from "../../utils/db";
import { readSessionFromCookie } from "../../utils/authSession";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const session = readSessionFromCookie(event, config.jwtSecret);

  if (!session) {
    return { user: null };
  }

  const db = await getDb(event);
  const [rows] = await db.execute(
    "SELECT id, username, email, role, image, date FROM users WHERE id = ? LIMIT 1",
    [session.sub]
  );

  if (rows.length === 0) {
    return { user: null };
  }

  const user = rows[0];

  return {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role || "user",
      image: user.image,
      date: user.date,
    },
  };
});

