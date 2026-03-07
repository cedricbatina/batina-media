<template>
  <div class="bm-stack-page">
    <section class="bm-section bm-stack-lg" aria-labelledby="terms-title">
      <header class="bm-stack-sm">
        <p class="bm-pill bm-pill-muted">{{ t('legalPages.legal.badge') }}</p>
        <h1 id="terms-title" class="bm-heading-2">{{ t('layout.footer.links.terms') }}</h1>
        <p class="bm-text-soft">{{ t('legalPages.terms.intro') }}</p>
      </header>

      <article class="bm-card bm-card-compact bm-stack-sm">
        <h2 class="bm-card-title">{{ t('layout.footer.links.terms') }}</h2>
        <ul class="bm-stack-xs legal-list">
          <li>{{ t('legalPages.terms.items.0') }}</li>
          <li>{{ t('legalPages.terms.items.1') }}</li>
          <li>{{ t('legalPages.terms.items.2') }}</li>
        </ul>
      </article>
    </section>
  </div>
</template>

<script setup>
import { useHead, useSeoMeta } from '#imports'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

useHead(() => ({
  title: t('layout.footer.links.terms')
}))

useSeoMeta({
  title: () => t('layout.footer.links.terms'),
  description: () => t('legalPages.terms.intro')
})
</script>

<style scoped>
.legal-list {
  margin: 0;
  padding-left: 1.15rem;
}

.legal-list li {
  line-height: 1.5;
}
</style>
