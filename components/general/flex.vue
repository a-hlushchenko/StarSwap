h
<script setup lang="ts">
const props = defineProps<{
  mini?: boolean;
  column?: boolean;
  space?: boolean;
  center?: boolean;
  small?: boolean;
  big?: boolean;
  wfull?: boolean;
}>();
</script>

<template>
  <div class="flex" :class="{ mini, column, space, center, small, big, wfull }">
    <slot></slot>
  </div>
</template>

<style scoped>
.flex {
  display: flex;
  gap: 1rem;
}

.mini {
  gap: 0.5rem;
}

.small {
  gap: 0.25rem;
}

.center {
  align-items: center;
}

.column {
  flex-direction: column;
}

.big {
  gap: 2rem;
}

.space {
  justify-content: space-between;
}

.wfull {
  width: 100%;
}
</style>
