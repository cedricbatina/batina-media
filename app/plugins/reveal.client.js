import { nextTick } from 'vue'

export default defineNuxtPlugin((nuxtApp) => {
  // Extra safety (the .client suffix already prevents SSR execution)
  if (import.meta.server) return

  const prefersReduced = () => {
    try {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    } catch {
      return false
    }
  }

  let io = null

  const ensureIO = () => {
    if (io) return io
    io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const el = entry.target
          el.classList.add('is-revealed')
          io.unobserve(el)
        }
      },
      {
        threshold: 0.16,
        rootMargin: '0px 0px -10% 0px'
      }
    )
    return io
  }

  const scan = async () => {
    await nextTick()

    const els = Array.from(
      document.querySelectorAll('.js-reveal:not(.is-revealed):not([data-reveal-bound])')
    )

    if (!els.length) return

    // Accessibility: no animation
    if (prefersReduced()) {
      for (const el of els) {
        el.classList.add('is-revealed')
        el.dataset.revealBound = '1'
      }
      return
    }

    const observer = ensureIO()

    els.forEach((el, idx) => {
      el.dataset.revealBound = '1'

      // Stagger only if no explicit delay is provided
      const hasDelay = el.style.getPropertyValue('--reveal-delay')
      if (!hasDelay) {
        const ms = Math.min(idx * 40, 240)
        el.style.setProperty('--reveal-delay', `${ms}ms`)
      }

      observer.observe(el)
    })
  }

  // Initial + after each navigation
  nuxtApp.hook('app:mounted', scan)
  nuxtApp.hook('page:finish', scan)
})
