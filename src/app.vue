<script lang="ts" setup>
const website = useWebsite()

useHead({
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Lexend:wght@400;900&family=Kosugi+Maru:wght@400&family=Noto+Sans+JP:wght@400;700&family=Source+Code+Pro:wght@400;700&display=swap',
    },
  ],
})
</script>

<template>
  <Body
    class="body min-h-screen bg-white text-slate-800 antialiased dark:bg-slate-900 dark:text-slate-100"
  >
    <SeoDefault />
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator :height="2" :color="website.themeColor" />

    <!-- TheNavber（Fixedで浮いているため、単体で配置） -->
    <TheNavber />

    <!-- 全体コンテンツをギュッと中央に寄せるための枠組み -->
    <div class="mx-auto max-w-4xl px-4 sm:px-4">
      <!-- ナビゲーションバーと被らないよう、上部に余白（pt-24など）を確保 -->
      <main class="pb-16 pt-24">
        <NuxtPage />
      </main>
    </div>
    <TheFooter />
  </Body>
</template>
