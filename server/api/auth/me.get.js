// server/api/auth/me.get.js
import { createError } from 'h3'
import { getDb } from '../../utils/db'
import { getSessionFromEvent } from '../../utils/authSession'

async function fetchAccountsForUser (db, userId) {
  const [rows] = await db.execute(
    `SELECT
        m.id AS membershipId,
        a.id AS accountId,
        a.name AS accountName,
        a.slug AS accountSlug,
        at.slug AS accountType,
        at.label AS accountTypeLabel,
        GROUP_CONCAT(DISTINCT r.slug ORDER BY r.slug SEPARATOR ',') AS roles
      FROM account_memberships m
      JOIN accounts a ON a.id = m.account_id
      JOIN account_types at ON at.id = a.account_type_id
      LEFT JOIN account_membership_roles mr ON mr.membership_id = m.id
      LEFT JOIN roles r ON r.id = mr.role_id
      WHERE m.user_id = ?
      GROUP BY m.id, a.id
      ORDER BY a.id ASC`,
    [userId]
  )

  return (rows || []).map((r) => ({
    membershipId: Number(r.membershipId),
    id: Number(r.accountId),
    name: r.accountName,
    slug: r.accountSlug,
    type: r.accountType,
    typeLabel: r.accountTypeLabel,
    roles: (r.roles ? String(r.roles).split(',').filter(Boolean) : [])
  }))
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const session = getSessionFromEvent(event, config.jwtSecret)
  if (!session?.sub) {
    return { user: null }
  }

  const db = await getDb()

  const [rows] = await db.execute(
    `SELECT id, email, username, display_name, avatar_url,
            email_verified_at, disabled_at, created_at, updated_at
       FROM users
      WHERE id = ?
      LIMIT 1`,
    [session.sub]
  )

  const user = rows && rows[0]
  if (!user) {
    // Cookie exists but user removed.
    return { user: null }
  }

  if (user.disabled_at) {
    throw createError({ statusCode: 403, statusMessage: 'Account disabled' })
  }

  const accounts = await fetchAccountsForUser(db, user.id)

  return {
    user: {
      id: Number(user.id),
      email: user.email,
      username: user.username,
      displayName: user.display_name,
      avatarUrl: user.avatar_url,
      emailVerifiedAt: user.email_verified_at,
      emailVerified: !!user.email_verified_at,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
      accounts,
      // convenience: default context
      activeAccountId: accounts[0]?.id || null
    }
  }
})
