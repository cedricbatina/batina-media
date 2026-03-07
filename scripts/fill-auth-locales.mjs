import fs from 'node:fs'
import path from 'node:path'

const base = path.resolve('d:/works/lectures/batina-media/web')
const locales = ['fr', 'en', 'es', 'pt']

const translations = {
  fr: {
    auth: {
      common: {
        email: { label: 'Adresse e-mail', placeholder: 'vous@exemple.com' },
        username: {
          label: 'Nom d\'utilisateur',
          placeholder: 'Votre nom d\'utilisateur',
          hint: 'Optionnel. Vous pourrez le modifier plus tard.'
        },
        password: {
          label: 'Mot de passe',
          placeholder: 'Votre mot de passe',
          show: 'Afficher',
          hide: 'Masquer'
        },
        passwordConfirm: {
          label: 'Confirmer le mot de passe',
          placeholder: 'Ressaisissez votre mot de passe'
        },
        passwordNew: {
          label: 'Nouveau mot de passe',
          placeholder: 'Saisissez un nouveau mot de passe'
        },
        errors: {
          generic: 'Une erreur est survenue. Reessayez.'
        }
      },
      register: {
        hero: {
          label: 'Creer un compte',
          title: 'Creez votre compte Batina Media',
          subtitle: 'Accedez a nos plateformes et suivez vos projets.'
        },
        aside: {
          label: 'En bref',
          title: 'Pourquoi creer un compte ?',
          items: {
            0: 'Suivez vos demandes et vos projets.',
            1: 'Recevez les mises a jour importantes.',
            2: 'Accedez plus vite a votre espace.'
          }
        },
        form: {
          title: 'Inscription',
          subtitle: 'Renseignez vos informations pour demarrer.',
          actions: {
            submit: 'Creer mon compte',
            submitting: 'Creation en cours...'
          },
          footer: {
            alreadyHave: 'Vous avez deja un compte ?',
            signIn: 'Se connecter'
          }
        },
        side: {
          title: 'Besoin d\'aide ?',
          body: 'Notre equipe peut vous accompagner pour finaliser votre inscription.',
          contact: 'Contacter le studio'
        },
        feedback: {
          success: 'Compte cree. Verifiez votre boite mail pour confirmer votre adresse.',
          goToLogin: 'Aller a la connexion',
          resend: 'Renvoyer l\'e-mail de confirmation',
          devLinkLabel: 'Lien de verification (developpement) :',
          devLinkCta: 'Verifier maintenant'
        },
        errors: {
          missingFields: 'Veuillez remplir les champs obligatoires.',
          passwordTooShort: 'Le mot de passe doit contenir au moins 8 caracteres.',
          passwordMismatch: 'Les mots de passe ne correspondent pas.',
          emailExists: 'Cet e-mail est deja utilise.'
        }
      },
      login: {
        hero: {
          label: 'Connexion',
          title: 'Connectez-vous a votre compte',
          subtitle: 'Retrouvez votre espace et continuez votre travail.'
        },
        aside: {
          ariaLabel: 'Informations de connexion',
          label: 'Acces compte',
          title: 'Avant de continuer',
          items: {
            0: 'Utilisez l\'adresse e-mail de votre compte.',
            1: 'Verifiez votre e-mail si demande.',
            2: 'Contactez-nous en cas de blocage.'
          }
        },
        form: {
          ariaLabel: 'Formulaire de connexion',
          title: 'Connexion',
          subtitle: 'Entrez vos identifiants.',
          actions: {
            submit: 'Se connecter',
            submitting: 'Connexion en cours...',
            forgot: 'Mot de passe oublie ?',
            resendVerification: 'Renvoyer l\'e-mail de confirmation'
          },
          notes: {
            verifyEmail: 'Votre adresse e-mail doit etre verifiee avant connexion.'
          },
          bottom: {
            noAccount: 'Pas encore de compte ?',
            createAccount: 'Creer un compte'
          }
        },
        help: {
          title: 'Besoin d\'aide ?',
          subtitle: 'Nous pouvons vous aider a recuperer ou verifier votre acces.',
          resend: 'Renvoyer la verification',
          contact: 'Contacter le support'
        },
        errors: {
          emailNotVerified: 'Votre e-mail n\'est pas encore verifie.',
          invalidCredentials: 'Identifiants invalides.'
        }
      }
    }
  },
  en: {
    auth: {
      common: {
        email: { label: 'Email address', placeholder: 'you@example.com' },
        username: { label: 'Username', placeholder: 'Your username', hint: 'Optional. You can change it later.' },
        password: { label: 'Password', placeholder: 'Your password', show: 'Show', hide: 'Hide' },
        passwordConfirm: { label: 'Confirm password', placeholder: 'Type your password again' },
        passwordNew: { label: 'New password', placeholder: 'Type a new password' },
        errors: { generic: 'Something went wrong. Please try again.' }
      },
      register: {
        hero: { label: 'Create account', title: 'Create your Batina Media account', subtitle: 'Access our platforms and track your projects.' },
        aside: {
          label: 'Quick overview',
          title: 'Why create an account?',
          items: { 0: 'Track your requests and projects.', 1: 'Receive key updates.', 2: 'Access your workspace faster.' }
        },
        form: {
          title: 'Sign up',
          subtitle: 'Fill in your details to get started.',
          actions: { submit: 'Create account', submitting: 'Creating account...' },
          footer: { alreadyHave: 'Already have an account?', signIn: 'Sign in' }
        },
        side: { title: 'Need help?', body: 'Our team can help you complete your registration.', contact: 'Contact the studio' },
        feedback: {
          success: 'Account created. Check your inbox to verify your email.',
          goToLogin: 'Go to login',
          resend: 'Resend verification email',
          devLinkLabel: 'Verification link (development):',
          devLinkCta: 'Verify now'
        },
        errors: {
          missingFields: 'Please fill in required fields.',
          passwordTooShort: 'Password must be at least 8 characters.',
          passwordMismatch: 'Passwords do not match.',
          emailExists: 'This email is already in use.'
        }
      },
      login: {
        hero: { label: 'Login', title: 'Sign in to your account', subtitle: 'Access your workspace and continue your work.' },
        aside: {
          ariaLabel: 'Login information',
          label: 'Account access',
          title: 'Before you continue',
          items: { 0: 'Use your account email address.', 1: 'Verify your email if prompted.', 2: 'Contact us if you are blocked.' }
        },
        form: {
          ariaLabel: 'Login form',
          title: 'Sign in',
          subtitle: 'Enter your credentials.',
          actions: {
            submit: 'Sign in',
            submitting: 'Signing in...',
            forgot: 'Forgot password?',
            resendVerification: 'Resend verification email'
          },
          notes: { verifyEmail: 'Your email must be verified before login.' },
          bottom: { noAccount: 'No account yet?', createAccount: 'Create account' }
        },
        help: { title: 'Need help?', subtitle: 'We can help you recover or verify access.', resend: 'Resend verification', contact: 'Contact support' },
        errors: { emailNotVerified: 'Your email is not verified yet.', invalidCredentials: 'Invalid credentials.' }
      }
    }
  },
  es: {
    auth: {
      common: {
        email: { label: 'Correo electronico', placeholder: 'tu@ejemplo.com' },
        username: { label: 'Nombre de usuario', placeholder: 'Tu nombre de usuario', hint: 'Opcional. Podras cambiarlo despues.' },
        password: { label: 'Contrasena', placeholder: 'Tu contrasena', show: 'Mostrar', hide: 'Ocultar' },
        passwordConfirm: { label: 'Confirmar contrasena', placeholder: 'Vuelve a escribir la contrasena' },
        passwordNew: { label: 'Nueva contrasena', placeholder: 'Escribe una nueva contrasena' },
        errors: { generic: 'Ocurrio un error. Intentalo de nuevo.' }
      },
      register: {
        hero: { label: 'Crear cuenta', title: 'Crea tu cuenta de Batina Media', subtitle: 'Accede a nuestras plataformas y sigue tus proyectos.' },
        aside: { label: 'Resumen', title: 'Por que crear una cuenta?', items: { 0: 'Sigue tus solicitudes y proyectos.', 1: 'Recibe actualizaciones importantes.', 2: 'Accede mas rapido a tu espacio.' } },
        form: { title: 'Registro', subtitle: 'Completa tus datos para empezar.', actions: { submit: 'Crear cuenta', submitting: 'Creando cuenta...' }, footer: { alreadyHave: 'Ya tienes cuenta?', signIn: 'Iniciar sesion' } },
        side: { title: 'Necesitas ayuda?', body: 'Nuestro equipo puede ayudarte a completar tu registro.', contact: 'Contactar al estudio' },
        feedback: { success: 'Cuenta creada. Revisa tu correo para verificar tu direccion.', goToLogin: 'Ir a iniciar sesion', resend: 'Reenviar correo de verificacion', devLinkLabel: 'Enlace de verificacion (desarrollo):', devLinkCta: 'Verificar ahora' },
        errors: { missingFields: 'Completa los campos obligatorios.', passwordTooShort: 'La contrasena debe tener al menos 8 caracteres.', passwordMismatch: 'Las contrasenas no coinciden.', emailExists: 'Este correo ya esta en uso.' }
      },
      login: {
        hero: { label: 'Inicio de sesion', title: 'Inicia sesion en tu cuenta', subtitle: 'Accede a tu espacio y continua tu trabajo.' },
        aside: { ariaLabel: 'Informacion de acceso', label: 'Acceso de cuenta', title: 'Antes de continuar', items: { 0: 'Usa el correo de tu cuenta.', 1: 'Verifica tu correo si se solicita.', 2: 'Contactanos si estas bloqueado.' } },
        form: {
          ariaLabel: 'Formulario de inicio de sesion',
          title: 'Iniciar sesion',
          subtitle: 'Introduce tus credenciales.',
          actions: { submit: 'Iniciar sesion', submitting: 'Iniciando sesion...', forgot: 'Olvidaste tu contrasena?', resendVerification: 'Reenviar correo de verificacion' },
          notes: { verifyEmail: 'Tu correo debe estar verificado antes de iniciar sesion.' },
          bottom: { noAccount: 'Aun no tienes cuenta?', createAccount: 'Crear cuenta' }
        },
        help: { title: 'Necesitas ayuda?', subtitle: 'Podemos ayudarte a recuperar o verificar el acceso.', resend: 'Reenviar verificacion', contact: 'Contactar soporte' },
        errors: { emailNotVerified: 'Tu correo aun no esta verificado.', invalidCredentials: 'Credenciales invalidas.' }
      }
    }
  },
  pt: {
    auth: {
      common: {
        email: { label: 'E-mail', placeholder: 'voce@exemplo.com' },
        username: { label: 'Nome de utilizador', placeholder: 'O seu nome de utilizador', hint: 'Opcional. Pode alterar depois.' },
        password: { label: 'Palavra-passe', placeholder: 'A sua palavra-passe', show: 'Mostrar', hide: 'Ocultar' },
        passwordConfirm: { label: 'Confirmar palavra-passe', placeholder: 'Digite novamente a palavra-passe' },
        passwordNew: { label: 'Nova palavra-passe', placeholder: 'Digite uma nova palavra-passe' },
        errors: { generic: 'Ocorreu um erro. Tente novamente.' }
      },
      register: {
        hero: { label: 'Criar conta', title: 'Crie a sua conta Batina Media', subtitle: 'Aceda as nossas plataformas e acompanhe os seus projetos.' },
        aside: { label: 'Resumo', title: 'Por que criar uma conta?', items: { 0: 'Acompanhe pedidos e projetos.', 1: 'Receba atualizacoes importantes.', 2: 'Aceda mais rapido ao seu espaco.' } },
        form: { title: 'Registo', subtitle: 'Preencha os seus dados para comecar.', actions: { submit: 'Criar conta', submitting: 'A criar conta...' }, footer: { alreadyHave: 'Ja tem conta?', signIn: 'Iniciar sessao' } },
        side: { title: 'Precisa de ajuda?', body: 'A nossa equipa pode ajudar a concluir o seu registo.', contact: 'Contactar o estudio' },
        feedback: { success: 'Conta criada. Verifique o seu e-mail para confirmar o endereco.', goToLogin: 'Ir para login', resend: 'Reenviar e-mail de verificacao', devLinkLabel: 'Link de verificacao (desenvolvimento):', devLinkCta: 'Verificar agora' },
        errors: { missingFields: 'Preencha os campos obrigatorios.', passwordTooShort: 'A palavra-passe deve ter pelo menos 8 caracteres.', passwordMismatch: 'As palavras-passe nao coincidem.', emailExists: 'Este e-mail ja esta em uso.' }
      },
      login: {
        hero: { label: 'Iniciar sessao', title: 'Entre na sua conta', subtitle: 'Aceda ao seu espaco e continue o trabalho.' },
        aside: { ariaLabel: 'Informacoes de login', label: 'Acesso a conta', title: 'Antes de continuar', items: { 0: 'Use o e-mail da sua conta.', 1: 'Verifique o e-mail se solicitado.', 2: 'Contacte-nos em caso de bloqueio.' } },
        form: {
          ariaLabel: 'Formulario de login',
          title: 'Iniciar sessao',
          subtitle: 'Introduza as suas credenciais.',
          actions: { submit: 'Entrar', submitting: 'A iniciar sessao...', forgot: 'Esqueceu-se da palavra-passe?', resendVerification: 'Reenviar e-mail de verificacao' },
          notes: { verifyEmail: 'O seu e-mail deve estar verificado antes do login.' },
          bottom: { noAccount: 'Ainda nao tem conta?', createAccount: 'Criar conta' }
        },
        help: { title: 'Precisa de ajuda?', subtitle: 'Podemos ajudar a recuperar ou verificar o acesso.', resend: 'Reenviar verificacao', contact: 'Contactar suporte' },
        errors: { emailNotVerified: 'O seu e-mail ainda nao foi verificado.', invalidCredentials: 'Credenciais invalidas.' }
      }
    }
  }
}

function flatten(obj, prefix = '') {
  return Object.entries(obj).flatMap(([k, v]) => {
    const key = prefix ? `${prefix}.${k}` : k
    if (v && typeof v === 'object' && !Array.isArray(v)) return flatten(v, key)
    return [[key, v]]
  })
}

function setDeepIfMissing(obj, dotPath, value) {
  const parts = dotPath.split('.')
  let cur = obj
  for (let i = 0; i < parts.length - 1; i++) {
    const p = parts[i]
    if (!cur[p] || typeof cur[p] !== 'object' || Array.isArray(cur[p])) {
      cur[p] = {}
    }
    cur = cur[p]
  }

  const leaf = parts[parts.length - 1]
  if (cur[leaf] === undefined) {
    cur[leaf] = value
  }
}

for (const locale of locales) {
  const filePath = path.join(base, 'i18n', 'locales', `${locale}.json`)
  const json = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  const kv = flatten(translations[locale])

  for (const [k, v] of kv) {
    setDeepIfMissing(json, k, v)
  }

  fs.writeFileSync(filePath, `${JSON.stringify(json, null, 2)}\n`)
  console.log(`updated ${locale}`)
}
