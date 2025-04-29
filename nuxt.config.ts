import { resolve } from 'path';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  components: [{ path: "~/components", pathPrefix: false }],
  css: ['~/assets/css/main.css', '~/assets/css/global.css'],
  modules: ['@pinia/nuxt', '@nuxtjs/i18n', '@nuxtjs/google-fonts'],
  i18n: {
    locales: [
      { code: 'en', name: 'English', iso: 'en-US', file: 'english.json' },
      { code: 'vi', name: 'Tiếng Việt', iso: 'vi-VN', file: 'vietnamese.json' },
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    langDir: resolve(__dirname, 'locales'),
    lazy: true,
  },
  googleFonts: {
    families: {
      Archivo: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
    display: 'swap',
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.NUXT_APP_API_BASE_URL,
      appMode: process.env.NUXT_APP_MODE,
      googleAnalytics: process.env.NUXT_PUBLIC_GOOGLE_ANALYTICS,
    },
  },
})