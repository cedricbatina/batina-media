<template>
  <div class="bm-stack-page">
    <section class="bm-section bm-stack-lg" aria-labelledby="legal-title">
      <header class="bm-stack-sm">
        <p class="bm-pill bm-pill-muted">{{ t('legalPages.legal.badge') }}</p>
        <h1 id="legal-title" class="bm-heading-2">{{ t('legalPages.legal.title') }}</h1>
        <p class="bm-text-soft">{{ t('legalPages.legal.intro') }}</p>
      </header>

      <article id="editeur" class="bm-card bm-card-compact bm-stack-sm">
        <h2 class="bm-card-title">{{ t('legalPages.legal.sections.publisher.title') }}</h2>
        <ul class="bm-stack-xs legal-list">
          <li><strong>{{ t('legalPages.legal.sections.publisher.labels.name') }}:</strong> {{ t('legalPages.legal.sections.publisher.values.name') }}</li>
          <li><strong>{{ t('legalPages.legal.sections.publisher.labels.manager') }}:</strong> {{ t('legalPages.legal.sections.publisher.values.manager') }}</li>
          <li><strong>{{ t('legalPages.legal.sections.publisher.labels.address') }}:</strong> {{ t('legalPages.legal.sections.publisher.values.address') }}</li>
          <li><strong>{{ t('legalPages.legal.sections.publisher.labels.email') }}:</strong> {{ t('legalPages.legal.sections.publisher.values.email') }}</li>
          <li><strong>{{ t('legalPages.legal.sections.publisher.labels.phone') }}:</strong> {{ t('legalPages.legal.sections.publisher.values.phone') }}</li>
          <li><strong>{{ t('legalPages.legal.sections.publisher.labels.siret') }}:</strong> {{ t('legalPages.legal.sections.publisher.values.siret') }}</li>
          <li><strong>{{ t('legalPages.legal.sections.publisher.labels.ape') }}:</strong> {{ t('legalPages.legal.sections.publisher.values.ape') }}</li>
          <li><strong>{{ t('legalPages.legal.sections.publisher.labels.registrationDate') }}:</strong> {{ t('legalPages.legal.sections.publisher.values.registrationDate') }}</li>
        </ul>
      </article>

      <article id="hebergement" class="bm-card bm-card-compact bm-stack-sm">
        <h2 class="bm-card-title">{{ t('legalPages.legal.sections.hosting.title') }}</h2>
        <ul class="bm-stack-xs legal-list">
          <li><strong>{{ t('legalPages.legal.sections.hosting.labels.provider') }}:</strong> {{ t('legalPages.legal.sections.hosting.values.provider') }}</li>
          <li><strong>{{ t('legalPages.legal.sections.hosting.labels.address') }}:</strong> {{ t('legalPages.legal.sections.hosting.values.address') }}</li>
          <li><strong>{{ t('legalPages.legal.sections.hosting.labels.registry') }}:</strong> {{ t('legalPages.legal.sections.hosting.values.registry') }}</li>
          <li><strong>{{ t('legalPages.legal.sections.hosting.labels.ide') }}:</strong> {{ t('legalPages.legal.sections.hosting.values.ide') }}</li>
          <li><strong>{{ t('legalPages.legal.sections.hosting.labels.vat') }}:</strong> {{ t('legalPages.legal.sections.hosting.values.vat') }}</li>
          <li><strong>{{ t('legalPages.legal.sections.hosting.labels.infrastructure') }}:</strong> {{ t('legalPages.legal.sections.hosting.values.infrastructure') }}</li>
          <li><strong>{{ t('legalPages.legal.sections.hosting.labels.security') }}:</strong> {{ t('legalPages.legal.sections.hosting.values.security') }}</li>
        </ul>
      </article>

      <article id="propriete-intellectuelle" class="bm-card bm-card-compact bm-stack-sm">
        <h2 class="bm-card-title">{{ t('legalPages.legal.sections.ip.title') }}</h2>
        <p class="bm-text-soft">{{ t('legalPages.legal.sections.ip.p1') }}</p>
        <p class="bm-text-soft">{{ t('legalPages.legal.sections.ip.p2') }}</p>
      </article>

      <article id="confidentialite" class="bm-card bm-card-compact bm-stack-sm">
        <h2 class="bm-card-title">{{ t('legalPages.legal.sections.privacy.title') }}</h2>
        <p class="bm-text-soft">{{ t('legalPages.legal.sections.privacy.p1') }}</p>
        <p class="bm-text-soft">{{ t('legalPages.legal.sections.privacy.p2') }}</p>
        <p class="bm-text-soft">{{ t('legalPages.legal.sections.privacy.p3') }}</p>
      </article>

      <article id="cgu" class="bm-card bm-card-compact bm-stack-sm">
        <h2 class="bm-card-title">{{ t('legalPages.legal.sections.terms.title') }}</h2>
        <ul class="bm-stack-xs legal-list">
          <li>{{ t('legalPages.legal.sections.terms.items.0') }}</li>
          <li>{{ t('legalPages.legal.sections.terms.items.1') }}</li>
          <li>{{ t('legalPages.legal.sections.terms.items.2') }}</li>
          <li>{{ t('legalPages.legal.sections.terms.items.3') }}</li>
          <li>{{ t('legalPages.legal.sections.terms.items.4') }}</li>
        </ul>
      </article>

      <article id="liens" class="bm-card bm-card-compact bm-stack-sm">
        <h2 class="bm-card-title">{{ t('legalPages.legal.sections.links.title') }}</h2>
        <p class="bm-text-soft">{{ t('legalPages.legal.sections.links.p1') }}</p>
      </article>

      <article id="droit-applicable" class="bm-card bm-card-compact bm-stack-sm">
        <h2 class="bm-card-title">{{ t('legalPages.legal.sections.law.title') }}</h2>
        <p class="bm-text-soft">{{ t('legalPages.legal.sections.law.p1') }}</p>
      </article>

      <article id="maj" class="bm-card bm-card-compact bm-stack-sm">
        <h2 class="bm-card-title">{{ t('legalPages.legal.sections.updates.title') }}</h2>
        <p class="bm-text-soft">{{ t('legalPages.legal.sections.updates.p1') }}</p>
        <p class="bm-text-soft">{{ t('legalPages.legal.sections.updates.p2') }}</p>
      </article>

      <article id="contact-support" class="bm-card bm-card-compact bm-stack-sm">
        <h2 class="bm-card-title">{{ t('legalPages.legal.sections.contact.title') }}</h2>
        <p class="bm-text-soft">{{ t('legalPages.legal.sections.contact.p1') }}</p>
        <p class="bm-text-soft">{{ t('legalPages.legal.sections.contact.p2') }}</p>
      </article>
    </section>
  </div>
</template>

<script setup>
import { useHead, useSeoMeta } from '#imports'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

useHead(() => ({
  title: t('legalPages.legal.title')
}))

useSeoMeta({
  title: () => t('legalPages.legal.title'),
  description: () => t('legalPages.legal.seoDescription')
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
