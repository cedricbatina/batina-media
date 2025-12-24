<template>
  <div class="bm-stack-lg">
    <!-- Header projets -->
    <section class="bm-section" aria-labelledby="projects-page-title">
      <div class="bm-stack-sm">
        <p class="bm-pill bm-pill-muted">
          {{ t('projects.label') }}
        </p>
        <h1 id="projects-page-title" class="bm-heading-1">
          {{ t('projects.title') }}
        </h1>
        <p class="bm-text-soft">
          {{ t('projects.subtitle') }}
        </p>
      </div>
    </section>

    <!-- Liste des projets -->
    <section class="bm-section" aria-label="Projets et écosystèmes">
      <div v-if="pending" class="projects-loading bm-text-soft">
        {{ t('projects.loading') }}
      </div>

      <div v-else-if="error" class="projects-error">
        <p class="bm-text-soft">
          {{ t('projects.error') }}
        </p>
      </div>

      <div v-else-if="!projects.length" class="projects-empty bm-text-soft">
        {{ t('projects.empty') || 'Aucun projet public pour le moment.' }}
      </div>

      <div v-else class="projects-wrapper">
        <!-- Grille de cartes -->
        <div class="bm-grid projects-grid">
          <article
            v-for="project in pagedProjects"
            :key="project.id"
            class="project-card"
          >
            <header class="project-card-header">
              <div class="project-card-header-main">
                <p v-if="project.shortLabel" class="project-card-kicker">
                  {{ project.shortLabel }}
                </p>
                <h2 class="project-card-title">
                  {{ project.name || project.code }}
                </h2>
                <p
                  v-if="project.oneLiner"
                  class="project-card-oneliner bm-text-soft"
                >
                  {{ project.oneLiner }}
                </p>
              </div>

              <p class="project-card-status">
                {{ statusLabel(project.status) }}
              </p>
            </header>

            <p
              v-if="project.description"
              class="project-card-description bm-text-soft"
            >
              {{ project.description }}
            </p>

            <!-- Tags -->
            <div
              v-if="project.tags && project.tags.length"
              class="project-card-tags"
            >
              <div
                v-for="tag in project.tags"
                :key="project.id + '-' + tag.id"
                class="project-tag"
                :data-category="tag.category"
              >
                {{ tag.label }}
              </div>
            </div>

            <!-- Tech summary -->
            <p
              v-if="project.techSummary"
              class="project-card-tech bm-text-muted"
            >
              {{ project.techSummary }}
            </p>

            <div class="project-card-divider" />

            <!-- Liens -->
            <div
              class="project-card-links bm-form-row-inline"
              v-if="project.mainUrl || (project.links && project.links.length)"
            >
              <a
                v-if="project.mainUrl"
                :href="project.mainUrl"
                target="_blank"
                rel="noopener"
                class="bm-btn bm-btn-primary bm-btn-sm"
              >
                {{ t('projects.actions.openProject') }}
              </a>

              <a
                v-for="link in (project.links || [])"
                :key="project.id + '-' + (link ? link.kind || 'link' : 'link') + '-' + (link ? link.url || '' : '')"
                v-if="link && link.url && link.url !== project.mainUrl"
                :href="link.url"
                target="_blank"
                rel="noopener"
                class="bm-btn bm-btn-outline bm-btn-sm project-card-link-secondary"
              >
                {{ (link && link.label) || t('projects.actions.openLink') }}
              </a>
            </div>

            <!-- Dérivés (placeholder pour future V2) -->
            <div
              v-if="project.derivatives && project.derivatives.length"
              class="project-card-derivatives bm-text-muted"
            >
              {{ t('projects.derivatives.preview', { count: project.derivatives.length }) }}
            </div>
          </article>
        </div>

        <!-- Pagination -->
        <Pagination
          class="projects-pagination"
          :current-page="currentPage"
          :total-pages="totalPages"
          :total-items="projects.length"
          :page-size="pageSize"
          :aria-label="t('projects.pagination.ariaLabel')"
          @pageChange="onPageChange"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useHead, useAsyncData } from '#imports'
import { useI18n } from 'vue-i18n'
import Pagination from '~/components/Pagination.vue'

const { t, locale } = useI18n()

const { data, pending, error } = await useAsyncData(
  'projects',
  () =>
    $fetch('/api/projects', {
      params: {
        locale: locale.value
      }
    })
)

const projects = computed(() => data.value || [])

// Pagination
const pageSize = 6
const currentPage = ref(1)

const totalPages = computed(() => {
  if (!projects.value.length) return 1
  return Math.ceil(projects.value.length / pageSize)
})

const pagedProjects = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return projects.value.slice(start, end)
})

const onPageChange = (page) => {
  currentPage.value = page
}

/**
 * Mapping des statuts pour l’affichage
 */
const statusLabel = (status) => {
  if (!status) return ''
  switch (status) {
    case 'prod':
      return t('projects.status.prod') // en production
    case 'beta':
      return t('projects.status.beta') // en beta
    case 'dev':
      return t('projects.status.dev') // en développement
    case 'archived':
      return t('projects.status.archived') // archivé
    default:
      return status
  }
}

/**
 * SEO page projets
 */
useHead(() => ({
  title: t('projects.seo.title'),
  meta: [
    {
      name: 'description',
      content: t('projects.seo.description')
    },
    {
      property: 'og:title',
      content: t('projects.seo.title')
    },
    {
      property: 'og:description',
      content: t('projects.seo.description')
    }
  ]
}))
</script>

<style scoped>
/* Wrapper global */
.projects-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--bm-space-xl);
}

/* Grille avec vraie respiration */
.projects-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 2.5rem;
}

@media (min-width: 800px) {
  .projects-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1200px) {
  .projects-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

/* Carte projet – fiche premium, pas “tarifs” */
.project-card {
  position: relative;
  padding: var(--bm-space-lg);
  border-radius: 1rem;
  background: rgba(7, 10, 18, 0.96);
  border: 1px solid rgba(255, 255, 255, 0.04);
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.65);
  display: flex;
  flex-direction: column;
  gap: var(--bm-space-sm);
  transition:
    transform 150ms ease,
    box-shadow 150ms ease,
    border-color 150ms ease,
    background 150ms ease;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 22px 44px rgba(0, 0, 0, 0.8);
  border-color: rgba(255, 255, 255, 0.12);
  background: rgba(10, 14, 24, 0.98);
}

/* kicker */
.project-card-kicker {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: 0.1rem;
  opacity: 0.85;
}

/* Header : nom + statut */
.project-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--bm-space-sm);
}

.project-card-header-main {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.project-card-title {
  font-size: 1.1rem;
  font-weight: 600;
}

.project-card-oneliner {
  font-size: 0.9rem;
}

/* Statut pill */
.project-card-status {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.2rem 0.65rem;
  border-radius: 999px;
  border: 1px solid var(--bm-color-accent-soft);
  background: rgba(0, 0, 0, 0.4);
  color: var(--bm-color-accent-soft);
  white-space: nowrap;
}

/* Description */
.project-card-description {
  margin-top: var(--bm-space-xs);
  margin-bottom: var(--bm-space-xs);
  line-height: 1.7;
}

/* Tags */
.project-card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.1rem;
  margin-bottom: var(--bm-space-xs);
}

.project-tag {
  padding: 0.15rem 0.6rem;
  border-radius: 999px;
  font-size: 0.78rem;
  border: 1px solid var(--bm-border-subtle);
  background: rgba(255, 255, 255, 0.03);
  color: var(--bm-text-soft);
}

/* Variation légère par catégorie */
.project-tag[data-category='tech'] {
  border-color: var(--bm-color-accent-soft);
}

.project-tag[data-category='domain'] {
  border-color: var(--bm-color-primary-soft);
}

.project-tag[data-category='sector'] {
  border-color: var(--bm-color-info-soft);
}

.project-card-tech {
  margin-top: 0.2rem;
  font-size: 0.84rem;
}

/* Séparateur avant les boutons */
.project-card-divider {
  height: 1px;
  margin-top: var(--bm-space-md);
  margin-bottom: var(--bm-space-xs);
  background: linear-gradient(
    to right,
    transparent,
    rgba(255, 255, 255, 0.18),
    transparent
  );
}

/* Boutons */
.project-card-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0;
}

.project-card-link-secondary {
  opacity: 0.95;
}

/* Dérivés */
.project-card-derivatives {
  margin-top: var(--bm-space-xs);
  font-size: 0.8rem;
  opacity: 0.8;
}

/* Etats globaux */
.projects-loading,
.projects-error,
.projects-empty {
  padding: var(--bm-space-md) 0;
}

/* Pagination sous la grille */
.projects-pagination {
  margin-top: var(--bm-space-sm);
}
</style>
