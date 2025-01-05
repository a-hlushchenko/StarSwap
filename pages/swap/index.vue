<script setup lang="ts">
import { useWebAppHapticFeedback, useWebAppNavigation } from "vue-tg";

const { impactOccurred, notificationOccurred } = useWebAppHapticFeedback();

const { t } = useI18n();

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

const filterInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const value = input.value;

  const filteredValue = value.replace(/[^0-9]/g, "");

  if (filteredValue !== value) {
    input.value = filteredValue;
  }
};

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
      t("error.connect_wallet"),
      NotificationType.error
    );
  } else if (!stars.value) {
    starsError.value = t("error.enter_stars_amount");
  } else if (stars.value < min_amount) {
    starsError.value = t("error.min_stars_amount", { min_amount: min_amount });
  } else if (stars.value > max_amount) {
    starsError.value = t("error.max_stars_amount", { max_amount: max_amount });
  }
}

watchEffect(() => {
  if (isDisabled.value) {
    swapAmount.value = null;
  } else {
    starsError.value = "";
    swapAmount.value = stars.value;
  }
});

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
    <SwapInfo />

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
              :placeholder="
                $t('form.stars_placeholder', {
                  min_amount: plan?.min_amount,
                  max_amount: plan?.max_amount,
                })
              "
              :label="$t('form.stars_title')"
              isInput
              @input="filterInput"
              :error="starsError"
              @focusout="validateForm"
            >
              <IconsStar width="20" />
            </GeneralField>

            <GeneralDivider />

            <GeneralField :label="t('form.token_title')">
              <IconsUsdt width="20" height="20" />
              <div :class="{ disabled: !usdt }">
                {{ usdt || $t("form.token_placeholder", { ticker: "USD₮" }) }}
              </div>
            </GeneralField>
          </GeneralFlex>
        </GeneralBox>

        <GeneralButton type="button" @click="swap" :disabled="isDisabled"
          >{{ $t("form.button_text", { amount: formattedSwapAmount || "" }) }}
        </GeneralButton>
      </GeneralFlex>
    </form>

    <Transition name="popup">
      <SwapConfirmPopup
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
