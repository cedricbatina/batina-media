<template>
  <div class="bm-stack-page auth-page">
    <section class="bm-section auth-hero" aria-labelledby="verify-page-title">
      <div class="auth-hero-grid">
        <div class="bm-stack-sm auth-hero-main">
          <span class="bm-pill bm-pill-soft bm-reveal" style="animation-delay: 0ms">
            {{ t('auth.verify.hero.label') }}
          </span>

          <h1
            id="verify-page-title"
            class="bm-heading-hero bm-title-hero bm-reveal"
            style="animation-delay: 60ms"
          >
            {{ t('auth.verify.hero.title') }}
          </h1>

          <p class="bm-text-soft auth-hero-subtitle bm-reveal" style="animation-delay: 120ms">
            {{ t('auth.verify.hero.subtitle') }}
          </p>
        </div>

        <aside class="bm-card bm-card-compact bm-ease js-reveal auth-hero-aside" aria-label="Verification tips">
          <div class="bm-card-header">
            <div class="bm-stack-sm" style="gap: 0.5rem">
              <p class="bm-pill bm-pill-muted">
                {{ t('auth.verify.aside.label') }}
              </p>
              <p class="bm-card-title bm-title-h3">
                {{ t('auth.verify.aside.title') }}
              </p>
            </div>
          </div>

          <ul class="auth-aside-list">
            <li v-for="item in asideItems" :key="item">{{ item }}</li>
          </ul>
        </aside>
      </div>
    </section>

    <section class="bm-section" aria-label="Email verification status">
      <div class="auth-single">
        <article class="bm-card bm-card-compact bm-ease js-reveal auth-card">
          <header class="bm-stack-xs">
            <h2 class="bm-card-title bm-title-h3">
              {{ state === 'success' ? t('auth.verify.card.successTitle') : t('auth.verify.card.title') }}
            </h2>
            <p class="bm-card-subtitle">
              <template v-if="state === 'loading'">
                {{ t('auth.verify.card.loading') }}
              </template>
              <template v-else-if="state === 'success'">
                {{ t('auth.verify.card.successBody') }}
              </template>
              <template v-else>
                {{ t('auth.verify.card.errorBody') }}
              </template>
            </p>
          </header>

          <p v-if="state === 'error'" class="auth-error" role="alert" aria-live="assertive">
            {{ errorMessage || t('auth.common.errors.generic') }}
          </p>

          <div class="auth-actions">
            <NuxtLink to="/login" class="bm-btn bm-btn-primary bm-ease">
              {{ t('auth.verify.card.actions.login') }}
            </NuxtLink>

            <NuxtLink
              :to="{ path: '/resend-verification', query: emailFromQuery ? { email: emailFromQuery } : {} }"
              class="bm-btn bm-btn-outline bm-ease"
            >
              {{ t('auth.verify.card.actions.resend') }}
            </NuxtLink>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useHead, useSeoMeta, useRoute } from '#imports'
import { useI18n } from 'vue-i18n'

definePageMeta({ guestOnly: true })

const { t } = useI18n()
const route = useRoute()

const state = ref('loading') // loading | success | error
const errorMessage = ref('')

const token = computed(() => {
  const raw = route.query.token
  const str = Array.isArray(raw) ? raw[0] : raw
  return typeof str === 'string' ? str : ''
})

const emailFromQuery = computed(() => {
  const raw = route.query.email
  const str = Array.isArray(raw) ? raw[0] : raw
  return typeof str === 'string' ? str : ''
})

const asideItems = computed(() => [
  t('auth.verify.aside.items.0'),
  t('auth.verify.aside.items.1'),
  t('auth.verify.aside.items.2')
].filter(Boolean))

function parseFetchError (e) {
  const statusMessage = e?.data?.statusMessage || e?.statusMessage || ''
  return statusMessage
}

onMounted(async () => {
  errorMessage.value = ''

  if (!token.value) {
    state.value = 'error'
    errorMessage.value = t('auth.verify.errors.missingToken')
    return
  }

  try {
    await $fetch('/api/auth/verify-email', {
      method: 'GET',
      params: { token: token.value }
    })
    state.value = 'success'
  } catch (e) {
    state.value = 'error'
    errorMessage.value = parseFetchError(e)
  }
})

useHead(() => {
  const pageTitle = `${t('auth.verify.hero.title')} · ${t('app.brand')}`
  return {
    title: pageTitle
  }
})

useSeoMeta({
  description: () => t('auth.verify.hero.subtitle'),
  ogTitle: () => `${t('auth.verify.hero.title')} · ${t('app.brand')}`,
  ogDescription: () => t('auth.verify.hero.subtitle'),
  twitterTitle: () => `${t('auth.verify.hero.title')} · ${t('app.brand')}`,
  twitterDescription: () => t('auth.verify.hero.subtitle')
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

.auth-single {
  width: 100%;
  max-width: 46rem;
  margin: 0 auto;
}

.auth-card {
  display: flex;
  flex-direction: column;
  gap: var(--bm-space-md);
}

.auth-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.auth-error {
  margin: 0;
  color: #fecaca;
  font-size: 0.95rem;
  line-height: 1.6;
}
</style>
