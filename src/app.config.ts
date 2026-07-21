// https://nuxt.com/docs/guide/directory-structure/app-config
export default defineAppConfig({
  /** ウェブサイトのテーマカラー */
  themeColor: '#B8F8FB',
  /** ウェブサイトの運営者 */
  owner: {
    name: 'みゃうりっと',
    url: 'https://mirargent.site/',
    icon: '/authors/mewlit-24x24.webp',
  },
  /** ソーシャルメディア */
  socials: {
    bluesky: {
      name: 'Bluesky',
      handle: '@mirargent.site',
      url: 'https://bsky.app/profile/mirargent.site',
    },
    github: {
      name: 'GitHub',
      handle: '@Mewlit',
      url: 'https://github.com/Mewlit',
    },
    discord: {
      name: 'Discord',
      handle: '@mewlit',
      url: 'https://chat.hiratake.dev/',
    },
    x: {
      name: 'X',
      handle: '@mewlit_dayo',
      url: 'https://x.com/mewlit_dayo',
    },
    misskey: {
      name: 'Misskey',
      handle: '@mewlit',
      url: 'https://misskey.io/@mewlit',
    },
    steam: {
      name: 'Steam',
      handle: '@',
      url: 'https://steamcommunity.com/id//',
    },
    rss: {
      name: 'mewlit Web Diary RSS Feed',
      url: 'https://mirargent.site/feed.xml',
    },
  },
  /** ヘッダーの情報 */
  header: {
    menu: [
      { title: '日記', url: '/blog/' },
      { title: '運営者情報', url: '/about/' },
      { title: 'お問い合わせ', url: '/contact/' },
    ],
  },
  /** フッターの情報 */
  footer: {
    menu: [
      { title: '日記', url: '/blog/' },
      { title: '運営者情報', url: '/about/' },
      { title: 'お問い合わせ', url: '/contact/' },
      { title: 'プライバシーポリシー', url: '/privacy/' },
    ],
  },
  /** 一覧画面に表示するページあたりの投稿数 */
  itemPerPage: 20,
})
