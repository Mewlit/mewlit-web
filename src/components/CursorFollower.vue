<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'

const x = ref(0)
const y = ref(0)
const hasMoved = ref(false)
const targetX = ref(0)
const targetY = ref(0)
let animationFrame = 0

const onMouseMove = (event: MouseEvent) => {
  hasMoved.value = true
  targetX.value = event.clientX
  targetY.value = event.clientY
}

const animate = () => {
  const dx = targetX.value - x.value
  const dy = targetY.value - y.value
  x.value += dx * 0.16
  y.value += dy * 0.16
  animationFrame = requestAnimationFrame(animate)
}

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove)
  animationFrame = requestAnimationFrame(animate)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  cancelAnimationFrame(animationFrame)
})

const ballStyle = computed(() => ({
  opacity: hasMoved.value ? 1 : 0,
  transform: `translate3d(${x.value - 7.5}px, ${y.value - 7.5}px, 0)`,
}))
</script>

<template>
  <div class="pointer-events-none fixed inset-0 z-[1200]">
    <div
      class="pointer-events-none absolute h-3.5 w-3.5 rounded-full bg-slate-900/90 shadow-xl shadow-slate-900/40 dark:bg-slate-100/90"
      :style="ballStyle"
    />
  </div>
</template>
