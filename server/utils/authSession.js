// server/utils/authSession.js
import jwt from "jsonwebtoken";

const COOKIE_NAME = "bm_session";

export function createSessionToken(user, jwtSecret) {
  // user = { id, email, username, role }
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      username: user.username,
      role: user.role || "user",
    },
    jwtSecret,
    { expiresIn: "7d" }
  );
}

export function setSessionCookie(event, token) {
  const isProd = process.env.NODE_ENV === "production";

  setCookie(event, COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 jours
  });
}

export function clearSessionCookie(event) {
  deleteCookie(event, COOKIE_NAME, { path: "/" });
}

export function readSessionFromCookie(event, jwtSecret) {
  const token = getCookie(event, COOKIE_NAME);
  if (!token) return null;

  try {
    const payload = jwt.verify(token, jwtSecret);
    return payload;
  } catch {
    return null;
  }
}
