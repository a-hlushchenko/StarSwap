<script setup lang="ts">
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
      {{ notificationStore.message }}
    </div>
  </Transition>
</template>

<style scoped>
.notification {
  position: fixed;
  bottom: 2rem;
  left: 1rem;
  padding: 0.75rem;
  border-radius: 0.75rem;
  font-weight: 500;
  background-color: var(--secondary-bg);
  width: calc(100% - 2rem);
  line-height: 1.25rem;
  transition: all 0.3s ease-in-out;

  &.error {
    /* border-color: var(--error);
    background-color: var(--light-error); */
  }
}

.notification-enter-from,
.notification-leave-to {
  transform: translate(0px, 1rem);
  opacity: 0;
}
</style>
