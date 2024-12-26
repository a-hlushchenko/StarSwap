import { ref } from "vue";
import { defineStore } from "pinia";

export interface walletType {
  connector: any;
  address: string | null;
  hexAddress: string | null;
}

export const useWalletStore = defineStore("wallet", () => {
  const wallet = ref<walletType>({
    connector: null,
    address: null,
    hexAddress: null,
  });

  return { wallet };
});
