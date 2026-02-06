
// server/i18n/emails/fr.js
import { ctaButton, renderEmailShell, escapeHtml } from '../../utils/emailRender.js'

// ... le reste IDENTIQUE à ce que tu as collé


export function verificationEmail({ config, verifyUrl }) {
  const subject = 'Confirmez votre adresse e-mail'
  const text = [
    'Bienvenue chez Batina Media,',
    '',
    'Pour confirmer votre adresse e-mail, ouvrez ce lien :',
    verifyUrl,
    '',
    "Si vous n’êtes pas à l’origine de cette demande, ignorez ce message."
  ].join('\n')

  const html = renderEmailShell({
    config,
    title: 'Confirmez votre adresse e-mail',
    preheader: 'Activez votre compte Batina Media',
    contentHtml: `
      <p style="margin:0 0 10px 0">Bienvenue chez Batina Media,</p>
      <p style="margin:0 0 10px 0">Merci de créer un compte. Confirmez votre adresse e-mail pour activer votre espace.</p>
      ${ctaButton(verifyUrl, 'Confirmer mon adresse e-mail')}
      <p style="margin:10px 0 0 0;font-size:12px;color:#475569">
        Si vous n’êtes pas à l’origine de cette demande, ignorez ce message.
      </p>
    `
  })

  return { subject, text, html }
}

export function passwordResetEmail({ config, resetUrl }) {
  const subject = 'Réinitialiser votre mot de passe'
  const text = [
    'Vous avez demandé une réinitialisation de mot de passe.',
    '',
    'Ouvrez ce lien pour choisir un nouveau mot de passe :',
    resetUrl,
    '',
    "Si vous n’êtes pas à l’origine de cette demande, ignorez ce message."
  ].join('\n')

  const html = renderEmailShell({
    config,
    title: 'Réinitialiser votre mot de passe',
    preheader: 'Choisissez un nouveau mot de passe',
    contentHtml: `
      <p style="margin:0 0 10px 0">Vous avez demandé une réinitialisation de mot de passe.</p>
      <p style="margin:0 0 10px 0">Cliquez sur le bouton ci-dessous pour choisir un nouveau mot de passe.</p>
      ${ctaButton(resetUrl, 'Choisir un nouveau mot de passe')}
      <p style="margin:10px 0 0 0;font-size:12px;color:#475569">
        Si vous n’êtes pas à l’origine de cette demande, ignorez ce message.
      </p>
    `
  })

  return { subject, text, html }
}

export function contactNotificationEmail({ config, payload }) {
  const {
    name,
    email,
    org,
    projectType,
    budget,
    timeline,
    message,
    locale
  } = payload || {}

  const subject = `[Contact Batina Media] ${name || '-'}${projectType ? ` – ${projectType}` : ''}`

  const text = [
    'Nouveau message via le formulaire de contact :',
    '',
    `Nom : ${name || '-'}`,
    `E-mail : ${email || '-'}`,
    `Organisation / projet : ${org || '-'}`,
    `Type de projet : ${projectType || '-'}`,
    `Budget indicatif : ${budget || '-'}`,
    `Délais / échéances : ${timeline || '-'}`,
    `Locale : ${locale || '-'}`,
    '',
    'Message :',
    message || ''
  ].join('\n')

  const safeMessage = escapeHtml(message || '').replace(/\n/g, '<br/>')

  const html = renderEmailShell({
    config,
    title: 'Nouveau message (Contact)',
    preheader: 'Formulaire de contact Batina Media',
    contentHtml: `
      <p style="margin:0 0 10px 0">Nouveau message via le formulaire de contact :</p>

      <p style="margin:0 0 6px 0"><strong>Nom :</strong> ${escapeHtml(name || '-')}</p>
      <p style="margin:0 0 6px 0"><strong>E-mail :</strong> ${escapeHtml(email || '-')}</p>
      <p style="margin:0 0 6px 0"><strong>Organisation / projet :</strong> ${escapeHtml(org || '-')}</p>
      <p style="margin:0 0 6px 0"><strong>Type de projet :</strong> ${escapeHtml(projectType || '-')}</p>
      <p style="margin:0 0 6px 0"><strong>Budget :</strong> ${escapeHtml(budget || '-')}</p>
      <p style="margin:0 0 6px 0"><strong>Délais :</strong> ${escapeHtml(timeline || '-')}</p>
      <p style="margin:0 0 10px 0"><strong>Locale :</strong> ${escapeHtml(locale || '-')}</p>

      <div style="margin-top:10px;padding:10px 12px;border-radius:10px;background:#f1f5f9">
        <div style="font-size:13px;line-height:1.6;color:#0f172a">${safeMessage}</div>
      </div>
    `
  })

  return { subject, text, html }
}
