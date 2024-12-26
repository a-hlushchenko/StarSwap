<script setup lang="ts"></script>

<template>
  <div class="app" id="app">
    <GeneralHeader />
    <div class="container">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.container {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
