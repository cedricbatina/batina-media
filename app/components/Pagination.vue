<template>
  <nav
    class="app-pagination"
    :aria-label="ariaLabelComputed"
  >
    <div class="app-pagination__inner">
      <!-- Résumé -->
      <p
        v-if="showSummary && totalItems > 0"
        class="app-pagination__summary"
        aria-live="polite"
      >
        {{
          totalItems > 1
            ? t('pagination.summaryMany', {
                start: startItem,
                end: endItem,
                total: totalItems,
              })
            : t('pagination.summaryOne', {
                start: startItem,
                end: endItem,
                total: totalItems,
              })
        }}
      </p>
<div v-if="showSelect && totalPages > 1" class="app-pagination__quick">
  <label class="app-pagination__quick-label">
    <span class="app-pagination__quick-text">{{ t('pagination.gotoLabel') }}</span>
    <select
      class="app-pagination__quick-select"
      :value="currentPage"
      @change="goToPage(($event.target.value))"
      :aria-label="t('pagination.gotoAria', { totalPages })"
    >
      <option v-for="n in totalPages" :key="n" :value="n">
        {{ t('pagination.pageX', { n }) }}
      </option>
    </select>
  </label>
</div>

      <ul class="app-pagination__list">
        <!-- Bouton Précédent -->
        <li class="app-pagination__item">
          <button
            type="button"
            class="app-pagination__btn app-pagination__btn--nav"
            :class="{ 'app-pagination__btn--disabled': isFirstPage }"
            :disabled="isFirstPage"
            @click="goToPage(currentPage - 1)"
            :aria-label="labelPrevComputed"
          >
           <span class="app-pagination__icon" aria-hidden="true">
  <UIcon name="i-lucide-chevron-left" />
</span>

            <span class="app-pagination__text">
              {{ labelPrevComputed }}
            </span>
          </button>
        </li>

        <!-- Pages -->
        <li
          v-for="page in visiblePages"
          :key="page.key"
          class="app-pagination__item app-pagination__item--page"
        >
          <button
            v-if="page.type === 'page'"
            type="button"
            class="app-pagination__btn app-pagination__btn--page"
            :class="{
              'app-pagination__btn--active': page.number === currentPage
            }"
            @click="goToPage(page.number)"
            :aria-current="page.number === currentPage ? 'page' : undefined"
          >
            {{ page.number }}
          </button>
          <span
            v-else
            class="app-pagination__ellipsis"
            aria-hidden="true"
          >
          
          </span>
        </li>

        <!-- Bouton Suivant -->
        <li class="app-pagination__item">
          <button
            type="button"
            class="app-pagination__btn app-pagination__btn--nav"
            :class="{ 'app-pagination__btn--disabled': isLastPage }"
            :disabled="isLastPage"
            @click="goToPage(currentPage + 1)"
            :aria-label="labelNextComputed"
          >
            <span class="app-pagination__text">
              {{ labelNextComputed }}
            </span>
            <span class="app-pagination__icon" aria-hidden="true">
  <UIcon name="i-lucide-chevron-right" />
</span>

          </button>
        </li>

        <!-- Aller à la page -->
        <li
          v-if="showGoto && totalPages > 1"
          class="app-pagination__item app-pagination__item--goto"
        >
          <div class="app-pagination__goto">
            <label class="app-pagination__goto-label">
              <span class="app-pagination__goto-label-text">
                {{ t('pagination.gotoLabel') }}
              </span>
              <input
                v-model="inputPage"
                type="number"
                class="app-pagination__goto-input"
                inputmode="numeric"
                pattern="[0-9]*"
                min="1"
                :max="totalPages"
                :aria-label="t('pagination.gotoAria', { totalPages })"
                @input="onInputPageChange"
                @keydown.enter.prevent="applyInputPage"
                @blur="applyInputPage"
              />
              <span class="app-pagination__goto-total">
                {{ t('pagination.gotoTotal', { totalPages }) }}
              </span>
            </label>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  },
  totalItems: {
    type: Number,
    default: 0
  },
  pageSize: {
    type: Number,
    default: 0
  },
  showSummary: {
    type: Boolean,
    default: true
  },
  showGoto: {
    type: Boolean,
    default: true
  },
  ariaLabel: {
    type: String,
    default: ''
  },
  labelPrev: {
    type: String,
    default: ''
  },
  labelNext: {
    type: String,
    default: ''
  },
  showSelect: { type: Boolean, default: true },

})

const emit = defineEmits(['pageChange'])
const { t } = useI18n()

// Input local pour "aller à la page"
const inputPage = ref(props.currentPage)

// garde input synchronisé avec la page actuelle
watch(
  () => props.currentPage,
  (val) => {
    inputPage.value = val
  }
)

// États de base
const isFirstPage = computed(() => props.currentPage <= 1)
const isLastPage = computed(
  () => props.currentPage >= props.totalPages || props.totalPages <= 1
)

// Résumé X–Y sur Z
const startItem = computed(() => {
  if (!props.totalItems || !props.pageSize) return 1
  return (props.currentPage - 1) * props.pageSize + 1
})

const endItem = computed(() => {
  if (!props.totalItems || !props.pageSize) return props.totalItems
  const raw = props.currentPage * props.pageSize
  return raw > props.totalItems ? props.totalItems : raw
})

// Labels / aria via i18n (fallback si props non fournis)
const ariaLabelComputed = computed(
  () => props.ariaLabel || t('pagination.ariaLabel')
)
const labelPrevComputed = computed(
  () => props.labelPrev || t('pagination.prev')
)
const labelNextComputed = computed(
  () => props.labelNext || t('pagination.next')
)

// Algorithme d'affichage des pages (1 ... 4 5 [6] 7 8 ... 30)
const visiblePages = computed(() => {
  const total = props.totalPages
  const current = props.currentPage
  const pages = []

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push({ type: 'page', number: i, key: `p-${i}` })
    }
    return pages
  }

  const addPage = (n) => pages.push({ type: 'page', number: n, key: `p-${n}` })
  const addEllipsis = (id) =>
    pages.push({ type: 'ellipsis', key: `e-${id}` })

  addPage(1)

  if (current > 3) {
    addEllipsis('left')
  }

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)

  for (let i = start; i <= end; i++) {
    addPage(i)
  }

  if (current < total - 2) {
    addEllipsis('right')
  }

  addPage(total)

  return pages
})

// Navigation
function goToPage(page) {
  const target = Number(page)

  if (!Number.isFinite(target)) return
  if (target < 1 || target > props.totalPages) return

  if (target !== props.currentPage) {
    emit('pageChange', target)
  }
}

// "Aller à la page" à partir de l'input
function applyInputPage() {
  let page = Number(inputPage.value)

  if (!Number.isFinite(page) || page < 1) {
    page = 1
  }
  if (page > props.totalPages) {
    page = props.totalPages
  }

  inputPage.value = page
  goToPage(page)
}

function onInputPageChange(event) {
  const raw = event.target.value
  const target = Number(raw)

  inputPage.value = raw

  // On ne déclenche que si c’est un nombre valide dans la plage
  if (!Number.isFinite(target)) return
  if (target < 1 || target > props.totalPages) return

  goToPage(target)
}
</script>

<style scoped>
.app-pagination {
  width: 100%;
  padding-top: var(--bm-space-md);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  margin-top: var(--bm-space-md);
}

.app-pagination__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--bm-space-md);
}

/* Résumé (X–Y sur Z) */
.app-pagination__summary {
  font-size: 0.85rem;
  color: var(--bm-text-muted);
}

/* Liste principale */
.app-pagination__list {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.app-pagination__item {
  display: flex;
}

/* Boutons génériques */
.app-pagination__btn {
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(12, 16, 26, 0.9);
  color: var(--bm-text-main, #ffffff);
  padding: 0.35rem 0.75rem;
  font-size: 0.82rem;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  cursor: pointer;
  transition:
    background 140ms ease,
    border-color 140ms ease,
    color 140ms ease,
    transform 120ms ease;
}

.app-pagination__btn:hover {
  background: rgba(20, 25, 40, 0.98);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

.app-pagination__btn:active {
  transform: translateY(0);
}

/* Nav (Précédent / Suivant) */
.app-pagination__btn--nav {
  padding-inline: 0.9rem;
}

.app-pagination__btn--disabled,
.app-pagination__btn--disabled:hover {
  opacity: 0.4;
  cursor: default;
  transform: none;
}

/* Pages */
.app-pagination__btn--page {
  min-width: 2rem;
  justify-content: center;
}

.app-pagination__btn--active {
  background: linear-gradient(120deg, #f97316, #ec4899);
  border-color: transparent;
  color: #0b0f19;
  font-weight: 600;
}

/* Ellipsis */
.app-pagination__ellipsis {
  padding-inline: 0.4rem;
  font-size: 0.85rem;
  color: var(--bm-text-muted);
}

/* Goto block */
.app-pagination__item--goto {
  margin-left: 0.5rem;
}

.app-pagination__goto {
  display: flex;
  align-items: center;
}

.app-pagination__goto-label {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8rem;
  color: var(--bm-text-muted);
}

.app-pagination__goto-input {
  width: 3rem;
  padding: 0.25rem 0.4rem;
  border-radius: 0.6rem;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(10, 14, 24, 0.95);
  color: var(--bm-text-main, #ffffff);
  font-size: 0.8rem;
  text-align: center;
}

.app-pagination__goto-input:focus {
  outline: none;
  border-color: var(--bm-color-accent-soft, #f97316);
  box-shadow: 0 0 0 1px rgba(249, 115, 22, 0.3);
}

.app-pagination__goto-total {
  font-size: 0.78rem;
  color: var(--bm-text-muted);
}

/* Icônes */
.app-pagination__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
}

.app-pagination__text {
  line-height: 1;
}

/* Responsif */
@media (max-width: 640px) {
  .app-pagination__inner {
    flex-direction: column;
    align-items: flex-start;
  }

  .app-pagination__summary {
    order: 2;
  }

  .app-pagination__list {
    order: 1;
    flex-wrap: wrap;
  }
}
</style>
