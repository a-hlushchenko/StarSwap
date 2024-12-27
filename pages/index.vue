<script setup lang="ts">
const stars = ref<number | null>(null);
const starsError = ref<string | null>("");
const rate = ref<number | null>(0.0117);
const swapAmount = ref<number | null>(null);

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
  () => !stars.value || stars.value < 500 || stars.value > 10000
);

function checkForm() {
  if (!stars.value) {
    starsError.value = "Enter quantity of stars";
    return;
  }

  if (stars.value < 500) {
    starsError.value = "Min quantity is 500 stars";
    return;
  }

  if (stars.value > 10000) {
    starsError.value = "Max quantity is 10,000 stars";
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

  alert("test");
}
</script>

<template>
  <HomeInfo />

  <form class="content" @submit.prevent>
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

    <div class="divider"></div>

    <div class="field">
      <label class="field-label">You will recive</label>
      <div class="input-wrapper">
        <img src="/img/icons/usdt.svg" alt="⭐" width="20" />
        <div class="input" :class="{ disabled: !usdt }">
          {{ usdt || "Amount of USDT that you will get" }}
        </div>
      </div>
    </div>
  </form>

  <button class="swap-button" @click="swap" :class="{ disabled: isDisabled }">
    Swap {{ formattedSwapAmount ? formattedSwapAmount : "" }} Stars
  </button>
</template>

<style scoped>
.content {
  background-color: var(--secondary-bg);
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
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

.divider {
  background-color: var(--shade);
  height: 2px;
  width: 100%;
  margin: 0 auto;
}

.swap-button {
  background-color: var(--main);
  border-radius: 0.5rem;
  padding: 0.75rem;
  font-weight: 700;
  transition: color 0.3s;

  &.disabled {
    color: var(--disabled-color);
  }
}

.input-error {
  padding-left: 1rem;
  color: var(--error);
  font-size: 0.85rem;
}
</style>
