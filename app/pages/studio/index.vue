<template>
  <div class="bm-stack-lg">
    <!-- HERO -->
    <section
      class="bm-section studio-hero"
      aria-labelledby="studio-hero-title"
    >
      <div class="studio-hero-inner">
        <div class="bm-stack-sm">
          <p class="bm-pill bm-pill-muted">
            {{ t('studio.hero.label') }}
          </p>

          <h1 id="studio-hero-title" class="bm-heading-1">
            {{ t('studio.hero.title') }}
          </h1>

          <p class="bm-text-soft studio-hero-subtitle">
            {{ t('studio.hero.subtitle') }}
          </p>
        </div>

        <!-- Carte intro à droite, même logique que la home -->
        <aside class="studio-hero-aside bm-card" aria-label="Studio overview">
          <h2 class="bm-card-title">
            {{ t('studio.hero.aside.title') }}
          </h2>
          <p class="bm-card-subtitle bm-text-soft">
            {{ t('studio.hero.aside.body') }}
          </p>
        </aside>
      </div>
    </section>

    <!-- IDENTITÉ / POSITIONNEMENT -->
    <section
      class="bm-section studio-section"
      aria-labelledby="studio-position-title"
    >
      <div class="bm-stack-lg">
        <div class="bm-stack-sm studio-section-header">
          <p class="bm-pill bm-pill-muted">
            {{ t('studio.position.label') }}
          </p>
          <h2 id="studio-position-title" class="bm-heading-2">
            {{ t('studio.position.title') }}
          </h2>
          <p class="bm-text-soft">
            {{ t('studio.position.subtitle') }}
          </p>
        </div>

        <div class="bm-grid studio-position-grid">
          <!-- Ce que nous sommes -->
          <article class="bm-card bm-card-compact studio-card">
            <h3 class="bm-card-title">
              {{ t('studio.position.blocks.weAre.title') }}
            </h3>
            <p class="bm-card-subtitle bm-text-soft">
              {{ t('studio.position.blocks.weAre.body') }}
            </p>
          </article>

          <!-- Ce que nous faisons -->
          <article class="bm-card bm-card-compact studio-card">
            <h3 class="bm-card-title">
              {{ t('studio.position.blocks.weDo.title') }}
            </h3>
            <ul class="studio-list">
              <li v-for="item in weDoItems" :key="item">
                {{ item }}
              </li>
            </ul>
          </article>

          <!-- Ce à quoi nous tenons -->
          <article class="bm-card bm-card-compact studio-card">
            <h3 class="bm-card-title">
              {{ t('studio.position.blocks.weCare.title') }}
            </h3>
            <ul class="studio-list">
              <li v-for="item in weCareItems" :key="item">
                {{ item }}
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <!-- FAÇON DE TRAVAILLER -->
    <section
      class="bm-section studio-section"
      aria-labelledby="studio-method-title"
    >
      <div class="bm-stack-lg">
        <div class="bm-stack-sm studio-section-header">
          <p class="bm-pill bm-pill-muted">
            {{ t('studio.method.label') }}
          </p>
          <h2 id="studio-method-title" class="bm-heading-2">
            {{ t('studio.method.title') }}
          </h2>
          <p class="bm-text-soft">
            {{ t('studio.method.subtitle') }}
          </p>
        </div>

        <ol class="bm-grid studio-method-grid">
          <li
            v-for="step in methodSteps"
            :key="step.key"
            class="bm-card bm-card-compact studio-method-card"
          >
            <div class="studio-method-index">
              {{ step.index }}
            </div>
            <div class="studio-method-content">
              <h3 class="bm-card-title">
                {{ step.title }}
              </h3>
              <p class="bm-card-subtitle bm-text-soft">
                {{ step.body }}
              </p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <!-- TECH / OUTILS -->
    <section
      class="bm-section studio-section"
      aria-labelledby="studio-tech-title"
    >
      <div class="bm-stack-lg">
        <div class="bm-stack-sm studio-section-header">
          <p class="bm-pill bm-pill-muted">
            {{ t('studio.tech.label') }}
          </p>
          <h2 id="studio-tech-title" class="bm-heading-2">
            {{ t('studio.tech.title') }}
          </h2>
          <p class="bm-text-soft">
            {{ t('studio.tech.subtitle') }}
          </p>
        </div>

        <div class="bm-grid studio-tech-grid">
          <article class="bm-card bm-card-compact studio-card">
            <h3 class="bm-card-title">
              {{ t('studio.tech.blocks.stackWeb.title') }}
            </h3>
            <p class="bm-card-subtitle bm-text-soft">
              {{ t('studio.tech.blocks.stackWeb.body') }}
            </p>
          </article>

          <article class="bm-card bm-card-compact studio-card">
            <h3 class="bm-card-title">
              {{ t('studio.tech.blocks.stackData.title') }}
            </h3>
            <p class="bm-card-subtitle bm-text-soft">
              {{ t('studio.tech.blocks.stackData.body') }}
            </p>
          </article>

          <article class="bm-card bm-card-compact studio-card">
            <h3 class="bm-card-title">
              {{ t('studio.tech.blocks.stackDerivatives.title') }}
            </h3>
            <p class="bm-card-subtitle bm-text-soft">
              {{ t('studio.tech.blocks.stackDerivatives.body') }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <!-- COLLABORATIONS / PUBLICS -->
    <section
      class="bm-section studio-section"
      aria-labelledby="studio-collab-title"
    >
      <div class="bm-stack-lg">
        <div class="bm-stack-sm studio-section-header">
          <p class="bm-pill bm-pill-muted">
            {{ t('studio.collab.label') }}
          </p>
          <h2 id="studio-collab-title" class="bm-heading-2">
            {{ t('studio.collab.title') }}
          </h2>
          <p class="bm-text-soft">
            {{ t('studio.collab.subtitle') }}
          </p>
        </div>

        <div class="bm-grid studio-collab-grid">
          <article
            v-for="item in collabItems"
            :key="item.key"
            class="bm-card bm-card-compact studio-card"
          >
            <h3 class="bm-card-title">
              {{ item.title }}
            </h3>
            <p class="bm-card-subtitle bm-text-soft">
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
 * Blocs "Ce que nous faisons"
 */
const weDoItems = computed(() =>
  [
    t('studio.position.blocks.weDo.items.0'),
    t('studio.position.blocks.weDo.items.1'),
    t('studio.position.blocks.weDo.items.2'),
    t('studio.position.blocks.weDo.items.3')
  ].filter(Boolean)
)

/**
 * Blocs "Ce à quoi nous tenons"
 */
const weCareItems = computed(() =>
  [
    t('studio.position.blocks.weCare.items.0'),
    t('studio.position.blocks.weCare.items.1'),
    t('studio.position.blocks.weCare.items.2')
  ].filter(Boolean)
)

/**
 * Étapes méthode
 */
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

/**
 * Publics / collaborations
 */
const collabItems = computed(() => [
  {
    key: 'projects-initiatives',
    title: t('studio.collab.items.0.title'),
    body: t('studio.collab.items.0.body')
  },
  {
    key: 'research',
    title: t('studio.collab.items.1.title'),
    body: t('studio.collab.items.1.body')
  },
  {
    key: 'publishing',
    title: t('studio.collab.items.2.title'),
    body: t('studio.collab.items.2.body')
  },
  {
    key: 'orgs',
    title: t('studio.collab.items.3.title'),
    body: t('studio.collab.items.3.body')
  }
])

/**
 * SEO page studio
 */
useHead(() => ({
  title: t('studio.seo.title'),
  meta: [
    {
      name: 'description',
      content: t('studio.seo.description')
    },
    {
      property: 'og:title',
      content: t('studio.seo.title')
    },
    {
      property: 'og:description',
      content: t('studio.seo.description')
    }
  ]
}))
</script>

<style scoped>
/* HERO */
.studio-hero {
  padding-top: 4rem; /* un peu plus que les autres sections */
}

.studio-hero-inner {
  display: grid;
  grid-template-columns: minmax(0, 2.3fr) minmax(0, 1.5fr);
  gap: 2.5rem;
  align-items: flex-start;
}

.studio-hero-subtitle {
  max-width: 44rem;
}

.studio-hero-aside {
  align-self: stretch;
}

/* En-têtes de sections studio : un peu d’air */
.studio-section-header {
  max-width: 52rem;
  margin-bottom: 1.75rem;
}

/* GRILLES : on s’appuie sur .bm-grid pour le gap, on règle juste les colonnes + marges */
.studio-position-grid,
.studio-tech-grid,
.studio-collab-grid {
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

/* un léger espace au-dessus des grilles pour respirer */
.studio-position-grid,
.studio-method-grid,
.studio-tech-grid,
.studio-collab-grid {
  margin-top: 0.75rem;
}

/* CARDS : on étend la bm-card, on ne casse pas son padding/radius */
.studio-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
}

/* Listes à puces dans les cards */
.studio-list {
  margin-top: 0.4rem;
  padding-left: 1.1rem;
  display: grid;
  gap: 0.3rem;
  font-size: 0.95rem;
}

/* MÉTHODE : cards horizontales avec index à gauche */
.studio-method-grid {
  list-style: none;
  padding: 0;
  margin: 0.75rem 0 0;
}

.studio-method-card {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 1rem;
}

.studio-method-index {
  flex: 0 0 auto;
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
  background: rgba(148, 163, 184, 0.2);
  color: var(--bm-color-text-soft);
  margin-top: 0.15rem;
}

.studio-method-content {
  flex: 1 1 auto;
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .studio-hero-inner {
    grid-template-columns: minmax(0, 1fr);
  }

  .studio-hero {
    padding-top: 3.2rem;
  }
}
</style>
