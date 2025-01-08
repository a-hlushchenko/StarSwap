<script setup lang="ts">
import { useWebAppNavigation, useWebAppPopup } from "vue-tg";

const { openTelegramLink } = useWebAppNavigation();
</script>

<template>
  <div class="footer-wrapper">
    <GeneralFlex center style="justify-content: center">
      <button
        class="footer-item"
        @click="openTelegramLink('https://t.me/thestarswap')"
      >
        Channel
      </button>
      <button
        class="footer-item"
        @click="openTelegramLink('https://t.me/StarSwap_Support')"
      >
        Support
      </button>
      <NuxtLink class="footer-item" to="/terms">Terms & Privacy</NuxtLink>
    </GeneralFlex>
  </div>
</template>

<style scoped>
.footer-wrapper {
  position: fixed;
  bottom: 0px;
  padding: 0.75rem;
  padding-bottom: 1.5rem;
  background-color: #111417;
  width: 100%;
}

.footer-item {
  color: #6d8394;
}
</style>
