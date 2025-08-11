import { ref, readonly, onMounted, type Ref } from 'vue'

// 타입 정의
export interface ThemeColors {
  '--theme-main-bg': string
  '--theme-sub-bg': string
  '--theme-title': string
  '--theme-deco': string
  '--theme-border': string
}

export interface Theme {
  name: string
  colors: ThemeColors
}

export interface UseThemeReturn {
  currentTheme: Readonly<Ref<number>>
  isTransitioning: Readonly<Ref<boolean>>
  updateTheme: (themeIndex: number) => void
  themes: Record<number, Theme>
}

// ComPsych 스타일 테마 데이터 정의
const THEMES: Record<number, Theme> = {
  0: {
    name: "blue",
    colors: {
      "--theme-main-bg": "linear-gradient(135deg, #8DC9F4, #f2fbfe)",
      "--theme-sub-bg": "#f2fbfe",
      "--theme-title": "#070F36",
      "--theme-deco": "#8dc9f4",
      "--theme-border": "#98bde2",
    },
  },
  1: {
    name: "yellow",
    colors: {
      // "--theme-main-bg": "#fff58c",
      "--theme-main-bg": "linear-gradient(135deg, #fff58c, #fbf1ed)",
      "--theme-sub-bg": "#fbf1ed",
      "--theme-title": "#92522D",
      "--theme-deco": "#92522D",
      "--theme-border": "#ddd79a",
    },
  },
  2: {
    name: "green",
    colors: {
      // "--theme-main-bg": "#90c695",
      "--theme-main-bg": "linear-gradient(135deg, #90c695, #f1ffec)",
      "--theme-sub-bg": "#f1ffec",
      "--theme-title": "#264B3C",
      "--theme-deco": "#264B3C",
      "--theme-border": "#8cc2b1",
    },
  },
};

export function useTheme(): UseThemeReturn {
  const currentTheme = ref(0)
  const isTransitioning = ref(false)

  // CSS 변수 업데이트
  const updateTheme = (themeIndex: number) => {
    const theme = THEMES[themeIndex]
    if (!theme) return

    isTransitioning.value = true
    currentTheme.value = themeIndex

    const root = document.documentElement
    Object.entries(theme.colors).forEach(([property, value]) => {
      root.style.setProperty(property, value)
    })

    window.setTimeout(() => {
      isTransitioning.value = false
    }, 1800)
  }

  // 초기 테마 설정
  onMounted(() => {
    updateTheme(0)
  })

  return {
    currentTheme: readonly(currentTheme),
    isTransitioning: readonly(isTransitioning),
    updateTheme,
    themes: THEMES
  }
}