// src/router/index.ts
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

// 静态路由
export const constantRoutes: RouteRecordRaw[] = [
  { path: "/", redirect: "/login" },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/Login/Login.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/pages/Home/Home.vue"),
    children: [
      {
        path: "/board",
        component: () => import("@/pages/Home/Board/Board.vue"),
        redirect: "/board/info",
        children: [
          {
            path: "/board/info",
            name: "boardInfo",
            component: () =>
              import("@/pages/Home/Board/BoardInfo/BoardInfo.vue"),
          },
          {
            path: "/board/analyze",
            name: "analyze",
            component: () =>
              import("@/pages/Home/Board/BoardAnalyze/BoardAnalyze.vue"),
          },
        ],
      },
    ],
  },
];

/**
 * 创建路由
 */

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes as RouteRecordRaw[],
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

/**
 * 重置路由
 */
export function resetRouter() {
  router.replace({ path: "/login" });
  location.reload();
}

export default router;
