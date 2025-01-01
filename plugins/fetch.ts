import { useWebApp } from "vue-tg";

const { initData } = useWebApp();

export default defineNuxtPlugin(() => {
  globalThis.f = async (url: string, options: any = {}) => {
    const notificationStore = useNotificationStore();

    const baseURL = import.meta.env.VITE_API_URL;

    const isDev = import.meta.env.VITE_NODE_ENVs === "dev";
    const devInitData = import.meta.env.VITE_INIT_DATAs;
    const userInitData = isDev ? devInitData : initData;
    console.log("userInitData", userInitData);
    console.log("initData", initData);

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
});
