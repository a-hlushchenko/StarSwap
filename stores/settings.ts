export const useSettingsStore = defineStore("settings", () => {
  const isSettings = ref(false);

  return { isSettings };
});
