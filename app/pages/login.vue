<template>
  <div class="bm-stack-page auth-page">
    <!-- HERO -->
    <section class="bm-section auth-hero" aria-labelledby="login-page-title">
      <div class="auth-hero-grid">
        <div class="bm-stack-sm auth-hero-main">
          <span class="bm-pill bm-pill-soft bm-reveal" style="animation-delay: 0ms">
            {{ t('auth.login.hero.label') }}
          </span>

          <h1
            id="login-page-title"
            class="bm-heading-hero bm-title-hero bm-reveal"
            style="animation-delay: 60ms"
          >
            {{ t('auth.login.hero.title') }}
          </h1>

          <p
            class="bm-text-soft auth-hero-subtitle bm-reveal"
            style="animation-delay: 120ms"
          >
            {{ t('auth.login.hero.subtitle') }}
          </p>
        </div>

        <aside
          class="bm-card bm-card-compact bm-ease js-reveal auth-hero-aside"
          :aria-label="t('auth.login.aside.ariaLabel')"
        >
          <div class="bm-card-header">
            <div class="bm-stack-sm" style="gap: 0.5rem">
              <p class="bm-pill bm-pill-muted">
                {{ t('auth.login.aside.label') }}
              </p>
              <p class="bm-card-title bm-title-h3">
                {{ t('auth.login.aside.title') }}
              </p>
            </div>
          </div>

          <ul class="auth-aside-list">
            <li v-for="item in asideItems" :key="item">{{ item }}</li>
          </ul>
        </aside>
      </div>
    </section>

    <!-- FORM -->
    <section class="bm-section" :aria-label="t('auth.login.form.ariaLabel')">
      <div class="auth-layout">
        <article class="bm-card bm-card-compact bm-ease js-reveal auth-card">
          <header class="bm-stack-sm" style="gap: 0.5rem">
            <h2 class="bm-card-title bm-title-h3">
              {{ t('auth.login.form.title') }}
            </h2>
            <p class="bm-text-soft">
              {{ t('auth.login.form.subtitle') }}
            </p>
          </header>

          <form class="auth-form" @submit.prevent="onSubmit" novalidate>
            <div class="bm-field">
              <label class="bm-label" for="login-email">
                {{ t('auth.common.email.label') }}
              </label>
              <input
                id="login-email"
                v-model="form.email"
                class="bm-input"
                type="email"
                autocomplete="email"
                inputmode="email"
                :placeholder="t('auth.common.email.placeholder')"
              />
            </div>

            <div class="bm-field">
              <label class="bm-label" for="login-password">
                {{ t('auth.common.password.label') }}
              </label>
              <div class="auth-password-row">
                <input
                  id="login-password"
                  v-model="form.password"
                  class="bm-input"
                  :type="showPassword ? 'text' : 'password'"
                  autocomplete="current-password"
                  :placeholder="t('auth.common.password.placeholder')"
                />
                <button
                  type="button"
                  class="bm-btn bm-btn-outline bm-btn-sm auth-password-toggle"
                  :aria-label="showPassword ? t('auth.common.password.hide') : t('auth.common.password.show')"
                  :aria-pressed="showPassword ? 'true' : 'false'"
                  @click="showPassword = !showPassword"
                >
                  {{ showPassword ? t('auth.common.password.hide') : t('auth.common.password.show') }}
                </button>
              </div>
            </div>

            <p v-if="errorMsg" class="auth-error" role="alert" aria-live="assertive">
              {{ errorMsg }}
            </p>

            <div class="auth-actions">
              <button
                type="submit"
                class="bm-btn bm-btn-primary"
                :disabled="submitting"
              >
                <span v-if="!submitting">{{ t('auth.login.form.actions.submit') }}</span>
                <span v-else>{{ t('auth.login.form.actions.submitting') }}</span>
              </button>

              <NuxtLink
                :to="resendLink"
                class="bm-btn bm-btn-outline bm-btn-sm"
              >
                {{ t('auth.login.form.actions.resendVerification') }}
              </NuxtLink>

              <NuxtLink
                to="/forgot-password"
                class="auth-link"
              >
                {{ t('auth.login.form.actions.forgot') }}
              </NuxtLink>
            </div>

            <div v-if="needsVerification" class="auth-note">
              <p class="bm-text-soft">
                {{ t('auth.login.form.notes.verifyEmail') }}
              </p>
              <NuxtLink
                :to="resendLink"
                class="bm-btn bm-btn-outline bm-btn-sm"
              >
                {{ t('auth.login.form.actions.resendVerification') }}
              </NuxtLink>
            </div>

            <div class="auth-sep" aria-hidden="true"></div>

            <p class="bm-text-soft auth-bottom">
              {{ t('auth.login.form.bottom.noAccount') }}
              <NuxtLink to="/register" class="auth-link">
                {{ t('auth.login.form.bottom.createAccount') }}
              </NuxtLink>
            </p>
          </form>
        </article>

        <aside class="bm-card bm-card-compact bm-ease js-reveal auth-card auth-card-secondary">
          <h2 class="bm-card-title bm-title-h3">
            {{ t('auth.login.help.title') }}
          </h2>
          <p class="bm-text-soft">
            {{ t('auth.login.help.subtitle') }}
          </p>

          <div class="auth-help-actions">
            <NuxtLink to="/resend-verification" class="bm-btn bm-btn-outline bm-btn-sm">
              {{ t('auth.login.help.resend') }}
            </NuxtLink>
            <NuxtLink to="/contact" class="bm-btn bm-btn-outline bm-btn-sm">
              {{ t('auth.login.help.contact') }}
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
import { useAuthStore } from '~/stores/authStore'

definePageMeta({
  guestOnly: true
})

const { t } = useI18n()
const route = useRoute()
const auth = useAuthStore()

const form = reactive({
  email: '',
  password: ''
})

const submitting = ref(false)
const showPassword = ref(false)
const errorMsg = ref('')
const needsVerification = ref(false)

const asideItems = computed(() =>
  [
    t('auth.login.aside.items.0'),
    t('auth.login.aside.items.1'),
    t('auth.login.aside.items.2')
  ].filter(Boolean)
)

const resendLink = computed(() => {
  const email = (form.email || '').trim()
  return email ? `/resend-verification?email=${encodeURIComponent(email)}` : '/resend-verification'
})

const normalizeRedirect = (value) => {
  if (typeof value !== 'string') return '/'
  if (!value.startsWith('/')) return '/'
  if (value.startsWith('//')) return '/'
  return value
}

const redirectTo = computed(() => normalizeRedirect(route.query.redirect))

const extractFetchError = (e) => {
  const statusCode = e?.statusCode || e?.response?.status
  const statusMessage = e?.data?.statusMessage || e?.statusMessage || ''
  return { statusCode, statusMessage }
}

const onSubmit = async () => {
  errorMsg.value = ''
  needsVerification.value = false

  submitting.value = true
  try {
    await auth.login({
      email: (form.email || '').trim(),
      password: form.password
    })

    return navigateTo(redirectTo.value)
  } catch (e) {
    const { statusCode, statusMessage } = extractFetchError(e)

    if (statusCode === 403) {
      needsVerification.value = true
      errorMsg.value = t('auth.login.errors.emailNotVerified')
      if (statusMessage) {
        // garde le message serveur en fallback si la traduction est vide
        errorMsg.value = errorMsg.value || statusMessage
      }
      return
    }

    if (statusCode === 401) {
      errorMsg.value = t('auth.login.errors.invalidCredentials')
      return
    }

    errorMsg.value = t('auth.common.errors.generic')
  } finally {
    submitting.value = false
  }
}

useHead(() => {
  const pageTitle = `${t('auth.login.hero.title')} · ${t('app.brand')}`
  return {
    title: pageTitle
  }
})

useSeoMeta({
  description: () => t('auth.login.hero.subtitle'),
  ogTitle: () => `${t('auth.login.hero.title')} · ${t('app.brand')}`,
  ogDescription: () => t('auth.login.hero.subtitle'),
  twitterTitle: () => `${t('auth.login.hero.title')} · ${t('app.brand')}`,
  twitterDescription: () => t('auth.login.hero.subtitle')
})
</script>

<style scoped>
.auth-hero {
  padding-bottom: 1.6rem;
}

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
  max-width: 46rem;
}

.auth-aside-list {
  margin: 0.75rem 0 0;
  padding-left: 1.15rem;
  display: grid;
  gap: 0.4rem;
}

.auth-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
  gap: var(--bm-space-xl);
  align-items: start;
}

@media (max-width: 980px) {
  .auth-layout {
    grid-template-columns: 1fr;
  }
}

.auth-form {
  margin-top: var(--bm-space-md);
  display: grid;
  gap: var(--bm-space-md);
}

.auth-password-row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.6rem;
  align-items: center;
}

@media (max-width: 520px) {
  .auth-password-row {
    grid-template-columns: 1fr;
  }

  .auth-password-toggle {
    width: 100%;
    justify-content: center;
  }
}

.auth-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1.25rem;
}

.auth-link {
  color: var(--bm-color-text);
  text-decoration: none;
  border-bottom: 1px solid color-mix(in srgb, var(--bm-color-border-subtle) 65%, transparent);
}

.auth-link:hover {
  border-bottom-color: color-mix(in srgb, var(--bm-color-border-subtle) 100%, transparent);
}

.auth-error {
  font-size: 0.9rem;
  color: #fecaca;
  margin: 0;
}

.auth-note {
  padding: 0.85rem 0.9rem;
  border-radius: 0.9rem;
  border: 1px solid color-mix(in srgb, var(--bm-color-border-subtle) 70%, transparent);
  background: color-mix(in srgb, var(--bm-color-bg-soft) 85%, transparent);
  display: grid;
  gap: 0.7rem;
}

.auth-sep {
  height: 1px;
  background: linear-gradient(to right, transparent, var(--bm-color-border-subtle), transparent);
}

.auth-bottom {
  margin: 0;
}

.auth-help-actions {
  margin-top: var(--bm-space-md);
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.auth-card-secondary {
  align-self: start;
}
</style>
