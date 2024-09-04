<template>
  <div class="page-layout">
    <ChangeColor />
    <div class="page-wrap">
      <CommonHeader :apiData="apiData" />
      <Transition name="fade" mode="out-in">
        <main class="page-container-wrap">
          <nuxt-page />
        </main>
      </Transition>
      <CommonFooter :apiData="apiData" />
    </div>
  </div>
</template>

<script setup>
import { ref, provide, onMounted, watchEffect } from 'vue'
import { useApiData } from '~/composables/useApiData'
import { useRoute } from 'vue-router'

// 调用 useApiData 获取数据
const { apiData } = useApiData()

// 监听路由变化，根据路由更新数据
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