// server/utils/mailer.js
import nodemailer from 'nodemailer'
import { getEmailTemplates } from '../i18n/emails/index.js'
import { pickBaseUrl } from './emailRender.js'

let cached = { transporter: null, key: null }

function getSmtpKey(config) {
  return [
    config?.smtpHost || '',
    String(config?.smtpPort || ''),
    config?.smtpUser || '',
    config?.smtpPass ? '***' : ''
  ].join('|')
}

function getTransporter(config) {
  const host = config?.smtpHost
  const hostIp = config?.smtpHostIp
  const tlsServername = config?.smtpTlsServername || host
  const user = config?.smtpUser
  const pass = config?.smtpPass
  const port = Number(config?.smtpPort || 587)

  if ((!host && !hostIp) || !user || !pass) return null

  const key = getSmtpKey(config)
  if (cached.transporter && cached.key === key) return cached.transporter

  const secure = port === 465
  const transporter = nodemailer.createTransport({
    host: hostIp || host,
    port,
    secure,
    auth: { user, pass },
    tls: {
      servername: tlsServername
    }
  })

  cached = { transporter, key }
  return transporter
}

function fromAddress(config) {
  return config?.mailFrom || config?.smtpUser
}

function normalizeLocale(input, fallback = 'fr') {
  const v = String(input || '').trim().toLowerCase()
  if (!v) return fallback
  const code = v.split('-')[0]
  if (code === 'fr' || code === 'en' || code === 'pt' || code === 'es') return code
  return fallback
}

async function sendMail({ to, subject, text, html, replyTo }, config) {
  const transport = getTransporter(config)
  if (!transport) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[mailer] SMTP config missing in non-production mode. Email not sent.')
      console.info('[mailer] Email preview:', { to, subject, text })
      return
    }

    throw new Error('[mailer] Missing SMTP config (smtpHost/smtpUser/smtpPass).')
  }

  await transport.sendMail({
    from: fromAddress(config),
    to,
    subject,
    text,
    html,
    replyTo: replyTo || undefined
  })
}

/**
 * Vérification email
 * Signature: (to, token, config, locale?)
 */
export async function sendVerificationEmail(to, token, config, locale = 'fr') {
  const baseUrl = pickBaseUrl(config)
  const mailBase = (config?.mailVerificationBaseUrl || baseUrl).replace(/\/$/, '')
  const verifyUrl = `${mailBase}/verify-email?token=${encodeURIComponent(token)}`

  const loc = normalizeLocale(locale, 'fr')
  const tpl = getEmailTemplates(loc)

  const pack = tpl?.verificationEmail
    ? tpl.verificationEmail({ config, verifyUrl })
    : {
        subject: 'Confirmez votre adresse e-mail',
        text: `Veuillez confirmer votre adresse e-mail :\n${verifyUrl}`,
        html: `<p>Veuillez confirmer votre adresse e-mail :</p><p><a href="${verifyUrl}">${verifyUrl}</a></p>`
      }

  await sendMail({ to, subject: pack.subject, text: pack.text, html: pack.html }, config)
}

/**
 * Reset password
 * Signature: (to, token, config, locale?)
 */
export async function sendPasswordResetEmail(to, token, config, locale = 'fr') {
  const baseUrl = pickBaseUrl(config)
  const mailBase = (config?.mailPasswordResetBaseUrl || baseUrl).replace(/\/$/, '')
  const resetUrl = `${mailBase}/reset-password?token=${encodeURIComponent(token)}`

  const loc = normalizeLocale(locale, 'fr')
  const tpl = getEmailTemplates(loc)

  const pack = tpl?.passwordResetEmail
    ? tpl.passwordResetEmail({ config, resetUrl })
    : {
        subject: 'Réinitialiser votre mot de passe',
        text: `Réinitialisez votre mot de passe :\n${resetUrl}`,
        html: `<p>Réinitialisez votre mot de passe :</p><p><a href="${resetUrl}">${resetUrl}</a></p>`
      }

  await sendMail({ to, subject: pack.subject, text: pack.text, html: pack.html }, config)
}

/**
 * Notification contact (admin)
 * Signature: (payload, config)
 */
export async function sendContactEmail(payload, config) {
  const adminTo = config?.contactTo || config?.mailFrom || config?.smtpUser
  if (!adminTo) {
    console.warn('[sendContactEmail] Missing contactTo/mailFrom/smtpUser.')
    return
  }

  const loc = normalizeLocale(payload?.locale, 'fr')
  const tpl = getEmailTemplates(loc)

  const pack = tpl?.contactNotificationEmail
    ? tpl.contactNotificationEmail({ config, payload })
    : null

  const subject = pack?.subject || `[Contact Batina Media] ${payload?.name || '-'}`
  const text = pack?.text || JSON.stringify(payload || {}, null, 2)
  const html = pack?.html || `<pre>${text}</pre>`

  await sendMail(
    { to: adminTo, subject, text, html, replyTo: payload?.email || undefined },
    config
  )
}
