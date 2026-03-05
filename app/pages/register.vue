<template>
  <div class="bm-stack-page auth-page">
    <!-- HERO -->
    <section class="bm-section auth-hero" aria-labelledby="register-page-title">
      <div class="auth-hero-grid">
        <div class="bm-stack-sm auth-hero-main">
          <span class="bm-pill bm-pill-soft bm-reveal" style="animation-delay: 0ms">
            {{ t('auth.register.hero.label') }}
          </span>

          <h1
            id="register-page-title"
            class="bm-heading-hero bm-title-hero bm-reveal"
            style="animation-delay: 60ms"
          >
            {{ t('auth.register.hero.title') }}
          </h1>

          <p class="bm-text-soft auth-hero-subtitle bm-reveal" style="animation-delay: 120ms">
            {{ t('auth.register.hero.subtitle') }}
          </p>
        </div>

        <aside class="bm-card bm-card-compact bm-ease js-reveal auth-hero-aside" aria-label="Registration overview">
          <div class="bm-card-header">
            <div class="bm-stack-sm" style="gap: 0.5rem">
              <p class="bm-pill bm-pill-muted">{{ t('auth.register.aside.label') }}</p>
              <p class="bm-card-title bm-title-h3">{{ t('auth.register.aside.title') }}</p>
            </div>
          </div>

          <ul class="auth-aside-list">
            <li v-for="item in asideItems" :key="item">{{ item }}</li>
          </ul>
        </aside>
      </div>
    </section>

    <!-- FORM -->
    <section class="bm-section" aria-label="Registration form">
      <div class="auth-form-grid">
        <article class="bm-card bm-card-compact bm-ease js-reveal auth-card">
          <header class="bm-stack-xs">
            <h2 class="bm-card-title bm-title-h3">{{ t('auth.register.form.title') }}</h2>
            <p class="bm-card-subtitle">{{ t('auth.register.form.subtitle') }}</p>
          </header>

          <div v-if="state === 'success'" class="bm-stack-sm">
            <p class="auth-success">
              {{ t('auth.register.feedback.success') }}
            </p>

            <div class="auth-success-actions">
              <NuxtLink to="/login" class="bm-btn bm-btn-primary bm-ease">
                {{ t('auth.register.feedback.goToLogin') }}
              </NuxtLink>

              <NuxtLink
                :to="{ path: '/resend-verification', query: form.email ? { email: form.email } : {} }"
                class="bm-btn bm-btn-outline bm-ease"
              >
                {{ t('auth.register.feedback.resend') }}
              </NuxtLink>
            </div>

            <p v-if="devVerificationLink" class="auth-dev">
              {{ t('auth.register.feedback.devLinkLabel') }}
              <NuxtLink :to="devVerificationLink" class="auth-link">{{ t('auth.register.feedback.devLinkCta') }}</NuxtLink>
            </p>
          </div>

          <form v-else class="bm-stack-md auth-form" @submit.prevent="onSubmit" novalidate>
            <div class="bm-stack-xs">
              <label class="bm-label" for="register-email">{{ t('auth.common.email.label') }}</label>
              <input
                id="register-email"
                v-model="form.email"
                type="email"
                class="bm-input"
                :placeholder="t('auth.common.email.placeholder')"
                autocomplete="email"
                required
              />
            </div>

            <div class="bm-stack-xs">
              <label class="bm-label" for="register-username">{{ t('auth.common.username.label') }}</label>
              <input
                id="register-username"
                v-model="form.username"
                type="text"
                class="bm-input"
                :placeholder="t('auth.common.username.placeholder')"
                autocomplete="username"
              />
              <p class="auth-muted">{{ t('auth.common.username.hint') }}</p>
            </div>

            <div class="bm-stack-xs">
              <label class="bm-label" for="register-password">{{ t('auth.common.password.label') }}</label>
              <div class="auth-input-with-action">
                <input
                  id="register-password"
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  class="bm-input auth-input-grow"
                  :placeholder="t('auth.common.password.placeholder')"
                  autocomplete="new-password"
                  required
                />
                <button
                  type="button"
                  class="bm-btn bm-btn-outline bm-btn-sm auth-input-action"
                  :aria-label="showPassword ? t('auth.common.password.hide') : t('auth.common.password.show')"
                  :aria-pressed="showPassword ? 'true' : 'false'"
                  @click="showPassword = !showPassword"
                >
                  {{ showPassword ? t('auth.common.password.hide') : t('auth.common.password.show') }}
                </button>
              </div>
            </div>

            <div class="bm-stack-xs">
              <label class="bm-label" for="register-password2">{{ t('auth.common.passwordConfirm.label') }}</label>
              <input
                id="register-password2"
                v-model="form.passwordConfirm"
                :type="showPassword ? 'text' : 'password'"
                class="bm-input"
                :placeholder="t('auth.common.passwordConfirm.placeholder')"
                autocomplete="new-password"
                required
              />
            </div>

            <p v-if="errorMessage" class="auth-error" role="alert" aria-live="assertive">{{ errorMessage }}</p>

            <div class="auth-form-actions">
              <button class="bm-btn bm-btn-primary bm-ease" type="submit" :disabled="submitting">
                <span v-if="!submitting">{{ t('auth.register.form.actions.submit') }}</span>
                <span v-else>{{ t('auth.register.form.actions.submitting') }}</span>
              </button>

              <p class="auth-muted" style="margin: 0">
                {{ t('auth.register.form.footer.alreadyHave') }}
                <NuxtLink to="/login" class="auth-link">{{ t('auth.register.form.footer.signIn') }}</NuxtLink>
              </p>
            </div>
          </form>
        </article>

        <aside class="bm-card bm-card-compact bm-ease js-reveal auth-sidecard" aria-label="Privacy note">
          <h2 class="bm-card-title bm-title-h3">{{ t('auth.register.side.title') }}</h2>
          <p class="bm-card-subtitle">{{ t('auth.register.side.body') }}</p>
          <div class="auth-side-actions">
            <NuxtLink to="/contact" class="bm-btn bm-btn-outline bm-btn-sm bm-ease">
              {{ t('auth.register.side.contact') }}
            </NuxtLink>
          </div>
        </aside>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { useHead, useSeoMeta } from '#imports'
import { useI18n } from 'vue-i18n'

definePageMeta({ guestOnly: true })

const { t } = useI18n()

const form = reactive({
  email: '',
  username: '',
  password: '',
  passwordConfirm: ''
})

const showPassword = ref(false)
const submitting = ref(false)
const state = ref('idle') // idle | success
const errorMessage = ref('')
const devVerificationLink = ref('')

const asideItems = computed(() =>
  [
    t('auth.register.aside.items.0'),
    t('auth.register.aside.items.1'),
    t('auth.register.aside.items.2')
  ].filter(Boolean)
)

function parseFetchError (e) {
  const statusCode = e?.statusCode || e?.response?.status || null
  const statusMessage = e?.data?.statusMessage || e?.statusMessage || ''
  return { statusCode, statusMessage }
}

async function onSubmit () {
  errorMessage.value = ''

  if (!form.email.trim() || !form.password) {
    errorMessage.value = t('auth.register.errors.missingFields')
    return
  }

  if (form.password.length < 8) {
    errorMessage.value = t('auth.register.errors.passwordTooShort')
    return
  }

  if (form.password !== form.passwordConfirm) {
    errorMessage.value = t('auth.register.errors.passwordMismatch')
    return
  }

  submitting.value = true
  try {
    const res = await $fetch('/api/auth/register', {
      method: 'POST',
      body: {
        email: form.email.trim(),
        username: form.username?.trim() || null,
        password: form.password
      }
    })

    state.value = 'success'

    // Dev-only helper: the API returns a token in dev workflows.
    if (res?.verificationToken && import.meta.dev) {
      devVerificationLink.value = `/verify-email?token=${encodeURIComponent(res.verificationToken)}`
    } else {
      devVerificationLink.value = ''
    }
  } catch (e) {
    const { statusCode } = parseFetchError(e)

    if (statusCode === 409) {
      errorMessage.value = t('auth.register.errors.emailExists')
    } else {
      errorMessage.value = t('auth.common.errors.generic')
    }
  } finally {
    submitting.value = false
  }
}

useHead(() => {
  const pageTitle = `${t('auth.register.hero.title')} · ${t('app.brand')}`
  return {
    title: pageTitle
  }
})

useSeoMeta({
  description: () => t('auth.register.hero.subtitle'),
  ogTitle: () => `${t('auth.register.hero.title')} · ${t('app.brand')}`,
  ogDescription: () => t('auth.register.hero.subtitle'),
  twitterTitle: () => `${t('auth.register.hero.title')} · ${t('app.brand')}`,
  twitterDescription: () => t('auth.register.hero.subtitle')
})
</script>

<style scoped>
/* shared layout (same as login) */
.auth-hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 2.2fr) minmax(0, 1.4fr);
  gap: var(--bm-space-xl);
  align-items: start;
}

@media (max-width: 980px) {
  .auth-hero-grid {
    grid-template-columns: 1fr;
  }
}

.auth-hero-subtitle {
  max-width: 52rem;
}

.auth-aside-list {
  margin: 0.75rem 0 0;
  padding-left: 1.1rem;
  display: grid;
  gap: 0.45rem;
  line-height: 1.45;
}

.auth-form-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.8fr) minmax(0, 1fr);
  gap: var(--bm-space-xl);
  align-items: start;
}

@media (max-width: 980px) {
  .auth-form-grid {
    grid-template-columns: 1fr;
  }
}

.auth-card,
.auth-sidecard {
  display: flex;
  flex-direction: column;
  gap: var(--bm-space-md);
}

.auth-form-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem 1.25rem;
}

.auth-link {
  color: var(--bm-color-text);
  text-decoration: none;
  border-bottom: 1px solid color-mix(in srgb, var(--bm-color-text) 22%, transparent);
}

.auth-link:hover {
  border-bottom-color: color-mix(in srgb, var(--bm-color-text) 55%, transparent);
}

.auth-muted {
  font-size: 0.9rem;
  color: var(--bm-color-text-muted);
}

.auth-error {
  margin: 0;
  font-size: 0.9rem;
  color: #fecaca;
}

.auth-success {
  margin: 0;
  color: #bbf7d0;
  font-size: 0.95rem;
  line-height: 1.6;
}

.auth-success-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
}

.auth-dev {
  margin: 0;
  font-size: 0.85rem;
  color: var(--bm-color-text-muted);
}

.auth-input-with-action {
  display: flex;
  gap: 0.6rem;
  align-items: center;
}

.auth-input-grow {
  flex: 1 1 auto;
}

.auth-input-action {
  flex: 0 0 auto;
  white-space: nowrap;
}

.auth-side-actions {
  margin-top: 0.35rem;
}
</style>
