<template>
  <div class="bm-layout">
    <!-- Skip link -->
    <a href="#main-content" class="bm-skip-link">
      {{ t('layout.skipToContent') }}
    </a>

    <!-- HEADER -->
    <header class="bm-header">
      <div class="bm-header-inner">
        <!-- Brand -->
        <NuxtLink
          :to="localizedPath('/')"
          class="bm-brand"
          :aria-label="t('app.brand')"
          @click="closeMobileNav"
        >
          <img
            :src="logoSrc"
            :alt="t('app.brand')"
            class="bm-brand__logo"

            decoding="async"
          />
          <span class="sr-only">{{ t('app.brand') }}</span>
        </NuxtLink>

        <!-- Desktop nav -->
        <nav class="bm-header-nav" aria-label="Main navigation">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            :class="['bm-nav-link', { 'bm-nav-link--active': isActiveLink(item.to) }]"
            :aria-current="isActiveLink(item.to) ? 'page' : undefined"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <!-- Desktop actions -->
        <div class="bm-header-actions">
          <UserInlineCard
            class="bm-header-user"
            :user="auth.user"
            :loading="auth.loading && !auth.initialized"
            @logout="onLogout"
          />

          <div class="bm-lang-switch" aria-label="Language selector">
            <button
              v-for="code in locales"
              :key="code"
              type="button"
              :class="['bm-lang-chip', { 'bm-lang-chip--active': isActiveLocale(code) }]"
              :aria-label="localeAriaLabel(code)"
              :aria-pressed="isActiveLocale(code) ? 'true' : 'false'"
              @click="setLocale(code)"
            >
              {{ code.toUpperCase() }}
            </button>
          </div>

          <button
            type="button"
            class="bm-btn-icon bm-btn-icon--header"
            :aria-label="themeLabel"
            @click="toggleTheme"
          >
            <span v-if="resolvedTheme === 'light'" aria-hidden="true">
              <!-- Sun -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                <circle cx="12" cy="12" r="4.2" fill="currentColor" />
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
              <!-- Moon -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                <path
                  d="M20.2 14.6A7.5 7.5 0 0 1 10 4.1 7.5 7.5 0 1 0 20.2 14.6Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </button>
        </div>

        <!-- Mobile toggle -->
        <button
          type="button"
          class="bm-nav-toggle"
          :aria-label="mobileNavOpen ? t('layout.nav.close') : t('layout.nav.open')"
          :aria-expanded="mobileNavOpen ? 'true' : 'false'"
          aria-controls="bm-mobile-nav"
          @click="toggleMobileNav"
        >
          <span class="sr-only">
            {{ mobileNavOpen ? t('layout.nav.close') : t('layout.nav.open') }}
          </span>

          <!-- Hamburger / Close icon -->
          <svg
            v-if="!mobileNavOpen"
            class="bm-nav-toggle__icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="22"
            height="22"
            aria-hidden="true"
          >
            <path
              d="M4 7h16M4 12h16M4 17h16"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>

          <svg
            v-else
            class="bm-nav-toggle__icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="22"
            height="22"
            aria-hidden="true"
          >
            <path
              d="M6 6l12 12M18 6L6 18"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </button>
      </div>

      <!-- Mobile layer (ONLY when open) -->
      <template v-if="mobileNavOpen">
        <div class="bm-mobile-backdrop" @click="closeMobileNav"></div>

        <nav
          id="bm-mobile-nav"
          class="bm-mobile-nav bm-mobile-nav--open"
          aria-label="Mobile navigation"
        >
          <div class="bm-mobile-nav__inner">
            <div class="bm-mobile-nav__top">
              <img
                :src="logoSrc"
                :alt="t('app.brand')"
                class="bm-brand__logo bm-brand__logo--mobile"
                width="150"
                height="40"
                decoding="async"
              />

              <button
                type="button"
                class="bm-mobile-nav__close"
                :aria-label="t('layout.nav.close')"
                @click="closeMobileNav"
              >
                ✕
              </button>
            </div>

            <div class="bm-mobile-nav__links">
              <NuxtLink
                v-for="item in navItems"
                :key="'m-' + item.to"
                :to="item.to"
                class="bm-mobile-link"
                :class="{ 'bm-mobile-link--active': isActiveLink(item.to) }"
                @click="closeMobileNav"
              >
                {{ item.label }}
              </NuxtLink>
            </div>

            <div class="bm-mobile-nav__actions">
              <div class="bm-mobile-auth">
                <UserInlineCard
                  :user="auth.user"
                  :loading="auth.loading && !auth.initialized"
                  @logout="onLogout"
                />
              </div>

              <div class="bm-mobile-block">
                <p class="bm-mobile-label">{{ t('layout.nav.language') }}</p>
                <div class="bm-lang-switch bm-lang-switch--mobile">
                  <button
                    v-for="code in locales"
                    :key="'ml-' + code"
                    type="button"
                    :class="['bm-lang-chip', { 'bm-lang-chip--active': isActiveLocale(code) }]"
                    :aria-label="localeAriaLabel(code)"
                    :aria-pressed="isActiveLocale(code) ? 'true' : 'false'"
                    @click="setLocale(code)"
                  >
                    {{ code.toUpperCase() }}
                  </button>
                </div>
              </div>

              <div class="bm-mobile-block">
                <p class="bm-mobile-label">{{ t('layout.nav.theme') }}</p>
                <button
                  type="button"
                  class="bm-btn bm-btn-outline bm-btn-sm bm-mobile-theme-btn"
                  @click="toggleTheme"
                >
                  {{ themeLabel }}
                </button>
              </div>
            </div>
          </div>
        </nav>
      </template>
    </header>

    <!-- CONTENT -->
    <main id="main-content" class="bm-page-inner">
      <slot />
    </main>

    <!-- FOOTER -->
<footer class="bm-footer">
  <div class="bm-footer-inner">
    <div class="bm-footer-brand-block">
      <NuxtLink :to="localizedPath('/')" class="bm-footer-brand" :aria-label="t('app.brand')">
        <img
          :src="logoSrc"
          :alt="t('app.brand')"
          class="bm-footer-logo"
          decoding="async"
        />
      </NuxtLink>
      <p class="bm-footer-meta">
        © {{ new Date().getFullYear() }} · {{ t('layout.footer.tagline') }}
      </p>
    </div>

    <nav class="bm-footer-site" :aria-label="t('layout.footer.siteNav')">
      <p class="bm-footer-col-title">{{ t('app.brand') }}</p>
      <ul class="bm-footer-col-list">
        <li>
          <NuxtLink :to="localizedPath('/studio')" class="bm-footer-link">
            {{ t('layout.footer.links.studio') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localizedPath('/presse')" class="bm-footer-link">
            {{ t('layout.footer.links.presse') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localizedPath('/contact')" class="bm-footer-link">
            {{ t('layout.footer.links.contact') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localizedPath('/projects')" class="bm-footer-link">
            {{ t('layout.footer.ecosystem.allProjects') }}
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <nav class="bm-footer-ecosystem" :aria-label="t('layout.footer.ecosystem.title')">
      <p class="bm-footer-col-title">{{ t('layout.footer.ecosystem.title') }}</p>
      <ul class="bm-footer-col-list bm-footer-ecosystem-list">
        <li v-for="item in footerEcosystemLinks" :key="item.code">
          <a
            :href="item.href"
            class="bm-footer-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ item.label }}
          </a>
        </li>
      </ul>
    </nav>

    <nav class="bm-footer-legal" :aria-label="t('layout.footer.ariaLabel')">
      <p class="bm-footer-col-title">{{ t('layout.footer.links.legal') }}</p>
      <ul class="bm-footer-col-list">
        <li>
          <NuxtLink :to="localizedPath('/terms')" class="bm-footer-link">
            {{ t('layout.footer.links.terms') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localizedPath('/privacy')" class="bm-footer-link">
            {{ t('layout.footer.links.privacy') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="localizedPath('/legal')" class="bm-footer-link">
            {{ t('layout.footer.links.legal') }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</footer>

  </div>
</template>

<script setup>
import { computed, ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useAuthStore } from '~/stores/authStore'
import { useI18n, useRoute, useSwitchLocalePath, useLocalePath, useRequestURL, navigateTo } from '#imports'
import { getFooterProductDefs } from '~/config/ecosystemProducts.js'

const auth = useAuthStore()
onMounted(async () => {
  if (!auth.initialized) await auth.init()
})

const onLogout = async () => {
  await auth.logout()
  await navigateTo(localizedPath('/'))
}


const { t, locale, setLocale: setI18nLocale } = useI18n()
const route = useRoute()
const switchLocalePath = useSwitchLocalePath()
const localePath = useLocalePath()

const locales = ['fr', 'en', 'pt', 'es']
const localizedPath = (pathValue) => localePath(pathValue, locale.value)

const footerEcosystemLinks = computed(() => {
  const _ = locale.value
  return getFooterProductDefs().map((def) => ({
    code: def.code,
    href: def.mainUrl,
    label: t(`ecosystem.products.${def.code}.name`)
  }))
})

const resolveLocaleFromUrl = () => {
  const pathname = import.meta.server
    ? useRequestURL().pathname
    : window.location.pathname
  const segment = String(pathname || '').split('/')[1]
  return locales.includes(segment) ? segment : null
}

const syncLocaleWithUrl = async () => {
  const nextLocale = resolveLocaleFromUrl()
  if (!nextLocale || nextLocale === locale.value) return
  await setI18nLocale(nextLocale)
}

await syncLocaleWithUrl()

/**
 * NAV
 */
const navItems = computed(() => {
  const _ = locale.value
  const items = [
    { path: '/', label: t('nav.home') },
    { path: '/solutions', label: t('nav.solutions') },
    { path: '/projects', label: t('nav.projects') },
    { path: '/studio', label: t('nav.studio') },
    { path: '/presse', label: t('nav.presse') },
    { path: '/contact', label: t('nav.contact') }
  ]
  return items.map((item) => ({
    ...item,
    to: localizedPath(item.path)
  }))
})

const normalizePath = (pathValue) => {
  if (!pathValue) return '/'
  const cleaned = pathValue.replace(/\/+$/, '')
  return cleaned === '' ? '/' : cleaned
}

const stripLocalePrefix = (pathValue) => {
  const normalized = normalizePath(pathValue)
  if (normalized === '/') return '/'
  const match = normalized.match(/^\/([^/]+)(\/.*)?$/)
  if (!match) return normalized
  const maybeLocale = match[1]
  if (!locales.includes(maybeLocale)) return normalized
  const rest = match[2] || '/'
  return normalizePath(rest)
}

const isLocaleRoot = (pathValue) => stripLocalePrefix(pathValue) === '/'

const isActiveLink = (toPath) => {
  const current = stripLocalePrefix(route.path)
  const target = stripLocalePrefix(toPath)
  if (isLocaleRoot(target)) return current === '/'
  return current === target || current.startsWith(`${target}/`)
}

/**
 * LOCALES
 */
const setLocale = async (code) => {
  if (locale.value === code) return
  await setI18nLocale(code)
  const targetPath = switchLocalePath(code)
  if (import.meta.client) {
    console.log('[setLocale] code:', code, 'locale.value:', locale.value, 'targetPath:', targetPath)
  }
  if (targetPath) {
    await navigateTo(targetPath)
    return
  }
  // Fallback si route generation échoue
  // locale.value = code (retiré pour laisser Nuxt/i18n gérer la langue)
}
const isActiveLocale = (code) => locale.value === code
const localeAriaLabel = (code) => {
  const labels = {
    fr: 'Français',
    en: 'English',
    pt: 'Português',
    es: 'Español'
  }
  return `${t('layout.nav.language')}: ${labels[code] || code.toUpperCase()}`
}

/**
 * THEME
 */
const theme = useState('theme', () => 'dark')
const resolvedTheme = computed(() => theme.value)

const applyTheme = (value) => {
  if (!import.meta.client) return
  document.documentElement.setAttribute('data-theme', value)
}

onMounted(() => {
  if (!import.meta.client) return
  const saved = window.localStorage.getItem('bm-theme')
  if (saved === 'light' || saved === 'dark') theme.value = saved
  applyTheme(theme.value)
})

watch(theme, (val) => {
  if (!import.meta.client) return
  applyTheme(val)
  window.localStorage.setItem('bm-theme', val)
})

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

const themeLabel = computed(() =>
  resolvedTheme.value === 'light'
    ? t('layout.theme.switchToDark')
    : t('layout.theme.switchToLight')
)

/**
 * LOGO par thème (mets les bons fichiers dans /public/images/)
 */
const logoSrc = computed(() => {
  return resolvedTheme.value === 'light'
    ? '/images/batina-media-lighttheme-premium-1700x1500-v2.png'
    : '/images/batina-media-darktheme-premium-1700x1500-v2.png'
})

/**
 * MOBILE NAV (robuste)
 */
const mobileNavOpen = ref(false)

const openMobileNav = () => {
  mobileNavOpen.value = true
  if (import.meta.client) document.body.style.overflow = 'hidden'
}
const closeMobileNav = () => {
  mobileNavOpen.value = false
  if (import.meta.client) document.body.style.overflow = ''
}
const toggleMobileNav = () => {
  mobileNavOpen.value ? closeMobileNav() : openMobileNav()
}

// ferme le menu à la navigation
watch(
  () => route.fullPath,
  () => {
    void syncLocaleWithUrl()
    if (mobileNavOpen.value) closeMobileNav()
  }
)

// ESC pour fermer
const onKeydown = (e) => {
  if (e.key === 'Escape' && mobileNavOpen.value) closeMobileNav()
}

onMounted(() => {
  if (!import.meta.client) return
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  if (!import.meta.client) return
  window.removeEventListener('keydown', onKeydown)
})
</script>

<style scoped>
/* SR only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Brand */



/* Header icon button (safe light/dark) */
.bm-btn-icon--header {
  border: 1px solid var(--bm-color-border-subtle);
  background: var(--bm-color-bg-soft);
  color: var(--bm-color-text);
  border-radius: 0.75rem;
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Mobile toggle */
.bm-nav-toggle {
  display: none;
  width: 44px;
  height: 44px;
  border: 1px solid var(--bm-color-border-subtle);
  background: var(--bm-color-bg-soft);
  color: var(--bm-color-text);
  border-radius: 0.85rem;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.bm-nav-toggle__icon {
  display: block;
}

/* Backdrop */
.bm-mobile-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(2, 6, 23, 0.55);
  z-index: 80;
}

/* Drawer */
.bm-mobile-nav {
  position: fixed;
  top: 0;
  right: 0;
  width: min(92vw, 390px);
  height: 100vh;
  max-height: 100dvh;
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  background: var(--bm-color-bg);
  border-left: 1px solid var(--bm-color-border-subtle);
  z-index: 90;
  transform: translateX(0);
  overflow-y: auto;
  overscroll-behavior: contain;
}

.bm-mobile-nav__inner {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.25rem 1.25rem calc(1.25rem + env(safe-area-inset-bottom));
  gap: 1.25rem;
}

.bm-mobile-nav__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.bm-mobile-nav__close {
  border: 1px solid var(--bm-color-border-subtle);
  background: var(--bm-color-bg-soft);
  color: var(--bm-color-text);
  border-radius: 0.8rem;
  padding: 0.4rem 0.6rem;
  cursor: pointer;
}

.bm-mobile-nav__links {
  display: grid;
  gap: 0.35rem;
}

.bm-mobile-link {
  display: block;
  padding: 0.8rem 0.9rem;
  border-radius: 0.95rem;
  text-decoration: none;
  color: var(--bm-color-text);
  border: 1px solid transparent;
  background: transparent;
}

.bm-mobile-link:hover {
  background: var(--bm-color-bg-soft);
  border-color: var(--bm-color-border-subtle);
}

.bm-mobile-link--active {
  background: var(--bm-color-bg-soft);
  border-color: var(--bm-color-border-subtle);
}

/* Mobile actions */
.bm-mobile-nav__actions {
  margin-top: 0;
  display: grid;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--bm-color-border-subtle);
}

/* User card placement */
.bm-header-user {
  display: inline-flex;
}

.bm-mobile-auth {
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--bm-color-border-subtle);
}

/* Make the dropdown usable inside the mobile drawer */
:deep(.bm-mobile-auth .bm-user-menu) {
  left: 0;
  right: 0;
  width: 100%;
}

.bm-mobile-label {
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.85;
  margin: 0 0 0.5rem;
}

.bm-lang-switch--mobile {
  justify-content: flex-start;
}

.bm-mobile-theme-btn {
  width: 100%;
  justify-content: center;
  min-height: 44px;
  white-space: normal;
  text-align: center;
  line-height: 1.3;
}

@media (max-width: 980px) {
  .bm-mobile-nav__inner {
    gap: 1rem;
    padding: 1rem 1rem calc(1rem + env(safe-area-inset-bottom));
  }
}

/* Tablet landscape / low-height phones: keep language + theme block accessible */
@media (max-width: 1180px) and (max-height: 820px) {
  .bm-mobile-nav {
    width: min(96vw, 420px);
  }

  .bm-mobile-nav__inner {
    gap: 0.75rem;
    padding: 0.85rem 0.9rem calc(0.85rem + env(safe-area-inset-bottom));
  }

  .bm-brand__logo--mobile {
    height: 44px;
  }

  .bm-mobile-nav__links {
    gap: 0.25rem;
  }

  .bm-mobile-link {
    padding: 0.66rem 0.75rem;
  }

  .bm-mobile-nav__actions {
    gap: 0.75rem;
    padding-top: 0.75rem;
    padding-bottom: max(0.5rem, env(safe-area-inset-bottom));
    position: sticky;
    bottom: 0;
    background: linear-gradient(
      180deg,
      color-mix(in srgb, var(--bm-color-bg) 72%, transparent) 0%,
      var(--bm-color-bg) 22%
    );
  }

  .bm-mobile-label {
    font-size: 0.72rem;
    margin: 0 0 0.35rem;
  }

  .bm-lang-switch--mobile {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .bm-mobile-theme-btn {
    min-height: 42px;
    font-size: 0.84rem;
    padding: 0.5rem 0.7rem;
  }

  :deep(.bm-mobile-auth .bm-user-chip) {
    width: 100%;
    justify-content: space-between;
  }
}

/* Responsive: hide desktop nav/actions, show toggle */
@media (max-width: 980px) {
  .bm-header-nav,
  .bm-header-actions {
    display: none;
  }
  .bm-nav-toggle {
    display: inline-flex;
  }
}

/* Safety: light theme readability (if main.css ne gère pas encore tout) */
:global(:root[data-theme="light"]) .bm-nav-link,
:global(:root[data-theme="light"]) .bm-lang-chip,
:global(:root[data-theme="light"]) .bm-btn-icon--header {
  color: var(--bm-color-text);
}


:global(:root[data-theme="dark"]) .bm-brand__logo {
  filter: drop-shadow(0 10px 22px rgba(0,0,0,0.35));
}
.bm-brand__logo--mobile { height: var(--bm-header-logo-h-mobile); }
.bm-brand {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  line-height: 0;
  padding: 0.25rem 0;
  flex: 0 0 auto;
}

.bm-brand__logo {
  height: 96px;          /* OK */
  width: auto;
  max-width: none;
  object-fit: contain;
}

/* Mobile drawer */
.bm-brand__logo--mobile {
  height: 56px;          /* ✅ explicite */
  width: auto;
  max-width: none;
}

</style>











