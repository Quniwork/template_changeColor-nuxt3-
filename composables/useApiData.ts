import { computed } from 'vue'
import { useNuxtApp } from '#app'

export function useApiData() {
  const nuxtApp = useNuxtApp()

  const apiData = computed(() => {
    try {
      if (!nuxtApp.$apiData) {
        throw new Error('API data is not defined')
      }
      return nuxtApp.$apiData
    } catch (error) {
      console.error('Error in useApiData:', error)
      return {} // 返回一个空对象以避免后续代码出错
    }
  })

  return {
    apiData
  }
}
