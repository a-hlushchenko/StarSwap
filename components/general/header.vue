<script setup lang="ts">
const { wallet } = storeToRefs(useWalletStore());

const formattedAddress = computed(() => {
  return wallet.value.address
    ? `${wallet.value.address.slice(0, 3)}...${wallet.value.address.slice(-3)}`
    : "";
});

function connect() {
  if (!wallet.value.address) wallet.value.connector.openModal();
}
</script>

<template>
  <header class="header-wrapper">
    <div class="header">
      <img src="/img/text-logo.png" alt="StarSwap" class="logo" />
      <button class="connect-button" @click="connect">
        {{ formattedAddress || "Connect" }}
      </button>
    </div>
  </header>
</template>

<style scoped>
.header-wrapper {
  background-color: var(--secondary-bg);
  padding-top: var(--tg-safe-area-inset-top);
}

.header {
  padding: 0.75rem;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
}

.logo {
  width: 120px;
}

.connect-button {
  background-color: var(--main);
  padding: 0.5rem 2rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  align-self: flex-end;
}
</style>
