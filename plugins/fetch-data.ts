export default defineNuxtPlugin(async (nuxtApp) => {
  const { data, error } = await useFetch('/api/data')

  if (error.value) {
    console.error('Failed to fetch API data:', error.value)
  }

  // 設置全域變量
  nuxtApp.provide('apiData', data.value)
})
