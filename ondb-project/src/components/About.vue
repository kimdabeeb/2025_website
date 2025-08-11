<script setup lang="ts">
import { computed } from 'vue'

const tools = ['vue', 'js', 'ts', 'html5', 'css3', 'figma','github', 'gitlab']
const duplicatedTools = computed(() => [
  ...tools, ...tools, ...tools, ...tools
])
</script>

<template>
  <div id="About" >
    <div class="About_cont wrapper flex_col"> 
      <h2>Get to Know Me</h2>
        <p><img src="../../public/img/react_logo.webp" alt="emoji_icon" /></p>
        <div class="About_introduce">
          <strong></strong>
          <p class="txt">
            nice to meet u, I'm kdb 
            <br />💼 simply introduce text
            <br />🔑 my strong keyword text
            <br />✔️ I want to show my website 
          </p>
        </div>
        <!-- Tool track -->
        <div class="tool-slider">
          <div class="tool-track">
            <div class="tool-item" v-for="(tool, index) in duplicatedTools" :key="index">
              <img :src="`/img/${tool}.svg`" :alt="tool">
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
</style>