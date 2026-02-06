// server/i18n/emails/es.js
import { ctaButton, renderEmailShell, escapeHtml } from '../../utils/emailRender.js'


export function verificationEmail({ config, verifyUrl }) {
  const subject = 'Confirma tu correo electrónico'
  const text = [
    'Bienvenido(a) a Batina Media,',
    '',
    'Para confirmar tu correo electrónico, abre este enlace:',
    verifyUrl,
    '',
    'Si no solicitaste esto, puedes ignorar este mensaje.'
  ].join('\n')

  const html = renderEmailShell({
    config,
    title: 'Confirma tu correo electrónico',
    preheader: 'Activa tu cuenta de Batina Media',
    contentHtml: `
      <p style="margin:0 0 10px 0">Bienvenido(a) a Batina Media,</p>
      <p style="margin:0 0 10px 0">Gracias por crear una cuenta. Confirma tu correo para activar tu espacio.</p>
      ${ctaButton(verifyUrl, 'Confirmar mi correo')}
      <p style="margin:10px 0 0 0;font-size:12px;color:#475569">
        Si no solicitaste esto, puedes ignorar este mensaje.
      </p>
    `
  })

  return { subject, text, html }
}

export function passwordResetEmail({ config, resetUrl }) {
  const subject = 'Restablecer tu contraseña'
  const text = [
    'Solicitaste restablecer tu contraseña.',
    '',
    'Abre este enlace para elegir una nueva contraseña:',
    resetUrl,
    '',
    'Si no solicitaste esto, puedes ignorar este mensaje.'
  ].join('\n')

  const html = renderEmailShell({
    config,
    title: 'Restablecer tu contraseña',
    preheader: 'Elige una nueva contraseña',
    contentHtml: `
      <p style="margin:0 0 10px 0">Solicitaste restablecer tu contraseña.</p>
      <p style="margin:0 0 10px 0">Haz clic en el botón para elegir una nueva contraseña.</p>
      ${ctaButton(resetUrl, 'Elegir una nueva contraseña')}
      <p style="margin:10px 0 0 0;font-size:12px;color:#475569">
        Si no solicitaste esto, puedes ignorar este mensaje.
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

  const subject = `[Contacto Batina Media] ${name || '-'}${projectType ? ` – ${projectType}` : ''}`

  const text = [
    'Nuevo mensaje desde el formulario de contacto:',
    '',
    `Nombre: ${name || '-'}`,
    `Correo: ${email || '-'}`,
    `Organización / proyecto: ${org || '-'}`,
    `Tipo de proyecto: ${projectType || '-'}`,
    `Presupuesto estimado: ${budget || '-'}`,
    `Plazo / cronograma: ${timeline || '-'}`,
    `Locale: ${locale || '-'}`,
    '',
    'Mensaje:',
    message || ''
  ].join('\n')

  const safeMessage = escapeHtml(message || '').replace(/\n/g, '<br/>')

  const html = renderEmailShell({
    config,
    title: 'Nuevo mensaje (Contacto)',
    preheader: 'Formulario de contacto Batina Media',
    contentHtml: `
      <p style="margin:0 0 10px 0">Nuevo mensaje desde el formulario de contacto:</p>

      <p style="margin:0 0 6px 0"><strong>Nombre:</strong> ${escapeHtml(name || '-')}</p>
      <p style="margin:0 0 6px 0"><strong>Correo:</strong> ${escapeHtml(email || '-')}</p>
      <p style="margin:0 0 6px 0"><strong>Organización / proyecto:</strong> ${escapeHtml(org || '-')}</p>
      <p style="margin:0 0 6px 0"><strong>Tipo de proyecto:</strong> ${escapeHtml(projectType || '-')}</p>
      <p style="margin:0 0 6px 0"><strong>Presupuesto:</strong> ${escapeHtml(budget || '-')}</p>
      <p style="margin:0 0 6px 0"><strong>Plazo:</strong> ${escapeHtml(timeline || '-')}</p>
      <p style="margin:0 0 10px 0"><strong>Locale:</strong> ${escapeHtml(locale || '-')}</p>

      <div style="margin-top:10px;padding:10px 12px;border-radius:10px;background:#f1f5f9">
        <div style="font-size:13px;line-height:1.6;color:#0f172a">${safeMessage}</div>
      </div>
    `
  })

  return { subject, text, html }
}
