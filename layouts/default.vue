<script setup lang="ts">
const { isLoader } = storeToRefs(useLoaderStore());
const { isSettings } = storeToRefs(useSettingsStore());
</script>

<template>
  <Transition name="loader">
    <MainLoader v-if="isLoader" />
  </Transition>

  <Transition name="settings">
    <mainSettings v-if="isSettings" />
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
