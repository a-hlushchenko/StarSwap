<script setup lang="ts">
import { useWebAppHapticFeedback, useWebAppNavigation } from "vue-tg";

const { impactOccurred, notificationOccurred } = useWebAppHapticFeedback();
const { openInvoice } = useWebAppNavigation();

const { wallet } = storeToRefs(useWalletStore());
const notificationStore = useNotificationStore();
const { plan } = storeToRefs(usePlanStore());
const { token } = storeToRefs(useTokenStore());

const stars = ref<number | null>(null);
const starsError = ref<string | null>("");
const swapAmount = ref<number | null>(null);
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
  if (!stars.value || !token.value) return null;

  return Math.floor(stars.value * token.value.star_rate * 100) / 100;
});

const isDisabled = computed(
  () =>
    !plan.value ||
    !stars.value ||
    stars.value < plan.value.min_amount ||
    stars.value > plan.value.max_amount ||
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
  if (!plan.value) return;

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

  if (stars.value < plan.value.min_amount) {
    notificationOccurred("error");
    starsError.value = `Min quantity is ${plan.value.min_amount} stars`;
    return;
  }

  if (stars.value > plan.value.max_amount) {
    notificationOccurred("error");
    starsError.value = `Max quantity is ${plan.value.max_amount} stars`;
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
  }

  isSwapLoading.value = false;
}

async function swap() {
  if (isDisabled.value) {
    checkForm();
    return;
  }

  openConfirmPopup();
}

async function confirm() {
  if (isSwapLoading.value) return;

  await createSwap();

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
    <GeneralFlex column>
      <GeneralFlex column class="fields-box">
        <GeneralField
          v-model="stars"
          id="stars"
          type="number"
          inputmode="numeric"
          enterkeyhint="done"
          step="0.01"
          :placeholder="`Enter amount from ${plan?.min_amount} to ${plan?.max_amount}`"
          label="Choose quantity of Telegram Stars"
          isInput
          :error="starsError"
          @focusout="checkForm"
          @input="recheckError"
        >
          <IconsStar width="20" />
        </GeneralField>

        <GeneralDivider />

        <GeneralField label="Choose quantity of Telegram Stars">
          <IconsUsdt width="20" height="20" />
          <div :class="{ disabled: !usdt }">
            {{ usdt || "Amount of USD₮ that you will get" }}
          </div>
        </GeneralField>
      </GeneralFlex>

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
            {{ usdt }}
          </div>
        </GeneralField>

        <GeneralField label="To">
          <IconsWallet width="20" style="flex-shrink: 0" />
          <div class="address">
            {{ wallet.address }}
          </div>
        </GeneralField>

        <GeneralButton type="button" @click="confirm">
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

.fields-box {
  background-color: var(--secondary-bg);
  padding: 1rem;
  border-radius: 1rem;
}
</style>
