<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { computed } from 'vue'
import { useHead, useSeoMeta, useRoute, useRuntimeConfig, useSwitchLocalePath } from '#imports'
import { useI18n } from 'vue-i18n'

// i18n : pour la langue du <html> et les textes SEO
const { locale, t } = useI18n()

// Route + config pour les URLs canoniques
const route = useRoute()
const runtimeConfig = useRuntimeConfig()
const switchLocalePath = useSwitchLocalePath()

// URL du site — jamais localhost en prod (évite sitemap / canonical cassés)
const siteUrl = computed(() => {
  const fromConfig = String(
    runtimeConfig.public?.siteUrl || runtimeConfig.public?.appBaseUrl || ''
  ).replace(/\/+$/, '')
  if (fromConfig && !/localhost|127\.0\.0\.1/i.test(fromConfig)) {
    return fromConfig
  }
  if (import.meta.dev) {
    return fromConfig || 'http://localhost:3008'
  }
  return 'https://batina-media.com'
})

const defaultOgImage = computed(
  () => `${siteUrl.value}/logo-batina-media.png`
)

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
    case 'es':
      return 'es_ES'
    case 'pt':
      return 'pt_PT'
    case 'en':
    default:
      return 'en_US'
  }
})

const alternateLinks = computed(() => {
  const localeCodes = ['fr', 'en', 'es', 'pt']
  const links = localeCodes.map((code) => ({
    rel: 'alternate',
    hreflang: code,
    href: `${siteUrl.value}${switchLocalePath(code)}`
  }))
  links.push({
    rel: 'alternate',
    hreflang: 'x-default',
    href: `${siteUrl.value}${switchLocalePath('fr')}`
  })
  return links
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
    },
    {
      property: 'og:image',
      content: defaultOgImage.value
    },
    {
      name: 'twitter:image',
      content: defaultOgImage.value
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
    ...alternateLinks.value
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
        sameAs: [
          'https://www.linkedin.com/in/c%C3%A9dric-batina-6b17b31a7/'
        ]
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
  ogImage: () => defaultOgImage.value,
  twitterCard: 'summary_large_image',
  twitterImage: () => defaultOgImage.value
})
</script>
