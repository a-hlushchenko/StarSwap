export enum NotificationType {
  success,
  error,
}

export const useNotificationStore = defineStore("notification", () => {
  const message = ref("");
  const type = ref<NotificationType>();
  const timeoutId = ref<NodeJS.Timeout | null>(null);

  async function showMessage(
    text: string,
    newType: NotificationType = NotificationType.success
  ) {
    if (timeoutId.value) {
      clearTimeout(timeoutId.value);
      clearMessage();
      await new Promise((resolve) => setTimeout(resolve, 0));
    }

    message.value = text;
    type.value = newType;

    timeoutId.value = setTimeout(() => {
      clearMessage();
    }, 3000);
  }

  function clearMessage() {
    message.value = "";
    timeoutId.value = null;
  }

  return { showMessage, message, type };
});
