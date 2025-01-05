export const useLoaderStore = defineStore("loader", () => {
  const isLoader = ref(true);
  const isError = ref(false);

  return { isLoader, isError };
});
