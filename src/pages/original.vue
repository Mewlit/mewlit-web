<script setup>
import { ref } from 'vue'

const website = useWebsite()
const { data, error } = await useAsyncData('original', () =>
  queryCollection('home').path('/original').first(),
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

const lastUpdated = ref('2026.07.16')

const snsLinks = ref([
  { name: 'Twitter', url: 'https://x.com/Mewlit_dayo', className: 'twitter' },
  { name: 'Github', url: 'https://github.com/Mewlit', className: 'github' },
  { name: 'umi', url: 'https://umi.mirargent.site', className: 'pixiv' },
])

const games = ref([
  '原神',
  'スターレイル',
  'ZZZ',
  '鳴潮',
  'エンドフィールド',
  'NTE',
])
</script>

<template>
  <main>
    <div class="container">
      <div class="header">
        <img src="/originalsrc/icon.jpg" alt="アイコン" class="icon" />
      </div>

      <h1 class="center">Mewlit a.k.a Argent / Mira</h1>
      <p class="update">最終更新 {{ lastUpdated }}</p>
      <p class="center">
        サイトまで作る必要はないけど、<br />
        プロフィールを詳しめに書いたり、SNSアカウントをまとめたり.....<br />
      </p>

      <ul class="sns-list center">
        <li v-for="link in snsLinks" :key="link.name">
          <a :href="link.url" :class="link.className" target="_blank">{{
            link.name
          }}</a>
        </li>
      </ul>

      <section class="two-column">
        <div class="column">
          <dl class="memo">
            <dt>やってるゲーム</dt>
            <dd v-for="game in games" :key="game">
              <strong>{{ game }}</strong>
            </dd>

            <dt>苦手なもの</dt>
            <dd>虫全般</dd>
          </dl>
        </div>
        <div class="column">
          <h2>その他</h2>
          <p>
            最近はずっとゲームしてるか寝てます<br />
            あとアニメも見てますね
          </p>

          <div class="box">
            勢いでサイト作ったはいいいけど<br />
            何をすればいいのかわかりません。
          </div>
        </div>
      </section>

      <section>
        <h2>最近のつぶやき</h2>
        <p>自分のやりたいことを見つけたいです。</p>
      </section>
    </div>
  </main>
</template>

<style scoped>
@charset "UTF-8";
/* 元の css/style.css および css/bootstrap.css の内容をここ、
   もしくはグローバルなスタイルシートとして読み込んでください。
   scoped スタイルにする場合は、style.css の中身をこの <style> ブロックに
   コピーして必要に応じて調整してください。 */
/* ==========================================
   Template: matome（https://do.gt-gt.org/）
   Copyright: 2020 do.
   利用規約を遵守の上お使いください。二次配布・販売を禁じます。
   ========================================== */
/* ==========================================
  リセットCSS
  基本的には触らないでください
  ========================================== */
@import url('https://fonts.googleapis.com/css?family=Kosugi+Maru&display=swap');
input[type='submit'] {
  -webkit-appearance: none;
  border-radius: 0;
}

ol,
ul {
  list-style: none;
}

h1,
h2,
h3,
h4,
h5,
img,
p {
  margin: 0;
  padding: 0;
}

p {
  line-height: 1.6em;
}

h1,
h2,
h3,
h4,
h5 {
  font-weight: bold;
}

/* ==========================================
  以下、デザインを決める記述です。
  ※印で検索することで設定箇所へジャンプします。
   ========================================== */
body {
  background-size: auto auto;
  background-color: #ffffff;
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 14px,
    rgba(184, 252, 255, 0.5) 14px,
    rgba(184, 252, 255, 0.5) 27px
  );
  /* ↑上記3行が背景のストライプの記述です。
      お好みの色などに変更してください。※ */
  font-family:
    'Avenir', 'Helvetica Neue', 'Helvetica', 'Arial', 'Hiragino Sans',
    'ヒラギノ角ゴシック', YuGothic, 'Yu Gothic', 'メイリオ', Meiryo,
    'ＭＳ Ｐゴシック', 'MS PGothic', sans-serif;
  padding: 0;
  margin: 0;
  color: #333333;
  font-size: 16px;
  line-height: 1.6;
}

a {
  text-decoration: none;
  color: #da2b5c;
  /* ↑リンクの色 一括置換すると見出し色も一緒に変わります ※ */
  -webkit-transition: 0.3s;
  transition: 0.3s;
}

a img {
  -webkit-transition: 0.3s;
  transition: 0.3s;
}

a:hover {
  color: lightpink;
  /* ↑リンクをホバーしたときの色 ※ */
  -webkit-transition: 0.3s;
  transition: 0.3s;
}

a:hover img {
  opacity: 0.7;
  -webkit-transition: 0.3s;
  transition: 0.3s;
}

dl,
ol,
p,
ul {
  margin: 10px auto 20px;
  padding: 0;
}

@media screen and (max-width: 767px) {
  dl,
  ol,
  p,
  ul {
    margin: 15px auto;
  }
}

h1 {
  color: #da2b5c;
  /* ↑見出し色 リンク色と同じになります ※ */
  font-family: 'Kosugi Maru', sans-serif;
}

h4 {
  padding-left: 10px;
  margin: 20px 0 10px;
  font-size: 120%;
}

.center {
  text-align: center;
}

.header {
  background-color: #fdadc8;
  background-image: url(/originalsrc/header.jpg);
  /* ↑ヘッダー画像 ※ */
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 300px;
  position: relative;
  text-align: center;
  margin-bottom: 80px;
}

.header img.icon {
  display: block;
  margin: auto;
  height: 150px;
  width: 150px;
  background: #fff;
  border-radius: 50%;
  border: solid 6px #ffffff;
  position: absolute;
  bottom: -75px;
  left: 0;
  right: 0;
  z-index: 1;
}

@media screen and (max-width: 767px) {
  .header {
    height: 200px;
  }
  .header img.icon {
    height: 100px;
    width: 100px;
    border: solid 4px #ffffff;
    bottom: -50px;
  }
}

dl.memo dt {
  width: 100%;
  font-weight: bold;
  color: #da2b5c;
  padding: 0.5em 0;
}

dl.memo dd {
  border-left: 1px dotted #d0d0d0;
  margin: 0 0 0 1em;
  padding: 0 0 1em 1em;
}

section {
  width: 95%;
  max-width: 800px;
  margin: 60px auto;
}

.two-column {
  display: -webkit-box;
  display: flex;
  flex-wrap: wrap;
  -webkit-box-pack: justify;
  justify-content: space-between;
}

.two-column .column {
  width: 48%;
}

@media screen and (max-width: 767px) {
  .two-column {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
  }
  .two-column .column {
    width: 100%;
  }
}

h2 {
  font-size: 20px;
  margin: 1em auto;
  color: #da2b5c;
  width: 100%;
}

section > h2 {
  text-align: center;
  font-size: 24px;
}

h3 {
  margin: 1em auto;
}

.update {
  font-size: 80%;
  color: #bcbcbc;
  text-align: center;
}

.box {
  background: #ffe8eb;
  /* ↑色付きボックスの背景色 ※ */
  padding: 10px 15px;
  border-radius: 5px;
}

.cs {
  display: -webkit-box;
  display: flex;
  flex-wrap: wrap;
  -webkit-box-pack: start;
  justify-content: flex-start;
}

.cs li {
  width: 24%;
  padding: 0;
  margin: 0 0 20px 0;
}

.cs li:not(:nth-of-type(4n-3)) {
  margin-left: calc(4% / 3);
}

.cs li a {
  width: 100%;
  background: #e6e6e6;
  display: block;
}

.cs li a:hover {
  background: #ffffff;
  -webkit-transition: 0.3s;
  transition: 0.3s;
}

.cs li a img {
  width: 100%;
  height: 180px;
  -o-object-fit: cover;
  object-fit: cover;
}

.cs li a .text {
  padding: 5px;
}

.cs li a .text p {
  font-size: 80%;
  color: #333333;
  text-align: center;
}

.cs li a .text p.name {
  font-size: 100%;
  color: #da2b5c;
  text-align: center;
  font-weight: bold;
  margin: 0 auto 0.5em;
}

@media screen and (max-width: 767px) {
  .cs li {
    width: 49%;
  }
  .cs li li a img {
    height: 240px;
  }
  .cs li:not(:nth-of-type(4n-3)) {
    margin-left: 0;
  }
  .cs li:nth-of-type(odd) {
    margin-right: 2%;
  }
}

@media screen and (max-width: 575px) {
  .cs li {
    width: 90%;
    max-width: 300px;
    margin-left: auto;
    margin-right: auto;
    height: 260px;
  }
  .cs li:nth-of-type(odd) {
    margin-right: auto;
  }
  .cs li:not(:nth-of-type(4n-3)) {
    margin-left: auto;
  }
}

ul.sns-list {
  display: -webkit-box;
  display: flex;
  flex-wrap: wrap;
  margin: 1em auto;
  -webkit-box-pack: center;
  justify-content: center;
  max-width: 600px;
}

ul.sns-list li {
  margin-bottom: 1em;
}

ul.sns-list li a {
  font-size: 14px;
  border: 2px solid #65676d;
  color: #65676d;
  padding: 5px 8px;
  border-radius: 20px;
}

ul.sns-list li a:hover {
  background: #65676d;
  color: #ffffff;
}

ul.sns-list li a.twitter:hover {
  background: #1da1f2;
  border: 2px solid #1da1f2;
  color: #ffffff;
}

ul.sns-list li a.tumblr:hover {
  background: #36465d;
  border: 2px solid #36465d;
  color: #ffffff;
}

ul.sns-list li a.lineat:hover {
  background: #00b900;
  border: 2px solid #00b900;
  color: #ffffff;
}

ul.sns-list li a.youtube:hover {
  background: #cd201f;
  border: 2px solid #cd201f;
  color: #ffffff;
}

ul.sns-list li a.note:hover {
  background: #2dcdb5;
  border: 2px solid #2dcdb5;
  color: #ffffff;
}

ul.sns-list li a.amazon:hover {
  background: #ff9900;
  border: 2px solid #ff9900;
  color: #ffffff;
}

ul.sns-list li a.marsh:hover {
  background: #f3969a;
  border: 2px solid #f3969a;
  color: #ffffff;
}

ul.sns-list li a.skeb:hover {
  background: #30b396;
  border: 2px solid #30b396;
  color: #ffffff;
}

ul.sns-list li a.pixiv:hover {
  background: #0096fa;
  border: 2px solid #0096fa;
  color: #ffffff;
}

ul.sns-list li a.booth:hover {
  background: #fc4d50;
  border: 2px solid #fc4d50;
  color: #ffffff;
}

ul.sns-list li a.fantia:hover {
  background: #ff5600;
  border: 2px solid #ff5600;
  color: #ffffff;
}

ul.sns-list li:not(:last-of-type) {
  margin-right: 20px;
}

footer .container {
  margin: 0 auto;
  padding: 0;
  background: transparent;
  box-shadow: none;
}

footer .bottom {
  margin: 0;
}

footer .bottom a {
  opacity: 0.7;
  text-align: right;
  width: 100%;
  font-size: 12px;
  padding: 5px 10px;
  margin: 0 0 0 auto;
  display: block;
}
/*!
 * Bootstrap Grid v4.1.3 (https://getbootstrap.com/)
 * Copyright 2011-2018 The Bootstrap Authors
 * Copyright 2011-2018 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

html {
  box-sizing: border-box;
  -ms-overflow-style: scrollbar;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.container {
  width: 96%;
  padding-right: 0px;
  padding-left: 0px;
  padding-bottom: 40px;
  margin-right: auto;
  margin-left: auto;
  background: #fff;
  margin-top: 80px;
  margin-bottom: 80px;
}

@media (min-width: 576px) {
  .container {
    max-width: 560px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 740px;
  }
}

@media (min-width: 992px) {
  .container {
    max-width: 960px;
  }
}

@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}
</style>
