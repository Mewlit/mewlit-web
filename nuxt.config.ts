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
    fonts: ['Noto+Sans+JP:400', 'Noto+Sans+JP:700'],

    // https://github.com/harlan-zw/nuxt-seo/issues/109
    // https://nuxtseo.com/docs/og-image/renderers
    compatibility: {
      prerender: {
        resvg: 'wasm',
      },
      runtime: {
        resvg: 'wasm',
      },
    },
  },

  routeRules: {
    '/feed.xml': {
      headers: { 'content-type': 'application/rss+xml; charset=UTF-8' },
    },
  },
  runtimeConfig: {
    public: {
      gtmId: 'GTM-WF3MQWM',
      cloudflareImageHash: '3uWTcGTKoWPI8987WrI0hQ',
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
