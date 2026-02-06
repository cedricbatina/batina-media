// server/api/auth/login.post.js
// Uses `bcrypt` (native) because it's already in package.json.
// If you prefer a pure-JS implementation, install `bcryptjs` and switch the import.
import * as bcrypt from 'bcrypt'
import { getDb } from '../../utils/db'
import { createSessionToken, setSessionCookie } from '../../utils/authSession'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const email = String(body?.email || '').trim().toLowerCase()
  const password = String(body?.password || '')

  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Email et mot de passe requis.' })
  }

  const db = await getDb()

  const [rows] = await db.query(
    'SELECT id, email, password_hash, display_name, email_verified_at FROM users WHERE email = ? LIMIT 1',
    [email]
  )

  const user = rows?.[0]
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Identifiants invalides.' })
  }

  const ok = await bcrypt.compare(password, user.password_hash)
  if (!ok) {
    throw createError({ statusCode: 401, statusMessage: 'Identifiants invalides.' })
  }

  const session = await createSessionToken({
    userId: user.id,
    email: user.email,
    roles: []
  })

  setSessionCookie(event, session)

  return {
    ok: true,
    user: {
      id: user.id,
      email: user.email,
      displayName: user.display_name || null,
      emailVerified: !!user.email_verified_at
    }
  }
})
