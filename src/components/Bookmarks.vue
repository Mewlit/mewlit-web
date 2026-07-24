<script setup lang="ts">
defineOptions({
  name: 'BookmarksList',
})

const description =
  'わたくしが普段使用してるサイトや参考になったサイト群達ですわ❤️'

// カテゴリ定義の型（表示タイトルとキーの対応付け）
const categories = [
  { key: 'sns', title: 'SNSとか' },
  { key: 'tools', title: 'ツール系' },
  { key: 'ai', title: 'AI系' },
  { key: 'blogs', title: 'ブログ等' },
] as const

type categoryKey = (typeof categories)[number]['key']

interface Bookmark {
  label: string
  url: string
  category: categoryKey
}

/* ブックマークリスト
  label: 名前
  url: アドレス
  category: カテゴリー
*/
const bookmarks: Bookmark[] = [
  {
    label: 'ひらたけさんブログ',
    url: 'https://hiratake.dev/',
    category: 'blogs',
  },
  {
    label: 'YouTube',
    url: 'https://www.youtube.com/',
    category: 'sns',
  },
  {
    label: 'Twitter (新: X)',
    url: 'https://x.com/',
    category: 'sns',
  },
  {
    label: 'Misskey',
    url: 'https://misskey.io/',
    category: 'sns',
  },
  {
    label: 'BlueSky',
    url: 'https://bsky.app/',
    category: 'sns',
  },
  {
    label: 'Github',
    url: 'https://github.com/',
    category: 'tools',
  },
  {
    label: 'CloudFlare',
    url: 'https://cloudflare.com/',
    category: 'tools',
  },
  {
    label: 'Metalab agency',
    url: 'https://www.metalab.com/',
    category: 'tools',
  },
  {
    label: 'Gemini',
    url: 'https://gemini.google.com/',
    category: 'ai',
  },
  {
    label: 'Claude AI',
    url: 'https://claude.ai/',
    category: 'ai',
  },
  {
    label: 'SVG Spinners',
    url: 'https://github.com/n3r4zzurr0/svg-spinners',
    category: 'tools',
  },
  {
    label: 'qiita',
    url: 'https://qiita.com/',
    category: 'blogs',
  },
  {
    label: 'Haikei - SVG background generator',
    url: 'https://app.haikei.app/',
    category: 'tools',
  },
  {
    label: 'TailScale',
    url: 'https://tailscale.com/',
    category: 'tools',
  },
  {
    label: 'rakko.tools',
    url: 'https://rakko.tools/ja',
    category: 'tools',
  },
  {
    label: 'Figma',
    url: 'https://www.figma.com/',
    category: 'tools',
  },
  {
    label: 'Notion',
    url: 'https://www.notion.so/',
    category: 'tools',
  },
  {
    label: 'Cloudflare Pages',
    url: 'https://pages.cloudflare.com/',
    category: 'tools',
  },
]

// カテゴリごとにグループ化する Computed
const categorizedBookmarks = computed(() => {
  return categories
    .map((cat) => ({
      ...cat,
      items: bookmarks.filter((b) => b.category === cat.key),
    }))
    .filter((cat) => cat.items.length > 0) // 要素が存在するカテゴリのみ抽出
})

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

    <!-- カテゴリごとのブロック -->
    <div
      v-for="category in categorizedBookmarks"
      :key="category.key"
      class="flex flex-col gap-4"
    >
      <h2 class="text-lg font-bold text-slate-800 dark:text-slate-100">
        {{ category.title }}
      </h2>

      <ul class="grid gap-3 sm:grid-cols-2">
        <li v-for="bookmark in category.items" :key="bookmark.url">
          <a
            :href="bookmark.url"
            :title="bookmark.label"
            target="_blank"
            rel="noreferrer"
            class="border-border-slate-800 group flex items-center gap-3 rounded-2xl border bg-white/0 p-4 shadow-sm outline-none transition duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-md focus-visible:-translate-y-0.5 focus-visible:shadow-md focus-visible:ring-2 focus-visible:ring-primary dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-primary dark:focus-visible:ring-sky-400"
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
              <p
                class="truncate font-medium text-slate-800 dark:text-slate-100"
              >
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
    </div>
  </section>
</template>
