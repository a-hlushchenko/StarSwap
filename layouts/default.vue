<script setup lang="ts">
const { isLoader } = storeToRefs(useLoaderStore());
</script>

<template>
  <Transition name="loader">
    <MainLoader v-if="isLoader" />
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
