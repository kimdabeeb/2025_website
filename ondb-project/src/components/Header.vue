<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'
import { gsap, Power2 } from 'gsap'

// TypeScript 내장 타입들을 활용한 인터페이스 정의
interface TimeData {
  readonly hours: number
  readonly minutes: string
  readonly ampm: 'AM' | 'PM'
}

// TypeScript 내장 타입들 사용
const isMenuOpen: Ref<boolean> = ref(false)
const currentTime: Ref<TimeData> = ref({ hours: 12, minutes: '00', ampm: 'PM' })
const menuOverlay: Ref<HTMLElement | null> = ref(null)
const menuWrap: Ref<HTMLElement | null> = ref(null)

// TypeScript의 ReturnType 유틸리티 타입 활용
let timeInterval: ReturnType<typeof setInterval> | null = null

const toggleMenu = (): void => {
  isMenuOpen.value = !isMenuOpen.value
  const menuRoot: Element | null = document.querySelector('.Menu_root')
  
  if (isMenuOpen.value) {
    openMenu(menuRoot)
  } else {
    closeMenu(menuRoot)
  }
}

const openMenu = (menuRoot: Element | null): void => {
  if (!menuRoot || !menuOverlay.value || !menuWrap.value) return
  
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

const closeMenu = (menuRoot: Element | null): void => {
  if (!menuRoot || !menuOverlay.value || !menuWrap.value) return
  
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

const onNavItemClick = (sectionId: string): void => {
  // 메뉴 닫기
  isMenuOpen.value = false
  const menuRoot: Element | null = document.querySelector('.Menu_root')
  
  if (!menuRoot) return
  
  gsap.to(menuRoot, {
    opacity: 0,
    duration: 0.3,
    ease: Power2.easeOut,
    onComplete: () => {
      gsap.set(menuRoot, { visibility: 'hidden' })
      if (menuOverlay.value) gsap.set(menuOverlay.value, { y: '-100%', visibility: 'hidden' })
      if (menuWrap.value) gsap.set(menuWrap.value, { y: '-100%' })
      
      // Lenis와 호환되는 부드러운 스크롤
      const targetSection: HTMLElement | null = document.getElementById(sectionId)
      if (targetSection) {
        // Lenis scrollTo 사용 (전역 lenis 인스턴스 필요)
        const lenis = (window as any).lenis
        if (lenis) {
          lenis.scrollTo(targetSection, {
            offset: -80, // 헤더 높이만큼 오프셋
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
          })
        } else {
          // Lenis가 없을 경우 fallback
          targetSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          } as ScrollIntoViewOptions)
        }
      }
    }
  })
}

// TypeScript 내장 Date 객체와 String 메서드 활용
const updateTime = (): void => {
  const now: Date = new Date()
  const seoulTime: Date = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }))
  const hours: number = seoulTime.getHours()
  const minutes: string = seoulTime.getMinutes().toString().padStart(2, '0')
  const ampm: 'AM' | 'PM' = hours >= 12 ? 'PM' : 'AM'
  const displayHours: number = hours % 12 || 12
  
  currentTime.value = {
    hours: displayHours,
    minutes,
    ampm
  }
}

onMounted((): void => {
  updateTime()
  timeInterval = setInterval(updateTime, 1000)
  
  // GSAP 초기 설정
  if (menuOverlay.value) gsap.set(menuOverlay.value, { y: '-100%' })
  if (menuWrap.value) gsap.set(menuWrap.value, { y: '-100%' })
})

onUnmounted((): void => {
  if (timeInterval) {
    clearInterval(timeInterval)
    timeInterval = null
  }
})

</script>

<template>
  <header :class="{ 'menu-open': isMenuOpen }">
    <div class="Header_wrap grid">
      <!-- Logo -->
      <a class="Header_logo col-1" href="javascript:;"><h2>on.db</h2></a>
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
                  <div @click="onNavItemClick('main-section')"><a class="Menu_nav__link">Home</a></div>
                </li>
                <li class="Menu_nav__item">
                  <div @click="onNavItemClick('about-section')"><a class="Menu_nav__link">Get to Know Me</a></div>
                </li>
                <li class="Menu_nav__item">
                  <div @click="onNavItemClick('projects-section')"><a class="Menu_nav__link">What I've Done</a></div>
                </li>
                <li class="Menu_nav__item">
                  <div @click="onNavItemClick('footer-section')"><a class="Menu_nav__link">Contact</a></div>
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
