<script lang="ts" setup>
const website = useWebsite()
const { data, error } = await useAsyncData('home-bag', () =>
  queryCollection('home').path('/').first(),
)

if (error.value) {
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
  title: () => data.value?.title || name,
  description: () => data.value?.description || description,
  ogType: 'website',
})
useSchemaOrg([
  defineBreadcrumb({ itemListElement: [{ name: name, item: '/' }] }),
])
</script>

<template>
  <main v-if="data" class="main max-w-7xl gap-16 md:gap-20">
    誠意制作中だにゃ
  </main>
</template>
