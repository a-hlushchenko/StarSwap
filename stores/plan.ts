interface planType {
  id: number;
  type: string;
  conversion_rate: number;
  min_amount: number;
  max_amount: number;
}

export const usePlanStore = defineStore("plan", () => {
  const { $f } = useNuxtApp();

  const { isError } = storeToRefs(useLoaderStore());

  const plan = ref<planType>();

  async function fetchRate() {
    const data = await $f("/u");

    if (data) {
      plan.value = data.plan;
    } else {
      isError.value = true;
    }
  }

  return { plan, fetchRate };
});
