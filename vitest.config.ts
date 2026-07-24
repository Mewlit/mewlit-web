import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

// Minimal Vitest setup for unit-testing Vue SFCs in isolation.
// Mirrors Nuxt's default `srcDir: 'src/'` alias configuration so that
// components can be imported the same way they are within the app
// (e.g. `~/components/CursorFollower.vue`).
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    environment: 'jsdom',
  },
})
