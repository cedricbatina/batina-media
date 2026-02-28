<template>
  <div class="bm-stack-page projects-page">
    <!-- HERO -->
    <section class="bm-section projects-hero" aria-labelledby="projects-page-title">
      <div class="projects-hero-grid">
        <div class="projects-hero-main bm-stack-sm">
          <span class="bm-pill bm-pill-soft bm-reveal" style="animation-delay: 0ms">
            {{ t('projects.label') }}
          </span>


        <h1 id="projects-page-title" class="bm-heading-hero bm-title-hero bm-reveal" style="animation-delay: 60ms">
  <span class="bm-gradient-text">
    {{ t('projects.title') }}
  </span>
</h1>


          <p class="bm-text-soft projects-hero-subtitle bm-reveal" style="animation-delay: 120ms">
            {{ t('projects.subtitle') }}
          </p>
        </div>

        <aside class="bm-card bm-card-compact bm-ease js-reveal projects-hero-aside" aria-label="Projects overview">
          <div class="bm-card-header">
            <div class="bm-stack-sm" style="gap: 0.5rem">
              <p class="bm-pill bm-pill-muted">
                {{ t('projects.hero.aside.label') }}
              </p>
              <p class="bm-card-title bm-title-h3">
                {{ t('projects.hero.aside.title') }}
              </p>
            </div>
          </div>

          <ul class="projects-hero-list">
            <li v-for="item in heroStats" :key="item.key" class="projects-hero-stat">
              <span class="projects-hero-stat-label">{{ item.label }}</span>
              <span class="projects-hero-stat-value">{{ item.value }}</span>
            </li>
          </ul>
        </aside>
      </div>
    </section>

    <!-- LISTE -->
    <section class="bm-section" aria-label="Projets et écosystèmes">
      <div v-if="pending" class="projects-state bm-text-soft">
        {{ t('projects.loading') }}
      </div>

      <div v-else-if="error" class="projects-state">
        <p class="bm-text-soft">
          {{ t('projects.error') }}
        </p>
      </div>

      <div v-else-if="!projects.length" class="projects-state bm-text-soft">
        {{ t('projects.empty') }}
      </div>

      <div v-else class="projects-wrapper">
        <header class="bm-stack-sm bm-section-header js-reveal">
          <p class="bm-pill bm-pill-muted">
            {{ t('projects.list.label') }}
          </p>
          <h2 class="bm-heading-2 bm-title-h2">
            {{ t('projects.list.title') }}
          </h2>
          <p class="bm-text-soft">
            {{ t('projects.list.subtitle') }}
          </p>
        </header>

        <div class="bm-grid bm-grid-3 projects-grid">
          <article
            v-for="project in pagedProjects"
            :key="project.id"
            class="bm-card bm-card-compact bm-ease js-reveal project-card"
          >
            <header class="project-card-header">
              <p v-if="project.shortLabel" class="project-kicker bm-text-muted">
                {{ project.shortLabel }}
              </p>

              <h3 class="bm-card-title bm-title-h3">
                {{ project.name || project.code }}
              </h3>

              <!-- ✅ STATUT SOUS LE TITRE -->
              <span
                v-if="project.status"
                class="bm-pill bm-pill-muted project-status"
                :data-status="project.status"
              >
                {{ statusLabel(project.status) }}
              </span>

              <p v-if="project.oneLiner" class="bm-card-subtitle">
                {{ project.oneLiner }}
              </p>
            </header>

            <p v-if="project.description" class="bm-text-soft project-description">
              {{ project.description }}
            </p>

            <div v-if="project.tags?.length" class="project-tags">
              <span
                v-for="tag in project.tags"
                :key="project.id + '-' + tag.id"
                class="bm-pill bm-pill-muted project-tag"
                :data-category="tag.category"
              >
                {{ tag.label }}
              </span>
            </div>

            <div class="project-divider" />

            <div
              v-if="project.mainUrl || projectLinks(project).length"
              class="bm-form-row-inline project-actions"
            >
              <a
                v-if="project.mainUrl"
                :href="project.mainUrl"
                target="_blank"
                rel="noopener"
                class="bm-btn bm-btn-primary bm-btn-sm bm-ease"
              >
                {{ t('projects.actions.openProject') }}
              </a>

          <a
  v-for="link in (project.links || []).filter(l => l && l.url && l.url !== project.mainUrl)"
  :key="project.id + '-' + (link.kind || 'link') + '-' + (link.url || '')"
  :href="link.url"
  target="_blank"
  rel="noopener"
  class="bm-btn bm-btn-outline bm-btn-sm project-card-link-secondary"
>
  {{ link.label || t('projects.actions.openLink') }}
</a>

            </div>

            <p v-if="project.derivatives?.length" class="bm-text-muted project-derivatives">
              {{ t('projects.derivatives.preview', { count: project.derivatives.length }) }}
            </p>
          </article>
        </div>

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

const { data, pending, error } = await useAsyncData('projects', () =>
  $fetch('/api/projects', { params: { locale: locale.value } })
)

const projects = computed(() => data.value || [])

// hero stats (aside)
const stats = computed(() => {
  const all = projects.value || []
  const prod = all.filter((p) => p.status === 'prod').length
  const beta = all.filter((p) => p.status === 'beta').length
  const dev = all.filter((p) => p.status === 'dev').length
  return { total: all.length, prod, inProgress: beta + dev }
})

const heroStats = computed(() => [
  { key: 'total', label: t('projects.hero.aside.items.total'), value: String(stats.value.total) },
  { key: 'prod', label: t('projects.hero.aside.items.production'), value: String(stats.value.prod) },
  { key: 'progress', label: t('projects.hero.aside.items.inProgress'), value: String(stats.value.inProgress) }
])

// pagination
const pageSize = 6
const currentPage = ref(1)

const totalPages = computed(() => {
  if (!projects.value.length) return 1
  return Math.ceil(projects.value.length / pageSize)
})

const pagedProjects = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return projects.value.slice(start, start + pageSize)
})

const onPageChange = (page) => {
  currentPage.value = page
}

/*const projectLinks = (project) => {
  if (!project || !Array.isArray(project.links)) return []
  return project.links.filter((l) => l && l.url && l.url !== project.mainUrl)
}*/
const projectLinks = (project) => {
  if (!project || !Array.isArray(project.links)) return []
  return project.links.filter(
    (link) => link && link.url && link.url !== project.mainUrl
  )
}

const statusLabel = (status) => {
  if (!status) return ''
  switch (status) {
    case 'prod':
      return t('projects.status.prod')
    case 'beta':
      return t('projects.status.beta')
    case 'dev':
      return t('projects.status.dev')
    case 'archived':
      return t('projects.status.archived')
    default:
      return status
  }
}

useHead(() => ({
  title: t('projects.seo.title'),
  meta: [
    { name: 'description', content: t('projects.seo.description') },
    { property: 'og:title', content: t('projects.seo.title') },
    { property: 'og:description', content: t('projects.seo.description') }
  ]
}))
</script>

<style scoped>
/* HERO grid */
.projects-hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 2.2fr) minmax(0, 1.4fr);
  gap: var(--bm-space-xl);
  align-items: start;
}

@media (max-width: 980px) {
  .projects-hero-grid {
    grid-template-columns: 1fr;
  }
}

.projects-hero-subtitle {
  max-width: 52rem;
}

.projects-hero-aside .bm-card-header {
  margin-bottom: 0.9rem;
}

/* Aside stats compact */
.projects-hero-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.55rem;
}

.projects-hero-stat {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.25rem 0;
  border-bottom: 1px solid color-mix(in srgb, var(--bm-color-border-subtle) 70%, transparent);
}
.projects-hero-stat:last-child { border-bottom: none; }

.projects-hero-stat-label {
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--bm-color-text-muted);
  line-height: 1.2;
}

.projects-hero-stat-value {
  font-size: 1.15rem;
  font-weight: 750;
  letter-spacing: -0.01em;
  color: var(--bm-color-text-strong);
  font-variant-numeric: tabular-nums;
  line-height: 1.1;
}

/* Wrapper + grid */
.projects-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--bm-space-xl);
}

.projects-grid {
  grid-auto-rows: 1fr;
}

/* Card */
.project-card {
  display: flex;
  flex-direction: column;
  gap: var(--bm-space-sm);
}

.project-card-header {
  display: grid;
  gap: 0.35rem;
}

.project-kicker {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.8rem;
}

/* ✅ statut sous le titre */
.project-status {
  align-self: flex-start;
  white-space: nowrap;
  margin-top: 0.15rem;
}

.project-status[data-status='prod'] {
  border-color: color-mix(in srgb, var(--bm-color-primary) 35%, transparent);
  background: color-mix(in srgb, var(--bm-color-primary-soft) 65%, transparent);
  color: var(--bm-color-text-strong);
}

.project-status[data-status='beta'],
.project-status[data-status='dev'] {
  border-color: color-mix(in srgb, var(--bm-color-accent) 30%, transparent);
  background: color-mix(in srgb, var(--bm-color-accent-soft) 65%, transparent);
  color: var(--bm-color-text-strong);
}

.project-status[data-status='archived'] {
  opacity: 0.75;
}

.project-description {
  line-height: 1.6;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.15rem;
}

.project-tag {
  font-size: 0.74rem;
  padding: 0.15rem 0.6rem;
}

/* Divider */
.project-divider {
  height: 1px;
  margin-top: var(--bm-space-sm);
  margin-bottom: var(--bm-space-xs);
  background: linear-gradient(
    to right,
    transparent,
    var(--bm-color-border-subtle),
    transparent
  );
}

.project-actions {
  margin-top: 0;
}

.project-derivatives {
  margin-top: var(--bm-space-xs);
}

.projects-pagination {
  margin-top: var(--bm-space-sm);
}

/* States */
.projects-state {
  padding-block: var(--bm-space-md);
}
.projects-hero-aside .bm-card-title {
  line-height: 1.25;
  padding-bottom: 0.06em;
}
/* Empêche la coupe des descendantes (y/g/p/q) sur titres (souvent lié à line-height + background-clip text) */
.projects-section-title {
  line-height: 1.5;
}

.projects-section-title .bm-gradient-text {
  display: inline-block;
  padding-bottom: 0.05em; /* laisse respirer les descendantes */
}

/* Optionnel si tu wraps aussi le H1 */
#projects-page-title .bm-gradient-text {
  display: inline-block;
  padding-bottom: 0.06em;
}

</style>
