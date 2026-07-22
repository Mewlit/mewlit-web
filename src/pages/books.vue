<script lang="ts" setup>
const website = useWebsite()
const { data, error } = await useAsyncData('books', () =>
  queryCollection('home').path('/').first(),
)

if (error.value) {
  throw createError({
    statusCode: 404,
    message: 'ページが見つかりません',
    fatal: true,
  })
}

const name = website.value.name
const description = website.value.description

useSeoMeta({
  title: () => `Books | ${name}`,
  description: () => data.value?.description || description,
  ogType: 'website',
})

useSchemaOrg([defineBreadcrumb({ itemListElement: [{ name, item: '/' }] })])
</script>

<template>
  <main
    class="main mx-auto flex max-w-5xl flex-col gap-10 px-4 py-8 sm:px-6 lg:px-8"
  >
    <Bookmarks />
  </main>
</template>
