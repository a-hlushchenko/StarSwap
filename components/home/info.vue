<script setup lang="ts">
import { useWebAppNavigation, useWebAppPopup } from "vue-tg";

const { showAlert } = useWebAppPopup();
const { openTelegramLink } = useWebAppNavigation();
</script>

<template>
  <div class="info-wrapper">
    <h1 class="h1">Swap Telegram Stars to USDT</h1>
    <GeneralText>
      Connect your wallet and <span>swap Telegram Stars to USD₮</span>. Send
      your Stars via purchasing in MiniApp and get your USD₮
      <span>immediately. </span>
      <GeneralMore @click="openTelegramLink('https://t/me/thestarswap')">
        Learn more
      </GeneralMore>
    </GeneralText>
  </div>
</template>

<style scoped>
.info-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.h1 {
  font-size: 1.25rem;
  font-weight: 600;
}
</style>
