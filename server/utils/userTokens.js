// server/utils/userTokens.js
// Generic token storage for flows like email verification and password reset.
// Token is stored hashed (SHA-256) in DB; raw token is only ever sent to the user.

import crypto from 'node:crypto'
import { getDb } from './db'

export function generateRawToken () {
  // 32 bytes => 64 hex chars, URL-safe and long enough.
  return crypto.randomBytes(32).toString('hex')
}

export function hashToken (rawToken) {
  return crypto.createHash('sha256').update(String(rawToken || '')).digest('hex')
}

export async function createUserToken ({
  userId,
  tokenType,
  ttlMinutes,
  meta = null
}) {
  const pool = await getDb()
  const rawToken = generateRawToken()
  const tokenHash = hashToken(rawToken)

  const expiresAt = new Date(Date.now() + Number(ttlMinutes || 60) * 60 * 1000)
  const metaJson = meta ? JSON.stringify(meta) : null

  await pool.execute(
    `INSERT INTO user_tokens (user_id, token_type, token_hash, expires_at, meta_json)
     VALUES (?, ?, ?, ?, ?)`
    , [userId, tokenType, tokenHash, expiresAt, metaJson]
  )

  return rawToken
}

export async function consumeUserToken ({ token, tokenType }) {
  const pool = await getDb()
  const tokenHash = hashToken(token)

  const [rows] = await pool.execute(
    `SELECT id, user_id, expires_at, consumed_at
       FROM user_tokens
      WHERE token_hash = ? AND token_type = ?
      LIMIT 1`,
    [tokenHash, tokenType]
  )

  const row = rows && rows[0]
  if (!row) return null
  if (row.consumed_at) return null
  if (row.expires_at && new Date(row.expires_at).getTime() < Date.now()) return null

  await pool.execute(
    `UPDATE user_tokens SET consumed_at = NOW() WHERE id = ? AND consumed_at IS NULL`,
    [row.id]
  )

  return Number(row.user_id)
}
