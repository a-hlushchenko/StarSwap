interface tokenType {
  id: number;
  star_rate: number;
  name: string;
  ticker: string;
  is_ton: boolean;
}

export const useTokenStore = defineStore("token", () => {
  const { $f } = useNuxtApp();

  const token = ref<tokenType>();

  async function fetchTokenHandler() {
    const data = await $f("/t");

    if (data) {
      token.value = data.token;
    }
  }

  async function fetchToken() {
    await fetchTokenHandler();

    setInterval(fetchTokenHandler, 5000);
  }

  return { token, fetchToken };
});
