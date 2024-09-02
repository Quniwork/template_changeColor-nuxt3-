// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/scripts'],
  app: {
    head: {
      title: process.env.NUXT_APP_TITLE + '｜BBIN Template' || 'BBIN Template',
      meta: [
        { name: 'description', content: 'description' },
        { property: 'og:title', content: 'title' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      NUXT_APP_TITLE: process.env.NUXT_APP_TITLE,
    },
  },
  plugins: [
    '~/plugins/fetch-data.ts',
  ],
  css: [
    '~/assets/sass/app.sass',
  ]
})