<script lang="ts" setup>
import { Switch } from '@headlessui/vue'
import { useFixedHeader } from 'vue-use-fixed-header'

// 固定ヘッダー制御
const headerRef = ref<HTMLElement | null>(null)
const { styles } = useFixedHeader(headerRef)

// Composables & State
const website = useWebsite()
const colorMode = useColorMode()
const { copy } = useClipboard({ source: website.value.socials.rss.url })

/** ウェブサイトの名前 */
const name = website.value.name

/** ダークモード管理 */
const isDark = computed<boolean>({
  get: () => colorMode.value === 'dark',
  set: (val) => (colorMode.value = val ? 'dark' : 'light'),
})

/** ソーシャルリンク */
const socials = website.value.socials

/** RSSフィードコピー通知ツールチップの表示状態 */
const isVisibleRssFeedCopyTooltip = ref<boolean>(false)

/** RSSフィードのURLをコピーする */
const rssFeedCopy = () => {
  copy()
  isVisibleRssFeedCopyTooltip.value = true
}

// 3秒後にツールチップを非表示にする
whenever(
  () => isVisibleRssFeedCopyTooltip.value,
  () =>
    useTimeoutFn(() => {
      isVisibleRssFeedCopyTooltip.value = false
    }, 3000),
)

// ナビゲーションメニュー定義（動的データとアイコンを紐付け）
const items = computed(() => [
  { name: 'Home', path: '/', icon: 'i-ph-house' },
  { name: 'OriginalHome', path: '/original', icon: 'i-ph-house-simple' },
  {
    name: 'About',
    path: '/about',
    icon: 'i-ph-files',
  },
  {
    name: 'Diary',
    path: '/blog',
    icon: 'i-ph-pen',
  },
  { name: 'Lab', path: '/labs', icon: 'i-ph-beer-bottle' },
  {
    name: 'Bags',
    path: '/bags',
    icon: 'i-ph-bag',
  },
  {
    name: 'Bookmarks',
    path: '/books',
    icon: 'i-ph-book',
  },
])
</script>

<template>
  <div ref="headerRef" :style="styles" class="fixed top-0 z-50 w-full">
    <nav class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <ul
        class="my-4 flex items-center gap-1 rounded-full bg-white/90 px-4 py-1.5 text-sm font-medium text-gray-800 shadow-lg shadow-gray-800/5 ring-1 ring-gray-900/5 backdrop-blur dark:bg-gray-800/90 dark:text-gray-200 dark:ring-white/20"
      >
        <!-- ロゴエリア -->
        <li class="mr-2 flex items-center">
          <NuxtLink
            :title="`${name} トップページ`"
            to="/"
            class="flex items-center transition-opacity hover:opacity-70"
          >
            <img
              :alt="`${name} ロゴ`"
              src="/android-chrome-512x512.png"
              width="100"
              height="25"
              class="block h-6 w-auto dark:hidden"
            />
            <img
              :alt="`${name} ロゴ`"
              src="/android-chrome-512x512.png"
              width="100"
              height="25"
              class="hidden h-6 w-auto dark:block"
            />
            <!--
            <img
              :alt="`${name} ロゴ`"
              src="/assets/logo-light.svg"
              width="100"
              height="25"
              class="block h-6 w-auto dark:hidden"
            />
            <img
              :alt="`${name} ロゴ`"
              src="/assets/logo-dark.svg"
              width="100"
              height="25"
              class="hidden h-6 w-auto dark:block"
            />
            -->
          </NuxtLink>
        </li>

        <!-- ディバイダー -->
        <li class="h-4 w-px bg-gray-200 dark:bg-gray-700" />

        <!-- ナビゲーションメニュー -->
        <li v-for="item in items" :key="item.path">
          <NuxtLink
            :to="item.path"
            :title="item.name"
            class="hover:text-primary-500 dark:hover:text-primary-400 relative z-10 flex size-9 items-center justify-center text-gray-700 transition dark:text-gray-200"
            active-class="text-primary-600 dark:text-primary-400"
          >
            <!-- アイコン本体：z-10 で背景より前面に配置 -->
            <span :class="[item.icon, 'relative z-10 size-5 shrink-0']" />

            <!-- アクティブ時のアンダーライン -->
            <span
              v-if="$route.path === item.path"
              class="from-primary-500/0 via-primary-500/70 to-primary-500/0 dark:from-primary-400/0 dark:via-primary-400/40 dark:to-primary-400/0 absolute inset-x-1 -bottom-px z-10 h-px bg-gradient-to-r"
            />

            <!-- アクティブ時の背景円：z-0 でアイコンの後ろに配置 -->
            <span
              v-if="$route.path === item.path"
              class="absolute left-1/2 top-1/2 z-0 size-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-100 dark:bg-white/10"
            />

            <span class="sr-only">{{ item.name }}</span>
          </NuxtLink>
        </li>

        <!-- スペーサー -->
        <li class="flex-1" />

        <!-- アクションエリア（Discord / RSS / ダークモード切替） -->
        <li class="flex items-center gap-1">
          <!-- Discord リンク -->
          <NuxtLink
            :to="socials.discord.url"
            :title="socials.discord.name"
            aria-label="Discordサーバに参加する"
            target="_blank"
            class="relative flex size-8 items-center justify-center rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-white/10"
          >
            <span class="i-simple-icons-discord size-4" />
          </NuxtLink>

          <!-- RSS コピーボタン -->
          <button
            :title="socials.rss.name"
            aria-label="RSSフィードのURLをコピーする"
            class="relative flex size-8 items-center justify-center rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-white/10"
            @click="rssFeedCopy"
          >
            <span class="i-ph-rss-bold size-4" />

            <!-- コピー完了通知ツールチップ -->
            <span
              :class="[
                isVisibleRssFeedCopyTooltip ? 'opacity-100' : 'opacity-0',
              ]"
              class="pointer-events-none absolute -bottom-8 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white shadow-md transition-opacity dark:bg-white dark:text-gray-900"
            >
              URLをコピーしました
            </span>
          </button>

          <!-- ダークモードトグル -->
          <Switch
            v-model="isDark"
            aria-label="カラーモードを切り替える"
            class="relative flex size-8 items-center justify-center rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-white/10"
          >
            <span class="i-ph-sun-bold size-4 dark:i-ph-moon-bold" />
          </Switch>
        </li>
      </ul>
    </nav>
  </div>
</template>
