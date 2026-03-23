<!-- GuildBar.vue -->
<template>
    <header id="guildBar" :class="{ 'scrolled': isScrolled }">
        <div class="topbar" :class="{ 'fixed': isScrolled }">
            <img id="guild-logo" src="../assets/logo.png" alt="Guild Logo">
            <h2>Welcome to XLG Guild</h2>
            <div class="guild-anchors">
                <ul>
                    <li v-for="anchor in props.anchors" :key="anchor.name">
                        <a :href="anchor.href">{{ anchor.name }}</a>
                    </li>
                </ul>
            </div>
        </div>
    </header>
</template>

<script setup>
import { ref, inject } from 'vue';
import { useScrollDetection } from '../hooks/useScrollDetection';

const contentWindow = inject('contentWindow');
const { isScrolled } = useScrollDetection(80, contentWindow);

const props = defineProps({
    anchors: {
        type: Array,
        required: true,
        default: () => []
    },
});
</script>

<style scoped>
#guildBar {
    position: relative;
    top: 0;
    width: 100%;
    padding: 1rem;
    color: var(--third-color);
    transition: background-color 0.3s ease;
}

#guildBar.scrolled {

}

.topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all 0.3s ease;
}

.topbar.fixed {
    position: fixed;
    left: 1rem;
    right: 1rem;
    background: rgba(0, 0, 0, 0.22);
    backdrop-filter: blur(6px);
    box-shadow: 0 12px 36px rgba(0, 0, 0, 0.38);
    border-radius: 10px;
    padding: 10px 20px;
    z-index: 1000;
    animation: slideDown 0.3s ease;
}

.guild-anchors ul {
    list-style: none;
    display: flex;
    gap: 0.8rem;
}
.guild-anchors ul li a {
    position: relative;
    color: var(--third-color);
    text-decoration: none;
    font-weight: bold;
    transition: color 0.2s ease;
}
/* 添加一个伪元素来实现下划线动画 */
.guild-anchors ul li a::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: var(--primary-color);

    transform: scaleX(0); /* 初始状态：宽度为0 */
    transform-origin: center; /* 缩放中心点设为中间 */
    transition: transform 0.3s ease; /* 添加过渡效果 */
}
.guild-anchors ul li a:hover::after {
    transform: scaleX(1);
}

@media (max-width: 768px) {
    .topbar {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
    }
    .topbar img {
        display: none;
    }
    .topbar h2 {
        display: none;
    }
    .guild-anchors {
        width: 100%;
    }
    .guild-anchors ul {
        width: 100%;
        justify-content: space-around;
    }
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-100%);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

</style>