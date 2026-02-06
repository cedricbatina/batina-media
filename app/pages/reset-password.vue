<template>
  <div class="bm-stack-page auth-page">
    <section class="bm-section auth-hero" aria-labelledby="reset-page-title">
      <div class="auth-hero-grid">
        <div class="bm-stack-sm auth-hero-main">
          <span class="bm-pill bm-pill-soft bm-reveal" style="animation-delay: 0ms">
            {{ t('auth.reset.hero.label') }}
          </span>

          <h1
            id="reset-page-title"
            class="bm-heading-hero bm-title-hero bm-reveal"
            style="animation-delay: 60ms"
          >
            {{ t('auth.reset.hero.title') }}
          </h1>

          <p class="bm-text-soft auth-hero-subtitle bm-reveal" style="animation-delay: 120ms">
            {{ t('auth.reset.hero.subtitle') }}
          </p>
        </div>

        <aside class="bm-card bm-card-compact bm-ease js-reveal auth-hero-aside" aria-label="Reset help">
          <div class="bm-card-header">
            <div class="bm-stack-sm" style="gap: 0.5rem">
              <p class="bm-pill bm-pill-muted">
                {{ t('auth.reset.aside.label') }}
              </p>
              <p class="bm-card-title bm-title-h3">
                {{ t('auth.reset.aside.title') }}
              </p>
            </div>
          </div>

          <p class="bm-card-subtitle">
            {{ t('auth.reset.aside.body') }}
          </p>
        </aside>
      </div>
    </section>

    <section class="bm-section" aria-label="Reset password form">
      <div class="auth-form-center">
        <article class="bm-card bm-card-compact bm-ease js-reveal auth-card">
          <header class="bm-stack-xs">
            <h2 class="bm-card-title bm-title-h3">{{ t('auth.reset.form.title') }}</h2>
            <p class="bm-card-subtitle">{{ t('auth.reset.form.subtitle') }}</p>
          </header>

          <div v-if="!token" class="bm-stack-sm">
            <p class="auth-error" role="alert">{{ t('auth.reset.errors.missingToken') }}</p>
            <NuxtLink to="/forgot-password" class="bm-btn bm-btn-outline bm-ease">
              {{ t('auth.reset.actions.requestNew') }}
            </NuxtLink>
          </div>

          <form v-else class="bm-stack-md" @submit.prevent="onSubmit" novalidate>
            <div class="bm-stack-xs">
              <label class="bm-label" for="reset-password">{{ t('auth.common.passwordNew.label') }}</label>
              <div class="auth-input-with-action">
                <input
                  id="reset-password"
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  class="bm-input auth-input-grow"
                  :placeholder="t('auth.common.passwordNew.placeholder')"
                  autocomplete="new-password"
                  required
                />
                <button
                  type="button"
                  class="bm-btn bm-btn-outline bm-btn-sm auth-input-action"
                  @click="showPassword = !showPassword"
                >
                  {{ showPassword ? t('auth.common.password.hide') : t('auth.common.password.show') }}
                </button>
              </div>
            </div>

            <div class="bm-stack-xs">
              <label class="bm-label" for="reset-password-confirm">{{ t('auth.common.passwordConfirm.label') }}</label>
              <input
                id="reset-password-confirm"
                v-model="form.confirm"
                :type="showPassword ? 'text' : 'password'"
                class="bm-input"
                :placeholder="t('auth.common.passwordConfirm.placeholder')"
                autocomplete="new-password"
                required
              />
            </div>

            <p v-if="errorMessage" class="auth-error" role="alert">{{ errorMessage }}</p>
            <p v-else-if="success" class="auth-success" role="status">{{ t('auth.reset.feedback.success') }}</p>

            <div class="auth-form-actions">
              <button class="bm-btn bm-btn-primary bm-ease" type="submit" :disabled="submitting || success">
                <span v-if="!submitting">{{ t('auth.reset.actions.submit') }}</span>
                <span v-else>{{ t('auth.reset.actions.submitting') }}</span>
              </button>

              <NuxtLink to="/login" class="auth-link">{{ t('auth.reset.actions.backToLogin') }}</NuxtLink>
            </div>
          </form>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { useHead, useRoute } from '#imports'
import { useI18n } from 'vue-i18n'

definePageMeta({ guestOnly: true })

const { t } = useI18n()
const route = useRoute()

const token = computed(() => {
  const raw = route.query.token
  const str = Array.isArray(raw) ? raw[0] : raw
  return typeof str === 'string' ? str : ''
})

const form = reactive({ password: '', confirm: '' })

const showPassword = ref(false)
const submitting = ref(false)
const success = ref(false)
const errorMessage = ref('')

function parseFetchError (e) {
  return {
    statusCode: e?.statusCode || e?.response?.status || null,
    statusMessage: e?.data?.statusMessage || e?.statusMessage || ''
  }
}

async function onSubmit () {
  errorMessage.value = ''

  if (!form.password || form.password.length < 8) {
    errorMessage.value = t('auth.reset.errors.passwordTooShort')
    return
  }

  if (form.password !== form.confirm) {
    errorMessage.value = t('auth.reset.errors.passwordsDontMatch')
    return
  }

  submitting.value = true
  try {
    await $fetch('/api/auth/reset-password', {
      method: 'POST',
      body: { token: token.value, password: form.password }
    })

    success.value = true
  } catch (e) {
    const { statusCode } = parseFetchError(e)

    if (statusCode === 400) {
      errorMessage.value = t('auth.reset.errors.invalidToken')
    } else {
      errorMessage.value = t('auth.common.errors.generic')
    }
  } finally {
    submitting.value = false
  }
}

useHead(() => {
  const pageTitle = `${t('auth.reset.hero.title')} · ${t('app.brand')}`
  const pageDescription = t('auth.reset.hero.subtitle')

  return {
    title: pageTitle,
    meta: [
      { name: 'description', content: pageDescription },
      { property: 'og:title', content: pageTitle },
      { property: 'og:description', content: pageDescription }
    ]
  }
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

.auth-form-center {
  max-width: 42rem;
  margin: 0 auto;
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
</style>
