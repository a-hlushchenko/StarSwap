<script setup lang="ts">
const emit = defineEmits(["close"]);

const swipeY = ref({
  start: null as number | null,
  current: 0,
  end: null as number | null,
});
const popup = ref<HTMLElement | null>(null);

const resetSwipe = () => {
  swipeY.value = { start: null, current: 0, end: null };
};

const handleTouchStart = (e: TouchEvent) => {
  if (!popup.value) return;

  const touchY = e.touches[0].clientY;
  const popupRect = popup.value.getBoundingClientRect();

  if (touchY - popupRect.top <= 60) {
    swipeY.value.start = touchY;
    swipeY.value.current = touchY;
    popup.value.style.transition = "none";
  } else {
    swipeY.value.start = null;
  }
};

const handleTouchMove = (e: TouchEvent) => {
  if (!popup.value || swipeY.value.start === null) return;

  swipeY.value.current = e.touches[0].clientY;
  const deltaY = swipeY.value.current - swipeY.value.start;

  if (deltaY > 10) {
    popup.value.style.transform = `translateY(${deltaY}px)`;
  }
};

const handleTouchEnd = (e: TouchEvent) => {
  if (!popup.value || swipeY.value.start === null) return;

  popup.value.style.transition = "transform .3s";
  swipeY.value.end = e.changedTouches[0].clientY;

  const deltaY = swipeY.value.end - swipeY.value.start;

  if (deltaY > 50) {
    popup.value.style.transform = `translateY(100%)`;
    emit("close");
  } else {
    popup.value.style.removeProperty("transform");
  }

  resetSwipe();
};

onMounted(() => {
  document.body.style.overflow = "hidden";

  if (popup.value) {
    popup.value.addEventListener("touchstart", handleTouchStart);
    popup.value.addEventListener("touchmove", handleTouchMove);
    popup.value.addEventListener("touchend", handleTouchEnd);
  }
});

onUnmounted(() => {
  document.body.style.removeProperty("overflow");

  if (popup.value) {
    popup.value.removeEventListener("touchstart", handleTouchStart);
    popup.value.removeEventListener("touchmove", handleTouchMove);
    popup.value.removeEventListener("touchend", handleTouchEnd);
  }
});
</script>

<template>
  <div class="popup-wrapper" @click="$emit('close')">
    <div class="popup" ref="popup" @click.stop>
      <IconsClose @click.stop.prevent="$emit('close')" />

      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.popup-wrapper {
  position: fixed;
  left: 0px;
  top: 0px;
  background-color: #00000077;
  width: 100%;
  height: 100%;
  transition: background-color 0.3s;
}

.popup {
  border-radius: 1rem 1rem 0 0;
  background-color: var(--secondary-bg);
  position: absolute;
  bottom: 0px;
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-bottom: 2rem;
  transition: transform 0.3s;
}

.popup-enter-from,
.popup-leave-to {
  background-color: transparent;
}

.popup-enter-from .popup,
.popup-leave-to .popup {
  transform: translateY(100%);
}
</style>
