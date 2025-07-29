<script setup>
const tools = ['vue', 'js', 'ts', 'html5', 'css3', 'figma','github', 'gitlab']
</script>

<template>
  <div id="About" class="wrapper flex_col">
    <div class="About_cont"> 
      <h2>Get to Know Me</h2>
        <p><img src="../../public/img/react_logo.webp" alt="emoji_icon" /></p>
        <div class="About_introduce">
          <strong>creating beautiful </strong>
          <p class="txt">
            I'm a passionate web developer with a love for creating beautiful 
            <br />and functional web applications. 
            <br />I enjoy working with modern technologies 
            <br />and learning new things every day.
            <br />My journey in web development started with curiosity 
            <br />and has evolved into a career where I can 
            <br />combine creativity with technical skills to build amazing digital experiences.
          </p>
        </div>
    </div>
    <!-- Tool track -->
    <div class="tool-slider">
      <div class="tool-track">
        <div class="tool-item" v-for="(tool, index) in [...tools, ...tools, ...tools, ...tools]" :key="index">
          <img :src="`/img/${tool}.svg`" :alt="tool">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>