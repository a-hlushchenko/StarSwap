<script setup lang="ts">
import { useWebAppHapticFeedback, useWebAppNavigation } from "vue-tg";

const { impactOccurred, notificationOccurred } = useWebAppHapticFeedback();
const { openInvoice } = useWebAppNavigation();

const { wallet } = storeToRefs(useWalletStore());
const notificationStore = useNotificationStore();
const { rate } = storeToRefs(useRateStore());

const stars = ref<number | null>(null);
const starsError = ref<string | null>("");
const swapAmount = ref<number | null>(null);
const resultAmount = ref<number | null>(null);
const invoiceUrl = ref<string>("");

const isConfirmPopup = ref(false);
const isSwapLoading = ref(false);

const formattedSwapAmount = computed(() => {
  if (!swapAmount.value) return null;

  return parseFloat(String(swapAmount.value)).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
});

const usdt = computed(() => {
  if (!stars.value || !rate.value) return null;

  return (stars.value * rate.value.conversion_rate).toFixed(2);
});

const isDisabled = computed(
  () =>
    !rate.value ||
    !stars.value ||
    stars.value < rate.value.min_amount ||
    stars.value > rate.value.max_amount ||
    !wallet.value.address
);

function openConfirmPopup() {
  impactOccurred("medium");
  isConfirmPopup.value = true;
}

function closeConfirmPopup() {
  impactOccurred("medium");
  isConfirmPopup.value = false;
}

function checkForm() {
  if (!rate.value) return;

  if (!wallet.value.address) {
    notificationOccurred("error");
    notificationStore.showMessage("Connect wallet first");
    return;
  }

  if (!stars.value) {
    notificationOccurred("error");
    starsError.value = "Enter quantity of stars";
    return;
  }

  if (stars.value < rate.value.min_amount) {
    notificationOccurred("error");
    starsError.value = `Min quantity is ${rate.value.min_amount} stars`;
    return;
  }

  if (stars.value > rate.value.max_amount) {
    notificationOccurred("error");
    starsError.value = `Max quantity is ${rate.value.max_amount} stars`;
    return;
  }

  starsError.value = "";
}

function recheckError() {
  if (!isDisabled.value) {
    starsError.value = "";
    swapAmount.value = stars.value;
  } else {
    swapAmount.value = null;
  }
}

async function createSwap() {
  isSwapLoading.value = true;

  const data = await f("/s/", {
    method: "POST",
    body: JSON.stringify({
      to_token_id: 1,
      amount: stars.value,
      address: wallet.value.address,
    }),
  });

  if (data) {
    invoiceUrl.value = data.swap.invoice_url;
    resultAmount.value = data.swap.result_amount;
  } else {
    closeConfirmPopup();
  }

  isSwapLoading.value = false;
}

async function swap() {
  if (isDisabled.value) {
    checkForm();
    return;
  }

  openConfirmPopup();

  await createSwap();
}

function confirm() {
  if (isSwapLoading.value) return;

  closeConfirmPopup();

  setTimeout(() => {
    openInvoice(invoiceUrl.value, (status) => {
      if (status === "paid") {
        notificationOccurred("success");
        notificationStore.showMessage("Swap completed test");
      }
    });
  }, 300);
}
</script>

<template>
  <HomeInfo />

  <form @submit.prevent>
    <GeneralFlex column gap="big">
      <GeneralField
        v-model="stars"
        id="stars"
        type="number"
        inputmode="numeric"
        enterkeyhint="done"
        step="0.01"
        :placeholder="`Enter amount from ${rate?.min_amount} to ${rate?.max_amount}`"
        label="Choose quantity of Telegram Stars"
        isInput
        :error="starsError"
        @focusout="checkForm"
        @input="recheckError"
      >
        <IconsStar width="20" />
      </GeneralField>

      <GeneralField label="Choose quantity of Telegram Stars">
        <IconsUsdt width="20" height="20" />
        <div :class="{ disabled: !usdt }">
          {{ usdt || "Amount of USDT that you will get" }}
        </div>
      </GeneralField>

      <GeneralButton type="button" @click="swap" :disabled="isDisabled">
        Swap {{ formattedSwapAmount ? formattedSwapAmount : "" }} Stars
      </GeneralButton>
    </GeneralFlex>
  </form>

  <Transition name="popup">
    <GeneralPopup v-if="isConfirmPopup" @close="closeConfirmPopup">
      <GeneralTitle>Confirmation</GeneralTitle>
      <GeneralFlex column>
        <GeneralField label="You send">
          <IconsStar width="20" />
          <div>
            {{ formattedSwapAmount }}
          </div>
        </GeneralField>

        <GeneralField label="You receive">
          <IconsUsdt width="20" height="20" />
          <div>
            {{ resultAmount || usdt }}
          </div>
        </GeneralField>

        <GeneralField label="To">
          <IconsWallet width="20" style="flex-shrink: 0" />
          <div class="address">
            {{ wallet.address }}
          </div>
        </GeneralField>

        <GeneralButton type="button" @click="confirm" :disabled="isSwapLoading">
          <GeneralLoader v-if="isSwapLoading" />
          <span v-else>Confirm</span>
        </GeneralButton>
      </GeneralFlex>
    </GeneralPopup>
  </Transition>
</template>

<style scoped>
.disabled {
  color: var(--secondary-text);
}

.address {
  word-break: break-all;
}
</style>
