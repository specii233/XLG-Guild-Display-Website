<!-- MainPanel.vue -->
<template>
    <div id="main-panel">
        <div id="menu-left" style="z-index: 100;">
            <img id="menu-logo" alt="" src="">
            <ul>
                <li @click="navigateToHome">Home</li>
                <li @click="navigateToMap">Map</li>
                <li @click="testFunc">Test</li>
            </ul>
        </div>
        <div id="content-right-static">
            <div id="content-right" ref="contentWindow" style="z-index: 50;">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script setup>
import { provide, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Scroller } from '../scripts/scroller.js';

// 1. 定义响应式数据
const contentWindow = ref(null);
let scroller = null;

// 2. 使用provide进行依赖注入
provide('contentWindow', contentWindow);

// 3. 获取路由实例
const router = useRouter();

// 4. 在DOM挂载后初始化Scroller
onMounted(() => {
    if (contentWindow.value) {
        scroller = new Scroller(contentWindow);
    } else {
        console.warn('contentWindow ref is not available yet');
    }
});

// 5. 定义方法
const navigateToHome = () => {
    router.push('/');
};

const navigateToMap = () => {
    router.push('/map');
};

const testFunc = () => {
    console.log('Test function called');
};
</script>

<style scoped>
#main-panel {
    width: 100%;
    height: 100%;
    display: flex;
    background-color: var(--background-color);
}
#menu-left {
    position: relative;
    width: 64px;
    height: 100%;
    left: 0;
    background-color: var(--background-color);
    box-shadow: 2px 0 5px var(--shadow-color);
}

#content-right-static {
    position: relative;
    flex: 1;
    height: 100%;
    transform: translateZ(0);
    overflow: hidden; /* 禁用滚动条 */
}

#content-right {
    position: relative;
    flex: 1;
    height: 100%;
    overflow-y: auto; /* 改为auto，只在需要时显示滚动条 */
    overflow-x: hidden; /* 禁用水平滚动条 */; 
    background-color: var(--background-color);
}
#menu-logo {
    width: 40px;
    height: 40px;
    margin-top: 10px;
}
li {
    padding: 5px 5px;
    cursor: pointer;
    color: var(--text-color);
}

@media (max-width: 768px) {
    #main-panel {
        flex-direction: column;
    }
    #menu-left {
        width: 100%;
        height: 64px;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    #menu-logo {
        margin: 0 10px;
    }
    #menu-left ul {
        display: flex;
        flex-direction: row;
    }
}
</style>