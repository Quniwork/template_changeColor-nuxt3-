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
import ChangeColor from '~/components/ChangeColor.vue'
import { useApiData } from '~/composables/useApiData'
import { useRoute } from 'vue-router'
import { onMounted, ref, provide, watchEffect } from 'vue'

const { apiData } = useApiData()
const route = useRoute()

// 提供 theme 給所有子組件
const theme = ref('dark')
provide('theme', theme)

// 動態設置 body 的 class
const updateBodyClass = () => {
  if (typeof window !== 'undefined' && apiData.value.navItems) {
    const currentPath = route.path.replace('/', '')
    let matchedClass = 'default'

    if (currentPath === '' || currentPath === 'first') {
      matchedClass = 'first'
    } else {
      const matchedNavItem = apiData.value.navItems.find(item => item.link === currentPath)
      if (matchedNavItem) {
        matchedClass = matchedNavItem.class
      }
    }

    document.body.className = matchedClass
  }
}

onMounted(() => {
  updateBodyClass()

  watchEffect(() => {
    updateBodyClass()
  })
})
</script>