<script setup lang="ts">
import { DotLottieVue } from "@lottiefiles/dotlottie-vue";

const notificationStore = useNotificationStore();
</script>

<template>
  <Transition name="notification">
    <div
      class="notification"
      :class="{
        success: notificationStore.type === NotificationType.success,
        error: notificationStore.type === NotificationType.error,
      }"
      v-if="notificationStore.message"
    >
      <div
        class="icon"
        v-if="notificationStore.type === NotificationType.error"
      >
        <DotLottieVue
          style="height: 24px; width: 24px"
          autoplay
          src="/img/main/error.json"
        />
      </div>
      <span v-html="notificationStore.message"></span>
    </div>
  </Transition>
</template>

<style scoped>
.notification {
  position: fixed;
  top: calc(var(--fullscreen) + var(--header) + 1rem);
  left: 1rem;
  padding: 0.75rem;
  border-radius: 0.75rem;
  font-weight: 500;
  background-color: var(--secondary-bg);
  width: calc(100% - 2rem);
  line-height: 1.25rem;
  border: 1px solid var(--main);
  transition: all 0.3s ease-in-out;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 11;

  &.error {
    border-color: var(--error);
  }
}

.icon {
  background-color: var(--shade);
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
}

.notification-enter-from,
.notification-leave-to {
  transform: translate(0px, -1rem);
  opacity: 0;
}
</style>
