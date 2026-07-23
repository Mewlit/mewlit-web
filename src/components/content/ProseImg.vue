<script lang="ts" setup>
type ProseImgProps = {
  /** 画像URL */
  src?: string
  /** 代替テキスト */
  alt?: string
  /** 幅 */
  width?: string | number
  /** 高さ */
  height?: string | number
}

const props = withDefaults(defineProps<ProseImgProps>(), {
  src: '',
  alt: '',
  width: 1536,
  height: 864,
})

const website = useWebsite()

const isExternalOrAbsolutePath = computed(() =>
  /^(https?:\/\/|\/)/.test(props.src || ''),
)

/** 画像URL（CDNの場合はベースURLのみ、幅は付与しない） */
const imageUrl = computed(() => {
  const src = props.src || ''
  if (!src) return ''

  if (isExternalOrAbsolutePath.value) {
    return src
  }

  const url = website.value.url
  const hash = website.value.cloudflareImageHash
  return `${url}/cdn-cgi/imagedelivery/${hash}/${props.src}`
})

/** 実際のsrc属性値 */
const finalSrc = computed(() =>
  isExternalOrAbsolutePath.value ? imageUrl.value : `${imageUrl.value}/w=1536`,
)

/** 実際のsrcset属性値（絶対パス/外部URLの場合はsrcsetなし） */
const finalSrcset = computed(() => {
  if (isExternalOrAbsolutePath.value) return undefined

  return `
    ${imageUrl.value}/w=320 320w,
    ${imageUrl.value}/w=640 640w,
    ${imageUrl.value}/w=768 768w,
    ${imageUrl.value}/w=1024 1024w,
    ${imageUrl.value}/w=1280 1280w,
    ${imageUrl.value}/w=1536 1536w
  `
})
</script>

<template>
  <img
    v-if="props.src"
    :src="finalSrc"
    :srcset="finalSrcset"
    :alt="props.alt"
    :width="props.width"
    :height="props.height"
    class="my-10 rounded-lg border border-slate-100 bg-slate-200 dark:border-slate-800 dark:bg-slate-800"
    decoding="async"
    loading="lazy"
    sizes="(max-width: 768px) calc(100vw - 48px), 768px"
  />
</template>
