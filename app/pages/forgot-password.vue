<template>
  <div class="bm-stack-page auth-page">
    <section class="bm-section auth-hero" aria-labelledby="forgot-page-title">
      <div class="auth-hero-grid">
        <div class="bm-stack-sm auth-hero-main">
          <span class="bm-pill bm-pill-soft bm-reveal" style="animation-delay: 0ms">
            {{ t('auth.forgot.hero.label') }}
          </span>

          <h1
            id="forgot-page-title"
            class="bm-heading-hero bm-title-hero bm-reveal"
            style="animation-delay: 60ms"
          >
            {{ t('auth.forgot.hero.title') }}
          </h1>

          <p class="bm-text-soft auth-hero-subtitle bm-reveal" style="animation-delay: 120ms">
            {{ t('auth.forgot.hero.subtitle') }}
          </p>
        </div>

        <aside class="bm-card bm-card-compact bm-ease js-reveal auth-hero-aside" aria-label="Password reset help">
          <div class="bm-card-header">
            <div class="bm-stack-sm" style="gap: 0.5rem">
              <p class="bm-pill bm-pill-muted">
                {{ t('auth.forgot.aside.label') }}
              </p>
              <p class="bm-card-title bm-title-h3">
                {{ t('auth.forgot.aside.title') }}
              </p>
            </div>
          </div>

          <ul class="auth-aside-list">
            <li v-for="item in asideItems" :key="item">
              {{ item }}
            </li>
          </ul>
        </aside>
      </div>
    </section>

    <section class="bm-section" aria-label="Forgot password form">
      <div class="auth-form-grid auth-form-grid--single">
        <article class="bm-card bm-card-compact bm-ease js-reveal auth-card">
          <header class="bm-stack-xs">
            <h2 class="bm-card-title bm-title-h3">{{ t('auth.forgot.form.title') }}</h2>
            <p class="bm-card-subtitle">{{ t('auth.forgot.form.subtitle') }}</p>
          </header>

          <form class="bm-stack-md" @submit.prevent="onSubmit" novalidate>
            <div class="bm-stack-xs">
              <label class="bm-label" for="forgot-email">{{ t('auth.common.email.label') }}</label>
              <input
                id="forgot-email"
                v-model="email"
                type="email"
                class="bm-input"
                :placeholder="t('auth.common.email.placeholder')"
                autocomplete="email"
              />
            </div>

            <p v-if="errorMessage" class="auth-error" role="alert" aria-live="assertive">{{ errorMessage }}</p>
            <p v-else-if="success" class="auth-success" role="status" aria-live="polite">{{ t('auth.forgot.form.feedback.success') }}</p>

            <div class="auth-form-actions">
              <button class="bm-btn bm-btn-primary bm-ease" type="submit" :disabled="submitting">
                <span v-if="!submitting">{{ t('auth.forgot.form.actions.submit') }}</span>
                <span v-else>{{ t('auth.forgot.form.actions.submitting') }}</span>
              </button>

              <div class="auth-form-links">
                <NuxtLink to="/login" class="auth-link">{{ t('auth.forgot.form.actions.backToLogin') }}</NuxtLink>
                <NuxtLink to="/register" class="auth-link">{{ t('auth.forgot.form.actions.createAccount') }}</NuxtLink>
              </div>
            </div>

            <p class="auth-muted">{{ t('auth.forgot.form.hint') }}</p>
          </form>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useHead, useSeoMeta } from '#imports'
import { useI18n } from 'vue-i18n'

definePageMeta({ guestOnly: true })

const { t } = useI18n()

const email = ref('')
const submitting = ref(false)
const success = ref(false)
const errorMessage = ref('')

const asideItems = computed(() => [
  t('auth.forgot.aside.items.0'),
  t('auth.forgot.aside.items.1'),
  t('auth.forgot.aside.items.2')
].filter(Boolean))

function parseFetchError (e) {
  const statusCode = e?.statusCode || e?.response?.status || null
  const statusMessage = e?.data?.statusMessage || e?.statusMessage || ''
  return { statusCode, statusMessage }
}

async function onSubmit () {
  success.value = false
  errorMessage.value = ''

  if (!email.value.trim()) {
    errorMessage.value = t('auth.forgot.errors.emailRequired')
    return
  }

  submitting.value = true
  try {
    await $fetch('/api/auth/forgot-password', {
      method: 'POST',
      body: { email: email.value.trim() }
    })
    success.value = true
  } catch (e) {
    const { statusCode } = parseFetchError(e)
    errorMessage.value = statusCode === 400
      ? t('auth.forgot.errors.emailInvalid')
      : t('auth.common.errors.generic')
  } finally {
    submitting.value = false
  }
}

useHead(() => {
  const pageTitle = `${t('auth.forgot.hero.title')} · ${t('app.brand')}`
  return {
    title: pageTitle
  }
})

useSeoMeta({
  description: () => t('auth.forgot.hero.subtitle'),
  ogTitle: () => `${t('auth.forgot.hero.title')} · ${t('app.brand')}`,
  ogDescription: () => t('auth.forgot.hero.subtitle'),
  twitterTitle: () => `${t('auth.forgot.hero.title')} · ${t('app.brand')}`,
  twitterDescription: () => t('auth.forgot.hero.subtitle')
})
</script>

<style scoped>
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
  grid-template-columns: minmax(0, 1fr);
  gap: var(--bm-space-xl);
  align-items: start;
}

.auth-card {
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

.auth-form-links {
  display: inline-flex;
  gap: 0.95rem;
  flex-wrap: wrap;
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
  margin: 0;
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
</style>
