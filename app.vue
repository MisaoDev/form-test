<template lang="pug">
.top-container
  NuxtPage
  .ring-container
    .ring(v-for="i in 15" :key="i" :style="getRandomRingStyle()")
</template>

<script setup>
const randomInt = (min, max) => Math.random() * (max - min) + min

const getRandomRingStyle = () => ({
  top: `${randomInt(-5, 105)}vh`,
  left: `${randomInt(-5, 105)}vw`,
  animationDelay: `${0.01 * randomInt(0, 10)}s`,
  animationDuration: `${0.2 * randomInt(12, 20)}s`,
})
</script>

<style scoped lang="scss">
.top-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  position: relative;
}
</style>

<style>
html {
  overflow: auto;
}

.main-card {
  max-width: 900px;
  width: calc(100vw - 20px);
  z-index: 10;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(2px) sepia(100%);
  transform: translate3d(0, 100px, 0);
}

.ring-container {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.ring {
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  border: 10px solid #b6f3e1;
  animation: animate 2s linear infinite;
  opacity: 0;
}

@keyframes animate {
  0% {
    transform: scale(0) translateY(0) translateY(0);
    opacity: 0.3;
  }
  100% {
    transform: scale(1.1) translateY(-20px) translateX(-300px);
    opacity: 0.1;
  }
}
</style>
