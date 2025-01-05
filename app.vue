<script setup lang="ts">
import "swiper/css";
import "./assets/css/index.css";
import {
  useWebApp,
  useWebAppHapticFeedback,
  useWebAppSettingsButton,
} from "vue-tg";
import { useWalletStore } from "./stores/wallet";
import { storeToRefs } from "pinia";
import { TonConnectUI, toUserFriendlyAddress } from "@tonconnect/ui";

const { locales, setLocale, getLocaleCookie } = useI18n();

const { platform, initDataUnsafe } = useWebApp();
const { showSettingsButton } = useWebAppSettingsButton();
const { impactOccurred } = useWebAppHapticFeedback();

const { wallet } = storeToRefs(useWalletStore());
const planStore = usePlanStore();
const tokenStore = useTokenStore();
const { isLoader } = storeToRefs(useLoaderStore());
const { isSettings } = storeToRefs(useSettingsStore());

const unsubscribeModal = ref();

function setupSettings() {
  Telegram.WebApp.onEvent("settingsButtonClicked", () => {
    impactOccurred("medium");
    isSettings.value = true;
  });

  showSettingsButton();
}

function setupLang() {
  const userLangCode = initDataUnsafe.user?.language_code || "uk";

  const userSetLang = useCookie("user_set_lang");

  if (!userSetLang.value && userLangCode) {
    const availableLocale = locales.value.find(
      (locale) => locale.code === userLangCode
    );

    if (availableLocale) {
      setLocale(availableLocale.code);
    }
  }
}

function setupWallet() {
  wallet.value.connector = new TonConnectUI({
    manifestUrl:
      "https://raw.githubusercontent.com/StarSwap-bot/assets/refs/heads/main/manifest.json",
    widgetRootId: "app",
  });

  unsubscribeModal.value = wallet.value.connector.onStatusChange(
    async (walletInfo: any) => {
      const address = walletInfo?.account?.address;
      if (address) {
        wallet.value.address = toUserFriendlyAddress(address);
        wallet.value.hexAddress = address;
      } else {
        wallet.value.address = null;
        wallet.value.hexAddress = null;
      }
    }
  );
}

onMounted(async () => {
  window.Telegram.WebApp.lockOrientation();
  window.Telegram.WebApp.disableVerticalSwipes();

  if (["ios", "android"].includes(platform)) {
    window.Telegram.WebApp.requestFullscreen();
  }

  setupSettings();
  setupLang();
  setupWallet();

  await planStore.fetchRate();
  await tokenStore.fetchToken();

  isLoader.value = false;
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
* {
  -webkit-tap-highlight-color: transparent;
}

::-webkit-scrollbar {
  background-color: transparent;
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: var(--main);
  border-radius: 20px;
}

:root {
  scroll-behavior: smooth;
  --fullscreen: calc(
    var(--tg-safe-area-inset-top, 0px) +
      var(--tg-content-safe-area-inset-top, 0px)
  );
  --header: 72px;
  background-color: var(--bg);
  --bg: #1a2026;
  --shade: #293440;
  --text: #fff;
  --secondary-bg: #212a33;
  --secondary-text: #8694a1;
  --light-bg: #3c4c5d;
  --main: #2588d6;
  --accent-color: #4db2ff;
  --disabled-color: #a6d8ff;
  --success: #00d250;
  --error: #ff5863;

  overscroll-behavior: none;
  overflow: hidden;
}

::selection {
  background-color: var(--main);
  color: var(--text);
}

body {
  background-color: var(--bg);
  font-family: Outfit, sans-serif;
  font-size: 16px;
  line-height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text);
}

.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  scale: 0.98;
}
</style>
