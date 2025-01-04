<script setup lang="ts">
import { useWebAppHapticFeedback } from "vue-tg";

const { impactOccurred } = useWebAppHapticFeedback();

const { wallet } = storeToRefs(useWalletStore());

const isWalletPopup = ref(false);

const formattedAddress = computed(() => {
  return wallet.value.address ? shortAddress(wallet.value.address) : "";
});

function openWalletPopup() {
  impactOccurred("medium");
  isWalletPopup.value = true;
}

function closeWalletPopup() {
  impactOccurred("medium");
  isWalletPopup.value = false;
}

function connect() {
  impactOccurred("medium");

  if (!wallet.value.address) wallet.value.connector.openModal();
  else openWalletPopup();
}
</script>

<template>
  <header class="header-wrapper">
    <div class="header">
      <NuxtLink to="/">
        <img src="/img/main/text-logo.png" alt="StarSwap" class="logo" />
      </NuxtLink>

      <GeneralButton @click="connect" :class="{ connected: wallet.address }">
        <IconsTon width="16" />
        {{ formattedAddress || $t("wallet.connect") }}
      </GeneralButton>
    </div>

    <MainWalletPopup :isActive="isWalletPopup" @close="closeWalletPopup" />
  </header>
</template>

<style scoped>
.header-wrapper {
  background-color: var(--secondary-bg);
  padding-top: var(--fullscreen);
}

.header {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
}

.logo {
  width: 120px;
}

.connected {
  background-color: var(--shade);
}
</style>
