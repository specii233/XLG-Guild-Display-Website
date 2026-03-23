<template>
  <div class="carousel-container" @mouseenter="stopAutoPlay" @mouseleave="startAutoPlay">
    <!-- 轮播轨道：通过transform实现水平滑动 -->
    <div class="carousel-track" :style="trackStyle">
      <div 
        class="carousel-slide" 
        v-for="(image, index) in images" 
        :key="index"
      >
        <img :src="image.src" :alt="image.alt || `Slide ${index + 1}`" />
        <!-- 可以在此处添加标题、描述等 -->
        <div class="slide-caption" v-if="image.title">
          <h3>{{ image.title }}</h3>
          <p>{{ image.description }}</p>
        </div>
      </div>
    </div>

    <!-- 导航按钮 -->
    <button class="carousel-btn prev" @click="prevSlide" aria-label="Previous slide">‹</button>
    <button class="carousel-btn next" @click="nextSlide" aria-label="Next slide">›</button>

    <!-- 指示器（分页小圆点） -->
    <div class="carousel-indicators">
      <button
        v-for="(_, index) in images"
        :key="index"
        :class="{ active: currentIndex === index }"
        @click="goToSlide(index)"
        :aria-label="`Go to slide ${index + 1}`"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

// 1. 定义组件接收的属性（Props）
const props = defineProps({
  images: {
    type: Array,
    required: true,
    default: () => []
  },
  autoplay: {
    type: Boolean,
    default: true
  },
  interval: {
    type: Number,
    default: 3000 // 毫秒
  },
  transitionDuration: {
    type: Number,
    default: 500 // 毫秒
  }
});

// 2. 定义响应式状态
const currentIndex = ref(0);
let autoPlayTimer = null;

// 3. 计算属性：根据当前索引计算轨道的偏移量
const trackStyle = computed(() => ({
  transform: `translateX(-${currentIndex.value * 100}%)`,
  transition: `transform ${props.transitionDuration}ms ease`
}));

// 4. 定义核心方法
const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % props.images.length;
};

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length;
};

const goToSlide = (index) => {
  currentIndex.value = index;
};

const startAutoPlay = () => {
  if (props.autoplay && !autoPlayTimer) {
    autoPlayTimer = setInterval(nextSlide, props.interval);
  }
};

const stopAutoPlay = () => {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer);
    autoPlayTimer = null;
  }
};

// 5. 生命周期钩子
onMounted(() => {
  startAutoPlay();
});

onUnmounted(() => {
  stopAutoPlay();
});
</script>

<style scoped>
.carousel-container {
  position: relative;
  width: 100%;
  height: 400px; /* 您可以根据需要调整 */
  overflow: hidden;
}

.carousel-track {
  display: flex;
  height: 100%;
  will-change: transform; /* 提示浏览器优化动画性能 */
}

.carousel-slide {
  flex: 0 0 100%;
  height: 100%;
  position: relative;
}

.carousel-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 保持图片比例并覆盖整个区域 */
  display: block;
}

.slide-caption {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  color: var(--text-color);
  text-align: center;
  background-color: var(--background-color);
  padding: 10px 20px;
  border-radius: 4px;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.22);
  backdrop-filter: blur(6px);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.38);
  border: none;
  border-radius: 10px;
  width: 24px;
  height: 80px;
  color: var(--background-color);
  cursor: pointer;
  z-index: 10;
  transition: background-color 0.3s;
}
.carousel-btn:hover {
  background-color: var(--background-color);
  color: var(--text-color);
}
.carousel-btn:active {
  box-shadow: inset 0 0 5px var(--shadow-color);
}
.carousel-btn.prev {
  left: 20px;
}
.carousel-btn.next {
  right: 20px;
}

.carousel-indicators {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}
.carousel-indicators button {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background-color: var(--background-color);
  cursor: pointer;
  padding: 0;
  transition: background-color 0.3s;
}
.carousel-indicators button.active {
  background-color: var(--background-color);
  transform: scale(1.2);
}
</style>
