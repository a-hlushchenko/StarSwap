<script setup lang="ts"></script>

<template>
  <div class="app" id="app">
    <MainHeader />
    <MainNotification />
    <div class="container">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.container {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
