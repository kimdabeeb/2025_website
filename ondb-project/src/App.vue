<script setup>
import { onMounted } from 'vue'
import Lenis from 'lenis'
import Header from './components/Header.vue'
import Main from './components/Main.vue'

onMounted(() => {
  const lenis = new Lenis()

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)
})
</script>

<template>
    <Header />
    <!-- <Main msg="Vite + Vue" /> -->
    <Main  />
</template>

<style scoped>
/* Global styles for the app */
</style>
