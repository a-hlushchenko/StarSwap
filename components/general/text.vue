<script setup lang="ts">
const props = defineProps<{ center?: boolean }>();
</script>

<template>
  <p class="text" :class="{ center }">
    <slot></slot>
  </p>
</template>

<style>
.text {
  color: var(--secondary-text);
  line-height: 1.25;
  font-size: 0.9rem;

  span,
  b {
    font-weight: 700;
  }
}

.center {
  text-align: center;
}
</style>
