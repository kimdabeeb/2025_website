<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const aboutContainer = ref(null)

const skills = ref([
  'Vue.js',
  'JavaScript',
  'TypeScript',
  'CSS/SCSS',
  'Node.js',
  'Express',
  'MongoDB',
  'Git'
])

onMounted(() => {
  gsap.from(aboutContainer.value, {
    x: -100,
    opacity: 0,
    duration: 1,
    ease: 'power2.out'
  })
})
</script>

<template>
  <div class="about" ref="aboutContainer">
    <h2>About Me</h2>
    <div class="about-content">
      <div class="about-text">
        <p>
          I'm a passionate web developer with a love for creating beautiful and functional web applications. 
          I enjoy working with modern technologies and learning new things every day.
        </p>
        <p>
          My journey in web development started with curiosity and has evolved into a career where I can 
          combine creativity with technical skills to build amazing digital experiences.
        </p>
      </div>
      <div class="skills-section">
        <h3>Skills</h3>
        <div class="skills-grid">
          <span 
            v-for="skill in skills" 
            :key="skill" 
            class="skill-tag"
          >
            {{ skill }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.about h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #2c3e50;
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.about-text {
  line-height: 1.8;
  color: #555;
}

.about-text p {
  margin-bottom: 1rem;
}

.skills-section h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.skills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.skill-tag {
  background: linear-gradient(45deg, #42b883, #35495e);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.875rem;
  font-weight: 500;
}

@media (min-width: 768px) {
  .about-content {
    flex-direction: row;
  }
  
  .about-text {
    flex: 2;
  }
  
  .skills-section {
    flex: 1;
  }
}
</style>