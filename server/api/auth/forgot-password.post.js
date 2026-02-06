// server/api/auth/forgot-password.post.js
import { readBody } from 'h3'
import { getDb } from '../../utils/db'
import { createUserToken } from '../../utils/userTokens'
import { sendPasswordResetEmail } from '../../utils/mailer'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const db = await getDb()
  const body = (await readBody(event)) || {}
  const email = String(body.email || '').trim().toLowerCase()

  // Always respond with ok=true to avoid user enumeration.
  if (!email) return { ok: true }

  const [rows] = await db.execute(
    'SELECT id, email, disabled_at FROM users WHERE email = ? LIMIT 1',
    [email]
  )

  const user = rows && rows[0]
  if (!user || user.disabled_at) {
    return { ok: true }
  }

  const token = await createUserToken({
    userId: user.id,
    tokenType: 'password_reset',
    ttlMinutes: 60
  })

  try {
    await sendPasswordResetEmail(email, token, config)
  } catch (e) {
    console.warn('[auth/forgot-password] Unable to send password reset email:', e?.message || e)
  }

  return { ok: true }
})
