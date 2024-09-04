<template>
  <Swiper
    :modules="[SwiperAutoplay, SwiperEffectCreative, SwiperPagination]"
    :pagination="true"
    :slides-per-view="1"
    :loop="true"
    :effect="'creative'"
    :autoplay="{
      delay: 8000,
      disableOnInteraction: true,
    }"
    :creative-effect="{
      prev: {
        shadow: false,
        translate: ['-20%', 0, -1],
      },
      next: {
        translate: ['100%', 0, 0],
      },
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