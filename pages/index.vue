<script setup lang="ts">
definePageMeta({
  middleware: [
    function (to, from) {
      return navigateTo("/swap");
    },
  ],
});
</script>

<template></template>
