<script lang="ts" setup>
type HomeBlogProps = {
  /** セクションのタイトル */
  title: string
  /** セクションの概要 */
  description: string
}

const props = defineProps<HomeBlogProps>()
</script>

<template>
  <section class="mx-auto w-full max-w-6xl sm:px-2 md:px-6">
    <h2
      class="mb-6 text-lg font-semibold uppercase tracking-wider text-gray-400"
    >
      {{ props.title }}
    </h2>

    <div class="flex flex-col gap-8">
      <p class="max-w-2xl text-sm leading-relaxed text-gray-500 dark:text-gray-400">
        {{ props.description }}
      </p>

      <BlogPostList :limit="5" />
    </div>

    <div class="mt-6 flex items-center justify-center text-sm">
      <AppLink
        to="/blog/"
        class="text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-white"
      >
        もっとみる &rarr;
      </AppLink>
    </div>
  </section>
</template>
