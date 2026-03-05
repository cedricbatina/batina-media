<template>
  <section class="bm-section bm-stack-sm">
    <h1 class="bm-heading-2">{{ t('layout.footer.links.privacy') }}</h1>
    <p class="bm-text-soft">{{ t('legalPages.privacy.intro') }}</p>
    <ul class="bm-stack-xs">
      <li>{{ t('legalPages.privacy.items.0') }}</li>
      <li>{{ t('legalPages.privacy.items.1') }}</li>
      <li>{{ t('legalPages.privacy.items.2') }}</li>
    </ul>
  </section>
</template>

<script setup>
import { useHead, useSeoMeta } from '#imports'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

useHead(() => ({
  title: t('layout.footer.links.privacy')
}))

useSeoMeta({
  title: () => t('layout.footer.links.privacy'),
  description: () => t('legalPages.privacy.intro')
})
</script>
