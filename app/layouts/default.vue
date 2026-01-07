<template>
  <div class="bm-layout">
    <!-- Accessibilité : lien de contournement -->
    <a href="#main-content" class="bm-skip-link">
      {{ t('layout.skipToContent') }}
    </a>

    <!-- HEADER -->
    <header class="bm-header">
      <div class="bm-header-inner">
        <!-- Logo -->
        <NuxtLink
          to="/"
          :class="['bm-logo']"
          :aria-label="t('app.brand')"
        >
          <span class="bm-logo-mark" aria-hidden="true"></span>
          <span>{{ t('app.brand') }}</span>
        </NuxtLink>

        <!-- Navigation principale -->
        <nav class="bm-header-nav" aria-label="Main navigation">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            :class="[
              'bm-nav-link',
              { 'bm-nav-link--active': isActiveLink(item.to) }
            ]"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <!-- Actions (langue + thème, compte plus tard) -->
        <div class="bm-header-actions">
          <!-- Switch langues -->
          <div class="bm-lang-switch" aria-label="Language selector">
            <button
              v-for="code in ['fr', 'en', 'pt', 'es']"
              :key="code"
              type="button"
              :class="[
                'bm-lang-chip',
                { 'bm-lang-chip--active': isActiveLocale(code) }
              ]"
              @click="setLocale(code)"
            >
              {{ code.toUpperCase() }}
            </button>
          </div>

          <!-- Switch thème clair / sombre -->
          <button
            type="button"
            class="bm-btn-icon"
            :aria-label="themeLabel"
            @click="toggleTheme"
          >
            <span v-if="resolvedTheme === 'light'" aria-hidden="true">
              <!-- soleil -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="18"
                height="18"
              >
                <circle cx="12" cy="12" r="4.2" />
                <path
                  d="M12 3v2.4M12 18.6V21M4.22 4.22 5.9 5.9M18.1 18.1l1.68 1.68M3 12h2.4M18.6 12H21M4.22 19.78 5.9 18.1M18.1 5.9 19.78 4.22"
                  stroke-width="1.4"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                />
              </svg>
            </span>
            <span v-else aria-hidden="true">
              <!-- lune -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="18"
                height="18"
              >
                <path
                  d="M20.2 14.6A7.5 7.5 0 0 1 10 4.1 7.5 7.5 0 1 0 20.2 14.6Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </button>

          <!-- plus tard : bouton compte / login -->
          <!-- <NuxtLink :class="['bm-btn', 'bm-btn-ghost']" to="/login">Login</NuxtLink> -->
        </div>
      </div>
    </header>

    <!-- CONTENU PRINCIPAL -->
    <main id="main-content" class="bm-page-inner bm-section">
      <slot />
    </main>

    <!-- FOOTER -->
    <footer class="bm-footer">
      <div class="bm-page-inner bm-footer-inner">
        <p class="bm-footer-brand">
          {{ t('app.brand') }}
        </p>
        <p class="bm-footer-meta">
          © {{ new Date().getFullYear() }} ·
          {{ t('layout.footer.tagline') }}
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const route = useRoute()

/**
 * NAV items – textes depuis i18n
 */
const navItems = computed(() => [
  { to: '/', label: t('nav.home') },
  { to: '/solutions', label: t('nav.solutions') },
  { to: '/projects', label: t('nav.projects') },
  { to: '/studio', label: t('nav.studio') },
  { to: '/contact', label: t('nav.contact') }
])

const isActiveLink = (toPath) => {
  if (toPath === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(toPath)
}

/**
 * LANGUES
 */
const setLocale = (code) => {
  if (locale.value === code) return
  locale.value = code
}

const isActiveLocale = (code) => locale.value === code

/**
 * THÈME DARK/CLAIR – géré ici
 */
const theme = useState('theme', () => 'light')

const applyTheme = (value) => {
  if (!import.meta.client) return
  document.documentElement.setAttribute('data-theme', value)
}

onMounted(() => {
  if (!import.meta.client) return

  const saved = window.localStorage.getItem('bm-theme')
  if (saved === 'light' || saved === 'dark') {
    theme.value = saved
  } else {
    const prefersDark = window.matchMedia?.(
      '(prefers-color-scheme: dark)'
    ).matches
    theme.value = prefersDark ? 'dark' : 'light'
  }
  applyTheme(theme.value)
})

watch(theme, (val) => {
  if (!import.meta.client) return
  applyTheme(val)
  window.localStorage.setItem('bm-theme', val)
})

const resolvedTheme = computed(() => theme.value)

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

const themeLabel = computed(() =>
  resolvedTheme.value === 'light'
    ? t('layout.theme.switchToDark')
    : t('layout.theme.switchToLight')
)
</script>
