<template>
  <div class="bm-stack-lg">
    <!-- HERO -->
    <section
      class="bm-section contact-hero"
      aria-labelledby="contact-hero-title"
    >
      <div class="contact-hero-inner">
        <div class="bm-stack-sm">
          <p class="bm-pill bm-pill-muted">
            {{ t('contact.hero.label') }}
          </p>

          <h1 id="contact-hero-title" class="bm-heading-1">
            {{ t('contact.hero.title') }}
          </h1>

          <p class="bm-text-soft contact-hero-subtitle">
            {{ t('contact.hero.subtitle') }}
          </p>
        </div>

        <!-- Bloc résumé / coordonnées -->
        <aside class="bm-card bm-card-compact contact-hero-aside">
          <h2 class="bm-card-title">
            {{ t('contact.hero.aside.title') }}
          </h2>
          <p class="bm-card-subtitle bm-text-soft">
            {{ t('contact.hero.aside.body') }}
          </p>

          <div class="contact-hero-meta">
            <p class="bm-text-soft">
              <span class="contact-meta-label">
                {{ t('contact.hero.aside.emailLabel') }}
              </span>
             <a
  class="contact-meta-link"
  :href="`mailto:${emailAddress}`"
>
  {{ emailAddress }}
</a>

            </p>
            <p class="bm-text-soft">
              <span class="contact-meta-label">
                {{ t('contact.hero.aside.responseTimeLabel') }}
              </span>
              <span>
                {{ t('contact.hero.aside.responseTime') }}
              </span>
            </p>
          </div>
        </aside>
      </div>
    </section>

    <!-- FORMULAIRE + INFOS -->
    <section
      class="bm-section contact-main"
      aria-labelledby="contact-form-title"
    >
      <div class="contact-layout">
        <!-- FORMULAIRE -->
        <article class="bm-card bm-card-compact contact-card contact-card-form">
          <header class="contact-card-header">
            <h2 id="contact-form-title" class="bm-card-title">
              {{ t('contact.form.title') }}
            </h2>
            <p class="bm-card-subtitle bm-text-soft">
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
                class="contact-input"
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
                class="contact-input"
                :placeholder="t('contact.form.fields.email.placeholder')"
                autocomplete="email"
              />
              <p v-if="errors.email" class="contact-error">
                {{ errors.email }}
              </p>
            </div>

            <!-- Organisation / projet -->
            <div class="contact-field">
              <label class="contact-label" for="contact-org">
                {{ t('contact.form.fields.org.label') }}
              </label>
              <input
                id="contact-org"
                v-model="form.org"
                type="text"
                class="contact-input"
                :placeholder="t('contact.form.fields.org.placeholder')"
              />
            </div>

            <!-- Type de projet -->
            <div class="contact-field">
              <label class="contact-label" for="contact-type">
                {{ t('contact.form.fields.projectType.label') }}
              </label>
              <select
                id="contact-type"
                v-model="form.projectType"
                class="contact-select"
              >
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

            <!-- Budget / cadre -->
            <div class="contact-field contact-field-inline">
              <div class="contact-field-half">
                <label class="contact-label" for="contact-budget">
                  {{ t('contact.form.fields.budget.label') }}
                </label>
                <input
                  id="contact-budget"
                  v-model="form.budget"
                  type="text"
                  class="contact-input"
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
                  class="contact-input"
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
                class="contact-textarea"
                :placeholder="t('contact.form.fields.message.placeholder')"
              ></textarea>
              <p v-if="errors.message" class="contact-error">
                {{ errors.message }}
              </p>
            </div>

            <!-- Footer formulaire -->
            <div class="contact-form-footer">
              <button
                type="submit"
                class="bm-btn bm-btn-primary"
                :disabled="submitting"
              >
                <span v-if="!submitting">
                  {{ t('contact.form.actions.submit') }}
                </span>
                <span v-else>
                  {{ t('contact.form.actions.submitting') }}
                </span>
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

        <!-- Infos complémentaires / types de collaborations -->
        <aside class="contact-sidebar">
          <article class="bm-card bm-card-compact contact-card">
            <h2 class="bm-card-title">
              {{ t('contact.info.projects.title') }}
            </h2>
            <p class="bm-card-subtitle bm-text-soft">
              {{ t('contact.info.projects.body') }}
            </p>
            <ul class="contact-list">
              <li v-for="item in projectInfoItems" :key="item">
                {{ item }}
              </li>
            </ul>
          </article>

          <article class="bm-card bm-card-compact contact-card">
            <h2 class="bm-card-title">
              {{ t('contact.info.process.title') }}
            </h2>
            <p class="bm-card-subtitle bm-text-soft">
              {{ t('contact.info.process.body') }}
            </p>
            <ul class="contact-list">
              <li v-for="item in processItems" :key="item">
                {{ item }}
              </li>
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

const { t } = useI18n()
const emailUser = computed(() => t('contact.hero.aside.emailUser'))
const emailDomain = computed(() => t('contact.hero.aside.emailDomain'))
const emailAddress = computed(() => `${emailUser.value}@${emailDomain.value}`)

// Modèle du formulaire
const form = reactive({
  name: '',
  email: '',
  org: '',
  projectType: '',
  budget: '',
  timeline: '',
  message: ''
})

const errors = reactive({
  name: '',
  email: '',
  message: ''
})

const submitting = ref(false)
const submitState = ref('idle') // 'idle' | 'success' | 'error'

function validate () {
  errors.name = ''
  errors.email = ''
  errors.message = ''

  if (!form.name.trim()) {
    errors.name = t('contact.form.validation.nameRequired')
  }

  if (!form.email.trim()) {
    errors.email = t('contact.form.validation.emailRequired')
  } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
    errors.email = t('contact.form.validation.emailInvalid')
  }

  if (!form.message.trim()) {
    errors.message = t('contact.form.validation.messageRequired')
  }

  return !errors.name && !errors.email && !errors.message
}

async function onSubmit () {
  submitState.value = 'idle'

  if (!validate()) {
    return
  }

  submitting.value = true

  try {
    // Ici tu pourras brancher une vraie API plus tard :
    // await $fetch('/api/contact', { method: 'POST', body: form })

    // Pour l’instant on simule juste un envoi réussi
    await new Promise(resolve => setTimeout(resolve, 600))
    submitState.value = 'success'
  } catch (e) {
    console.error(e)
    submitState.value = 'error'
  } finally {
    submitting.value = false
  }
}

/**
 * Listes d’infos à droite – on laisse le texte dans l’i18n
 */
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

/**
 * SEO page contact
 */
useHead(() => ({
  title: t('contact.seo.title'),
  meta: [
    {
      name: 'description',
      content: t('contact.seo.description')
    },
    {
      property: 'og:title',
      content: t('contact.seo.title')
    },
    {
      property: 'og:description',
      content: t('contact.seo.description')
    }
  ]
}))
</script>

<style scoped>
/* HERO */
.contact-hero {
  padding-top: 4rem;
}

.contact-hero-inner {
  display: grid;
  grid-template-columns: minmax(0, 2.2fr) minmax(0, 1.5fr);
  gap: 2.5rem;
  align-items: flex-start;
}

.contact-hero-subtitle {
  max-width: 44rem;
}

.contact-hero-aside {
  align-self: stretch;
}

.contact-hero-meta {
  margin-top: 1.25rem;
  display: grid;
  gap: 0.35rem;
}

.contact-meta-label {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  display: inline-block;
  margin-right: 0.35rem;
  opacity: 0.9;
}

.contact-meta-link {
  text-decoration: none;
  border-bottom: 1px solid rgba(248, 250, 252, 0.24);
}

.contact-meta-link:hover {
  border-bottom-color: rgba(248, 250, 252, 0.6);
}

/* LAYOUT PRINCIPAL */
.contact-main {
  padding-top: 2rem;
}

.contact-layout {
  display: grid;
  grid-template-columns: minmax(0, 2.1fr) minmax(0, 1.4fr);
  gap: 2.75rem;
  align-items: flex-start;
}

.contact-card {
  height: 100%;
}

.contact-card-header {
  margin-bottom: 1.5rem;
}

/* FORMULAIRE */
.contact-form {
  display: grid;
  gap: 1.2rem;
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

.contact-field-half {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.contact-label {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.9;
}

.contact-input,
.contact-select,
.contact-textarea {
  width: 100%;
  border-radius: 0.55rem;
  border: 1px solid var(--bm-border-subtle);
  background: var(--bm-surface-subtle);
  padding: 0.65rem 0.8rem;
  color: var(--bm-text-main); /* <--- important : texte clair lisible */
  font: inherit;
}

/* Spécifique au select : dropdown lisible en thème sombre */
.contact-select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

/* Couleurs des options dans la liste déroulante */
.contact-select option {
  background-color: var(--bm-surface-elevated);
  color: var(--bm-text-main);
}


.contact-input:focus,
.contact-select:focus,
.contact-textarea:focus {
  outline: none;
  border-color: var(--bm-color-accent-soft);
  box-shadow: 0 0 0 1px rgba(148, 163, 184, 0.4);
}

.contact-textarea {
  resize: vertical;
  min-height: 7rem;
}

.contact-error {
  font-size: 0.8rem;
  color: #fecaca; /* rouge doux sur fond dark */
}

.contact-success {
  font-size: 0.85rem;
  color: #bbf7d0; /* vert doux */
}

.contact-hint {
  font-size: 0.8rem;
}

.contact-form-footer {
  margin-top: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1.25rem;
}

/* SIDEBAR */
.contact-sidebar {
  display: grid;
  gap: 1.75rem;
}

.contact-list {
  margin-top: 0.75rem;
  padding-left: 1.15rem;
  display: grid;
  gap: 0.35rem;
  font-size: 0.95rem;
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .contact-hero-inner {
    grid-template-columns: minmax(0, 1fr);
  }

  .contact-layout {
    grid-template-columns: minmax(0, 1fr);
  }

  .contact-field-inline {
    grid-template-columns: minmax(0, 1fr);
  }
}
.contact-select option {
  color: #0f172a;        /* texte foncé */
  background: #f9fafb;   /* fond clair */
}

</style>
