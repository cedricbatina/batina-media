import fs from 'node:fs'
import path from 'node:path'

const locales = {
  fr: {
    auth: {
      resend: {
        hero: {
          label: 'Verification e-mail',
          title: 'Renvoyer l\'e-mail de verification',
          subtitle: 'Nous pouvons renvoyer un nouveau lien de verification a votre adresse.'
        },
        aside: {
          label: 'Aide verification',
          title: 'Avant de renvoyer',
          items: {
            0: 'Utilisez l\'adresse e-mail de votre compte.',
            1: 'Verifiez vos spams et courriers indesirables.',
            2: 'Le lien expire, vous pouvez en demander un nouveau.'
          }
        },
        form: {
          title: 'Renvoyer la verification',
          subtitle: 'Entrez votre adresse e-mail pour recevoir un nouveau lien.',
          actions: {
            submit: 'Renvoyer l\'e-mail',
            submitting: 'Envoi en cours...',
            backToLogin: 'Retour a la connexion'
          }
        },
        feedback: {
          sent: 'E-mail de verification envoye. Verifiez votre boite de reception.',
          alreadyVerified: 'Cette adresse est deja verifiee. Vous pouvez vous connecter.'
        }
      }
    }
  },
  en: {
    auth: {
      resend: {
        hero: {
          label: 'Email verification',
          title: 'Resend verification email',
          subtitle: 'We can send a new verification link to your address.'
        },
        aside: {
          label: 'Verification help',
          title: 'Before resending',
          items: {
            0: 'Use the email address of your account.',
            1: 'Check your spam/junk folder.',
            2: 'Verification links expire, request a fresh one.'
          }
        },
        form: {
          title: 'Resend verification',
          subtitle: 'Enter your email address to receive a new link.',
          actions: {
            submit: 'Resend email',
            submitting: 'Sending...',
            backToLogin: 'Back to login'
          }
        },
        feedback: {
          sent: 'Verification email sent. Please check your inbox.',
          alreadyVerified: 'This address is already verified. You can sign in.'
        }
      }
    }
  },
  es: {
    auth: {
      resend: {
        hero: {
          label: 'Verificacion de correo',
          title: 'Reenviar correo de verificacion',
          subtitle: 'Podemos enviar un nuevo enlace de verificacion a tu direccion.'
        },
        aside: {
          label: 'Ayuda de verificacion',
          title: 'Antes de reenviar',
          items: {
            0: 'Usa el correo de tu cuenta.',
            1: 'Revisa spam o correo no deseado.',
            2: 'El enlace caduca, puedes solicitar uno nuevo.'
          }
        },
        form: {
          title: 'Reenviar verificacion',
          subtitle: 'Introduce tu correo para recibir un nuevo enlace.',
          actions: {
            submit: 'Reenviar correo',
            submitting: 'Enviando...',
            backToLogin: 'Volver al inicio de sesion'
          }
        },
        feedback: {
          sent: 'Correo de verificacion enviado. Revisa tu bandeja de entrada.',
          alreadyVerified: 'Esta direccion ya esta verificada. Puedes iniciar sesion.'
        }
      }
    }
  },
  pt: {
    auth: {
      resend: {
        hero: {
          label: 'Verificacao de e-mail',
          title: 'Reenviar e-mail de verificacao',
          subtitle: 'Podemos enviar um novo link de verificacao para o seu endereco.'
        },
        aside: {
          label: 'Ajuda de verificacao',
          title: 'Antes de reenviar',
          items: {
            0: 'Use o e-mail da sua conta.',
            1: 'Verifique spam e lixo eletronico.',
            2: 'O link expira, pode pedir um novo.'
          }
        },
        form: {
          title: 'Reenviar verificacao',
          subtitle: 'Introduza o seu e-mail para receber um novo link.',
          actions: {
            submit: 'Reenviar e-mail',
            submitting: 'A enviar...',
            backToLogin: 'Voltar ao login'
          }
        },
        feedback: {
          sent: 'E-mail de verificacao enviado. Verifique a sua caixa de entrada.',
          alreadyVerified: 'Este endereco ja esta verificado. Pode iniciar sessao.'
        }
      }
    }
  }
}

function flatten(obj, prefix = '') {
  return Object.entries(obj).flatMap(([k, v]) => {
    const key = prefix ? `${prefix}.${k}` : k
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      return flatten(v, key)
    }
    return [[key, v]]
  })
}

function setDeep(obj, dotPath, value) {
  const parts = dotPath.split('.')
  let cur = obj
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i]
    if (!cur[key] || typeof cur[key] !== 'object' || Array.isArray(cur[key])) {
      cur[key] = {}
    }
    cur = cur[key]
  }
  cur[parts[parts.length - 1]] = value
}

for (const [locale, data] of Object.entries(locales)) {
  const filePath = path.join('i18n', 'locales', `${locale}.json`)
  const json = JSON.parse(fs.readFileSync(filePath, 'utf8'))

  for (const [key, value] of flatten(data)) {
    setDeep(json, key, value)
  }

  fs.writeFileSync(filePath, `${JSON.stringify(json, null, 2)}\n`)
  console.log(`updated ${locale}`)
}
