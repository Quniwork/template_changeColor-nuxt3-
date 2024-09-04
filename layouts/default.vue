<template>
  <div class="page-layout">
    <ChangeColor />
    <div class="page-wrap">
      <CommonHeader :apiData="apiData" />
      <Transition name="fade" mode="out-in">
        <main class="page-container-wrap">
          <nuxt-page :apiData="apiData" />
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

// 提供 theme 给所有子组件
const theme = ref('dark')
provide('theme', theme)

// 获取路由信息
const route = useRoute()

// 动态设置 body 的 class
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

// 在组件挂载时进行监听
onMounted(() => {
  watchEffect(() => {
    updateBodyClass()
  })
})
</script>
