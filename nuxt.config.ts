export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  ssr: false,

  app: {
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

  modules: ["@nuxt/fonts", "@pinia/nuxt"],
});