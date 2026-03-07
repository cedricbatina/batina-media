// server/api/auth/register.post.js
// Uses `bcrypt` (native) because it's already in package.json.
// If you prefer a pure-JS implementation, install `bcryptjs` and switch the import.
import * as bcrypt from 'bcrypt'
import { getDb } from '../../utils/db'
import { createUserToken } from '../../utils/userTokens'
import { sendVerificationEmail } from '../../utils/mailer'
import { createSessionToken, setSessionCookie } from '../../utils/authSession'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const email = String(body?.email || '').trim().toLowerCase()
  const password = String(body?.password || '')
  const username = String(body?.username || body?.name || '').trim()
  const locale = String(body?.locale || '').trim() || 'fr'

  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Email et mot de passe requis.' })
  }

  const db = await getDb()

  const [existing] = await db.query('SELECT id FROM users WHERE email = ? LIMIT 1', [email])
  if (existing.length) {
    throw createError({ statusCode: 409, statusMessage: 'Cet email est déjà utilisé.' })
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const [res] = await db.query(
    `INSERT INTO users (email, password_hash, display_name, created_at)
     VALUES (?, ?, ?, NOW())`,
    [email, passwordHash, username || null]
  )

  const userId = res.insertId

  // token email verification
  const token = await createUserToken({
    userId,
    tokenType: 'email_verify',
    ttlMinutes: 60 * 24 * 3 // 3 jours
  })

  try {
    await sendVerificationEmail(email, token, config, locale)
  } catch (e) {
    // Do not block registration if mail delivery fails.
    console.warn('[auth/register] Unable to send verification email:', e?.message || e)
  }

  // auto-login (optional) -> session cookie
  const session = await createSessionToken({ userId, email, roles: [] }, config.jwtSecret)
  setSessionCookie(event, session)

  return {
    ok: true,
    user: { id: userId, email, displayName: username || null, emailVerified: false },
    verificationToken: process.env.NODE_ENV !== 'production' ? token : undefined
  }
})
