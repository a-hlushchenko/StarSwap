<script setup lang="ts">
import { useWebAppNavigation, useWebAppPopup } from "vue-tg";

const { openTelegramLink } = useWebAppNavigation();

const { t } = useI18n();
</script>

<template>
  <div class="info-wrapper">
    <h1 class="h1">{{ $t("header.title") }}</h1>
    <GeneralText>
      <p style="display: inline" v-html="t('header.text') + ' '"></p>
      <GeneralMore @click="openTelegramLink('https://t.me/thestarswap')">
        {{ $t("header.learn_more") }}
      </GeneralMore>
    </GeneralText>
  </div>
</template>

<style scoped>
.info-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.h1 {
  font-size: 1.25rem;
  font-weight: 600;
}
</style>
