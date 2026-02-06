// server/i18n/emails/en.js
import { ctaButton, renderEmailShell, escapeHtml } from '../../utils/emailRender.js'

export function verificationEmail({ config, verifyUrl }) {
  const subject = 'Confirm your email address'
  const text = [
    'Welcome to Batina Media,',
    '',
    'To confirm your email address, open this link:',
    verifyUrl,
    '',
    "If you didn't request this, you can ignore this email."
  ].join('\n')

  const html = renderEmailShell({
    config,
    title: 'Confirm your email address',
    preheader: 'Activate your Batina Media account',
    contentHtml: `
      <p style="margin:0 0 10px 0">Welcome to Batina Media,</p>
      <p style="margin:0 0 10px 0">Please confirm your email address to activate your account.</p>
      ${ctaButton(verifyUrl, 'Confirm my email')}
      <p style="margin:10px 0 0 0;font-size:12px;color:#475569">
        If you didn’t request this, you can ignore this email.
      </p>
    `
  })

  return { subject, text, html }
}

export function passwordResetEmail({ config, resetUrl }) {
  const subject = 'Reset your password'
  const text = [
    'You requested a password reset.',
    '',
    'Open this link to choose a new password:',
    resetUrl,
    '',
    "If you didn't request this, you can ignore this email."
  ].join('\n')

  const html = renderEmailShell({
    config,
    title: 'Reset your password',
    preheader: 'Choose a new password',
    contentHtml: `
      <p style="margin:0 0 10px 0">You requested a password reset.</p>
      <p style="margin:0 0 10px 0">Click the button below to choose a new password.</p>
      ${ctaButton(resetUrl, 'Set a new password')}
      <p style="margin:10px 0 0 0;font-size:12px;color:#475569">
        If you didn’t request this, you can ignore this email.
      </p>
    `
  })

  return { subject, text, html }
}

export function contactNotificationEmail({ config, payload }) {
  const { name, email, org, projectType, budget, timeline, message, locale } = payload || {}

  const subject = `[Batina Media Contact] ${name || '-'}${projectType ? ` – ${projectType}` : ''}`

  const text = [
    'New message from the contact form:',
    '',
    `Name: ${name || '-'}`,
    `Email: ${email || '-'}`,
    `Organization / project: ${org || '-'}`,
    `Project type: ${projectType || '-'}`,
    `Budget: ${budget || '-'}`,
    `Timeline: ${timeline || '-'}`,
    `Locale: ${locale || '-'}`,
    '',
    'Message:',
    message || ''
  ].join('\n')

  const safeMessage = escapeHtml(message || '').replace(/\n/g, '<br/>')

  const html = renderEmailShell({
    config,
    title: 'New contact message',
    preheader: 'Batina Media contact form',
    contentHtml: `
      <p style="margin:0 0 10px 0">New message from the contact form:</p>

      <p style="margin:0 0 6px 0"><strong>Name:</strong> ${escapeHtml(name || '-')}</p>
      <p style="margin:0 0 6px 0"><strong>Email:</strong> ${escapeHtml(email || '-')}</p>
      <p style="margin:0 0 6px 0"><strong>Organization / project:</strong> ${escapeHtml(org || '-')}</p>
      <p style="margin:0 0 6px 0"><strong>Project type:</strong> ${escapeHtml(projectType || '-')}</p>
      <p style="margin:0 0 6px 0"><strong>Budget:</strong> ${escapeHtml(budget || '-')}</p>
      <p style="margin:0 0 6px 0"><strong>Timeline:</strong> ${escapeHtml(timeline || '-')}</p>
      <p style="margin:0 0 10px 0"><strong>Locale:</strong> ${escapeHtml(locale || '-')}</p>

      <div style="margin-top:10px;padding:10px 12px;border-radius:10px;background:#f1f5f9">
        <div style="font-size:13px;line-height:1.6;color:#0f172a">${safeMessage}</div>
      </div>
    `
  })

  return { subject, text, html }
}
