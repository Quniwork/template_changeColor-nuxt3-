<template>
  <div class="page-layout">
    <ChangeColor />
    <div class="page-wrap">
      <Header :apiData="apiData" />
      <Transition name="fade" mode="out-in">
        <main class="page-container-wrap">
          <nuxt-page />
        </main>
      </Transition>
      <Footer :apiData="apiData" />
    </div>
  </div>
</template>

<script setup>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import { useApiData } from '~/composables/useApiData'
import { useRoute } from 'vue-router'
import { onMounted, watchEffect } from 'vue'

const { apiData } = useApiData()
const route = useRoute()

// 动态设置 body 的 class
const updateBodyClass = () => {
  if (process.client && apiData.value.navItems) {
    // console.log('Current route path:', route.path)

    const currentPath = route.path.replace('/', '')
    const matchedNavItem = apiData.value.navItems.find(item => item.link === currentPath)

    document.body.className = matchedNavItem?.class || 'default'
  }
}

onMounted(() => {
  updateBodyClass()

  watchEffect(() => {
    updateBodyClass()
  })
})
</script>
