<template>
  <div ref="root" class="bm-user-inline" :class="{ 'is-open': open }">
    <button
      type="button"
      class="bm-user-chip bm-btn bm-btn-outline bm-btn-sm"
      :aria-expanded="open ? 'true' : 'false'"
      aria-haspopup="menu"
      @click="toggle"
    >
      <span class="bm-user-avatar" aria-hidden="true">
        <img v-if="avatarUrl" :src="avatarUrl" alt="" />
        <span v-else class="bm-user-avatar__fallback">
          <span v-if="initials">{{ initials }}</span>
          <svg v-else class="bm-user-avatar__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" stroke="currentColor" stroke-width="1.8"/>
            <path d="M5 20a7 7 0 0 1 14 0" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
        </span>
      </span>

      <span class="bm-user-chip__label">
        {{ chipLabel }}
      </span>

      <svg class="bm-user-chip__chev" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    <div v-if="open" class="bm-user-menu bm-card bm-card-compact" role="menu">
      <template v-if="loading">
        <div class="bm-user-menu__section">
          <p class="bm-text-soft bm-user-skel">…</p>
          <p class="bm-text-muted bm-user-skel">…</p>
        </div>
      </template>

      <template v-else-if="user">
        <div class="bm-user-menu__section">
          <div class="bm-user-menu__identity">
            <p class="bm-user-menu__name">{{ displayName }}</p>
            <p class="bm-text-muted bm-user-menu__email">{{ userEmail }}</p>
          </div>

          <div v-if="roleLabel" class="bm-user-menu__roles">
            <span class="bm-pill bm-pill-muted">{{ roleLabel }}</span>
          </div>
        </div>

        <div class="bm-user-menu__divider" />

        <div class="bm-user-menu__section bm-user-menu__actions">
          <NuxtLink to="/account" class="bm-btn bm-btn-outline bm-btn-sm bm-user-menu__btn">
            {{ t('userInline.actions.account') }}
          </NuxtLink>

          <button type="button" class="bm-btn bm-btn-primary bm-btn-sm bm-user-menu__btn" @click="logout">
            {{ t('userInline.actions.logout') }}
          </button>
        </div>
      </template>

      <template v-else>
        <div class="bm-user-menu__section">
          <p class="bm-user-menu__name">{{ t('userInline.guest.title') }}</p>
          <p class="bm-text-soft bm-user-menu__guest">
            {{ t('userInline.guest.body') }}
          </p>
        </div>

        <div class="bm-user-menu__divider" />

        <div class="bm-user-menu__section bm-user-menu__actions">
          <NuxtLink to="/login" class="bm-btn bm-btn-primary bm-btn-sm bm-user-menu__btn">
            {{ t('userInline.actions.login') }}
          </NuxtLink>
          <NuxtLink to="/register" class="bm-btn bm-btn-outline bm-btn-sm bm-user-menu__btn">
            {{ t('userInline.actions.register') }}
          </NuxtLink>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const props = defineProps({
  user: { type: Object, default: null },
  loading: { type: Boolean, default: false }
})

const emit = defineEmits(['logout'])

const { t } = useI18n()
const route = useRoute()

const open = ref(false)
const root = ref(null)

const userEmail = computed(() => {
  if (!props.user) return ''
  return props.user.email || props.user.mail || ''
})

const displayName = computed(() => {
  if (!props.user) return ''
  return (
    props.user.display_name ||
    props.user.displayName ||
    props.user.username ||
    userEmail.value ||
    ''
  )
})

const avatarUrl = computed(() => {
  if (!props.user) return ''
  return props.user.avatar_url || props.user.avatarUrl || ''
})

const initials = computed(() => {
  if (!props.user) return ''

  const name = displayName.value || ''
  const parts = name.trim().split(/\s+/).filter(Boolean)
  const first = parts[0]?.[0] || ''
  const second = parts[1]?.[0] || ''
  return (first + second).toUpperCase()
})

const roleLabel = computed(() => {
  const u = props.user
  if (!u) return ''
  const roles = u.roles || u.roleSlugs || u.role_slugs || []
  if (!Array.isArray(roles) || roles.length === 0) return ''
  if (roles.includes('admin')) return 'Admin'
  if (roles.includes('owner')) return 'Owner'
  return roles[0]
})

const chipLabel = computed(() => {
  if (props.loading) return '…'
  if (!props.user) return t('userInline.actions.login')
  return displayName.value || t('userInline.actions.account')
})

const close = () => {
  open.value = false
}

const toggle = () => {
  open.value = !open.value
}

const logout = async () => {
  close()
  emit('logout')
}

const onDocClick = (e) => {
  if (!open.value) return
  const el = root.value
  if (!el) return
  if (e.target instanceof Node && !el.contains(e.target)) close()
}

onMounted(() => {
  if (!import.meta.client) return
  document.addEventListener('click', onDocClick, true)
})

onBeforeUnmount(() => {
  if (!import.meta.client) return
  document.removeEventListener('click', onDocClick, true)
})

watch(
  () => route.fullPath,
  () => close()
)
</script>

<style scoped>
.bm-user-inline {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.bm-user-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  border-radius: 999px;
  padding-inline: 0.6rem;
}

.bm-user-chip__label {
  max-width: 12rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.bm-user-avatar {
  width: 26px;
  height: 26px;
  border-radius: 999px;
  overflow: hidden;
  border: 1px solid var(--bm-color-border-subtle);
  background: var(--bm-color-bg-elevated);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
}

.bm-user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.bm-user-avatar__fallback {
  width: 100%;
  height: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--bm-color-text);
}

.bm-user-avatar__icon {
  width: 14px;
  height: 14px;
  color: var(--bm-color-text);
}

.bm-user-chip__chev {
  width: 16px;
  height: 16px;
  opacity: 0.85;
  display: block;
  color: var(--bm-color-text);
}

.bm-user-menu {
  position: absolute;
  right: 0;
  top: calc(100% + 0.6rem);
  min-width: 280px;
  z-index: 120;
  padding: 0.9rem;
  border-radius: 1rem;
  border: 1px solid var(--bm-color-border-subtle);
  background: var(--bm-color-bg-elevated);
  box-shadow: 0 22px 60px rgba(0, 0, 0, 0.55);
}

.bm-user-menu__section {
  display: grid;
  gap: 0.55rem;
}

.bm-user-menu__divider {
  height: 1px;
  margin: 0.75rem 0;
  background: var(--bm-color-border-subtle);
}

.bm-user-menu__identity {
  display: grid;
  gap: 0.15rem;
}

.bm-user-menu__name {
  font-weight: 700;
  letter-spacing: -0.01em;
  margin: 0;
}

.bm-user-menu__email {
  margin: 0;
  font-size: 0.9rem;
}

.bm-user-menu__guest {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
}

.bm-user-menu__roles {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.bm-user-menu__actions {
  display: grid;
  gap: 0.6rem;
}

.bm-user-menu__btn {
  width: 100%;
  justify-content: center;
}

.bm-user-skel {
  opacity: 0.75;
}
</style>
