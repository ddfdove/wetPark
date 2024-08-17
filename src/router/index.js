// createRouter用来创建路由对象, createWebHistory,createWebHashHistory用来指定路由模式
// 导入createRouter, createWebHistory或createWebHashHistory
import { KeepAlive } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";

// 路由数组
const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: () => import("../view/home/index.vue"),
    meta: {
      keepAlive: true,
      title: "home",
    },
  },
  {
    path: "/park",
    component: () => import("../view/park/index.vue"),
    meta: {
      keepAlive: true,
      title: "park",
    },
  },
  {
    path: "/device",
    component: () => import("../view/device/index.vue"),
    meta: {
      keepAlive: true,
      title: "device",
    },
  },
  {
    path: "/monitor",
    redirect: "/monitor/environment",
    meta: {
      keepAlive: true,
      title: "monitor",
    },
    
    children: [
      {
        path: "bird",
        component: () => import("../view/monitor/bird/index.vue"),
        meta: {
          keepAlive: true,
          title: "bird",
        },
      },

      {
        path: "personnel",
        component: () => import("../view/monitor/personnel/index.vue"),
        meta: {
          keepAlive: true,
          title: "personnel",
        },
      },
      {
        path: "environment",
        component: () => import("../view/monitor/environment/index.vue"),
        meta: {
          keepAlive: true,
          title: "environment",
        },
      },
    ],
  },

  {
    path: "/data",
    redirect: "/data/environment",
    meta: {
      keepAlive: true,
      title: "data",
    },
    children: [
      {
        path: "water",
        component: () => import("../view/data/water/index.vue"),
        meta: {
          keepAlive: true,
          title: "water",
        },
      },

      {
        path: "soil",
        component: () => import("../view/data/soil/index.vue"),
        meta: {
          keepAlive: true,
          title: "soil",
        },
      },
      {
        path: "environment",
        component: () => import("../view/data/environment/index.vue"),
        meta: {
          keepAlive: true,
          title: "environment",
        },
      },
    ],
  },

  {
    path: "/message",
    component: () => import("../view/message/index.vue"),
    meta: {
      keepAlive: true,
      title: "message",
    },
  },
];

// 创建路由对象
const router = createRouter({
  //路由模式：哈希模式
  history: createWebHashHistory(),
  routes,
});

export default router;
