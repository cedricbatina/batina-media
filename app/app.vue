<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { computed } from 'vue'
import { useHead, useSeoMeta, useRoute, useRuntimeConfig } from '#imports'
import { useI18n } from 'vue-i18n'

// i18n : pour la langue du <html> et les textes SEO
const { locale, t } = useI18n()

// Route + config pour les URLs canoniques
const route = useRoute()
const runtimeConfig = useRuntimeConfig()

// URL du site (à mettre plus tard dans runtimeConfig.public.siteUrl ou .env)
// Fallback propre pour le dev local
const siteUrl = computed(() => {
  const fromConfig = runtimeConfig.public?.siteUrl
  return (fromConfig && fromConfig.replace(/\/+$/, '')) || 'http://localhost:3008'
})

// Nom du site (fixe) – le branding i18n est dans app.brand si besoin
const siteName = 'Batina Media'

// Langue actuelle (<html lang="...">)
const currentLang = computed(() => locale.value || 'fr')

// Canonical dynamique : siteUrl + route.fullPath
const canonicalUrl = computed(() => {
  const path = route.fullPath || '/'
  return siteUrl.value + path
})

// Open Graph locale (simple mapping)
const ogLocale = computed(() => {
  switch (currentLang.value) {
    case 'fr':
      return 'fr_FR'
    case 'pt':
      return 'pt_PT'
    case 'en':
    default:
      return 'en_US'
  }
})

// Titre & description globales (i18n avec fallback)
const defaultTitle = computed(
  () =>
    t('app.seo.title') ||
    `${siteName} — Studio de plateformes & solutions digitales`
)

const defaultDescription = computed(
  () =>
    t('app.seo.description') ||
    "Batina Media conçoit des plateformes, produits digitaux et contenus structurés pour les écoles, chercheurs, auteurs, éditeurs, PME, associations et projets culturels."
)

// HEAD global : structure de base pour tout le site
useHead(() => ({
  htmlAttrs: {
    lang: currentLang.value
  },
  titleTemplate: (titleChunk) =>
    titleChunk ? `${titleChunk} · ${siteName}` : defaultTitle.value,
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, viewport-fit=cover'
    },
    {
      name: 'theme-color',
      content: '#f5f4f1',
      media: '(prefers-color-scheme: light)'
    },
    {
      name: 'theme-color',
      content: '#020617',
      media: '(prefers-color-scheme: dark)'
    },
    {
      name: 'description',
      content: defaultDescription.value
    },
    {
      property: 'og:title',
      content: defaultTitle.value
    },
    {
      property: 'og:description',
      content: defaultDescription.value
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:url',
      content: canonicalUrl.value
    },
    {
      property: 'og:locale',
      content: ogLocale.value
    },
    {
      property: 'og:site_name',
      content: siteName
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    }
  ],
  link: [
    // Canonical
    {
      rel: 'canonical',
      href: canonicalUrl.value
    },
    // Favicons (à mettre dans /public/icons)
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/favicon.svg'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/icons/icon-32x32.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/icons/icon-16x16.png'
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/icons/icon-192x192.png'
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest'
    },
    // Alternate i18n (langue courante)
    {
      rel: 'alternate',
      hreflang: currentLang.value,
      href: canonicalUrl.value
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: siteName,
        url: siteUrl.value,
        description: defaultDescription.value,
        logo: `${siteUrl.value}/logo-batina-media.png`,
        sameAs: []
      })
    }
  ]
}))

// Meta SEO globales (que les pages pourront surcharger)
useSeoMeta({
  title: () => defaultTitle.value,
  description: () => defaultDescription.value,
  ogTitle: () => defaultTitle.value,
  ogDescription: () => defaultDescription.value,
  ogSiteName: siteName,
  ogType: 'website',
  ogUrl: () => canonicalUrl.value,
  ogLocale: () => ogLocale.value,
  twitterCard: 'summary_large_image'
})
</script>
