<script setup>
import { ref, onMounted } from "vue";
import { gsap } from "gsap";

const box = ref(null);

onMounted(() => {
  gsap.from(box.value, {
    x: -200,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  });
});

defineProps({
  msg: String,
});

const count = ref(0);
</script>

<template>
      <section class="main flex_col">
        <div class="blur" style="translate: none; rotate: none; scale: none; transform: translate3d(295.135px, -0.1376px, 0px) rotate(-13.1577deg);"></div>
        <div class="blur" style="translate: none; rotate: none; scale: none; transform: translate3d(-88.9735px, 60.8216px, 0px) rotate(-15.3303deg);"></div>
        <div class="blur" style="translate: none; rotate: none; scale: none; transform: translate3d(38.21px, 60.0714px, 0px) rotate(-30.1502deg);"></div>
        <h1 data-aos="fade-up" data-aos-easing="linear" data-aos-duration="500" class="aos-init aos-animate"><br></h1>
        
      </section>
      <!-- <div class="hreo_overlay"></div>
      <div class="hreo_intro flex_col">
        <h1>
          <span class="text-light">
            Designing Brands and Experiences
            <br />
            <span class="hero-span">Worth Remembering</span>
          </span>
        </h1>
        <a class="">resume</a>
      </div> -->

  <!-- 
  <h1>{{ msg }}</h1>
  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p> -->
</template>

<style scoped>

</style>
