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
  padding: 0.75rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1rem;
  gap: 0.25rem;
  border: 1px solid transparent;
  transition: all 0.3s;

  &:active:not(.disabled) {
    background-color: transparent;
    border-color: var(--main);
  }

  &.disabled {
    color: var(--disabled-color);
  }
}
</style>
