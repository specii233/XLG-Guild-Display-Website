<!-- Home.vue -->
<template>
  <div>
    <!-- 使用轮播组件 -->
    <Carousel :images="bannerImages" :autoplay="true" :interval="4000" />
    <h1>Home Page Content</h1>
    <!-- 其他内容 -->
  </div>
</template>

<script setup>
// 1. 导入组件
import Carousel from '../components/Carousel.vue'; // 请根据您的实际路径调整
import { ref } from 'vue';

// 2. 定义响应式数据（轮播图图片列表）
const bannerImages = ref([
  { src: 'https://picsum.photos/1200/400?random=1', alt: 'Beautiful landscape 1', title: 'Welcome', description: 'Discover amazing content' },
  { src: 'https://picsum.photos/1200/400?random=2', alt: 'Beautiful landscape 2', title: 'Latest News', description: 'Stay updated with our blog' },
  { src: 'https://picsum.photos/1200/400?random=3', alt: 'Beautiful landscape 3', title: 'Community', description: 'Join our growing community' },
  { src: 'https://picsum.photos/1200/400?random=4', alt: 'Beautiful landscape 4', title: 'Get Involved', description: 'Learn how to contribute' },
  { src: 'https://picsum.photos/1200/400?random=5', alt: 'Beautiful landscape 5', title: 'Contact Us', description: 'We would love to hear from you' }
  // 您可以动态添加或修改这个数组，轮播图会自动更新
]);

// 如果需要动态更新图片，可以定义一个方法
const updateBannerImages = () => {
  bannerImages.value.push({ src: 'https://picsum.photos/1200/400?random=6', alt: 'New image' });
};
</script>

<style scoped>
/* 您的页面样式 */
</style>
