<template>
  <div class="loader-wrapper">
    <img src="/img/main/logo.png" class="icon" width="100" />
  </div>
</template>

<style scoped>
.loader-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--bg);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.icon {
  animation: loading infinite 1s linear;
}

@keyframes loading {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
