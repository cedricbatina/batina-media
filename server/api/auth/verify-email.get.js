// server/api/auth/verify-email.get.js
import { createError, getQuery } from 'h3'
import { getDb } from '../../utils/db'
import { consumeUserToken } from '../../utils/userTokens'

export default defineEventHandler(async (event) => {
  const db = await getDb()
  const q = getQuery(event)
  const token = typeof q.token === 'string' ? q.token : ''

  if (!token) {
    throw createError({ statusCode: 400, statusMessage: 'Missing token' })
  }

  const userId = await consumeUserToken({
    token,
    tokenType: 'email_verify'
  })

  if (!userId) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid or expired token' })
  }

  await db.execute(
    'UPDATE users SET email_verified_at = COALESCE(email_verified_at, NOW()) WHERE id = ?',
    [userId]
  )

  return { ok: true }
})
