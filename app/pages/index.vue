<template>
  <div class="bm-stack-lg">
    <!-- HERO -->
    <section class="bm-section home-hero" aria-labelledby="home-hero-title">
      <div class="home-hero-grid">
        <div class="home-hero-main bm-stack">
          <span class="bm-pill bm-pill-soft home-hero-pill">
            {{ t('home.hero.pill') }}
          </span>

          <h1 id="home-hero-title" class="bm-heading-hero">
            <span class="bm-gradient-text">
              {{ t('home.hero.title.highlight') }}
            </span>
            <br />
            <span>{{ t('home.hero.title.rest') }}</span>
          </h1>

          <p class="bm-text-soft home-hero-subtitle">
            {{ t('home.hero.subtitle') }}
          </p>

          <div class="bm-form-row-inline home-hero-ctas">
            <NuxtLink to="/contact" class="bm-btn bm-btn-primary">
              {{ t('home.hero.primaryCta') }}
            </NuxtLink>

            <NuxtLink to="/projects" class="bm-btn bm-btn-outline">
              {{ t('home.hero.secondaryCta') }}
            </NuxtLink>
          </div>

          <p class="home-hero-meta bm-text-muted">
            {{ t('home.hero.meta') }}
          </p>
        </div>

        <!-- Aside hero -->
        <aside class="home-hero-aside bm-card" aria-label="Studio snapshot">
          <div class="bm-card-header">
            <div>
              <p class="bm-pill bm-pill-muted home-hero-aside-pill">
                {{ t('home.hero.aside.label') }}
              </p>
              <p class="bm-card-title">
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
    <section class="bm-section" aria-labelledby="home-domains-title">
      <div class="bm-stack-lg">
        <div class="bm-stack-sm">
          <p class="bm-pill bm-pill-muted">
            {{ t('home.domains.label') }}
          </p>
          <h2 id="home-domains-title" class="bm-heading-1">
            {{ t('home.domains.title') }}
          </h2>
          <p class="bm-text-soft">
            {{ t('home.domains.subtitle') }}
          </p>
        </div>

        <div class="bm-grid bm-grid-3 home-domains-grid">
          <!-- Produits de savoirs -->
          <article class="bm-card bm-card-compact home-domain-card">
            <h3 class="bm-card-title">
              {{ t('home.domains.knowledge.title') }}
            </h3>
            <p class="bm-card-subtitle">
              {{ t('home.domains.knowledge.subtitle') }}
            </p>
            <ul class="home-domain-list">
              <li
                v-for="item in domainsKnowledgeItems"
                :key="item"
              >
                {{ item }}
              </li>
            </ul>
          </article>

          <!-- Plateformes & outils digitaux -->
          <article class="bm-card bm-card-compact home-domain-card">
            <h3 class="bm-card-title">
              {{ t('home.domains.platforms.title') }}
            </h3>
            <p class="bm-card-subtitle">
              {{ t('home.domains.platforms.subtitle') }}
            </p>
            <ul class="home-domain-list">
              <li
                v-for="item in domainsPlatformsItems"
                :key="item"
              >
                {{ item }}
              </li>
            </ul>
          </article>

          <!-- Jeux, puzzles & édition -->
          <article class="bm-card bm-card-compact home-domain-card">
            <h3 class="bm-card-title">
              {{ t('home.domains.gamesPublishing.title') }}
            </h3>
            <p class="bm-card-subtitle">
              {{ t('home.domains.gamesPublishing.subtitle') }}
            </p>
            <ul class="home-domain-list">
              <li
                v-for="item in domainsGamesPublishingItems"
                :key="item"
              >
                {{ item }}
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <!-- PIPELINE -->
    <section class="bm-section" aria-labelledby="home-pipeline-title">
      <div class="bm-stack-lg">
        <div class="bm-stack-sm">
          <p class="bm-pill bm-pill-muted">
            {{ t('home.pipeline.label') }}
          </p>
          <h2 id="home-pipeline-title" class="bm-heading-2">
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
            class="home-pipeline-item bm-card bm-card-compact"
          >
            <div class="home-pipeline-index">
              {{ step.index }}
            </div>
            <div class="home-pipeline-content">
              <h3 class="bm-card-title">
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

    <!-- PROJETS / ÉCOSYSTÈMES -->
    <section class="bm-section" aria-labelledby="home-projects-title">
      <div class="bm-stack-lg">
        <div class="bm-stack-sm">
          <p class="bm-pill bm-pill-muted">
            {{ t('home.projects.label') }}
          </p>
          <h2 id="home-projects-title" class="bm-heading-2">
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
            class="bm-card bm-card-compact home-project-card"
          >
            <p class="home-project-tag">
              {{ project.tag }}
            </p>
            <h3 class="bm-card-title">
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
    <section class="bm-section" aria-labelledby="home-audience-title">
      <div class="bm-stack-lg">
        <div class="bm-stack-sm">
          <p class="bm-pill bm-pill-muted">
            {{ t('home.audience.label') }}
          </p>
          <h2 id="home-audience-title" class="bm-heading-2">
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
            class="bm-card bm-card-compact home-audience-card"
          >
            <h3 class="bm-card-title">
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
import { computed } from 'vue'
import { useHead } from '#imports'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

/**
 * HERO – aside : plateformes / solutions / clients
 */
const asideItems = computed(() => [
  {
    key: 'platforms',
    label: t('home.hero.aside.items.platforms.label'),
    value: t('home.hero.aside.items.platforms.value')
  },
  {
    key: 'solutions',
    label: t('home.hero.aside.items.solutions.label'),
    value: t('home.hero.aside.items.solutions.value')
  },
  {
    key: 'audience',
    label: t('home.hero.aside.items.audience.label'),
    value: t('home.hero.aside.items.audience.value')
  }
])

/**
 * DOMAINES / OFFRES
 * On lit chaque ligne avec t('...items.0'), t('...items.1'), etc.
 */
const domainsKnowledgeItems = computed(() =>
  [
    t('home.domains.knowledge.items.0'),
    t('home.domains.knowledge.items.1'),
    t('home.domains.knowledge.items.2')
  ].filter(Boolean)
)

const domainsPlatformsItems = computed(() =>
  [
    t('home.domains.platforms.items.0'),
    t('home.domains.platforms.items.1'),
    t('home.domains.platforms.items.2')
  ].filter(Boolean)
)

const domainsGamesPublishingItems = computed(() =>
  [
    t('home.domains.gamesPublishing.items.0'),
    t('home.domains.gamesPublishing.items.1'),
    t('home.domains.gamesPublishing.items.2')
  ].filter(Boolean)
)

/**
 * PIPELINE – étapes
 */
const pipelineSteps = computed(() => [
  {
    key: 'data',
    index: t('home.pipeline.steps.0.index'),
    title: t('home.pipeline.steps.0.title'),
    body: t('home.pipeline.steps.0.body')
  },
  {
    key: 'model',
    index: t('home.pipeline.steps.1.index'),
    title: t('home.pipeline.steps.1.title'),
    body: t('home.pipeline.steps.1.body')
  },
  {
    key: 'platforms',
    index: t('home.pipeline.steps.2.index'),
    title: t('home.pipeline.steps.2.title'),
    body: t('home.pipeline.steps.2.body')
  },
  {
    key: 'derivatives',
    index: t('home.pipeline.steps.3.index'),
    title: t('home.pipeline.steps.3.title'),
    body: t('home.pipeline.steps.3.body')
  }
])

/**
 * PROJETS
 */
const projects = computed(() => [
  {
    key: 'longoka',
    tag: t('home.projects.items.0.tag'),
    name: t('home.projects.items.0.name'),
    description: t('home.projects.items.0.description'),
    meta: t('home.projects.items.0.meta')
  },
  {
    key: 'lexikongo',
    tag: t('home.projects.items.1.tag'),
    name: t('home.projects.items.1.name'),
    description: t('home.projects.items.1.description'),
    meta: t('home.projects.items.1.meta')
  },
  {
    key: 'lexilingala',
    tag: t('home.projects.items.2.tag'),
    name: t('home.projects.items.2.name'),
    description: t('home.projects.items.2.description'),
    meta: t('home.projects.items.2.meta')
  },
  {
    key: 'madizi',
    tag: t('home.projects.items.3.tag'),
    name: t('home.projects.items.3.name'),
    description: t('home.projects.items.3.description'),
    meta: t('home.projects.items.3.meta')
  }
])

/**
 * CIBLES / PUBLICS
 */
const audienceItems = computed(() => [
  {
    title: t('home.audience.items.0.title'),
    body: t('home.audience.items.0.body')
  },
  {
    title: t('home.audience.items.1.title'),
    body: t('home.audience.items.1.body')
  },
  {
    title: t('home.audience.items.2.title'),
    body: t('home.audience.items.2.body')
  },
  {
    title: t('home.audience.items.3.title'),
    body: t('home.audience.items.3.body')
  }
])

/**
 * SEO spécifique home (par-dessus SEO global app.vue)
 */
useHead(() => ({
  title: t('home.seo.title'),
  meta: [
    {
      name: 'description',
      content: t('home.seo.description')
    },
    {
      property: 'og:title',
      content: t('home.seo.title')
    },
    {
      property: 'og:description',
      content: t('home.seo.description')
    }
  ]
}))
</script>
