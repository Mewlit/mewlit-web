<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'

const x = ref(0)
const y = ref(0)
const hasMoved = ref(false)
const isEnabled = ref(false)
const targetX = ref(0)
const targetY = ref(0)
let animationFrame: number | null = null
let isAnimating = false
let mediaQuery: MediaQueryList | null = null

const onMouseMove = (event: MouseEvent) => {
  if (!isEnabled.value) return

  hasMoved.value = true
  targetX.value = event.clientX
  targetY.value = event.clientY

  if (!isAnimating) {
    isAnimating = true
    animationFrame = requestAnimationFrame(animate)
  }
}

const animate = () => {
  const dx = targetX.value - x.value
  const dy = targetY.value - y.value
  const distance = Math.hypot(dx, dy)

  if (distance < 0.5) {
    x.value = targetX.value
    y.value = targetY.value
    isAnimating = false
    animationFrame = null
    return
  }

  x.value += dx * 0.08
  y.value += dy * 0.08
  animationFrame = requestAnimationFrame(animate)
}

const updateEnabled = (event: MediaQueryListEvent | MediaQueryList) => {
  isEnabled.value = !event.matches
}

onMounted(() => {
  mediaQuery = window.matchMedia('(max-width: 768px)')
  updateEnabled(mediaQuery)
  mediaQuery.addEventListener('change', updateEnabled)
  window.addEventListener('mousemove', onMouseMove)
})

onUnmounted(() => {
  if (mediaQuery) {
    mediaQuery.removeEventListener('change', updateEnabled)
  }
  window.removeEventListener('mousemove', onMouseMove)
  if (!isEnabled.value && animationFrame !== null) {
    cancelAnimationFrame(animationFrame)
    animationFrame = null
    isAnimating = false
  }
})

const BALL_SIZE = 40
const BALL_RADIUS = BALL_SIZE / 2

const ballStyle = computed(() => ({
  opacity: hasMoved.value ? 1 : 0,
  width: `${BALL_SIZE}px`,
  height: `${BALL_SIZE}px`,
  transform: `translate3d(${x.value - BALL_RADIUS}px, ${y.value - BALL_RADIUS}px, 0)`,
}))
</script>

<template>
  <div v-if="isEnabled" class="pointer-events-none fixed inset-0 z-[-10]">
    <div
      class="pointer-events-none absolute h-10 w-10 rounded-full bg-primary/30 shadow-xl shadow-slate-900/30 dark:bg-slate-100/30"
      :style="ballStyle"
    />
  </div>
</template>
