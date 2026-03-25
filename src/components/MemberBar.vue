<template>
    <div class="autoTurnBar" ref="autoTurnBar">
        <!-- 轮播内容区域 -->
        <div class="carousel-container">
            <div 
                class="carousel-track" 
                :style="trackStyle"
                @touchstart="handleTouchStart"
                @touchmove="handleTouchMove"
                @touchend="handleTouchEnd"
            >
                <div 
                    class="autoTurnPage" 
                    v-for="(page, pageIndex) in paginatedData" 
                    :key="pageIndex"
                >
                    <div class="item-grid">
                        <div 
                            v-for="(item, itemIndex) in page" 
                            :key="itemIndex" 
                            class="item-card"
                            @click="handleItemClick(item)"
                        >
                            <img :src="item.avatar">
                            <div>
                                <h3>{{ item.name }}</h3>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 导航控制 -->
        <div class="navigation-controls">
            <button 
                class="nav-btn prev" 
                @click="prevPage" 
                :disabled="currentPage === 0"
                aria-label="Previous page"
            >
                <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
            </button>
            
            <div class="page-indicators">
                <button
                    v-for="index in totalPages"
                    :key="index"
                    class="page-indicator"
                    :class="{ active: currentPage === index - 1 }"
                    @click="goToPage(index - 1)"
                    :aria-label="`Go to page ${index}`"
                >
                    {{ index }}
                </button>
            </div>
            
            <button 
                class="nav-btn next" 
                @click="nextPage" 
                :disabled="currentPage === totalPages - 1"
                aria-label="Next page"
            >
                <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
                </svg>
            </button>
        </div>

        <!-- 页面信息 -->
        <div class="page-info">
            <span class="current-page">{{ currentPage + 1 }}</span>
            <span class="separator">/</span>
            <span class="total-pages">{{ totalPages }}</span>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";

const props = defineProps({
    dataPath: {
        type: String,
        required: true,
        default: "../../static/data/members.json"
    },
    rows: {
        type: Number,
        default: (window.screen.width < 768) * 8 || 4,
    },
    columns: {
        type: Number,
        default: window.screen.width < 768 || 3,
    },
    autoplay: {
        type: Boolean,
        default: false
    },
    autoplayInterval: {
        type: Number,
        default: 3000
    },
    transitionDuration: {
        type: Number,
        default: 300
    }
});

const emit = defineEmits(['item-click', 'page-change']);

// 响应式数据
const data = ref([]);
const paginatedData = ref([]);
const currentPage = ref(0);
const autoTurnBar = ref(null);
let autoplayTimer = null;
let touchStartX = 0;
let touchEndX = 0;
const isDragging = ref(false);
const dragOffset = ref(0);

// 计算属性
const totalPages = computed(() => paginatedData.value.length);
const trackStyle = computed(() => ({
    transform: `translateX(calc(-${currentPage.value * 100}% + ${dragOffset.value}px))`,
    transition: isDragging.value ? 'none' : `transform ${props.transitionDuration}ms ease`
}));

// 数据加载函数
const loadConfig = async () => {
    if (!props.dataPath) return;

    try {
        const response = await fetch(props.dataPath);
        data.value = await response.json();
        paginateData();
    } catch (error) {
        console.error("Failed to load the data of members: ", error);
        data.value = [];
        paginateData();
    }
};

// 数据分页函数
const paginateData = () => {
    if (!data.value.length) {
        paginatedData.value = [];
        return;
    }

    const pageSize = props.rows * props.columns;
    const paginated = [];
    
    for (let pageIdx = 0; pageIdx < Math.ceil(data.value.length / pageSize); pageIdx++) {
        paginated.push(data.value.slice(pageIdx * pageSize, (pageIdx + 1) * pageSize));
    }
    
    paginatedData.value = paginated;
};

// 页面切换函数
const goToPage = (pageIndex) => {
    if (pageIndex < 0 || pageIndex >= totalPages.value || pageIndex === currentPage.value) {
        return;
    }
    
    currentPage.value = pageIndex;
    emit('page-change', pageIndex);
    resetAutoplay();
};

const prevPage = () => {
    if (currentPage.value > 0) {
        goToPage(currentPage.value - 1);
    }
};

const nextPage = () => {
    if (currentPage.value < totalPages.value - 1) {
        goToPage(currentPage.value + 1);
    }
};

// 自动播放控制
const startAutoplay = () => {
    if (!props.autoplay || totalPages.value <= 1) return;
    
    stopAutoplay();
    autoplayTimer = setInterval(() => {
        if (currentPage.value < totalPages.value - 1) {
            goToPage(currentPage.value + 1);
        } else {
            goToPage(0);
        }
    }, props.autoplayInterval);
};

const stopAutoplay = () => {
    if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
    }
};

const resetAutoplay = () => {
    if (props.autoplay) {
        stopAutoplay();
        startAutoplay();
    }
};

// 触摸滑动支持
const handleTouchStart = (e) => {
    touchStartX = e.touches[0].clientX;
    isDragging.value = true;
    stopAutoplay();
};

const handleTouchMove = (e) => {
    if (!isDragging.value) return;
    
    touchEndX = e.touches[0].clientX;
    dragOffset.value = touchEndX - touchStartX;
    
    // 限制拖动范围
    const containerWidth = autoTurnBar.value?.offsetWidth || 0;
    dragOffset.value = Math.max(Math.min(dragOffset.value, containerWidth * 0.3), -containerWidth * 0.3);
};

const handleTouchEnd = () => {
    if (!isDragging.value) return;
    
    isDragging.value = false;
    const containerWidth = autoTurnBar.value?.offsetWidth || 0;
    const dragDistance = touchEndX - touchStartX;
    
    // 判断是否应该切换页面
    if (Math.abs(dragDistance) > containerWidth * 0.1) {
        if (dragDistance > 0 && currentPage.value > 0) {
            prevPage();
        } else if (dragDistance < 0 && currentPage.value < totalPages.value - 1) {
            nextPage();
        }
    }
    
    dragOffset.value = 0;
    resetAutoplay();
};

// 项目点击事件
const handleItemClick = (item) => {
    emit('item-click', item);
};

// 监听器
watch(() => props.dataPath, loadConfig, { immediate: true });

watch(() => [props.rows, props.columns], () => {
    paginateData();
    currentPage.value = 0;
}, { deep: true });

watch(() => props.autoplay, (newValue) => {
    if (newValue) {
        startAutoplay();
    } else {
        stopAutoplay();
    }
}, { immediate: true });

// 生命周期钩子
onMounted(() => {
    startAutoplay();
});

onUnmounted(() => {
    stopAutoplay();
});
</script>

<style scoped>
.autoTurnBar {
    position: relative;
    width: 100%;
    overflow: hidden;
}

.carousel-container {
    overflow: hidden;
    margin-bottom: 20px;
}

.carousel-track {
    display: flex;
    transition: transform 0.3s ease;
}

.autoTurnPage {
    flex: 0 0 100%;
    min-width: 100%;
}

.item-grid {
    display: grid;
    grid-template-columns: repeat(v-bind('props.columns'), 1fr);
    grid-template-rows: repeat(v-bind('props.rows'), auto);
    gap: 16px;
    padding: 16px;
}

.item-card {
    background: white;
    border-radius: 8px;
    display: flex;
    padding: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    cursor: pointer;
}

.item-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.item-card h3 {
    font-size: 1.1rem;
    color: #333;
}

.item-card img {
    width: 48px;
    height: 48px;
}

.item-card div {
    margin-left: 10px;
}

.item-card p {
    margin: 0;
    font-size: 0.9rem;
    color: #666;
    line-height: 1.4;
}

.navigation-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
}

.nav-btn {
    background: #f0f0f0;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.nav-btn:hover:not(:disabled) {
    background: #e0e0e0;
}

.nav-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.nav-btn svg {
    fill: #333;
}

.page-indicators {
    display: flex;
    gap: 8px;
}

.page-indicator {
    background: #f0f0f0;
    border: none;
    border-radius: 4px;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s ease;
}

.page-indicator:hover {
    background: #e0e0e0;
}

.page-indicator.active {
    background: #007bff;
    color: white;
}

.page-info {
    text-align: center;
    margin-top: 12px;
    font-size: 0.9rem;
    color: #666;
}

.current-page {
    font-weight: bold;
    color: #007bff;
}

.separator {
    margin: 0 4px;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .item-grid {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 12px;
        padding: 12px;
    }
    
    .item-card {
        padding: 12px;
    }
    
    .nav-btn {
        width: 36px;
        height: 36px;
    }
    
    .page-indicator {
        width: 28px;
        height: 28px;
        font-size: 0.8rem;
    }
}
</style>
