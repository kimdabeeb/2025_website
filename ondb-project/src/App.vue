<script setup lang="ts">
import { onMounted } from "vue";
import Lenis from "lenis";
import './assets/css/components.css';
import Header from "./components/Header.vue";
import Main from "./components/Main.vue";
import About from "./components/About.vue";
import Projects from "./components/Projects.vue";
import Footer from "./components/Footer.vue";
import { useSectionTheme } from './Scroll/useSectionTheme';

// section Theme
const { registerSections } = useSectionTheme();

onMounted(async () => {
  await registerSections();
  
  // Lenis scroll 초기화
  const lenisOptions = {
    duration: 1.2,
    easing: (t:any) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
  };
  
  const lenis = new Lenis(lenisOptions);

  // 전역에서 접근할 수 있도록 window 객체에 저장
  (window as any).lenis = lenis;

  function raf(time:any) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
});

</script>

<template>
  <div class="wrap">
    <Header />
    <main class="flex_col">
      <section id="main-section" data-theme="0">
        <Main />
      </section>
      <section id="about-section" data-theme="1">
        <About />
      </section>
      <section id="projects-section" data-theme="2">
        <Projects />
      </section>
    </main>
    <section id="footer-section" data-theme="0">
      <Footer />
    </section>
  </div>
</template>
