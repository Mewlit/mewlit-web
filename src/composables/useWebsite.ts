export const useWebsite = () => {
  const config = useRuntimeConfig()
  const app = useAppConfig()
  const site = useSiteConfig()

  return computed(() => ({
    /**
     * ウェブサイトのURL
     */
    url: site.url,
    /**
     * ウェブサイトの名前
     */
    name: (site.name as string | undefined) || '',
    /**
     * ウェブサイトの概要
     */
    description: (site.description as string | undefined) || '',
    /**
     * ウェブサイトの言語設定
     */
    locale: (site.defaultLocale as string | undefined) || '',
    /**
     * ウェブサイトのテーマカラー
     */
    themeColor: app.themeColor,
    /**
     * ウェブサイトの運営者
     */
    owner: app.owner,
    /** ソーシャルメディア */
    socials: {
      /** Bluesky */
      bluesky: {
        /**
         * サービス名
         */
        name: app.socials.bluesky.name,
        /**
         * ハンドルネーム
         */
        handle: app.socials.bluesky.handle,
        /**
         * URL
         */
        url: app.socials.bluesky.url,
      },
      /** GitHub */
      github: {
        /**
         * サービス名
         */
        name: app.socials.github.name,
        /**
         * ハンドルネーム
         */
        handle: app.socials.github.handle,
        /**
         * URL
         */
        url: app.socials.github.url,
      },
      /** Discord */
      discord: {
        /**
         * サービス名
         */
        name: app.socials.discord.name,
        /**
         * ハンドルネーム
         */
        handle: app.socials.discord.handle,
        /**
         * URL
         */
        url: app.socials.discord.url,
      },
      /** X */
      x: {
        /**
         * サービス名
         */
        name: app.socials.x.name,
        /**
         * ハンドルネーム
         */
        handle: app.socials.x.handle,
        /**
         * URL
         */
        url: app.socials.x.url,
      },
      /** Misskey */
      misskey: {
        /**
         * サービス名
         */
        name: app.socials.misskey.name,
        /**
         * ハンドルネーム
         */
        handle: app.socials.misskey.handle,
        /**
         * URL
         */
        url: app.socials.misskey.url,
      },
      /** Steam */
      steam: {
        /**
         * サービス名
         */
        name: app.socials.steam.name,
        /**
         * ハンドルネーム
         */
        handle: app.socials.steam.handle,
        /**
         * URL
         */
        url: app.socials.steam.url,
      },
      /** RSS */
      rss: {
        /**
         * サービス名
         */
        name: app.socials.rss.name,
        /**
         * URL
         */
        url: app.socials.rss.url,
      },
    },
    /** ヘッダーの情報 */
    header: {
      /**
       * メニューの項目
       */
      menu: app.header.menu,
    },
    /** フッターの情報 */
    footer: {
      /**
       * メニューの項目
       */
      menu: app.footer.menu,
    },
    /** 一覧画面に表示するページあたりの投稿数 */
    itemPerPage: app.itemPerPage,
    /**
     * Google Tag Manager ID
     * @example 'GTM-XXXXXXX'
     */
    gtmId: config.public.gtmId,
    /**
     * Cloudflare Images のアカウントハッシュ
     * @example 'xxxxxxxxxxxxxxxxxxxxxx'
     */
    cloudflareImageHash: config.public.cloudflareImageHash,
  }))
}

export type UseWebsiteReturn = ReturnType<typeof useWebsite>
