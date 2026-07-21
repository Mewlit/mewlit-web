// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: { titleTemplate: '%pageTitle' },
  },
  compatibilityDate: '2026-07-20',
  content: {
    build: {
      markdown: {
        highlight: { theme: 'github-dark' },
      },
    },
  },
  devtools: { enabled: true },
  linkChecker: { enabled: false },
  llms: {
    domain: process.env.CF_PAGES_URL || 'https://mirargent.site',
    title: 'Mewlit Web',
    description: 'Mewlitの個人ウェブサイトです。',
  },
  modules: [
    '@nuxtjs/seo',
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-llms',
  ],
  nitro: {
    prerender: { failOnError: false, crawlLinks: true, routes: ['/feed.xml'] },
  },
  ogImage: {
    enabled: false,
  },

  routeRules: {
    '/feed.xml': {
      headers: { 'content-type': 'application/rss+xml; charset=UTF-8' },
    },
  },
  runtimeConfig: {
    public: {
      gtmId: 'GTM-M39N2ZBR',
      cloudflareImageHash: '',
    },
  },
  schemaOrg: {
    identity: {
      type: 'Person',
      name: 'みゃうりっと',
      logo: '/logo.png',
      sameAs: [
        'https://bsky.app/profile/mirargent.site',
        'https://github.com/Mewlit',
      ],
    },
  },
  site: {
    url: process.env.CF_PAGES_URL || 'https://mirargent.site',
    name: 'Mewlit Web',
    description: 'みゃうりっとの個人ウェブサイトです。',
    defaultLocale: 'ja',
    trailingSlash: true,
  },
  sitemap: {
    exclude: [new RegExp(/^\/blog\/\d{4}\/\d{2}\/\d{2}\/$/)],
  },
  srcDir: 'src/',
  tailwindcss: { cssPath: '@/assets/tailwind.css' },
  vite: {
    optimizeDeps: { include: ['@headlessui/vue'] },
  },
})
