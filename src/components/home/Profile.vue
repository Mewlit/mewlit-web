<script lang="ts" setup>
type HomeProfileProps = {
  /** セクションのタイトル */
  title: string
  /** 自己紹介文 */
  biography: string[]
}

const props = defineProps<HomeProfileProps>()
</script>

<template>
  <section
    class="mx-auto flex w-full max-w-6xl flex-col gap-10 sm:px-2 md:px-6"
  >
    <div class="flex items-center justify-between">
      <h2
      class="mb-6 text-lg font-semibold uppercase tracking-wider text-gray-400"
      >
        {{ props.title }}

      </h2>

      <div class="mt-6 flex items-center justify-center text-sm">
        <AppLink
          to="/about/"
          class="text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-white"
        >
          もっとみる &rarr;
        </AppLink>
      </div>

    </div>
    <div>
      <p
        v-for="item in props.biography"
        :key="item"
        class="mt-2.5 text-sm leading-relaxed first:mt-0"
      >
        {{ item }}
      </p>
    </div>
  </section>
</template>
