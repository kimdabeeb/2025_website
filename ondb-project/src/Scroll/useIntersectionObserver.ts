import { ref, readonly, onMounted, onUnmounted, type Ref } from 'vue'

// type
export interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  threshold?: number | number[]
  rootMargin?: string
  root?: Element | null
}

export interface UseIntersectionObserverReturn {
  isSupported: Readonly<Ref<boolean>>
  observe: (element: Element) => void
  unobserve: (element: Element) => void
  disconnect: () => void
}

export function useIntersectionObserver(
  callback: IntersectionObserverCallback,
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn {
  const observer = ref<IntersectionObserver | null>(null)
  const isSupported = ref<boolean>(false)

  const defaultOptions: UseIntersectionObserverOptions = {
    threshold: 0.5,
    rootMargin: '0px',
    ...options
  }

  // 관찰 대상 요소들을 관리
  const observedElements = ref<Set<Element>>(new Set())

  const observe = (element: Element) => {
    if (observer.value && element) {
      observer.value.observe(element)
      observedElements.value.add(element)
    }
  }

  const unobserve = (element: Element) => {
    if (observer.value && element) {
      observer.value.unobserve(element)
      observedElements.value.delete(element)
    }
  }

  const disconnect = () => {
    if (observer.value) {
      observer.value.disconnect()
      observedElements.value.clear()
    }
  }

  onMounted(() => {
    isSupported.value = 'IntersectionObserver' in window

    if (isSupported.value) {
      observer.value = new IntersectionObserver((entries, observer) => {
        callback(entries, observer)
      }, defaultOptions)
    }
  })

  onUnmounted(() => {
    disconnect()
  })

  return {
    isSupported: readonly(isSupported),
    observe,
    unobserve,
    disconnect
  }
}