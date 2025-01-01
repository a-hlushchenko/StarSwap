<script setup lang="ts">
const props = defineProps<{
  label?: string;
  error?: string | null;
  id?: string;
  isInput?: boolean;
}>();

defineOptions({
  inheritAttrs: false,
});

const model = defineModel();
</script>

<template>
  <GeneralFlex column gap="middle">
    <label :for="id" class="field-label" v-if="label">
      {{ label }}
    </label>
    <div class="input-wrapper">
      <slot></slot>
      <input
        v-if="isInput"
        v-bind="$attrs"
        :id="id"
        v-model="model"
        class="input"
      />
    </div>

    <p class="field-error" v-if="error">{{ error }}</p>
  </GeneralFlex>
</template>

<style scoped>
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

.field-error {
  padding-left: 1rem;
  color: var(--error);
  font-size: 0.85rem;
}
</style>
