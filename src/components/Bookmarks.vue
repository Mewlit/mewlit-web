<script setup lang="ts">
defineOptions({
  name: 'BookmarksList',
})

const description =
  'わたくしが普段使用してるサイトや参考になったサイト群達ですわ❤️'

const bookmarks = [
  {
    id: 1,
    label: 'ひらたけさんブログ',
    url: 'https://hiratake.dev/',
  },
  {
    id: 2,
    label: 'YouTube',
    url: 'https://www.youtube.com/',
  },
  {
    id: 3,
    label: 'Twitter (新: X)',
    url: 'https://x.com/',
  },
  {
    id: 4,
    label: 'Misskey',
    url: 'https://misskey.io/',
  },
  {
    id: 5,
    label: 'BlueSky',
    url: 'https://bsky.app/',
  },
  {
    id: 6,
    label: 'Github',
    url: 'https://github.com/',
  },
  {
    id: 7,
    label: 'CloudFlare',
    url: 'https://cloudflare.com/',
  },
  {
    id: 8,
    label: 'Metalab agency',
    url: 'https://www.metalab.com/',
  },
  {
    id: 9,
    label: 'Gemini',
    url: 'https://gemini.google.com/',
  },
  {
    id: 10,
    label: 'Claude AI',
    url: 'https://claude.ai/',
  },
  {
    id: 11,
    label: 'SVG Spinners',
    url: 'https://github.com/n3r4zzurr0/svg-spinners',
  },
  {
    id: 12,
    label: 'qiita',
    url: 'https://qiita.com/',
  },
  {
    id: 13,
    label: 'Haikei - SVG background generator',
    url: 'https://app.haikei.app/',
  },
  {
    id: 14,
    label: 'TailScale',
    url: 'https://tailscale.com/',
  },
  {
    id: 15,
    label: 'rakko.tools',
    url: 'https://rakko.tools/ja',
  },
  {
    id: 16,
    label: 'Figma',
    url: 'https://www.figma.com/',
  },
  {
    id: 17,
    label: 'Notion',
    url: 'https://www.notion.so/',
  },
  {
    id: 18,
    label: 'Cloudflare Pages',
    url: 'https://pages.cloudflare.com/',
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
    <PageHeader title="最高なブックマーク">
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
              alt=""
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
