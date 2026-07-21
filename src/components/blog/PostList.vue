<script lang="ts" setup>
type BlogPostListProps = {
  /** 取得する投稿数 */
  limit?: number
  /** スキップする投稿数 */
  skip?: number
}

const props = withDefaults(defineProps<BlogPostListProps>(), {
  limit: undefined,
  skip: 0,
})

const website = useWebsite()
const { data, error } = await useAsyncData(
  pathToUseAsyncDataKey(
    '/blog',
    `limit-${props.limit || website.value.itemPerPage}`,
    `skip-${props.skip}`,
  ),
  () =>
    queryCollection('blog')
      .select('path', 'title', 'description', 'created')
      .order('created', 'DESC')
      .limit(props.limit || website.value.itemPerPage)
      .skip(props.skip)
      .all(),
)

if (error.value || !data.value?.length) {
  throw createError({
    statusCode: 404,
    message: 'ページが見つかりません',
    fatal: true,
  })
}

/** ブログの投稿 */
const items = computed(() =>
  (data.value || [])
    .filter((item) => item.path && item.title && item.created)
    .map((item) => ({
      path: useTrailingSlash(blogPathToUrl(item.path)),
      title: item.title || '',
      description: item.description || '',
      created: useDatetimeFormat(item.created),
    })),
)
</script>

<template>
  <div class="mx-auto w-full max-w-5xl divide-y divide-slate-100 dark:divide-slate-800">
    <NuxtLink
      v-for="post in items"
      :key="post.path"
      :to="post.path"
      class="group flex items-center gap-4 py-4 transition-opacity hover:opacity-70"
    >
      <div class="min-w-0">
        <h3 class="truncate font-medium text-slate-800 dark:text-white">
          {{ post.title }}
        </h3>
        <p class="mt-1 truncate text-xs text-slate-400 dark:text-slate-500 sm:text-sm">
          {{ post.description }}
        </p>
      </div>

      <div
        class="mx-2 hidden h-px flex-1 border-t border-dashed border-slate-300 dark:border-slate-700 sm:block"
      />

      <time
        :datetime="post.created.hyphen"
        class="shrink-0 whitespace-nowrap text-xs text-slate-400 dark:text-slate-500"
      >
        {{ post.created.slash }}
      </time>
    </NuxtLink>
  </div>
</template>
