<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap, Power2 } from 'gsap'

const isMenuOpen = ref(false)
const currentTime = ref({ hours: 12, minutes: '00', ampm: 'PM' })
const menuOverlay = ref(null)
const menuWrap = ref(null)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  const menuRoot = document.querySelector('.Menu_root')
  
  if (isMenuOpen.value) {
    openMenu(menuRoot)
  } else {
    closeMenu(menuRoot)
  }
}

const openMenu = (menuRoot) => {
  gsap.set(menuRoot, { opacity: 1, visibility: 'inherit' })
  gsap.set(menuOverlay.value, { opacity: 1, visibility: 'inherit' })
  
  gsap.to(menuOverlay.value, {
    y: 0,
    duration: 0.8,
    ease: Power2.easeOut
  })
  
  gsap.to(menuWrap.value, {
    y: 0,
    duration: 0.6,
    ease: Power2.easeOut,
    delay: 0.1
  })
}

const closeMenu = (menuRoot) => {
  gsap.to(menuOverlay.value, {
    opacity: 0,
    duration: 0.4,
    ease: Power2.easeOut
  })
  
  gsap.to(menuWrap.value, {
    y: '-100%',
    duration: 0.5,
    ease: Power2.easeIn,
    onComplete: () => {
      gsap.set(menuRoot, { opacity: 0, visibility: 'hidden' })
      gsap.set(menuOverlay.value, { visibility: 'hidden' })
    }
  })
}

const onNavItemClick = (section) => {
  // 메뉴 닫기
  isMenuOpen.value = false
  const menuRoot = document.querySelector('.Menu_root')
  
  gsap.to(menuRoot, {
    opacity: 0,
    duration: 0.3,
    ease: Power2.easeOut,
    onComplete: () => {
      gsap.set(menuRoot, { visibility: 'hidden' })
      gsap.set(menuOverlay.value, { y: '-100%', visibility: 'hidden' })
      gsap.set(menuWrap.value, { y: '-100%' })
      
      // 섹션으로 스크롤
      const targetSection = document.getElementById(section)
      if (targetSection) {
        targetSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      }
    }
  })
}

/* global setInterval, clearInterval */
const updateTime = () => {
  const now = new Date()
  const seoulTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }))
  const hours = seoulTime.getHours()
  const minutes = seoulTime.getMinutes().toString().padStart(2, '0')
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const displayHours = hours % 12 || 12
  
  currentTime.value = {
    hours: displayHours,
    minutes,
    ampm
  }
}

let timeInterval

onMounted(() => {
  updateTime()
  timeInterval = setInterval(updateTime, 1000)
  
  gsap.set(menuOverlay.value, { y: '-100%' })
  gsap.set(menuWrap.value, { y: '-100%' })
})

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval)
  }
})

</script>

<template>
  <header :class="{ 'menu-open': isMenuOpen }">
    <div class="Header_wrap grid">
      <!-- Logo -->
      <a class="Header_logo" href="javascript:;"><h2>on.db</h2></a>
      <!-- Toggle -->
      <button 
        class="Menu_btn" 
        aria-controls="menu" 
        :aria-expanded="isMenuOpen"
        @click="toggleMenu"
      >
        <span class="Menu_btn__txt btn_txt__open">Menu</span>
        <span class="Menu_btn__txt btn_txt__close">Close</span>
      </button>
      <div class="Local_time Local_hour">
        South of Korea {{ currentTime.hours }}<span class="Local_dot">:</span>{{ currentTime.minutes }} {{ currentTime.ampm }}
      </div>
    </div>

    <!-- Menu -->
    <div class="Menu_root" :class="{ 'menu-open': isMenuOpen }" data-lenis-prevent="true">
      <div class="Menu_overlay" ref="menuOverlay">
        <div class="Menu_overlay_bg"></div>
      </div>
      <div class="Menu_wrap" ref="menuWrap">
        <div class="Menu_cont">
          <div class="Menu_cont__nav grid">
            <nav class="Menu_nav">
              <menu class="Menu_nav__list">
                <li class="Menu_nav__item">
                  <div @click="onNavItemClick('home')"><a class="Menu_nav__link">Home</a></div>
                </li>
                <li class="Menu_nav__item">
                  <div @click="onNavItemClick('about')"><a class="Menu_nav__link">Get to Know Me</a></div>
                </li>
                <li class="Menu_nav__item">
                  <div @click="onNavItemClick('projects')"><a class="Menu_nav__link">What I've Done</a></div>
                </li>
                <li class="Menu_nav__item">
                  <div @click="onNavItemClick('contact')"><a class="Menu_nav__link">Contact</a></div>
                </li>
              </menu>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
</style>
