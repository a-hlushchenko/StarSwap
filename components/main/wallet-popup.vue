<script setup lang="ts">
import { useWebAppHapticFeedback } from "vue-tg";

const { impactOccurred, notificationOccurred } = useWebAppHapticFeedback();

const { wallet } = storeToRefs(useWalletStore());
const { isWallet } = storeToRefs(useSettingsStore());

function close() {
  impactOccurred("medium");
  isWallet.value = false;
}

function disconnectWallet() {
  close();
  wallet.value.connector.disconnect();
}
</script>

<template>
  <GeneralPopup @close="close">
    <GeneralTitle>{{ $t("wallet.title") }}</GeneralTitle>
    <GeneralFlex column>
      <div class="block">
        <div class="icon">
          <IconsWallet width="24" />
        </div>

        <GeneralFlex column gap="small">
          <p class="address">
            {{ shortAddress(wallet.address) }}
          </p>
          <span class="network">The Open Network</span>
        </GeneralFlex>
      </div>

      <GeneralButton @click="disconnectWallet">
        {{ $t("wallet.disconnect_wallet") }}
      </GeneralButton>
    </GeneralFlex>
  </GeneralPopup>
</template>

<style scoped>
.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  width: 2.5rem;
  background-color: var(--light-bg);
  border-radius: 0.5rem;
}

.block {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  background-color: var(--shade);
  border-radius: 0.75rem;
  padding: 0.75rem;

  &.change {
    background-color: transparent;
    border: 1px solid var(--shade);
    color: var(--main);
  }
}

.network {
  color: var(--secondary-text);
}

.content {
  display: grid;
  gap: 0.25rem;
}

.address {
  font-weight: 600;
}
</style>
