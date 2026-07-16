<script setup>
const { t, tm, rt } = useI18n()

const proofs = computed(() => {
  const items = t('presse.proofs.items')
  return Array.isArray(items) ? items : []
})

const contactEmails = computed(() => {
  const raw = tm('presse.contact.emails')
  if (Array.isArray(raw) && raw.length) {
    return raw.map((msg) => rt(msg))
  }
  const single = t('presse.contact.email')
  return single && single !== 'presse.contact.email' ? [single] : []
})

const phoneDisplay = computed(() => t('presse.contact.phone'))
const phoneTel = computed(() =>
  String(phoneDisplay.value || '').replace(/[^\d+]/g, '')
)

useHead(() => ({
  title: t('presse.seo.title'),
}))

useSeoMeta({
  description: () => t('presse.seo.description'),
  ogTitle: () => t('presse.seo.title'),
  ogDescription: () => t('presse.seo.description'),
  ogType: 'website',
})
</script>

<template>
  <div class="bm-stack-page presse-page">
    <section class="bm-section presse-hero" aria-labelledby="presse-title">
      <div class="bm-stack-sm">
        <span class="bm-pill bm-pill-soft">{{ t('presse.hero.label') }}</span>
        <h1 id="presse-title" class="bm-heading-hero">
          <span class="bm-gradient-text">{{ t('presse.hero.title') }}</span>
        </h1>
        <p class="bm-text-soft presse-hero-subtitle">
          {{ t('presse.hero.subtitle') }}
        </p>
      </div>
    </section>

    <section class="bm-section" aria-labelledby="presse-story-title">
      <article class="bm-card bm-card-compact">
        <h2 id="presse-story-title" class="bm-card-title bm-title-h3">
          {{ t('presse.story.title') }}
        </h2>
        <p class="bm-card-subtitle">{{ t('presse.story.body') }}</p>
      </article>
    </section>

    <section class="bm-section" aria-labelledby="presse-proofs-title">
      <header class="bm-stack-sm bm-section-header">
        <h2 id="presse-proofs-title" class="bm-heading-2 bm-title-h2">
          {{ t('presse.proofs.title') }}
        </h2>
      </header>
      <div class="bm-grid bm-grid-2">
        <article v-for="(item, i) in proofs" :key="i" class="bm-card bm-card-compact">
          <h3 class="bm-card-title bm-title-h3">{{ item.label }}</h3>
          <p class="bm-card-subtitle">{{ item.body }}</p>
          <a
            v-if="item.url"
            :href="item.url"
            class="bm-link presse-external"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ item.url.replace(/^https?:\/\//, '') }}
          </a>
        </article>
      </div>
    </section>

    <section class="bm-section" aria-labelledby="presse-founder-title">
      <article class="bm-card">
        <h2 id="presse-founder-title" class="bm-card-title bm-title-h3">
          {{ t('presse.founder.title') }} — {{ t('presse.founder.name') }}
        </h2>
        <p class="bm-card-subtitle">{{ t('presse.founder.body') }}</p>
        <a
          :href="t('presse.founder.profileUrl')"
          class="bm-btn bm-btn-outline bm-mt-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ t('presse.founder.profileLabel') }}
        </a>
      </article>
    </section>

    <section class="bm-section" aria-labelledby="presse-contact-title">
      <article class="bm-card bm-card-compact">
        <h2 id="presse-contact-title" class="bm-card-title bm-title-h3">
          {{ t('presse.contact.title') }}
        </h2>
        <ul class="presse-contact-list">
          <li v-for="email in contactEmails" :key="email">
            <a :href="`mailto:${email}`" class="bm-link">{{ email }}</a>
          </li>
          <li>
            <a :href="`tel:${phoneTel}`" class="bm-link">{{ phoneDisplay }}</a>
          </li>
        </ul>
        <p class="bm-text-muted bm-small">{{ t('presse.contact.hint') }}</p>
        <div class="bm-form-row-inline bm-mt-3">
          <NuxtLink to="/projects" class="bm-btn bm-btn-outline">{{ t('presse.cta.projects') }}</NuxtLink>
          <NuxtLink to="/contact" class="bm-btn bm-btn-primary">{{ t('presse.cta.contact') }}</NuxtLink>
        </div>
      </article>
    </section>
  </div>
</template>

<style scoped>
.presse-hero-subtitle {
  max-width: 42rem;
  line-height: 1.55;
}
.presse-external {
  display: inline-block;
  margin-top: 0.5rem;
  font-size: 0.875rem;
}
.presse-contact-list {
  list-style: none;
  margin: 0.5rem 0 0.75rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
.bm-mt-2 {
  margin-top: 0.75rem;
}
.bm-mt-3 {
  margin-top: 1rem;
}
.bm-small {
  font-size: 0.875rem;
}
</style>
