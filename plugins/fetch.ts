import { useWebApp } from "vue-tg";

const { initData } = useWebApp();

export const f: (url: string, options?: RequestInit) => Promise<any> = async (
  url: string,
  options: any = {}
) => {
  const notificationStore = useNotificationStore();

  const baseURL = import.meta.env.VITE_API_URL;
  const isDev = import.meta.env.VITE_NODE_ENV === "dev";
  const devInitData = import.meta.env.VITE_INIT_DATA;
  const userInitData = isDev ? devInitData : initData;

  options.headers = {
    ...options.headers,
    Authorization: userInitData,
  };

  try {
    const data = await $fetch<any>(`${baseURL}${url}`, options);

    return data.result;
  } catch (error: any) {
    const message = error.response?._data?.description;

    if (message) {
      notificationStore.showMessage(message, NotificationType.error);
    } else {
      notificationStore.showMessage(
        "Something went wrong",
        NotificationType.error
      );
    }

    return false;
  }
};

export default defineNuxtPlugin(() => {
  return {
    provide: {
      f,
    },
  };
});
