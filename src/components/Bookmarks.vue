<script setup lang="ts">
defineOptions({
  name: 'BookmarksList',
})

const description =
  "Awesome things I've found on the internet. This page is still WIP, and I want to add search like bmrks.com."

const bookmarks = [
  {
    id: 1,
    label: 'Adam Wathan - Tailwind CSS Best Practice Patterns',
    url: 'https://www.youtube.com/watch?v=J_7_mnFSLDg',
  },
  {
    id: 2,
    label: 'Dicebear Awesome avatars',
    url: 'https://www.dicebear.com/',
  },
  {
    id: 3,
    label: 'Circuit design stock image',
    url: 'https://images.unsplash.com/photo-1592659762303-90081d34b277?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2873&q=80',
  },
  {
    id: 4,
    label: 'Beautiful Gradient Generator',
    url: 'https://www.joshwcomeau.com/gradient-generator/',
  },
  {
    id: 5,
    label: '3D device mockups',
    url: 'https://deviceframes.com/',
  },
  {
    id: 6,
    label: 'Box shadow examples',
    url: 'https://getcssscan.com/css-box-shadow-examples',
  },
  {
    id: 7,
    label: 'Octupos Illustration',
    url: 'https://refine.new/',
  },
  {
    id: 8,
    label: 'Metalab agency',
    url: 'https://www.metalab.com/',
  },
  {
    id: 9,
    label: 'Tines - Beautiful landing page',
    url: 'https://www.tines.com/product',
  },
  {
    id: 10,
    label: 'SVG Spinners',
    url: 'https://github.com/n3r4zzurr0/svg-spinners',
  },
  {
    id: 11,
    label: 'ASCII Flow - Text based image drawing',
    url: 'https://asciiflow.com/#/',
  },
  {
    id: 12,
    label: 'REQRES Mock apis for testing',
    url: 'https://reqres.in/',
  },
  {
    id: 13,
    label: 'Haikei - SVG background generator',
    url: 'https://app.haikei.app/',
  },
  {
    id: 14,
    label: 'IP API',
    url: 'https://ipapi.is/',
  },
  {
    id: 15,
    label: 'Rakko Tools',
    url: 'https://en.rakko.tools/',
  },
]

function getHost(url: string) {
  const parsedUrl = new URL(url)
  let host = parsedUrl.host

  if (host.startsWith('www.')) {
    host = host.substring(4)
  }

  return host
}

function getThumbnail(url: string) {
  const host = getHost(url)
  return `https://www.google.com/s2/favicons?domain=${host}&sz=64`
}
</script>

<template>
  <section class="flex flex-col gap-8">
    <PageHeader title="Bookmarks">
      <p class="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
        {{ description }}
      </p>
    </PageHeader>

    <ul class="grid gap-3 sm:grid-cols-2">
      <li v-for="bookmark in bookmarks" :key="bookmark.id">
        <a
          :href="bookmark.url"
          target="_blank"
          rel="noreferrer"
          class="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-slate-700"
        >
          <div
            class="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800"
          >
            <img
              :src="getThumbnail(bookmark.url)"
              :alt="bookmark.label"
              class="h-8 w-8 object-contain"
              loading="lazy"
            />
          </div>

          <div class="min-w-0 flex-1">
            <p class="truncate font-medium text-slate-800 dark:text-slate-100">
              {{ bookmark.label }}
            </p>
            <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {{ getHost(bookmark.url) }}
            </p>
          </div>

          <span
            class="i-ph-arrow-square-out-bold size-4 text-slate-400 transition group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300"
          />
        </a>
      </li>
    </ul>
  </section>
</template>
