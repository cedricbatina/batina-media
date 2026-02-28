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
          to="/"
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
  <div class="bm-footer-inner bm-page-inner">
    <NuxtLink to="/" class="bm-footer-brand" :aria-label="t('app.brand')">
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

    <nav class="bm-footer-links" aria-label="Footer">
      <NuxtLink to="/terms" class="bm-footer-link">Terms</NuxtLink>
      <NuxtLink to="/privacy" class="bm-footer-link">Privacy</NuxtLink>
      <NuxtLink to="/legal" class="bm-footer-link">Legal</NuxtLink>
    </nav>
  </div>
</footer>

  </div>
</template>

<script setup>
import { computed, ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '~/stores/authStore'

const auth = useAuthStore()
onMounted(async () => {
  if (!auth.initialized) await auth.init()
})

const onLogout = async () => {
  await auth.logout()
  await navigateTo('/')
}


const { t, locale } = useI18n()
const route = useRoute()

/**
 * NAV
 */
const navItems = computed(() => [
  { to: '/', label: t('nav.home') },
  { to: '/solutions', label: t('nav.solutions') },
  { to: '/projects', label: t('nav.projects') },
  { to: '/studio', label: t('nav.studio') },
  { to: '/contact', label: t('nav.contact') }
])

const isActiveLink = (toPath) => {
  if (toPath === '/') return route.path === '/'
  return route.path.startsWith(toPath)
}

/**
 * LOCALES
 */
const locales = ['fr', 'en', 'pt', 'es']
const setLocale = (code) => {
  if (locale.value === code) return
  locale.value = code
}
const isActiveLocale = (code) => locale.value === code

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
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  background: var(--bm-color-bg);
  border-left: 1px solid var(--bm-color-border-subtle);
  z-index: 90;
  transform: translateX(0);
}

.bm-mobile-nav__inner {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
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
  margin-top: auto;
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
}

.bm-footer-logo {
  height: 50px;
  width: auto;
  object-fit: contain;
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


.bm-footer-brand{
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  line-height: 0;
}

.bm-footer-logo{
  height: var(--bm-footer-logo-h);
  width: auto;
  object-fit: contain;
}

.bm-footer-meta{
  margin: 0;
  text-align: center;
}

.bm-footer-links{
  display: inline-flex;
  gap: 0.85rem;
  justify-content: flex-end;
}

.bm-footer-link{
  text-decoration: none;
  color: var(--bm-color-text-muted);
  font-size: 0.92rem;
}

.bm-footer-link:hover{
  color: var(--bm-color-text);
  text-decoration: underline;
  text-underline-offset: 3px;
}


:global(:root[data-theme="dark"]) .bm-brand__logo {
  filter: drop-shadow(0 10px 22px rgba(0,0,0,0.35));
}
.bm-footer-logo { height: var(--bm-footer-logo-h); }
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
