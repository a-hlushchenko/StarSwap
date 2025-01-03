<template>
  <p class="text">
    <slot></slot>
  </p>
</template>

<style>
.text {
  color: var(--secondary-text);
  line-height: 1.25;
  text-align: center;
  font-size: 0.9rem;

  span {
    font-weight: 700;
  }
}
</style>
