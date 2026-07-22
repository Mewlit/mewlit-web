<script lang="ts" setup>
const website = useWebsite()
const route = useRoute()
const { data, error } = await useAsyncData('index', () =>
  queryCollection('home').path('/').first(),
)

if (error.value) {
  throw createError({
    statusCode: 500,
    message: 'データの取得に失敗しました',
    fatal: true,
  })
}

if (!data.value) {
  throw createError({
    statusCode: 404,
    message: 'ページが見つかりません',
    fatal: true,
  })
}

/** ウェブサイトの名前 */
const name = website.value.name
/** ウェブサイトの概要 */
const description = website.value.description

useSeoMeta({
  title: () => data.value?.title || 'Bookmarks',
  description: () => data.value?.description || 'ブックマークページ',
  ogType: 'website',
})
useSchemaOrg([
  defineBreadcrumb({
    itemListElement: [
      { name: name, item: '/' },
      { name: 'Bookmarks', item: route.path },
    ],
  }),
])
</script>

<template>
  <main v-if="data" class="main max-w-7xl gap-16 md:gap-20">
    誠意制作中だにゃ
  </main>
</template>
