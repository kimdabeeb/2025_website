import { nextTick } from 'vue'
import { useTheme } from './useTheme'

export function useSectionTheme() {
  const { updateTheme, currentTheme, isTransitioning } = useTheme()
  let lastThemeIndex = -1  // 중복 테마 변경 방지를 위한 변수
  
  const registerSections = async () => {
    await nextTick()
    
    // DOM loading
    await new Promise(resolve => setTimeout(resolve, 100))
  
    const themeSections = document.querySelectorAll('section[data-theme]')
    
    // Check if sections have proper height
    themeSections.forEach((section) => {
      const htmlSection = section as HTMLElement
      const rect = htmlSection.getBoundingClientRect()
      
      if (rect.height === 0) {
      }
    })
    
    // Intersection Observer 설정 (첫 번째로 나타나는 섹션을 기준으로 테마 결정)
    const observer = new IntersectionObserver((entries) => {
      // transition 중이면 무시
      if (isTransitioning.value) return
      
      // 화면에 보이는 섹션들을 위치 순으로 정렬 (더 빠른 반응을 위해 15%로 낮춤)
      const intersectingSections = entries
        .filter(entry => entry.isIntersecting && entry.intersectionRatio > 0.15)
        .map(entry => ({
          element: entry.target as HTMLElement,
          themeValue: (entry.target as HTMLElement).getAttribute('data-theme'),
          themeIndex: parseInt((entry.target as HTMLElement).getAttribute('data-theme') || '0'),
          top: entry.boundingClientRect.top,
          ratio: entry.intersectionRatio
        }))
        .sort((a, b) => a.top - b.top) // 위에서부터 순서대로 정렬
      
      // 가장 첫 번째 섹션의 테마 사용
      if (intersectingSections.length > 0) {
        const firstSection = intersectingSections[0]
        const targetThemeIndex = firstSection.themeIndex
        
        // 이전 테마와 다를 때만 변경
        if (targetThemeIndex !== lastThemeIndex) {
          lastThemeIndex = targetThemeIndex
          updateTheme(targetThemeIndex)
        }
      }
    }, {
      threshold: [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
    })
    
    if (themeSections.length > 0) {
      themeSections.forEach((section) => {
        observer.observe(section)
      })
    } else {
    }
  }
  
  return {
    registerSections,
    currentTheme,
    isTransitioning
  }
}