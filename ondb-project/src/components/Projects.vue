<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { gsap } from 'gsap'
import { projects as projectsData, type Project } from '../data/projects'

const projectsContainer = ref(null)
// data load
const projects = ref<Project[]>(projectsData)

// DOM mounted 
nextTick(() => {
  if (projectsContainer.value) {
    gsap.from(projectsContainer.value, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
    })
  }
})
</script>

<template>
  <div id="Projects" class="wrapper" ref="projectsContainer">
    <h2>What I've Done</h2>
    <div class="projects-cont grid">
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
