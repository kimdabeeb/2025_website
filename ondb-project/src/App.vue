<script setup>
import { onMounted } from "vue";
import Lenis from "lenis";
import './assets/css/components.css';
import Header from "./components/Header.vue";
import Main from "./components/Main.vue";
import About from "./components/About.vue";
import Projects from "./components/Projects.vue";
import FooterComponent from "./components/Footer.vue";

onMounted(() => {
  const lenis = new Lenis();

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
});
</script>

<template>
  <div>
    <Header />
    <main id="home">
      <Main />
      <section id="about">
        <About />
      </section>
      <section id="projects">
        <Projects />
      </section>
    </main>
    <footer>
      <section id="contact">
        <FooterComponent />
      </section>
    </footer>
  </div>
</template>

<style scoped>
</style>
