<script setup lang="ts">
import type { LocaleObject } from "@nuxtjs/i18n";
import { useWebAppHapticFeedback } from "vue-tg";

const emit = defineEmits(["close"]);

const { locales, setLocale } = useI18n();
const router = useRouter();

const { impactOccurred } = useWebAppHapticFeedback();

const { isSettings, isWallet } = storeToRefs(useSettingsStore());
const notificationStore = useNotificationStore();

const isLangs = ref(false);
const isMainSettings = ref(true);

function close() {
  impactOccurred("medium");
  isSettings.value = false;
}

function openWallet() {
  impactOccurred("medium");
  close();
  isWallet.value = true;
}

function openLangs() {
  impactOccurred("medium");
  isLangs.value = true;
  isMainSettings.value = false;
}

function changeLang(locale: LocaleObject) {
  close();

  setLocale(locale.code);
}
</script>

<template>
  <Transition name="popup">
    <div class="settings-wrapper" @click="close">
      <Transition name="settings-section" mode="out-in">
        <GeneralBox class="settings" @click.stop v-if="isMainSettings">
          <GeneralTitle mini>Settings</GeneralTitle>

          <div>
            <button class="settings-item" @click="openWallet">Wallet</button>
            <GeneralDivider />
            <button class="settings-item" @click="openLangs">Languages</button>
          </div>

          <IconsClose @click.stop.prevent="close" />
        </GeneralBox>

        <GeneralBox class="settings" @click.stop v-else-if="isLangs">
          <GeneralTitle mini v-if="isLangs">Languages</GeneralTitle>

          <div>
            <template v-for="(locale, index) in locales">
              <button class="settings-item" @click="changeLang(locale)">
                {{ locale.name }}
              </button>
              <GeneralDivider v-if="index !== locales.length - 1" />
            </template>
          </div>

          <IconsClose @click.stop.prevent="close" />
        </GeneralBox>
      </Transition>
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
  width: 100%;
  text-align: start;
  padding: 8px 0;
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

.settings-section-enter-from,
.settings-section-leave-to {
  opacity: 0;
  transform: translate(12.5%, -12.5%) scale(0.75);
}
</style>
