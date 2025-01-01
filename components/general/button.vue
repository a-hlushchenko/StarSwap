<script setup lang="ts">
const props = defineProps<{
  disabled?: boolean;
}>();
</script>

<template>
  <button class="button" :class="{ disabled }"><slot></slot></button>
</template>

<style scoped>
.button {
  background-color: var(--main);
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1rem;
  gap: 0.25rem;
  transition: all 0.3s;

  &:active:not(.disabled) {
    opacity: 0.7;
  }

  &.disabled {
    color: var(--disabled-color);
  }
}
</style>
