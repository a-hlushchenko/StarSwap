<script setup lang="ts">
import { useWebAppPopup } from "vue-tg";

const { showAlert } = useWebAppPopup();
</script>

<template>
  <div class="info-wrapper">
    <h1 class="h1">Swap Telegram Stars to USDT</h1>
    <p class="info-text">
      Connect your wallet and <span>swap Telegram Stars to USDT</span>. Send
      your Stars via purchasing in MiniApp and get your USDT’s
      <span>immediately. </span>
      <button @click="showAlert('test')" class="info-more">
        Learn more<img src="/img/icons/more.svg" alt=">" width="10" />
      </button>
    </p>
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

.info-text {
  color: var(--secondary-text);
  line-height: 1.25;
  text-align: center;
  font-size: 0.9rem;

  span {
    font-weight: 500;
  }
}

.info-more {
  color: var(--accent-color);
  /* display: flex; */
  align-items: center;
  justify-content: center;
}
</style>
