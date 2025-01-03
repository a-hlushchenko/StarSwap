<script setup lang="ts">
import { useWebAppHapticFeedback, useWebAppNavigation } from "vue-tg";

const { impactOccurred, notificationOccurred } = useWebAppHapticFeedback();

const notificationStore = useNotificationStore();
const { wallet } = storeToRefs(useWalletStore());
const { plan } = storeToRefs(usePlanStore());
const { token } = storeToRefs(useTokenStore());

const stars = ref<number | null>(null);
const starsError = ref<string | null>("");

const swapAmount = ref<number | null>(null);

const isConfirmPopup = ref(false);

const formattedSwapAmount = computed(
  () =>
    swapAmount.value?.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }) ?? null
);

const usdt = computed(() =>
  stars.value && token.value
    ? Math.floor(stars.value * token.value.star_rate * 100) / 100
    : null
);

const isDisabled = computed(
  () =>
    !plan.value ||
    !stars.value ||
    stars.value < plan.value.min_amount ||
    stars.value > plan.value.max_amount ||
    !wallet.value.address
);

function toggleConfirmPopup(state: boolean) {
  impactOccurred("medium");
  isConfirmPopup.value = state;
}

function validateForm() {
  if (!plan.value) return;

  if (!isDisabled.value) {
    starsError.value = "";

    return;
  }

  notificationOccurred("error");

  const { min_amount, max_amount } = plan.value;

  if (!wallet.value.address) {
    notificationStore.showMessage(
      "Connect wallet first!",
      NotificationType.error
    );
  } else if (!stars.value) {
    starsError.value = "Enter quantity of stars";
  } else if (stars.value < min_amount) {
    starsError.value = `Min quantity is ${min_amount} stars`;
  } else if (stars.value > max_amount) {
    starsError.value = `Max quantity is ${max_amount} stars`;
  }
}

function recheckError() {
  if (!isDisabled.value) {
    starsError.value = "";
    swapAmount.value = stars.value;
  } else {
    swapAmount.value = null;
  }
}

async function swap() {
  if (isDisabled.value) {
    validateForm();
    return;
  }

  toggleConfirmPopup(true);
}
</script>

<template>
  <GeneralContainer>
    <HomeInfo />

    <form @submit.prevent>
      <GeneralFlex column>
        <GeneralBox>
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
              @focusout="validateForm"
              @input="recheckError"
            >
              <IconsStar width="20" />
            </GeneralField>

            <GeneralDivider />

            <GeneralField label="You will get">
              <IconsUsdt width="20" height="20" />
              <div :class="{ disabled: !usdt }">
                {{ usdt || "Amount of USD₮ that you will get" }}
              </div>
            </GeneralField>
          </GeneralFlex>
        </GeneralBox>

        <GeneralButton type="button" @click="swap" :disabled="isDisabled">
          Swap {{ formattedSwapAmount ? formattedSwapAmount : "" }} Stars
        </GeneralButton>
      </GeneralFlex>
    </form>

    <Transition name="popup">
      <HomeConfirmPopup
        v-if="isConfirmPopup"
        @tooglePopup="toggleConfirmPopup"
        :stars="stars"
        :usdt="usdt"
        :swapAmount="formattedSwapAmount"
      />
    </Transition>
  </GeneralContainer>
</template>

<style scoped>
.disabled {
  color: var(--secondary-text);
}
</style>
