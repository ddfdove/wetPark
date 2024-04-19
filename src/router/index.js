// createRouter用来创建路由对象, createWebHistory,createWebHashHistory用来指定路由模式
// 导入createRouter, createWebHistory或createWebHashHistory
import { createRouter,  createWebHashHistory } from 'vue-router'

// 路由数组
const routes = [
    {
        path: '/',
        component: ()=>import('../view/park/index.vue')
    },
     {
        path: '/park',
        component: ()=>import('../view/park/index.vue')
    },
     {
        path: '/device',
        component: ()=>import('../view/device/index.vue')
    },
     {
        path: '/bird',
        component: ()=>import('../view/bird/index.vue')
    },
   
    {
        path: '/personnel',
        component: ()=>import('../view/personnel/index.vue')
    },
     {
        path: '/data',
        component: ()=>import('../view/data/index.vue')
    },
      {
        path: '/message',
        component: ()=>import('../view/message/index.vue')
    },
]

// 创建路由对象
const router = createRouter({
  //路由模式：哈希模式
  history: createWebHashHistory(),
    routes
})

export default router

