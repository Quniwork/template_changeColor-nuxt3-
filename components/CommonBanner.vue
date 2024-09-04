<template>
  <div class="banner-block">
    <div class="banner-wrap" :style="backgroundStyle"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useApiData } from '~/composables/useApiData'

const route = useRoute()
const { apiData } = useApiData()

// 获取当前路径的最后一部分作为 link 名称
const pageLink = computed(() => {
  const pathParts = route.path.split('/').filter(Boolean) // 过滤掉空字符串
  return pathParts[pathParts.length - 1] || null
})

// 动态生成背景图的路径
const backgroundStyle = computed(() => {
  // 仅在 apiData 和 navItems 已加载时处理
  if (apiData.value && apiData.value.navItems) {
    // 查找与当前路径匹配的 navItem
    const matchedNavItem = apiData.value.navItems.find(item => item.link === pageLink.value)

    // 如果找到了匹配的项且有 class，生成背景图片路径
    if (matchedNavItem && matchedNavItem.class) {
      const imagePath = `/image/lang/zh-cn/title_${matchedNavItem.class}.png`
      return {
        backgroundImage: `url(${imagePath})`
      }
    }
  }

  // 如果没有匹配项或没有 class，返回空样式
  return {}
})
</script>