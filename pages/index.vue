<script setup lang="ts">
import { useWebAppHapticFeedback } from "vue-tg";

const { impactOccurred, notificationOccurred } = useWebAppHapticFeedback();

const { wallet } = storeToRefs(useWalletStore());
const notificationStore = useNotificationStore();

const stars = ref<number | null>(null);
const starsError = ref<string | null>("");
const rate = ref<number | null>(0.0117);
const swapAmount = ref<number | null>(null);

const isConfirmPopup = ref(false);

function openConfirmPopup() {
  impactOccurred("medium");
  isConfirmPopup.value = true;
}

function closeConfirmPopup() {
  impactOccurred("medium");
  isConfirmPopup.value = false;
}

const formattedSwapAmount = computed(() => {
  if (swapAmount.value) {
    return parseFloat(String(swapAmount.value)).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  }
  return null;
});

const usdt = computed(() => {
  if (stars.value && rate.value) {
    return (stars.value * rate.value).toFixed(2);
  }
  return null;
});

const isDisabled = computed(
  () =>
    !stars.value ||
    stars.value < 500 ||
    stars.value > 10000 ||
    !wallet.value.address
);

function checkForm() {
  if (!stars.value) {
    notificationOccurred("error");
    starsError.value = "Enter quantity of stars";
    return;
  }

  if (stars.value < 500) {
    notificationOccurred("error");
    starsError.value = "Min quantity is 500 stars";
    return;
  }

  if (stars.value > 10000) {
    notificationOccurred("error");
    starsError.value = "Max quantity is 10,000 stars";
    return;
  }

  if (!wallet.value.address) {
    notificationOccurred("error");
    notificationStore.showMessage("Connect wallet first");
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

function swap() {
  if (isDisabled.value) {
    checkForm();
    return;
  }

  openConfirmPopup();
}
</script>

<template>
  <HomeInfo />

  <form class="form" @submit.prevent>
    <div class="field">
      <label for="stars" class="field-label">
        Choose quantity of Telegram Stars
      </label>
      <div class="input-wrapper">
        <img src="/img/icons/star.svg" alt="⭐" width="20" />
        <input
          id="stars"
          type="string"
          v-model="stars"
          placeholder="Enter amount from 500 to 10,000"
          class="input"
          @focusout="checkForm"
          inputmode="numeric"
          enterkeyhint="done"
          @input="recheckError"
        />
      </div>

      <p class="input-error" v-if="starsError">{{ starsError }}</p>
    </div>

    <div class="field">
      <label class="field-label">You will recive</label>
      <div class="input-wrapper">
        <img src="/img/icons/usdt.svg" alt="⭐" width="20" />
        <div class="input" :class="{ disabled: !usdt }">
          {{ usdt || "Amount of USDT that you will get" }}
        </div>
      </div>
    </div>

    <GeneralButton @click="swap" :disabled="isDisabled">
      Swap {{ formattedSwapAmount ? formattedSwapAmount : "" }} Stars
    </GeneralButton>
  </form>
  <Transition name="popup">
    <GeneralPopup v-if="isConfirmPopup" @close="closeConfirmPopup">
      <GeneralTitle>Confirmation test</GeneralTitle>
    </GeneralPopup>
  </Transition>
</template>

<style scoped>
.form {
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.field-label {
  padding-left: 1rem;
  font-weight: 600;
}

.input-wrapper {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: var(--shade);
  border-radius: 0.5rem;
  padding: 0.75rem;
}

.input {
  width: 100%;

  &.disabled,
  &::placeholder {
    color: var(--secondary-text);
  }
}

.input-error {
  padding-left: 1rem;
  color: var(--error);
  font-size: 0.85rem;
}
</style>
