interface planType {
  id: number;
  type: string;
  conversion_rate: number;
  min_amount: number;
  max_amount: number;
}

export const usePlanStore = defineStore("plan", () => {
  const plan = ref<planType>();

  async function fetchRate() {
    const data = await f("/u");

    if (data) {
      plan.value = data.plan;
    }
  }

  return { plan, fetchRate };
});
