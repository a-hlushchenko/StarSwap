<script setup lang="ts">
const { isLoader, isError } = storeToRefs(useLoaderStore());
const { isSettings, isWallet } = storeToRefs(useSettingsStore());
</script>

<template>
  <Transition name="loader">
    <MainLoader v-if="isLoader || isError" />
  </Transition>

  <Transition name="settings">
    <MainSettings v-if="isSettings" />
  </Transition>

  <Transition name="popup">
    <MainWalletPopup v-if="isWallet" />
  </Transition>

  <MainNotification />

  <MainHeader />
  <div class="main">
    <slot></slot>
  </div>
  <MainFooter />
</template>

<style scoped>
.main {
  padding: calc(var(--fullscreen) + var(--header) + 1rem) 0 4rem;
  overflow: auto;
  height: 100%;
}

.loader-enter-from,
.loader-leave-to {
  opacity: 0;
}
</style>
