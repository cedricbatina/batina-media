// server/api/auth/logout.post.js
import { clearSessionCookie } from "../../utils/authSession";

export default defineEventHandler(async (event) => {
  clearSessionCookie(event);
  return { success: true };
});

