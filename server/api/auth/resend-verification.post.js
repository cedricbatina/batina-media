// server/api/auth/resend-verification.post.js
import { readBody } from 'h3'
import { getDb } from '../../utils/db'
import { getSessionFromEvent } from '../../utils/authSession'
import { createUserToken } from '../../utils/userTokens'
import { sendVerificationEmail } from '../../utils/mailer'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const db = await getDb()
  const body = (await readBody(event).catch(() => ({}))) || {}

  // Prefer session user if logged in; otherwise accept email.
  const session = getSessionFromEvent(event, config.jwtSecret)
  const email = String(session?.email || body?.email || '').trim().toLowerCase()
  const locale = String(body?.locale || '').trim() || 'fr'

  // Always return ok to avoid user enumeration.
  if (!email) return { ok: true, sent: false }

  const [[user]] = await db.execute(
    'SELECT id, email, email_verified_at FROM users WHERE email = ? LIMIT 1',
    [email]
  )

  if (!user) {
    return { ok: true, sent: true }
  }

  if (user.email_verified_at) {
    return { ok: true, alreadyVerified: true, sent: false }
  }

  const token = await createUserToken({
    userId: user.id,
    tokenType: 'email_verify',
    ttlMinutes: 60 * 24
  })

  let sent = false
  try {
    await sendVerificationEmail(user.email, token, config, locale)
    sent = true
  } catch (e) {
    console.warn('[auth/resend-verification] Unable to send verification email:', e?.message || e)
    return {
      ok: true,
      sent: false,
      statusMessage: process.env.NODE_ENV === 'production' ? undefined : String(e?.message || 'MAIL_SEND_FAILED')
    }
  }

  return { ok: true, sent }
})
