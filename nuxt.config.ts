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
      meta: [
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
        },
      ],
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
    locales: [
      { code: "en", name: "English", file: "en.ts" },
      { code: "uk", name: "Ukrainian", file: "uk.ts" },
      { code: "ru", name: "Russian", file: "ru.ts" },
      { code: "ar", name: "Arabic", file: "ar.ts" },
    ],
    defaultLocale: "en",
  },

  modules: ["@nuxt/fonts", "@pinia/nuxt", "@nuxtjs/i18n"],
});
