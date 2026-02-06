<template>
 <div class="bm-stack-page">

    <!-- HERO -->
    <section class="bm-section home-hero" aria-labelledby="home-hero-title">
      <div class="home-hero-grid">
        <div class="home-hero-main bm-stack-sm">
          <span class="bm-pill bm-pill-soft home-hero-pill bm-reveal" style="animation-delay: 0ms">
            {{ t('home.hero.pill') }}
          </span>

          <h1
            id="home-hero-title"
            class="bm-heading-hero bm-reveal"
            style="animation-delay: 60ms"
          >
            <span class="bm-gradient-text">
              {{ t('home.hero.title.highlight') }}
            </span>
            <br />
            <span>{{ t('home.hero.title.rest') }}</span>
          </h1>

          <p class="bm-text-soft home-hero-subtitle bm-reveal" style="animation-delay: 120ms">
            {{ t('home.hero.subtitle') }}
          </p>

          <div class="bm-form-row-inline home-hero-ctas bm-reveal" style="animation-delay: 180ms">
            <NuxtLink to="/contact" class="bm-btn bm-btn-primary bm-ease">
              {{ t('home.hero.primaryCta') }}
            </NuxtLink>

            <NuxtLink to="/projects" class="bm-btn bm-btn-outline bm-ease">
              {{ t('home.hero.secondaryCta') }}
            </NuxtLink>
          </div>

          <p class="home-hero-meta bm-text-muted bm-reveal" style="animation-delay: 240ms">
            {{ t('home.hero.meta') }}
          </p>
        </div>

        <!-- Aside hero -->
        <aside class="home-hero-aside bm-card bm-ease js-reveal" aria-label="Studio snapshot">
          <div class="bm-card-header">
            <div>
              <p class="bm-pill bm-pill-muted home-hero-aside-pill">
                {{ t('home.hero.aside.label') }}
              </p>
              <p class="bm-card-title bm-title-h3">
                {{ t('home.hero.aside.title') }}
              </p>
            </div>
          </div>

          <ul class="home-hero-list">
            <li v-for="item in asideItems" :key="item.key">
              <p class="home-hero-list-label">
                {{ item.label }}
              </p>
              <p class="home-hero-list-value bm-text-soft">
                {{ item.value }}
              </p>
            </li>
          </ul>
        </aside>
      </div>
    </section>

    <!-- DOMAINES / OFFRES -->
    <section class="bm-section js-reveal" aria-labelledby="home-domains-title">
      <div class="bm-stack-lg">
        <div class="bm-stack-sm">
          <p class="bm-pill bm-pill-muted">
            {{ t('home.domains.label') }}
          </p>
          <h2 id="home-domains-title" class="bm-heading-1 bm-title-h2">
            {{ t('home.domains.title') }}
          </h2>
          <p class="bm-text-soft">
            {{ t('home.domains.subtitle') }}
          </p>
        </div>

        <div class="bm-grid bm-grid-3 home-domains-grid">
          <article class="bm-card bm-card-compact home-domain-card bm-ease js-reveal">
            <h3 class="bm-card-title bm-title-h3">
              {{ t('home.domains.knowledge.title') }}
            </h3>
            <p class="bm-card-subtitle">
              {{ t('home.domains.knowledge.subtitle') }}
            </p>
            <ul class="home-domain-list">
              <li v-for="item in domainsKnowledgeItems" :key="item">
                {{ item }}
              </li>
            </ul>
          </article>

          <article class="bm-card bm-card-compact home-domain-card bm-ease js-reveal">
            <h3 class="bm-card-title bm-title-h3">
              {{ t('home.domains.platforms.title') }}
            </h3>
            <p class="bm-card-subtitle">
              {{ t('home.domains.platforms.subtitle') }}
            </p>
            <ul class="home-domain-list">
              <li v-for="item in domainsPlatformsItems" :key="item">
                {{ item }}
              </li>
            </ul>
          </article>

          <article class="bm-card bm-card-compact home-domain-card bm-ease js-reveal">
            <h3 class="bm-card-title bm-title-h3">
              {{ t('home.domains.gamesPublishing.title') }}
            </h3>
            <p class="bm-card-subtitle">
              {{ t('home.domains.gamesPublishing.subtitle') }}
            </p>
            <ul class="home-domain-list">
              <li v-for="item in domainsGamesPublishingItems" :key="item">
                {{ item }}
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <!-- PIPELINE -->
    <section class="bm-section js-reveal" aria-labelledby="home-pipeline-title">
      <div class="bm-stack-lg">
        <div class="bm-stack-sm">
          <p class="bm-pill bm-pill-muted">
            {{ t('home.pipeline.label') }}
          </p>
          <h2 id="home-pipeline-title" class="bm-heading-2 bm-title-h2">
            {{ t('home.pipeline.title') }}
          </h2>
          <p class="bm-text-soft">
            {{ t('home.pipeline.subtitle') }}
          </p>
        </div>

        <ol class="home-pipeline-grid">
          <li
            v-for="step in pipelineSteps"
            :key="step.key"
            class="home-pipeline-item bm-card bm-card-compact bm-ease js-reveal"
          >
            <div class="home-pipeline-index" aria-hidden="true">
              {{ step.index }}
            </div>
            <div class="home-pipeline-content">
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

    <!-- PROJETS -->
    <section class="bm-section js-reveal" aria-labelledby="home-projects-title">
      <div class="bm-stack-lg">
        <div class="bm-stack-sm">
          <p class="bm-pill bm-pill-muted">
            {{ t('home.projects.label') }}
          </p>
          <h2 id="home-projects-title" class="bm-heading-2 bm-title-h2">
            {{ t('home.projects.title') }}
          </h2>
          <p class="bm-text-soft">
            {{ t('home.projects.subtitle') }}
          </p>
        </div>

        <div class="bm-grid home-projects-grid">
          <article
            v-for="project in projects"
            :key="project.key"
            class="bm-card bm-card-compact home-project-card bm-ease js-reveal"
          >
            <p class="home-project-tag">
              {{ project.tag }}
            </p>
            <h3 class="bm-card-title bm-title-h3">
              {{ project.name }}
            </h3>
            <p class="bm-card-subtitle">
              {{ project.description }}
            </p>
            <p class="home-project-meta">
              {{ project.meta }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <!-- CIBLES -->
    <section class="bm-section js-reveal" aria-labelledby="home-audience-title">
      <div class="bm-stack-lg">
        <div class="bm-stack-sm">
          <p class="bm-pill bm-pill-muted">
            {{ t('home.audience.label') }}
          </p>
          <h2 id="home-audience-title" class="bm-heading-2 bm-title-h2">
            {{ t('home.audience.title') }}
          </h2>
          <p class="bm-text-soft">
            {{ t('home.audience.subtitle') }}
          </p>
        </div>

        <div class="bm-grid home-audience-grid">
          <article
            v-for="item in audienceItems"
            :key="item.title"
            class="bm-card bm-card-compact home-audience-card bm-ease js-reveal"
          >
            <h3 class="bm-card-title bm-title-h3">
              {{ item.title }}
            </h3>
            <p class="bm-card-subtitle">
              {{ item.body }}
            </p>
          </article>
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
 * HERO – aside
 */
const asideItems = computed(() => [
  { key: 'platforms', label: t('home.hero.aside.items.platforms.label'), value: t('home.hero.aside.items.platforms.value') },
  { key: 'solutions', label: t('home.hero.aside.items.solutions.label'), value: t('home.hero.aside.items.solutions.value') },
  { key: 'audience',  label: t('home.hero.aside.items.audience.label'),  value: t('home.hero.aside.items.audience.value') }
])

/**
 * DOMAINES
 */
const domainsKnowledgeItems = computed(() => [
  t('home.domains.knowledge.items.0'),
  t('home.domains.knowledge.items.1'),
  t('home.domains.knowledge.items.2')
].filter(Boolean))

const domainsPlatformsItems = computed(() => [
  t('home.domains.platforms.items.0'),
  t('home.domains.platforms.items.1'),
  t('home.domains.platforms.items.2')
].filter(Boolean))

const domainsGamesPublishingItems = computed(() => [
  t('home.domains.gamesPublishing.items.0'),
  t('home.domains.gamesPublishing.items.1'),
  t('home.domains.gamesPublishing.items.2')
].filter(Boolean))

/**
 * PIPELINE
 */
const pipelineSteps = computed(() => [
  { key: 'data',        index: t('home.pipeline.steps.0.index'), title: t('home.pipeline.steps.0.title'), body: t('home.pipeline.steps.0.body') },
  { key: 'model',       index: t('home.pipeline.steps.1.index'), title: t('home.pipeline.steps.1.title'), body: t('home.pipeline.steps.1.body') },
  { key: 'platforms',   index: t('home.pipeline.steps.2.index'), title: t('home.pipeline.steps.2.title'), body: t('home.pipeline.steps.2.body') },
  { key: 'derivatives', index: t('home.pipeline.steps.3.index'), title: t('home.pipeline.steps.3.title'), body: t('home.pipeline.steps.3.body') }
])

/**
 * PROJETS
 */
const projects = computed(() => [
  { key: 'longoka',    tag: t('home.projects.items.0.tag'), name: t('home.projects.items.0.name'), description: t('home.projects.items.0.description'), meta: t('home.projects.items.0.meta') },
  { key: 'lexikongo',  tag: t('home.projects.items.1.tag'), name: t('home.projects.items.1.name'), description: t('home.projects.items.1.description'), meta: t('home.projects.items.1.meta') },
  { key: 'lexilingala',tag: t('home.projects.items.2.tag'), name: t('home.projects.items.2.name'), description: t('home.projects.items.2.description'), meta: t('home.projects.items.2.meta') },
  { key: 'madizi',     tag: t('home.projects.items.3.tag'), name: t('home.projects.items.3.name'), description: t('home.projects.items.3.description'), meta: t('home.projects.items.3.meta') }
])

/**
 * CIBLES
 */
const audienceItems = computed(() => [
  { title: t('home.audience.items.0.title'), body: t('home.audience.items.0.body') },
  { title: t('home.audience.items.1.title'), body: t('home.audience.items.1.body') },
  { title: t('home.audience.items.2.title'), body: t('home.audience.items.2.body') },
  { title: t('home.audience.items.3.title'), body: t('home.audience.items.3.body') }
])

/**
 * Reveal on scroll (opt-in via .js-reveal)
 */
let io
onMounted(() => {
  if (!import.meta.client) return

  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
  const els = Array.from(document.querySelectorAll('.js-reveal'))

  if (reduce) {
    // no animations
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
 * SEO home
 */
useHead(() => ({
  title: t('home.seo.title'),
  meta: [
    { name: 'description', content: t('home.seo.description') },
    { property: 'og:title', content: t('home.seo.title') },
    { property: 'og:description', content: t('home.seo.description') }
  ]
}))
</script>

<style scoped>
/* Reveal helper for this page only */
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

/* Optional: avoid hover lift on touch */
@media (hover: none) {
  .bm-ease:hover {
    transform: none;
  }
}
/* =========================================
   HOME — spacing reset (desktop too airy)
   ========================================= */

/* 1) Réduire le padding vertical des sections sur Home uniquement */
.home-hero,
.bm-section {
  padding-block: 1.5rem; /* au lieu de ~3rem+ */
}

@media (min-width: 980px) {
  .home-hero
  {
    padding-block: 1rem; /* desktop: plus serré mais premium */
  }
}





/* 4) Typo: paragraphe long + listes dans cards => lisible sans faire "bloc énorme" */
.bm-text-soft,
.bm-card-subtitle {
  line-height: 1.55;
}

/* 5) Les listes dans tes cards doivent respirer MAIS pas “exploser” */
.home-domain-list {
  margin: 0.65rem 0 0;
  padding-left: 1.1rem;
  display: grid;
  gap: 0.35rem;
  line-height: 1.45;
}



/* 7) Projets / audience grids : éviter l’effet “trous” */
.home-projects-grid,
.home-audience-grid,
.home-domains-grid {
  margin-top: 0.75rem;
}

/* 8) Home hero : éviter la sensation de "section trop haute" */
.home-hero {
  padding-top: 2.6rem;
}

@media (min-width: 980px) {
  .home-hero {
    padding-top: 3rem;
  }
}

/* ==============================
   HOME — section rhythm (fix gaps)
   ============================== */






/* ==============================
   PIPELINE — cards spacing (fix “collés”)
   ============================== */

/* =========================================
   PIPELINE — grid spacing (no “collés”)
   ========================================= */
.home-pipeline-grid {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 1rem;
}

@media (min-width: 900px) {
  .home-pipeline-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.1rem;
  }
}

.home-pipeline-item {
  margin: 0;
  display: flex;
  align-items: flex-start;
  gap: 0.9rem;
}

.bm-section {
  padding-block: 2.4rem; /* premium, pas trop long */
}

@media (max-width: 640px) {
  .bm-section {
    padding-block: 2.1rem;
  }
}
.bm-stack-lg {
  display: flex;
  flex-direction: column;
  gap: 2.25rem; /* premium */
}

.bm-stack-sm {
  display: flex;
  flex-direction: column;
  gap: 0.85rem; /* un peu plus respirant que 0.75rem */
}
/* HERO aside: rythme lisible (En pratique + items) */
.home-hero-aside .bm-card-header {
  margin-bottom: 0.9rem;
}

.home-hero-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.95rem; /* espace entre Produits & plateformes / Solutions digitales / Pour qui ? */
}

.home-hero-list li {
  display: grid;
  gap: 0.25rem; /* label vs texte */
}

.home-hero-list-label {
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--bm-color-text-muted);
}
/* Reveal helper */
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

/* Micro hover lift */
.bm-ease:hover { transform: translateY(-2px); }
@media (hover: none) { .bm-ease:hover { transform: none; } }

/* HERO aside rhythm */
.home-hero-aside .bm-card-header { margin-bottom: 0.9rem; }
.home-hero-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.95rem;
}
.home-hero-list li { display: grid; gap: 0.25rem; }
.home-hero-list-label {
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--bm-color-text-muted);
}


</style>
