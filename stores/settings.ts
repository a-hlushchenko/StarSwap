export const useSettingsStore = defineStore("settings", () => {
  const isSettings = ref(false);
  const isWallet = ref(false);

  return { isSettings, isWallet };
});
