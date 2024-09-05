<template>
  <div class="page-container">
    <div class="page-body">
      <img :src="imageSrc">
    </div>
  </div>
</template>

<script setup>
// 定义一个 prop 来接收不同的图片路径
const props = defineProps({
  imageSrc: {
    type: String,
    required: true
  }
})
</script>