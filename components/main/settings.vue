<script setup lang="ts">
import { useWebAppHapticFeedback } from "vue-tg";

const emit = defineEmits(["close"]);

const { impactOccurred } = useWebAppHapticFeedback();

const { isSettings } = storeToRefs(useSettingsStore());
const notificationStore = useNotificationStore();

function close() {
  impactOccurred("medium");
  isSettings.value = false;
}

function openWallet() {
  impactOccurred("medium");
  close();

  notificationStore.showMessage("test");
}

function openLangs() {
  impactOccurred("medium");
  close();

  notificationStore.showMessage("test");
}
</script>

<template>
  <Transition name="popup">
    <div class="settings-wrapper" @click="close">
      <GeneralBox class="settings">
        <GeneralTitle mini>Settings</GeneralTitle>

        <GeneralFlex column gap="mini">
          <button class="settings-item" @click="openWallet">Wallet</button>
          <GeneralDivider />
          <button class="settings-item" @click="openLangs">Languages</button>
        </GeneralFlex>

        <IconsClose @click.stop.prevent="close" />
      </GeneralBox>
    </div>
  </Transition>
</template>

<style scoped>
.settings-wrapper {
  position: fixed;
  left: 0px;
  top: 0px;
  background-color: #00000077;
  width: 100%;
  height: 100%;
  transition: background-color 0.3s;
}

.settings {
  position: absolute;
  top: calc(var(--fullscreen) + var(--header) + 1rem);
  right: 1rem;
  width: 50%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transition: transform 0.3s, opacity 0.3s;
}

.settings-item {
  font-weight: 500;
  align-self: self-start;
}

.settings-enter-from,
.settings-leave-to {
  background-color: transparent;
}

.settings-enter-from .settings,
.settings-leave-to .settings {
  opacity: 0;
  transform: translate(25%, -25%) scale(0.5);
}
</style>
