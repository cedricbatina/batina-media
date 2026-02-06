// server/api/auth/reset-password.post.js
// Uses `bcrypt` (native) because it's already in package.json.
// If you prefer a pure-JS implementation, install `bcryptjs` and switch the import.
import * as bcrypt from 'bcrypt'
import { getDb } from '../../utils/db'
import { consumeUserToken } from '../../utils/userTokens'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const email = String(body?.email || '').trim().toLowerCase()
  const token = String(body?.token || '').trim()
  const newPassword = String(body?.password || '')

  if (!email || !token || !newPassword) {
    throw createError({ statusCode: 400, statusMessage: 'Paramètres invalides.' })
  }

  const db = await getDb()

  // Find user
  const [rows] = await db.query('SELECT id FROM users WHERE email = ? LIMIT 1', [email])
  const user = rows?.[0]
  if (!user) {
    throw createError({ statusCode: 400, statusMessage: 'Lien invalide.' })
  }

  // Consume token
  const ok = await consumeUserToken(db, {
    userId: user.id,
    tokenType: 'password_reset',
    token
  })

  if (!ok) {
    throw createError({ statusCode: 400, statusMessage: 'Lien expiré ou déjà utilisé.' })
  }

  const passwordHash = await bcrypt.hash(newPassword, 10)

  await db.query('UPDATE users SET password_hash = ? WHERE id = ?', [passwordHash, user.id])

  return { ok: true }
})
