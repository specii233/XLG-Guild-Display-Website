// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
// 导入路由配置
import router from './router/router.js' // 导入router实例

// 创建应用实例并使用路由插件
const app = createApp(App)
app.use(router) // 关键：这会使$router和$route在组件中可用[6](@ref)
app.mount('#app')


