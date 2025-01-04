export const useSettingsStore = defineStore("settings", () => {
  const isSettings = ref(true);

  return { isSettings };
});
