<template>
  <div class="bm-stack-page auth-page">
    <section class="bm-section auth-hero" aria-labelledby="resend-page-title">
      <div class="auth-hero-grid">
        <div class="bm-stack-sm auth-hero-main">
          <span class="bm-pill bm-pill-soft bm-reveal" style="animation-delay: 0ms">
            {{ t('auth.resend.hero.label') }}
          </span>

          <h1
            id="resend-page-title"
            class="bm-heading-hero bm-title-hero bm-reveal"
            style="animation-delay: 60ms"
          >
            {{ t('auth.resend.hero.title') }}
          </h1>

          <p class="bm-text-soft auth-hero-subtitle bm-reveal" style="animation-delay: 120ms">
            {{ t('auth.resend.hero.subtitle') }}
          </p>
        </div>

        <aside class="bm-card bm-card-compact bm-ease js-reveal auth-hero-aside" aria-label="Verification help">
          <div class="bm-card-header">
            <div class="bm-stack-sm" style="gap: 0.5rem">
              <p class="bm-pill bm-pill-muted">
                {{ t('auth.resend.aside.label') }}
              </p>
              <p class="bm-card-title bm-title-h3">
                {{ t('auth.resend.aside.title') }}
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

    <section class="bm-section" aria-label="Resend verification email">
      <div class="auth-form-grid auth-form-grid--single">
        <article class="bm-card bm-card-compact bm-ease js-reveal auth-card">
          <header class="bm-stack-xs">
            <h2 class="bm-card-title bm-title-h3">
              {{ t('auth.resend.form.title') }}
            </h2>
            <p class="bm-card-subtitle">
              {{ t('auth.resend.form.subtitle') }}
            </p>
          </header>

          <form class="bm-stack-md" @submit.prevent="onSubmit" novalidate>
            <div class="bm-stack-xs">
              <label class="bm-label" for="resend-email">
                {{ t('auth.common.email.label') }}
              </label>
              <input
                id="resend-email"
                v-model="email"
                type="email"
                class="bm-input"
                :placeholder="t('auth.common.email.placeholder')"
                autocomplete="email"
                required
              />
            </div>

            <p v-if="message" :class="messageClass" role="status" aria-live="polite">
              {{ message }}
            </p>

            <div class="auth-form-actions">
              <button
                type="submit"
                class="bm-btn bm-btn-primary bm-ease"
                :disabled="submitting"
              >
                <span v-if="!submitting">{{ t('auth.resend.form.actions.submit') }}</span>
                <span v-else>{{ t('auth.resend.form.actions.submitting') }}</span>
              </button>

              <div class="auth-form-links">
                <NuxtLink to="/login" class="auth-link">
                  {{ t('auth.resend.form.actions.backToLogin') }}
                </NuxtLink>
              </div>
            </div>
          </form>
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

const { t, locale } = useI18n()
const route = useRoute()

const email = ref('')
const submitting = ref(false)
const state = ref('idle') // idle | sent | already | error
const submitErrorMessage = ref('')

onMounted(() => {
  const raw = route.query.email
  const str = Array.isArray(raw) ? raw[0] : raw
  if (typeof str === 'string') email.value = str
})

const asideItems = computed(() => [
  t('auth.resend.aside.items.0'),
  t('auth.resend.aside.items.1'),
  t('auth.resend.aside.items.2')
].filter(Boolean))

const message = computed(() => {
  if (state.value === 'sent') return t('auth.resend.feedback.sent')
  if (state.value === 'already') return t('auth.resend.feedback.alreadyVerified')
  if (state.value === 'error') return submitErrorMessage.value || t('auth.common.errors.generic')
  return ''
})

const messageClass = computed(() => {
  if (state.value === 'sent' || state.value === 'already') return 'auth-success'
  if (state.value === 'error') return 'auth-error'
  return ''
})

async function onSubmit () {
  state.value = 'idle'
  submitErrorMessage.value = ''

  if (!email.value.trim()) {
    state.value = 'error'
    return
  }

  submitting.value = true
  try {
    const res = await $fetch('/api/auth/resend-verification', {
      method: 'POST',
      body: { email: email.value.trim(), locale: locale.value }
    })

    if (res?.alreadyVerified) {
      state.value = 'already'
      return
    }

    if (res?.sent === true) {
      state.value = 'sent'
      return
    }

    state.value = 'error'
    submitErrorMessage.value = t('auth.resend.feedback.deliveryFailed')
  } catch (e) {
    console.error(e)
    state.value = 'error'
    submitErrorMessage.value = t('auth.common.errors.generic')
  } finally {
    submitting.value = false
  }
}

useHead(() => {
  const pageTitle = `${t('auth.resend.hero.title')} · ${t('app.brand')}`
  return {
    title: pageTitle
  }
})

useSeoMeta({
  description: () => t('auth.resend.hero.subtitle'),
  ogTitle: () => `${t('auth.resend.hero.title')} · ${t('app.brand')}`,
  ogDescription: () => t('auth.resend.hero.subtitle'),
  twitterTitle: () => `${t('auth.resend.hero.title')} · ${t('app.brand')}`,
  twitterDescription: () => t('auth.resend.hero.subtitle')
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

.auth-error {
  margin: 0;
  font-size: 0.95rem;
  color: #fecaca;
  line-height: 1.6;
}

.auth-success {
  margin: 0;
  color: #bbf7d0;
  font-size: 0.95rem;
  line-height: 1.6;
}
</style>
