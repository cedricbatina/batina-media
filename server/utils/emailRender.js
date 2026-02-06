// server/utils/emailRender.js

export function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function pickBaseUrl(config) {
  return (
    config?.public?.appBaseUrl ||
    config?.appBaseUrl ||
    config?.mailBaseUrl ||
    ''
  ).replace(/\/$/, '')
}

function logoUrl(config) {
  const base = pickBaseUrl(config)
  if (!base) return null
  return `${base}/images/logo-batina-media.png`
}

export function ctaButton(url, label) {
  const safeUrl = String(url)
  const safeLabel = escapeHtml(label)
  return `
    <div style="margin:14px 0 6px 0">
      <a href="${safeUrl}" style="display:inline-block;padding:10px 14px;border-radius:10px;text-decoration:none;background:#2563eb;color:#ffffff;font-weight:650">
        ${safeLabel}
      </a>
    </div>
  `.trim()
}

export function renderEmailShell({ config, title, preheader, contentHtml }) {
  const _logo = logoUrl(config)
  const safeTitle = escapeHtml(title || '')
  const safePreheader = escapeHtml(preheader || '')

  const preheaderHtml = preheader
    ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${safePreheader}</div>`
    : ''

  return `
${preheaderHtml}
<div style="margin:0;padding:0;background:#0b1220">
  <div style="max-width:640px;margin:0 auto;padding:28px 18px;font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif;color:#0f172a;">
    ${_logo ? `<div style="margin:0 0 14px 0;">
      <img src="${_logo}" alt="Batina Media" style="height:34px;width:auto;display:block" />
    </div>` : ''}

    <div style="background:#ffffff;border-radius:14px;padding:18px 18px 14px 18px;box-shadow:0 10px 30px rgba(0,0,0,.25)">
      <h1 style="margin:0 0 10px 0;font-size:18px;line-height:1.25;color:#0f172a">${safeTitle}</h1>
      <div style="font-size:14px;line-height:1.6;color:#0f172a">
        ${contentHtml || ''}
      </div>
    </div>

    <div style="margin-top:12px;font-size:12px;line-height:1.5;color:rgba(255,255,255,.72)">
      <p style="margin:0">© ${new Date().getFullYear()} Batina Media</p>
    </div>
  </div>
</div>`.trim()
}
