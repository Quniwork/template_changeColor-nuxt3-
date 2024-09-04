<template>
  <GamePage :imageSrc="imageSrc" />
</template>

<script setup>
import { useRoute } from 'vue-router'
import { inject, computed } from 'vue'

// 獲取路由參數
const route = useRoute()

// 針對 theme 對應 promotion 圖片的邏輯
const theme = inject('theme')

// 路由參數和主題設置圖片路徑
const imageSrc = computed(() => {
  const { type } = route.params

  // promotion 對應theme顯示的圖片
  if (type === 'promotion') {
    return theme && theme.value === 'dark'
      ? '/image/not-use/hall/promotions.png'
      : '/image/not-use/hall/promotions_light.png'
  }

  // 處理其他頁面的邏輯
  switch (type) {
    case 'ball':
      return '/image/not-use/hall/sport_1200.png'
    case 'card':
      return '/image/not-use/hall/card_1200.png'
    case 'game':
      return '/image/not-use/hall/casino_960.png'
    case 'live':
      return '/image/not-use/hall/live_960.png'
    case 'ltlottery':
      return '/image/not-use/hall/lottery_1200.jpg'
    default:
      return ''
  }
})
</script>
