interface rateType {
  id: number;
  type: string;
  conversion_rate: number;
  min_amount: number;
  max_amount: number;
}

export const useRateStore = defineStore("rate", () => {
  const rate = ref<rateType>();

  async function fetchRate() {
    const data = await f("/u/");

    if (data) {
      rate.value = data.plan;
    }
  }

  return { rate, fetchRate };
});
