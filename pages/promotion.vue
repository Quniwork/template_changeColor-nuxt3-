<template>
  <div class="page-container">
    <div class="page-body">
      <img :src="currentImage">
    </div>
  </div>
</template>

<script setup>
import { inject, computed } from 'vue'

const theme = inject('theme')

// 根据 theme 的值动态计算图片路径
const currentImage = computed(() => {
  return theme.value === 'dark'
    ? '/image/not-use/hall/promotions.png'
    : '/image/not-use/hall/promotions_light.png'
})
</script>
