<template>
  <svg
    class="loader"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.00005 2C9.04298 2 10.0679 2.27185 10.9737 2.78875C11.8796 3.30565 12.6351 4.04973 13.1656 4.94762C13.6962 5.84551 13.9835 6.8662 13.9994 7.909C14.0152 8.9518 13.7589 9.98073 13.2558 10.8943C12.7527 11.8079 12.0202 12.5745 11.1305 13.1187C10.2407 13.6628 9.22445 13.9656 8.18198 13.9973C7.13958 14.0289 6.10686 13.7882 5.18576 13.2991C4.26468 12.8099 3.487 12.089 2.92944 11.2077"
      stroke="white"
      stroke-width="1.6"
      stroke-linecap="round"
    />
  </svg>
</template>

<style scoped>
.loader {
  animation: loading infinite 1s linear;
}

@keyframes loading {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
