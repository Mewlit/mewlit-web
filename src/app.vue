<script lang="ts" setup>
// Assets
import '@fontsource/noto-sans-jp/400.css'
import '@fontsource/noto-sans-jp/700.css'
import '@fontsource/lexend/400.css'
import '@fontsource/lexend/900.css'
import '@fontsource/source-code-pro/400.css'
import '@fontsource/source-code-pro/700.css'

const website = useWebsite()
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
