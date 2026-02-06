<template>
  <div class="bm-stack-page contact-page">
    <!-- HERO -->
    <section class="bm-section contact-hero" aria-labelledby="contact-hero-title">
      <div class="contact-hero-grid">
        <div class="contact-hero-main bm-stack-sm">
          <span class="bm-pill bm-pill-soft bm-reveal" style="animation-delay: 0ms">
            {{ t('contact.hero.label') }}
          </span>

          <h1
            id="contact-hero-title"
            class="bm-heading-hero bm-title-hero bm-reveal"
            style="animation-delay: 60ms"
          >
            {{ t('contact.hero.title') }}
          </h1>

          <p class="bm-text-soft contact-hero-subtitle bm-reveal" style="animation-delay: 120ms">
            {{ t('contact.hero.subtitle') }}
          </p>
        </div>

        <!-- Aside -->
        <aside class="bm-card bm-card-compact bm-ease js-reveal contact-hero-aside" aria-label="Contact overview">
          <div class="bm-card-header">
            <div class="bm-stack-sm" style="gap: 0.5rem">
              <p class="bm-pill bm-pill-muted">
                {{ t('contact.hero.aside.title') }}
              </p>
              <p class="bm-card-title bm-title-h3">
                {{ t('contact.hero.aside.body') }}
              </p>
            </div>
          </div>

          <ul class="contact-hero-list">
            <li class="contact-hero-stat">
              <span class="contact-hero-stat-label">
                {{ t('contact.hero.aside.emailLabel') }}
              </span>
              <a class="contact-hero-stat-link" :href="`mailto:${emailAddress}`">
                {{ emailAddress }}
              </a>
            </li>

            <li class="contact-hero-stat">
              <span class="contact-hero-stat-label">
                {{ t('contact.hero.aside.responseTimeLabel') }}
              </span>
              <span class="contact-hero-stat-value">
                {{ t('contact.hero.aside.responseTime') }}
              </span>
            </li>
          </ul>
        </aside>
      </div>
    </section>

    <!-- FORM + SIDEBAR -->
    <section class="bm-section contact-main" aria-labelledby="contact-form-title">
      <div class="contact-grid">
        <!-- Form -->
        <article class="bm-card bm-card-compact bm-ease js-reveal contact-card contact-card-form">
          <header class="contact-card-header bm-stack-sm">
            <h2 id="contact-form-title" class="bm-card-title bm-title-h3">
              {{ t('contact.form.title') }}
            </h2>
            <p class="bm-card-subtitle">
              {{ t('contact.form.subtitle') }}
            </p>
          </header>

          <form @submit.prevent="onSubmit" novalidate class="contact-form">
            <!-- Nom -->
            <div class="contact-field">
              <label class="contact-label" for="contact-name">
                {{ t('contact.form.fields.name.label') }}
              </label>
              <input
                id="contact-name"
                v-model="form.name"
                type="text"
                class="bm-input"
                :placeholder="t('contact.form.fields.name.placeholder')"
                autocomplete="name"
              />
              <p v-if="errors.name" class="contact-error">
                {{ errors.name }}
              </p>
            </div>

            <!-- Email -->
            <div class="contact-field">
              <label class="contact-label" for="contact-email">
                {{ t('contact.form.fields.email.label') }}
              </label>
              <input
                id="contact-email"
                v-model="form.email"
                type="email"
                class="bm-input"
                :placeholder="t('contact.form.fields.email.placeholder')"
                autocomplete="email"
              />
              <p v-if="errors.email" class="contact-error">
                {{ errors.email }}
              </p>
            </div>

            <!-- Organisation -->
            <div class="contact-field">
              <label class="contact-label" for="contact-org">
                {{ t('contact.form.fields.org.label') }}
              </label>
              <input
                id="contact-org"
                v-model="form.org"
                type="text"
                class="bm-input"
                :placeholder="t('contact.form.fields.org.placeholder')"
              />
            </div>

            <!-- Type de projet -->
            <div class="contact-field">
              <label class="contact-label" for="contact-type">
                {{ t('contact.form.fields.projectType.label') }}
              </label>
              <select id="contact-type" v-model="form.projectType" class="bm-select">
                <option value="">
                  {{ t('contact.form.fields.projectType.placeholder') }}
                </option>
                <option value="platform">
                  {{ t('contact.form.fields.projectType.options.platform') }}
                </option>
                <option value="content">
                  {{ t('contact.form.fields.projectType.options.content') }}
                </option>
                <option value="data">
                  {{ t('contact.form.fields.projectType.options.data') }}
                </option>
                <option value="training">
                  {{ t('contact.form.fields.projectType.options.training') }}
                </option>
                <option value="other">
                  {{ t('contact.form.fields.projectType.options.other') }}
                </option>
              </select>
            </div>

            <!-- Budget / timeline -->
            <div class="contact-field contact-field-inline">
              <div class="contact-field-half">
                <label class="contact-label" for="contact-budget">
                  {{ t('contact.form.fields.budget.label') }}
                </label>
                <input
                  id="contact-budget"
                  v-model="form.budget"
                  type="text"
                  class="bm-input"
                  :placeholder="t('contact.form.fields.budget.placeholder')"
                />
              </div>

              <div class="contact-field-half">
                <label class="contact-label" for="contact-timeline">
                  {{ t('contact.form.fields.timeline.label') }}
                </label>
                <input
                  id="contact-timeline"
                  v-model="form.timeline"
                  type="text"
                  class="bm-input"
                  :placeholder="t('contact.form.fields.timeline.placeholder')"
                />
              </div>
            </div>

            <!-- Message -->
            <div class="contact-field">
              <label class="contact-label" for="contact-message">
                {{ t('contact.form.fields.message.label') }}
              </label>
              <textarea
                id="contact-message"
                v-model="form.message"
                rows="6"
                class="bm-textarea"
                :placeholder="t('contact.form.fields.message.placeholder')"
              ></textarea>
              <p v-if="errors.message" class="contact-error">
                {{ errors.message }}
              </p>
            </div>

            <!-- Footer -->
            <div class="contact-form-footer">
              <button type="submit" class="bm-btn bm-btn-primary bm-ease" :disabled="submitting">
                <span v-if="!submitting">{{ t('contact.form.actions.submit') }}</span>
                <span v-else>{{ t('contact.form.actions.submitting') }}</span>
              </button>

              <p v-if="submitState === 'success'" class="contact-success">
                {{ t('contact.form.feedback.success') }}
              </p>
              <p v-else-if="submitState === 'error'" class="contact-error">
                {{ t('contact.form.feedback.error') }}
              </p>
              <p v-else class="contact-hint bm-text-muted">
                {{ t('contact.form.hint') }}
              </p>
            </div>
          </form>
        </article>

        <!-- Sidebar -->
        <aside class="contact-sidebar">
          <article class="bm-card bm-card-compact bm-ease js-reveal contact-card">
            <h2 class="bm-card-title bm-title-h3">
              {{ t('contact.info.projects.title') }}
            </h2>
            <p class="bm-card-subtitle">
              {{ t('contact.info.projects.body') }}
            </p>
            <ul class="contact-list">
              <li v-for="item in projectInfoItems" :key="item">{{ item }}</li>
            </ul>
          </article>

          <article class="bm-card bm-card-compact bm-ease js-reveal contact-card">
            <h2 class="bm-card-title bm-title-h3">
              {{ t('contact.info.process.title') }}
            </h2>
            <p class="bm-card-subtitle">
              {{ t('contact.info.process.body') }}
            </p>
            <ul class="contact-list">
              <li v-for="item in processItems" :key="item">{{ item }}</li>
            </ul>
          </article>
        </aside>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { useHead } from '#imports'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const emailUser = computed(() => t('contact.hero.aside.emailUser'))
const emailDomain = computed(() => t('contact.hero.aside.emailDomain'))
const emailAddress = computed(() => `${emailUser.value}@${emailDomain.value}`)

const form = reactive({
  name: '',
  email: '',
  org: '',
  projectType: '',
  budget: '',
  timeline: '',
  message: ''
})

const errors = reactive({ name: '', email: '', message: '' })
const submitting = ref(false)
const submitState = ref('idle') // 'idle' | 'success' | 'error'

function validate () {
  errors.name = ''
  errors.email = ''
  errors.message = ''

  if (!form.name.trim()) errors.name = t('contact.form.validation.nameRequired')

  if (!form.email.trim()) {
    errors.email = t('contact.form.validation.emailRequired')
  } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
    errors.email = t('contact.form.validation.emailInvalid')
  }

  if (!form.message.trim()) errors.message = t('contact.form.validation.messageRequired')

  return !errors.name && !errors.email && !errors.message
}

async function onSubmit () {
  submitState.value = 'idle'
  if (!validate()) return

  submitting.value = true
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: form.name,
        email: form.email,
        org: form.org,
        projectType: form.projectType,
        budget: form.budget,
        timeline: form.timeline,
        message: form.message,
        locale: locale.value
      }
    })
    submitState.value = 'success'
  } catch (e) {
    console.error(e)
    submitState.value = 'error'
  } finally {
    submitting.value = false
  }
}

const projectInfoItems = computed(() => [
  t('contact.info.projects.items.0'),
  t('contact.info.projects.items.1'),
  t('contact.info.projects.items.2')
].filter(Boolean))

const processItems = computed(() => [
  t('contact.info.process.items.0'),
  t('contact.info.process.items.1'),
  t('contact.info.process.items.2')
].filter(Boolean))

useHead(() => ({
  title: t('contact.seo.title'),
  meta: [
    { name: 'description', content: t('contact.seo.description') },
    { property: 'og:title', content: t('contact.seo.title') },
    { property: 'og:description', content: t('contact.seo.description') }
  ]
}))
</script>

<style scoped>
/* Hero rhythm */
.contact-hero {
  padding-top: 2.6rem;
}
@media (min-width: 980px) {
  .contact-hero {
    padding-top: 3rem;
  }
}

.contact-hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 2.2fr) minmax(0, 1.4fr);
  gap: var(--bm-space-xl);
  align-items: start;
}
@media (max-width: 980px) {
  .contact-hero-grid {
    grid-template-columns: 1fr;
  }
}

.contact-hero-subtitle {
  max-width: 50rem;
}

.contact-hero-aside .bm-card-header {
  margin-bottom: 0.9rem;
}

/* Aside stats (compact, lisible) */
.contact-hero-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.55rem;
}
.contact-hero-stat {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.25rem 0;
  border-bottom: 1px solid color-mix(in srgb, var(--bm-color-border-subtle) 70%, transparent);
  flex-wrap: wrap;
}
.contact-hero-stat:last-child {
  border-bottom: none;
}
.contact-hero-stat-label {
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--bm-color-text-muted);
  line-height: 1.2;
}
.contact-hero-stat-value {
  font-size: 0.98rem;
  font-weight: 650;
  color: var(--bm-color-text-strong);
  font-variant-numeric: tabular-nums;
  line-height: 1.2;
}
.contact-hero-stat-link {
  font-size: 0.98rem;
  font-weight: 650;
  color: var(--bm-color-text-strong);
  text-decoration: none;
  border-bottom: 1px solid color-mix(in srgb, var(--bm-color-border-subtle) 80%, transparent);
  word-break: break-word;
}
.contact-hero-stat-link:hover {
  border-bottom-color: color-mix(in srgb, var(--bm-color-primary) 45%, transparent);
}

/* Main grid */
.contact-grid {
  display: grid;
  grid-template-columns: minmax(0, 2.1fr) minmax(0, 1.4fr);
  gap: var(--bm-space-2xl);
  align-items: start;
}
@media (max-width: 900px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}

.contact-card-header {
  margin-bottom: 1.25rem;
}

/* Form */
.contact-form {
  display: grid;
  gap: 1.05rem;
}
.contact-field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
.contact-field-inline {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}
@media (max-width: 900px) {
  .contact-field-inline {
    grid-template-columns: 1fr;
  }
}

.contact-label {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--bm-color-text-muted);
}

/* Feedback */
.contact-error {
  font-size: 0.82rem;
  color: #fecaca;
}
.contact-success {
  font-size: 0.85rem;
  color: #bbf7d0;
}

.contact-form-footer {
  margin-top: 0.25rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1.25rem;
}

.contact-sidebar {
  display: grid;
  gap: var(--bm-space-xl);
}

.contact-list {
  margin: 0.75rem 0 0;
  padding-left: 1.15rem;
  display: grid;
  gap: 0.35rem;
  line-height: 1.45;
}
</style>
