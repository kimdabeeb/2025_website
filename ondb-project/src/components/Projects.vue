<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const projectsContainer = ref(null)

const projects = ref([
  {
    id: 1,
    title: 'Project 1',
    description: 'Description of project 1',
    technologies: ['Vue', 'JavaScript', 'CSS']
  },
  {
    id: 2,
    title: 'Project 2',
    description: 'Description of project 2',
    technologies: ['Vue', 'TypeScript', 'GSAP']
  },
  {
    id: 3,
    title: 'Project 3',
    description: 'Description of project 3',
    technologies: ['Vue', 'Node.js', 'Express']
  }
])

onMounted(() => {
  gsap.from(projectsContainer.value, {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power2.out'
  })
})
</script>

<template>
  <div id="Projects" class="wrapper" ref="projectsContainer">
    <h2>What I've Done</h2>
    <div class="projects-grid">
      <div 
        v-for="project in projects" 
        :key="project.id" 
        class="project-card"
      >
        <h3>{{ project.title }}</h3>
        <p>{{ project.description }}</p>
        <div class="technologies">
          <span 
            v-for="tech in project.technologies" 
            :key="tech" 
            class="tech-tag"
          >
            {{ tech }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.projects {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.projects h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #2c3e50;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.project-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.project-card:hover {
  transform: translateY(-5px);
}

.project-card h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.project-card p {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  background: #42b883;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
}
</style>