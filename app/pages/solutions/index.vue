<template>
  <div class="bm-stack-page solutions-page">
    <!-- HERO -->
    <section class="bm-section solutions-hero" aria-labelledby="solutions-hero-title">
      <div class="solutions-hero-grid">
        <div class="bm-stack-sm solutions-hero-main">
          <span class="bm-pill bm-pill-soft bm-reveal" style="animation-delay: 0ms">
            {{ t('solutions.hero.pill') }}
          </span>

          <h1
            id="solutions-hero-title"
            class="bm-heading-hero bm-title-hero bm-reveal"
            style="animation-delay: 60ms"
          >
            {{ t('solutions.hero.title') }}
          </h1>

          <p class="bm-text-soft solutions-hero-subtitle bm-reveal" style="animation-delay: 120ms">
            {{ t('solutions.hero.subtitle') }}
          </p>

          <div class="bm-form-row-inline bm-reveal" style="animation-delay: 180ms">
            <NuxtLink to="/contact" class="bm-btn bm-btn-primary bm-ease">
              {{ t('solutions.hero.primaryCta') }}
            </NuxtLink>
            <NuxtLink to="/projects" class="bm-btn bm-btn-outline bm-ease">
              {{ t('solutions.hero.secondaryCta') }}
            </NuxtLink>
          </div>

          <p class="bm-text-muted bm-reveal" style="animation-delay: 240ms">
            {{ t('solutions.hero.meta') }}
          </p>
        </div>

        <!-- Aside (style Home) -->
        <aside class="bm-card bm-ease js-reveal solutions-hero-aside" aria-label="Solutions snapshot">
          <div class="bm-card-header">
            <div>
              <p class="bm-pill bm-pill-muted">
                {{ t('solutions.hero.aside.label') }}
              </p>
              <p class="bm-card-title">
                {{ t('solutions.hero.aside.title') }}
              </p>
            </div>
          </div>

          <ul class="solutions-hero-list">
            <li v-for="row in heroAsideItems" :key="row.key">
              <p class="solutions-hero-list-label">
                {{ row.label }}
              </p>
              <p class="bm-text-soft">
                {{ row.value }}
              </p>
            </li>
          </ul>
        </aside>
      </div>
    </section>

    <!-- FAMILLES -->
    <section class="bm-section js-reveal" aria-labelledby="solutions-families-title">
      <div class="bm-stack-lg">
        <header class="bm-stack-sm bm-section-header">
          <p class="bm-pill bm-pill-muted">
            {{ t('solutions.families.label') }}
          </p>
          <h2 id="solutions-families-title" class="bm-heading-2 bm-title-h2">
            {{ t('solutions.families.title') }}
          </h2>
          <p class="bm-text-soft">
            {{ t('solutions.families.subtitle') }}
          </p>
        </header>

        <div class="bm-grid solutions-grid">
          <article
            v-for="card in familyCards"
            :key="card.key"
            class="bm-card bm-card-compact bm-ease js-reveal"
          >
            <h3 class="bm-card-title bm-title-h3">
              {{ card.title }}
            </h3>
            <p class="bm-card-subtitle">
              {{ card.subtitle }}
            </p>

            <ul class="solutions-list">
              <li v-for="item in card.items" :key="item">
                {{ item }}
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <!-- PROCESS / PIPELINE -->
    <section class="bm-section js-reveal" aria-labelledby="solutions-process-title">
      <div class="bm-stack-lg">
        <header class="bm-stack-sm bm-section-header">
          <p class="bm-pill bm-pill-muted">
            {{ t('solutions.process.label') }}
          </p>
          <h2 id="solutions-process-title" class="bm-heading-2 bm-title-h2">
            {{ t('solutions.process.title') }}
          </h2>
          <p class="bm-text-soft">
            {{ t('solutions.process.subtitle') }}
          </p>
        </header>

        <ol class="solutions-steps">
          <li
            v-for="step in processSteps"
            :key="step.key"
            class="solutions-step bm-card bm-card-compact bm-ease js-reveal"
          >
            <div class="solutions-step-index" aria-hidden="true">
              {{ step.index }}
            </div>
            <div class="solutions-step-body">
              <h3 class="bm-card-title bm-title-h3">
                {{ step.title }}
              </h3>
              <p class="bm-card-subtitle">
                {{ step.body }}
              </p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <!-- USE CASES -->
    <section class="bm-section js-reveal" aria-labelledby="solutions-usecases-title">
      <div class="bm-stack-lg">
        <header class="bm-stack-sm bm-section-header">
          <p class="bm-pill bm-pill-muted">
            {{ t('solutions.usecases.label') }}
          </p>
          <h2 id="solutions-usecases-title" class="bm-heading-2 bm-title-h2">
            {{ t('solutions.usecases.title') }}
          </h2>
          <p class="bm-text-soft">
            {{ t('solutions.usecases.subtitle') }}
          </p>
        </header>

        <div class="bm-grid solutions-grid">
          <article
            v-for="uc in useCases"
            :key="uc.key"
            class="bm-card bm-card-compact bm-ease js-reveal"
          >
            <h3 class="bm-card-title bm-title-h3">
              {{ uc.title }}
            </h3>
            <p class="bm-card-subtitle">
              {{ uc.subtitle }}
            </p>
            <ul class="solutions-list">
              <li v-for="item in uc.items" :key="item">
                {{ item }}
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bm-section js-reveal" aria-label="Call to action">
      <div class="bm-card bm-ease js-reveal solutions-cta-card">
        <div class="solutions-cta-content">
          <div class="bm-stack-sm">
            <p class="bm-pill bm-pill-muted">
              {{ t('solutions.cta.pill') }}
            </p>
            <h2 class="bm-heading-2 bm-title-h2">
              {{ t('solutions.cta.title') }}
            </h2>
            <p class="bm-text-soft">
              {{ t('solutions.cta.body') }}
            </p>
          </div>

          <NuxtLink to="/contact" class="bm-btn bm-btn-primary bm-ease">
            {{ t('solutions.cta.button') }}
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount } from 'vue'
import { useHead } from '#imports'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

/**
 * HERO aside (style Home)
 */
const heroAsideItems = computed(() => [
  { key: 'data', label: t('solutions.hero.aside.items.0.label'), value: t('solutions.hero.aside.items.0.value') },
  { key: 'platforms', label: t('solutions.hero.aside.items.1.label'), value: t('solutions.hero.aside.items.1.value') },
  { key: 'derivatives', label: t('solutions.hero.aside.items.2.label'), value: t('solutions.hero.aside.items.2.value') }
])

/**
 * Families cards
 */
const familyCards = computed(() => [
  {
    key: 'data',
    title: t('solutions.families.cards.0.title'),
    subtitle: t('solutions.families.cards.0.subtitle'),
    items: [
      t('solutions.families.cards.0.items.0'),
      t('solutions.families.cards.0.items.1'),
      t('solutions.families.cards.0.items.2'),
      t('solutions.families.cards.0.items.3'),
      t('solutions.families.cards.0.items.4')
    ].filter(Boolean)
  },
  {
    key: 'platforms',
    title: t('solutions.families.cards.1.title'),
    subtitle: t('solutions.families.cards.1.subtitle'),
    items: [
      t('solutions.families.cards.1.items.0'),
      t('solutions.families.cards.1.items.1'),
      t('solutions.families.cards.1.items.2'),
      t('solutions.families.cards.1.items.3')
    ].filter(Boolean)
  },
  {
    key: 'derivatives',
    title: t('solutions.families.cards.2.title'),
    subtitle: t('solutions.families.cards.2.subtitle'),
    items: [
      t('solutions.families.cards.2.items.0'),
      t('solutions.families.cards.2.items.1'),
      t('solutions.families.cards.2.items.2'),
      t('solutions.families.cards.2.items.3')
    ].filter(Boolean)
  }
])

/**
 * Process steps
 */
const processSteps = computed(() => [
  { key: '01', index: t('solutions.process.steps.0.index'), title: t('solutions.process.steps.0.title'), body: t('solutions.process.steps.0.body') },
  { key: '02', index: t('solutions.process.steps.1.index'), title: t('solutions.process.steps.1.title'), body: t('solutions.process.steps.1.body') },
  { key: '03', index: t('solutions.process.steps.2.index'), title: t('solutions.process.steps.2.title'), body: t('solutions.process.steps.2.body') },
  { key: '04', index: t('solutions.process.steps.3.index'), title: t('solutions.process.steps.3.title'), body: t('solutions.process.steps.3.body') }
])

/**
 * Use cases
 */
const useCases = computed(() => [
  {
    key: 'education',
    title: t('solutions.usecases.cards.0.title'),
    subtitle: t('solutions.usecases.cards.0.subtitle'),
    items: [
      t('solutions.usecases.cards.0.items.0'),
      t('solutions.usecases.cards.0.items.1'),
      t('solutions.usecases.cards.0.items.2')
    ].filter(Boolean)
  },
  {
    key: 'research',
    title: t('solutions.usecases.cards.1.title'),
    subtitle: t('solutions.usecases.cards.1.subtitle'),
    items: [
      t('solutions.usecases.cards.1.items.0'),
      t('solutions.usecases.cards.1.items.1'),
      t('solutions.usecases.cards.1.items.2')
    ].filter(Boolean)
  },
  {
    key: 'orgs',
    title: t('solutions.usecases.cards.2.title'),
    subtitle: t('solutions.usecases.cards.2.subtitle'),
    items: [
      t('solutions.usecases.cards.2.items.0'),
      t('solutions.usecases.cards.2.items.1'),
      t('solutions.usecases.cards.2.items.2')
    ].filter(Boolean)
  },
  {
    key: 'authors',
    title: t('solutions.usecases.cards.3.title'),
    subtitle: t('solutions.usecases.cards.3.subtitle'),
    items: [
      t('solutions.usecases.cards.3.items.0'),
      t('solutions.usecases.cards.3.items.1'),
      t('solutions.usecases.cards.3.items.2')
    ].filter(Boolean)
  }
])

/**
 * Reveal on scroll (copie Home pour être certain)
 */
let io
onMounted(() => {
  if (!import.meta.client) return

  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
  const els = Array.from(document.querySelectorAll('.js-reveal'))

  if (reduce) {
    els.forEach((el) => el.classList.add('is-revealed'))
    return
  }

  io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed')
          io.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  )

  els.forEach((el, idx) => {
    el.style.setProperty('--reveal-delay', `${Math.min(idx * 40, 240)}ms`)
    io.observe(el)
  })
})

onBeforeUnmount(() => {
  if (io) io.disconnect()
})

/**
 * SEO (i18n)
 */
useHead(() => ({
  title: t('solutions.seo.title'),
  meta: [
    { name: 'description', content: t('solutions.seo.description') },
    { property: 'og:title', content: t('solutions.seo.title') },
    { property: 'og:description', content: t('solutions.seo.description') }
  ]
}))
</script>

<style scoped>
/* Hero: même esprit que Home/Studio */
.solutions-hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 2.2fr) minmax(0, 1.4fr);
  gap: var(--bm-space-xl);
  align-items: start;
}
@media (max-width: 980px) {
  .solutions-hero-grid {
    grid-template-columns: 1fr;
  }
}
.solutions-hero-subtitle {
  max-width: 46rem;
}

/* Aside list */
.solutions-hero-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.95rem;
}
.solutions-hero-list-label {
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--bm-color-text-muted);
}

/* Cards grids (responsive premium) */
.solutions-grid {
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

/* Lists in cards */
.solutions-list {
  margin: 0.75rem 0 0;
  padding-left: 1.1rem;
  display: grid;
  gap: 0.35rem;
  line-height: 1.45;
  color: var(--bm-color-text-soft);
}

/* Steps (calqué sur Pipeline / Studio) */
.solutions-steps {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 1rem;
}

.solutions-step {
  display: flex;
  align-items: flex-start;
  gap: 0.9rem;
}

.solutions-step-index {
  flex: 0 0 auto;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.85rem;
  background: rgba(148, 163, 184, 0.22);
  color: var(--bm-color-text-soft);
  margin-top: 0.15rem;
}

:global(:root[data-theme="light"]) .solutions-step-index {
  background: rgba(15, 23, 42, 0.06);
  color: rgba(15, 23, 42, 0.72);
}

.solutions-step-body {
  flex: 1 1 auto;
  display: grid;
  gap: 0.35rem;
}

/* CTA layout */
.solutions-cta-card {
  max-width: 56rem;
  margin: 0 auto;
}

.solutions-cta-content {
  display: flex;
  flex-direction: column;
  gap: var(--bm-space-lg);
}

@media (min-width: 860px) {
  .solutions-cta-content {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
