<script setup lang="ts">
const { isLoader } = storeToRefs(useLoaderStore());
const { isSettings, isWallet } = storeToRefs(useSettingsStore());
</script>

<template>
  <Transition name="loader">
    <MainLoader v-if="isLoader" />
  </Transition>

  <Transition name="settings">
    <MainSettings v-if="isSettings" />
  </Transition>

  <Transition name="popup">
    <MainWalletPopup v-if="isWallet" />
  </Transition>

  <div class="app" id="app">
    <MainHeader />
    <MainNotification />
    <slot></slot>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.loader-enter-from,
.loader-leave-to {
  opacity: 0;
}
</style>
