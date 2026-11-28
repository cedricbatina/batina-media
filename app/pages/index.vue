<template>
 <div class="bm-stack-page bm-home-v2">

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

          <svg class="home-knowledge-diagram" viewBox="0 0 320 112" fill="none" aria-hidden="true">
            <g stroke="currentColor" stroke-width="1.2">
              <path v-for="y in [16,36,56,76,96]" :key="y" :d="`M12 ${y} C88 ${y} 104 56 160 56 S232 ${y} 308 ${y}`" />
            </g>
            <g fill="currentColor">
              <circle v-for="y in [16,36,56,76,96]" :key="'left-'+y" cx="12" :cy="y" r="3" />
              <circle v-for="y in [16,36,56,76,96]" :key="'right-'+y" cx="308" :cy="y" r="3" />
            </g>
            <circle cx="160" cy="56" r="24" fill="#132331" stroke="currentColor" />
            <path d="M160 40 L174 64 H146 Z" stroke="currentColor" stroke-width="2" />
          </svg>
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
            :data-project="project.key"
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
import { computed } from 'vue'
import { useHead, useSeoMeta } from '#imports'
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
 * SEO home
 */
useHead(() => ({
  title: t('home.seo.title')
}))

useSeoMeta({
  description: () => t('home.seo.description'),
  ogTitle: () => t('home.seo.title'),
  ogDescription: () => t('home.seo.description'),
  twitterTitle: () => t('home.seo.title'),
  twitterDescription: () => t('home.seo.description')
})
</script>

<style scoped>
.bm-home-v2 { --home-gold:#e5b967; --home-ink:#132331; --home-paper:#f4efe4; }
.bm-home-v2 .bm-section { padding-block: clamp(2rem,4vw,4rem); }
.home-hero-grid { display:grid; gap:clamp(1.5rem,4vw,4rem); align-items:center; grid-template-columns:minmax(0,1.35fr) minmax(0,1fr); }
.home-hero-main { min-width:0; }
.home-hero-pill { align-self:flex-start; max-width:100%; white-space:normal; }
.home-hero .bm-heading-hero { font-size:clamp(2rem,4.1vw,3.8rem); line-height:1.08; letter-spacing:-.04em; overflow-wrap:anywhere; }
.home-hero-ctas { flex-wrap:wrap; }
.home-hero-aside { min-width:0; padding:clamp(1.25rem,3vw,2rem); background:#132331; color:#f4efe4; border:1px solid #536575; border-top:3px solid var(--home-gold); border-radius:8px; }
.home-hero-aside :is(.bm-card-title,.bm-text-soft,.bm-pill-muted) { color:#f4efe4; }
.home-knowledge-diagram { display:block; width:100%; height:auto; margin:1.2rem 0; color:var(--home-gold); }
.home-hero-list { list-style:none; padding:0; margin:0; display:grid; gap:1rem; }
.home-hero-list li { padding-top:.8rem; border-top:1px solid #536575; }
.home-hero-list-label { color:var(--home-gold); font-size:.75rem; text-transform:uppercase; letter-spacing:.08em; }
.home-hero-list-value { margin:.3rem 0 0; }
.bm-text-soft,.bm-card-subtitle { line-height:1.6; }
.bm-home-v2 .bm-stack-lg { display:flex; flex-direction:column; gap:1.5rem; }
.bm-home-v2 .bm-stack-sm { display:flex; flex-direction:column; gap:.85rem; }
.home-domain-list { padding-inline-start:1.2rem; margin:.8rem 0 0; display:grid; gap:.4rem; }
.home-domains-grid,.home-projects-grid,.home-audience-grid,.home-pipeline-grid { display:grid; gap:1rem; align-items:stretch; }
.home-domains-grid { grid-template-columns:repeat(3,minmax(0,1fr)); }
.home-projects-grid,.home-audience-grid { grid-template-columns:repeat(2,minmax(0,1fr)); }
.home-pipeline-grid { list-style:none; padding:0; margin:0; grid-template-columns:repeat(4,minmax(0,1fr)); }
.home-domain-card,.home-project-card,.home-audience-card,.home-pipeline-item { min-width:0; padding:clamp(1rem,2vw,1.7rem); border-radius:8px; border-top:3px solid #b98c46; overflow-wrap:anywhere; }
.home-pipeline-item { display:flex; flex-direction:column; gap:1rem; background:var(--home-ink); color:var(--home-paper); }
.home-pipeline-item :is(.bm-card-title,.bm-card-subtitle) { color:var(--home-paper); }
.home-pipeline-index { font:400 2.4rem/1 Georgia,serif; color:var(--home-gold); }
.home-project-card { display:flex; flex-direction:column; background:#e9dfcc; color:#132331; }
.home-project-card:nth-child(even) { background:#d5e4e6; border-top-color:#447384; }
.home-project-card :is(.bm-card-title,.bm-card-subtitle,.home-project-tag,.home-project-meta) { color:#132331; }
.home-project-card .home-project-meta { margin-top:auto; padding-top:1rem; border-top:1px solid #89969a; }
.home-project-tag { text-transform:uppercase; letter-spacing:.07em; font-size:.75rem; }
.js-reveal { opacity:1; transform:none; }
@media(max-width:1050px) { .home-hero-grid { grid-template-columns:1fr; } .home-pipeline-grid { grid-template-columns:repeat(2,minmax(0,1fr)); } }
@media(max-width:720px) { .home-domains-grid,.home-projects-grid,.home-audience-grid,.home-pipeline-grid { grid-template-columns:1fr; } }
@media(prefers-reduced-motion:reduce) { .bm-home-v2 * { animation:none!important; transition:none!important; } }
</style>
