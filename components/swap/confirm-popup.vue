<script setup lang="ts">
const props = defineProps<{
  stars: number | null;
  usdt: number | null;
  swapAmount: string | null;
}>();

const { t } = useI18n();

const emit = defineEmits(["tooglePopup"]);
import { useWebAppHapticFeedback, useWebAppNavigation } from "vue-tg";

const router = useRouter();
const { $f } = useNuxtApp();

const { openInvoice } = useWebAppNavigation();
const { impactOccurred, notificationOccurred } = useWebAppHapticFeedback();

const notificationStore = useNotificationStore();
const { wallet } = storeToRefs(useWalletStore());

const invoiceUrl = ref<string>("");
const swapId = ref<number>();

const isSwapLoading = ref(false);

function closePopup() {
  emit("tooglePopup", false);
}

async function createSwap() {
  isSwapLoading.value = true;

  const data = await $f("/s", {
    method: "POST",
    body: JSON.stringify({
      to_token_id: 1,
      amount: props.stars,
      address: wallet.value.address,
    }),
  });

  if (data) {
    invoiceUrl.value = data.swap.invoice_url;
    swapId.value = data.swap.id;
  }

  isSwapLoading.value = false;
}

const invoiceHandler = (status: string) => {
  switch (status) {
    case "paid":
      notificationOccurred("success");
      router.push(`/swap/${swapId.value}`);
      break;

    case "failed":
      notificationStore.showMessage("Payment failed", NotificationType.error);
      break;
  }
};

async function confirm() {
  if (isSwapLoading.value) return;

  await createSwap();

  emit("tooglePopup", false);

  setTimeout(() => {
    openInvoice(invoiceUrl.value, (status) => invoiceHandler(status));
  }, 300);
}
</script>

<template>
  <GeneralPopup @close="closePopup">
    <GeneralTitle>{{ $t("confirm.title") }}</GeneralTitle>
    <GeneralFlex column>
      <GeneralField :label="$t('confirm.send_text')">
        <IconsStar width="20" />
        <div>
          {{ swapAmount }}
        </div>
      </GeneralField>

      <GeneralField :label="$t('confirm.receive_text')">
        <IconsUsdt width="20" height="20" />
        <div>
          {{ usdt }}
        </div>
      </GeneralField>

      <GeneralField :label="$t('confirm.to_text')">
        <IconsWallet width="20" style="flex-shrink: 0" />
        <div class="address">
          {{ wallet.address }}
        </div>
      </GeneralField>

      <GeneralButton type="button" @click="confirm">
        <GeneralLoader v-if="isSwapLoading" />
        <span v-else>{{ $t("confirm.button_text") }}</span>
      </GeneralButton>
    </GeneralFlex>
  </GeneralPopup>
</template>

<style scoped>
.address {
  word-break: break-all;
}
</style>
