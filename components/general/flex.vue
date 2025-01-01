h
<script setup lang="ts">
const props = defineProps<{
  column?: boolean;
  space?: boolean;
  center?: boolean;
  gap?: "small" | "mini" | "middle" | "big";
  wfull?: boolean;
}>();
</script>

<template>
  <div class="flex" :class="[{ column, space, center, wfull }, `gap-${gap}`]">
    <slot></slot>
  </div>
</template>

<style scoped>
.flex {
  display: flex;
  gap: 1rem;
}

.center {
  align-items: center;
}

.column {
  flex-direction: column;
}

.space {
  justify-content: space-between;
}

.wfull {
  width: 100%;
}

.gap-big {
  gap: 1.5rem;
}

.gap-middle {
  gap: 0.75rem;
}

.gap-mini {
  gap: 0.5rem;
}

.gap-small {
  gap: 0.25rem;
}
</style>
