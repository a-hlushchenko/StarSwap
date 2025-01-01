<script setup lang="ts">
const props = defineProps<{
  mini?: boolean;
  center?: boolean;
  fitHeight?: boolean;
}>();
</script>

<template>
  <strong class="title" :class="{ center, mini, fitHeight }">
    <slot></slot>
  </strong>
</template>

<style scoped>
.title {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 125%;
}

.mini {
  font-weight: 500;
  font-size: 1.25rem;
}

.center {
  text-align: center;
}

.fitHeight {
  line-height: 100%;
}
</style>
