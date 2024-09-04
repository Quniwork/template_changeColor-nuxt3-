<template>
  <Swiper
    :modules="[SwiperAutoplay, SwiperEffectCreative, SwiperPagination]"
    :pagination="true"
    :slides-per-view="1"
    :loop="true"
    :autoplay="{
      delay: 8000,
      disableOnInteraction: true,
    }"
  >
    <swiper-slide v-for="(slide, index) in slides" :key="index">
      <img :src="slide.image" class="slideshow-img" />
    </swiper-slide>
  </Swiper>
</template>

<script setup>
import { ref } from 'vue';

const slides = ref([
  { image: '/image/event01.png' },
  { image: '/image/event02.png' }
]);
</script>