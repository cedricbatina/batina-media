// server/i18n/emails/pt.js
import { ctaButton, renderEmailShell, escapeHtml } from '../../utils/emailRender.js'

export function verificationEmail({ config, verifyUrl }) {
  const subject = 'Confirme o seu e-mail'
  const text = [
    'Bem-vindo(a) a Batina Media,',
    '',
    'Para confirmar o seu e-mail, abra este link:',
    verifyUrl,
    '',
    'Se nao solicitou isto, pode ignorar este e-mail.'
  ].join('\n')

  const html = renderEmailShell({
    config,
    title: 'Confirme o seu e-mail',
    preheader: 'Ative a sua conta Batina Media',
    contentHtml: `
      <p style="margin:0 0 10px 0">Bem-vindo(a) a Batina Media,</p>
      <p style="margin:0 0 10px 0">Confirme o seu e-mail para ativar a sua conta.</p>
      ${ctaButton(verifyUrl, 'Confirmar o meu e-mail')}
      <p style="margin:10px 0 0 0;font-size:12px;color:#475569">
        Se nao solicitou isto, pode ignorar este e-mail.
      </p>
    `
  })

  return { subject, text, html }
}

export function passwordResetEmail({ config, resetUrl }) {
  const subject = 'Redefinir a sua palavra-passe'
  const text = [
    'Recebemos um pedido para redefinir a sua palavra-passe.',
    '',
    'Abra este link para escolher uma nova palavra-passe:',
    resetUrl,
    '',
    'Se nao solicitou isto, pode ignorar este e-mail.'
  ].join('\n')

  const html = renderEmailShell({
    config,
    title: 'Redefinir a sua palavra-passe',
    preheader: 'Escolha uma nova palavra-passe',
    contentHtml: `
      <p style="margin:0 0 10px 0">Recebemos um pedido para redefinir a sua palavra-passe.</p>
      <p style="margin:0 0 10px 0">Clique no botao para escolher uma nova palavra-passe.</p>
      ${ctaButton(resetUrl, 'Escolher nova palavra-passe')}
      <p style="margin:10px 0 0 0;font-size:12px;color:#475569">
        Se nao solicitou isto, pode ignorar este e-mail.
      </p>
    `
  })

  return { subject, text, html }
}

export function contactNotificationEmail({ config, payload }) {
  const { name, email, org, projectType, budget, timeline, message, locale } = payload || {}

  const subject = `[Contacto Batina Media] ${name || '-'}${projectType ? ` - ${projectType}` : ''}`

  const text = [
    'Nova mensagem do formulario de contacto:',
    '',
    `Nome: ${name || '-'}`,
    `E-mail: ${email || '-'}`,
    `Organizacao / projeto: ${org || '-'}`,
    `Tipo de projeto: ${projectType || '-'}`,
    `Orcamento: ${budget || '-'}`,
    `Prazo: ${timeline || '-'}`,
    `Locale: ${locale || '-'}`,
    '',
    'Mensagem:',
    message || ''
  ].join('\n')

  const safeMessage = escapeHtml(message || '').replace(/\n/g, '<br/>')

  const html = renderEmailShell({
    config,
    title: 'Nova mensagem (Contacto)',
    preheader: 'Formulario de contacto Batina Media',
    contentHtml: `
      <p style="margin:0 0 10px 0">Nova mensagem do formulario de contacto:</p>

      <p style="margin:0 0 6px 0"><strong>Nome:</strong> ${escapeHtml(name || '-')}</p>
      <p style="margin:0 0 6px 0"><strong>E-mail:</strong> ${escapeHtml(email || '-')}</p>
      <p style="margin:0 0 6px 0"><strong>Organizacao / projeto:</strong> ${escapeHtml(org || '-')}</p>
      <p style="margin:0 0 6px 0"><strong>Tipo de projeto:</strong> ${escapeHtml(projectType || '-')}</p>
      <p style="margin:0 0 6px 0"><strong>Orcamento:</strong> ${escapeHtml(budget || '-')}</p>
      <p style="margin:0 0 6px 0"><strong>Prazo:</strong> ${escapeHtml(timeline || '-')}</p>
      <p style="margin:0 0 10px 0"><strong>Locale:</strong> ${escapeHtml(locale || '-')}</p>

      <div style="margin-top:10px;padding:10px 12px;border-radius:10px;background:#f1f5f9">
        <div style="font-size:13px;line-height:1.6;color:#0f172a">${safeMessage}</div>
      </div>
    `
  })

  return { subject, text, html }
}
