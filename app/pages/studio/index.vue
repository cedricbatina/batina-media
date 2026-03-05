<template>
  <div class="bm-stack-page studio-page">
    <!-- HERO -->
    <section class="bm-section studio-hero" aria-labelledby="studio-hero-title">
      <div class="studio-hero-grid">
        <div class="studio-hero-main bm-stack-sm">
          <span class="bm-pill bm-pill-soft bm-reveal" style="animation-delay: 0ms">
            {{ t('studio.hero.label') }}
          </span>

          <h1 id="studio-hero-title" class="bm-heading-hero bm-reveal" style="animation-delay: 60ms">
            <span class="bm-gradient-text">
              {{ t('studio.hero.title') }}
            </span>
          </h1>

          <p class="bm-text-soft studio-hero-subtitle bm-reveal" style="animation-delay: 120ms">
            {{ t('studio.hero.subtitle') }}
          </p>
        </div>

        <aside class="bm-card bm-ease js-reveal studio-hero-aside" aria-label="Studio overview">
          <div class="bm-card-header">
            <div>
              <p class="bm-pill bm-pill-muted">
                {{ t('studio.hero.aside.label') || t('studio.hero.label') }}
              </p>
              <p class="bm-card-title bm-title-h3">
                {{ t('studio.hero.aside.title') }}
              </p>
            </div>
          </div>

          <!-- Option A: list (if translations exist) -->
          <ul v-if="asideItems.length" class="studio-hero-list">
            <li v-for="item in asideItems" :key="item.key">
              <p class="studio-hero-list-label">{{ item.label }}</p>
              <p class="studio-hero-list-value bm-text-soft">{{ item.value }}</p>
            </li>
          </ul>

          <!-- Option B: single paragraph -->
          <p v-else class="bm-card-subtitle">
            {{ t('studio.hero.aside.body') }}
          </p>
        </aside>
      </div>
    </section>

    <!-- POSITION -->
    <section class="bm-section" aria-labelledby="studio-position-title">
      <div class="bm-stack-lg">
        <header class="bm-stack-sm bm-section-header js-reveal">
          <p class="bm-pill bm-pill-muted">
            {{ t('studio.position.label') }}
          </p>
          <h2 id="studio-position-title" class="bm-heading-2 bm-title-h2">
            {{ t('studio.position.title') }}
          </h2>
          <p class="bm-text-soft">
            {{ t('studio.position.subtitle') }}
          </p>
        </header>

        <div class="bm-grid bm-grid-3">
          <article class="bm-card bm-card-compact bm-ease js-reveal">
            <h3 class="bm-card-title bm-title-h3">
              {{ t('studio.position.blocks.weAre.title') }}
            </h3>
            <p class="bm-card-subtitle">
              {{ t('studio.position.blocks.weAre.body') }}
            </p>
          </article>

          <article class="bm-card bm-card-compact bm-ease js-reveal">
            <h3 class="bm-card-title bm-title-h3">
              {{ t('studio.position.blocks.weDo.title') }}
            </h3>
            <ul class="studio-list">
              <li v-for="item in weDoItems" :key="item">{{ item }}</li>
            </ul>
          </article>

          <article class="bm-card bm-card-compact bm-ease js-reveal">
            <h3 class="bm-card-title bm-title-h3">
              {{ t('studio.position.blocks.weCare.title') }}
            </h3>
            <ul class="studio-list">
              <li v-for="item in weCareItems" :key="item">{{ item }}</li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <!-- METHODE -->
    <section class="bm-section" aria-labelledby="studio-method-title">
      <div class="bm-stack-lg">
        <header class="bm-stack-sm bm-section-header js-reveal">
          <p class="bm-pill bm-pill-muted">
            {{ t('studio.method.label') }}
          </p>
          <h2 id="studio-method-title" class="bm-heading-2 bm-title-h2">
            {{ t('studio.method.title') }}
          </h2>
          <p class="bm-text-soft">
            {{ t('studio.method.subtitle') }}
          </p>
        </header>

        <ol class="studio-method-grid">
          <li
            v-for="step in methodSteps"
            :key="step.key"
            class="studio-method-item bm-card bm-card-compact bm-ease js-reveal"
          >
            <div class="studio-method-index" aria-hidden="true">
              {{ step.index }}
            </div>
            <div class="studio-method-content">
              <h3 class="bm-card-title bm-title-h3">{{ step.title }}</h3>
              <p class="bm-card-subtitle">{{ step.body }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <!-- TECH -->
    <section class="bm-section" aria-labelledby="studio-tech-title">
      <div class="bm-stack-lg">
        <header class="bm-stack-sm bm-section-header js-reveal">
          <p class="bm-pill bm-pill-muted">
            {{ t('studio.tech.label') }}
          </p>
          <h2 id="studio-tech-title" class="bm-heading-2 bm-title-h2">
            {{ t('studio.tech.title') }}
          </h2>
          <p class="bm-text-soft">
            {{ t('studio.tech.subtitle') }}
          </p>
        </header>

        <div class="bm-grid bm-grid-3">
          <article class="bm-card bm-card-compact bm-ease js-reveal">
            <h3 class="bm-card-title bm-title-h3">
              {{ t('studio.tech.blocks.stackWeb.title') }}
            </h3>
            <p class="bm-card-subtitle">
              {{ t('studio.tech.blocks.stackWeb.body') }}
            </p>
          </article>

          <article class="bm-card bm-card-compact bm-ease js-reveal">
            <h3 class="bm-card-title bm-title-h3">
              {{ t('studio.tech.blocks.stackData.title') }}
            </h3>
            <p class="bm-card-subtitle">
              {{ t('studio.tech.blocks.stackData.body') }}
            </p>
          </article>

          <article class="bm-card bm-card-compact bm-ease js-reveal">
            <h3 class="bm-card-title bm-title-h3">
              {{ t('studio.tech.blocks.stackDerivatives.title') }}
            </h3>
            <p class="bm-card-subtitle">
              {{ t('studio.tech.blocks.stackDerivatives.body') }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <!-- COLLAB -->
    <section class="bm-section" aria-labelledby="studio-collab-title">
      <div class="bm-stack-lg">
        <header class="bm-stack-sm bm-section-header js-reveal">
          <p class="bm-pill bm-pill-muted">
            {{ t('studio.collab.label') }}
          </p>
          <h2 id="studio-collab-title" class="bm-heading-2 bm-title-h2">
            {{ t('studio.collab.title') }}
          </h2>
          <p class="bm-text-soft">
            {{ t('studio.collab.subtitle') }}
          </p>
        </header>

        <div class="bm-grid bm-grid-3">
          <article
            v-for="item in collabItems"
            :key="item.key"
            class="bm-card bm-card-compact bm-ease js-reveal"
          >
            <h3 class="bm-card-title bm-title-h3">{{ item.title }}</h3>
            <p class="bm-card-subtitle">{{ item.body }}</p>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount } from 'vue'
import { useHead, useSeoMeta } from '#imports'
import { useI18n } from 'vue-i18n'

const { t, te } = useI18n()

const tx = (key) => (te(key) ? t(key) : '')

/**
 * HERO – aside (optional list if you add translations later)
 * Keys expected (optional):
 * - studio.hero.aside.items.0.label / value
 * - studio.hero.aside.items.1.label / value
 * - studio.hero.aside.items.2.label / value
 */
const asideItems = computed(() => {
  const items = [0, 1, 2]
    .map((i) => {
      const label = tx(`studio.hero.aside.items.${i}.label`)
      const value = tx(`studio.hero.aside.items.${i}.value`)
      if (!label || !value) return null
      return { key: `a${i}`, label, value }
    })
    .filter(Boolean)

  return items
})

const weDoItems = computed(() =>
  [
    tx('studio.position.blocks.weDo.items.0'),
    tx('studio.position.blocks.weDo.items.1'),
    tx('studio.position.blocks.weDo.items.2'),
    tx('studio.position.blocks.weDo.items.3')
  ].filter(Boolean)
)

const weCareItems = computed(() =>
  [
    tx('studio.position.blocks.weCare.items.0'),
    tx('studio.position.blocks.weCare.items.1'),
    tx('studio.position.blocks.weCare.items.2')
  ].filter(Boolean)
)

const methodSteps = computed(() => [
  {
    key: 'listen-map',
    index: t('studio.method.steps.0.index'),
    title: t('studio.method.steps.0.title'),
    body: t('studio.method.steps.0.body')
  },
  {
    key: 'model-structure',
    index: t('studio.method.steps.1.index'),
    title: t('studio.method.steps.1.title'),
    body: t('studio.method.steps.1.body')
  },
  {
    key: 'build-systems',
    index: t('studio.method.steps.2.index'),
    title: t('studio.method.steps.2.title'),
    body: t('studio.method.steps.2.body')
  },
  {
    key: 'extend-derivatives',
    index: t('studio.method.steps.3.index'),
    title: t('studio.method.steps.3.title'),
    body: t('studio.method.steps.3.body')
  }
])

const collabItems = computed(() => [
  { key: 'projects-initiatives', title: t('studio.collab.items.0.title'), body: t('studio.collab.items.0.body') },
  { key: 'research', title: t('studio.collab.items.1.title'), body: t('studio.collab.items.1.body') },
  { key: 'publishing', title: t('studio.collab.items.2.title'), body: t('studio.collab.items.2.body') },
  { key: 'orgs', title: t('studio.collab.items.3.title'), body: t('studio.collab.items.3.body') }
])

/**
 * Reveal on scroll (same mechanic as Home)
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

useHead(() => ({
  title: t('studio.seo.title')
}))

useSeoMeta({
  description: () => t('studio.seo.description'),
  ogTitle: () => t('studio.seo.title'),
  ogDescription: () => t('studio.seo.description'),
  twitterTitle: () => t('studio.seo.title'),
  twitterDescription: () => t('studio.seo.description')
})
</script>

<style scoped>
/* Reveal helper for this page only (mirrors Home) */
.js-reveal {
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 420ms ease, transform 420ms ease;
  transition-delay: var(--reveal-delay, 0ms);
}

.js-reveal.is-revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Micro hover lift (only where we used bm-ease) */
.bm-ease:hover {
  transform: translateY(-2px);
}

@media (hover: none) {
  .bm-ease:hover {
    transform: none;
  }
}

/* HERO grid (same rhythm as Home) */
.studio-hero {
  padding-top: 2.6rem;
}

.studio-hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 2.2fr) minmax(0, 1.4fr);
  gap: var(--bm-space-xl);
  align-items: start;
}

@media (max-width: 980px) {
  .studio-hero-grid {
    grid-template-columns: 1fr;
  }
}

.studio-hero-subtitle {
  max-width: 46rem;
}

/* HERO aside list (optional) */
.studio-hero-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.95rem;
}

.studio-hero-list li {
  display: grid;
  gap: 0.25rem;
}

.studio-hero-list-label {
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--bm-color-text-muted);
}

/* Lists: same cadence as Home */
.studio-list {
  margin: 0.65rem 0 0;
  padding-left: 1.1rem;
  display: grid;
  gap: 0.35rem;
  line-height: 1.45;
}

/* Method grid: mirrors Home pipeline layout */
.studio-method-grid {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 1rem;
}

@media (min-width: 900px) {
  .studio-method-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.1rem;
  }
}

.studio-method-item {
  margin: 0;
  display: flex;
  align-items: flex-start;
  gap: 0.9rem;
}

.studio-method-index {
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

:global(:root[data-theme="light"]) .studio-method-index {
  background: rgba(15, 23, 42, 0.06);
  color: rgba(15, 23, 42, 0.72);
}

.studio-method-content {
  flex: 1 1 auto;
  display: grid;
  gap: 0.35rem;
}
</style>
