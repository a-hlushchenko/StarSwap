<template>
  <button class="more">
    <slot></slot>
    <IconsMore width="10" />
  </button>
</template>

<style scoped>
.more {
  color: var(--accent-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
