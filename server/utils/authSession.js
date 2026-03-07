// server/utils/authSession.js
import jwt from 'jsonwebtoken'
import { getCookie, setCookie, deleteCookie, getHeader } from 'h3'

const DEFAULT_COOKIE = 'bm_session'

export function createSessionToken(payload, jwtSecret, opts = {}) {
  if (!jwtSecret) {
    throw new Error('Missing jwtSecret for session token creation')
  }

  const normalizedPayload = {
    ...payload,
    sub: payload?.sub ?? payload?.userId ?? payload?.id ?? null
  }

  const expiresIn = opts.expiresIn || '7d'
  return jwt.sign(normalizedPayload, jwtSecret, { expiresIn })
}

export function setSessionCookie(event, token, opts = {}) {
  const cookieName = opts.cookieName || DEFAULT_COOKIE
  const maxAgeDays = Number(opts.maxAgeDays || 7)

  setCookie(event, cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: maxAgeDays * 24 * 60 * 60
  })
}

export function clearSessionCookie(event, opts = {}) {
  const cookieName = opts.cookieName || DEFAULT_COOKIE
  deleteCookie(event, cookieName, { path: '/' })
}

export function readSessionFromCookie(event, jwtSecret, opts = {}) {
  const cookieName = opts.cookieName || DEFAULT_COOKIE
  const token = getCookie(event, cookieName)
  if (!token) return null

  try {
    return jwt.verify(token, jwtSecret)
  } catch {
    return null
  }
}

// ✅ attendu par server/api/auth/me.get.js
export function getSessionFromEvent(event, jwtSecret, opts = {}) {
  const fromCookie = readSessionFromCookie(event, jwtSecret, opts)
  if (fromCookie) return fromCookie

  const auth = getHeader(event, 'authorization') || ''
  const m = auth.match(/^Bearer\s+(.+)$/i)
  if (!m) return null

  try {
    return jwt.verify(m[1], jwtSecret)
  } catch {
    return null
  }
}
