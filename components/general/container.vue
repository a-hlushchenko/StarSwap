<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<style scoped>
.container {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
