export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  ssr: false,

  app: {
    pageTransition: { name: "page", mode: "out-in" },

    head: {
      htmlAttrs: {
        lang: "en",
      },
      title: "StarSwap",
      script: [
        { src: "https://telegram.org/js/telegram-web-app.js" },
        {
          src: "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/tgs-player.js",
          type: "module",
        },
      ],
    },
  },

  i18n: {
    lazy: true,
    locales: [{ code: "en", file: "en.ts" }],
    defaultLocale: "en",
  },

  modules: ["@nuxt/fonts", "@pinia/nuxt", "@nuxtjs/i18n"],
});
