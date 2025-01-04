<script setup lang="ts">
import { DotLottieVue } from "@lottiefiles/dotlottie-vue";
import { useWebAppNavigation } from "vue-tg";

const route = useRoute();
const { $f } = useNuxtApp();

const { openLink } = useWebAppNavigation();

interface swapType {
  id: number;
  result_amount: number;
  invoice_url: string;
  status: "pending" | "completed" | "failed" | "is_paid";
  tx_hash: string | null;
}

const swapId = computed(() => route.params.id);
const swap = ref<swapType>();

const intervalId = ref();

async function fetchSwapHandler() {
  const data = await $f(`/s/${swapId.value}`);

  if (data) {
    swap.value = data.swap;

    if (swap.value?.status === "completed" || swap.value?.status === "failed") {
      clearInterval(intervalId.value);
    }
  }
}

async function fetchSwap() {
  await fetchSwapHandler();

  intervalId.value = setInterval(fetchSwapHandler, 5000);
}

onMounted(() => {
  fetchSwap();
});

onUnmounted(() => {
  clearInterval(intervalId.value);
});
</script>

<template>
  <GeneralContainer>
    <Transition name="page" mode="out-in">
      <GeneralBox v-if="swap?.status === 'completed'">
        <GeneralFlex column center>
          <DotLottieVue
            style="height: 100px; width: 100px"
            autoplay
            src="/img/swap/success.json"
          />
          <GeneralTitle mini>Transaction completed!</GeneralTitle>
          <GeneralText>
            {{ swap.result_amount }} USD₮ were successfully sent to your wallet.
            You can view your transaction on the
            <GeneralMore
              @click="
                openLink(`https://tonviewer.com/transaction/${swap.tx_hash}`)
              "
            >
              blockchain
            </GeneralMore>
          </GeneralText>

          <NuxtLink to="/" class="return-button">
            <GeneralButton>Return home</GeneralButton>
          </NuxtLink>
        </GeneralFlex>
      </GeneralBox>

      <GeneralBox v-else-if="swap?.status === 'failed'">
        <GeneralFlex column center>
          <DotLottieVue
            style="height: 100px; width: 100px"
            autoplay
            src="/img/swap/error.json"
          />
          <GeneralTitle mini>Transaction failed!</GeneralTitle>
          <GeneralText>
            Something went wrong! Please, try again later.
          </GeneralText>

          <NuxtLink to="/" class="return-button">
            <GeneralButton>Return home</GeneralButton>
          </NuxtLink>
        </GeneralFlex>
      </GeneralBox>

      <GeneralBox v-else>
        <GeneralFlex column center>
          <DotLottieVue
            style="height: 100px; width: 100px"
            autoplay
            loop
            src="/img/swap/swapping.json"
          />
          <GeneralTitle mini>Swapping Stars to USD₮...</GeneralTitle>
          <GeneralText>
            The token will be send to your wallet as soon as the transaction is
            successfully recorded in the blockchain.
          </GeneralText>
        </GeneralFlex>
      </GeneralBox>
    </Transition>
  </GeneralContainer>
</template>
<style scoped>
.return-button {
  width: 100%;

  button {
    width: 100%;
  }
}
</style>
