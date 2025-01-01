export const useLoaderStore = defineStore("loader", () => {
  const isLoader = ref(true);

  return { isLoader };
});
