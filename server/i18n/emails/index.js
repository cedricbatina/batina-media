// server/i18n/emails/index.js
import * as fr from './fr'
import * as en from './en'
import * as pt from './pt'
import * as es from './es'

export function getEmailTemplates(locale = 'fr') {
  const code = String(locale || 'fr').toLowerCase().split('-')[0]

  switch (code) {
    case 'en':
      return en
    case 'pt':
      return pt
    case 'es':
      return es
    case 'fr':
    default:
      return fr
  }
}
