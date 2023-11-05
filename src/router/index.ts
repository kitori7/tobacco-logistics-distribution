// src/router/index.ts
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Login from "@/pages/Login/Login.vue";
import Home from "@/pages/Home/Home.vue";
import Board from "@/pages/Home/Board/Board.vue";
import BoardInfo from "@/pages/Home/Board/BoardInfo/BoardInfo.vue";
import BoardAnalyze from "@/pages/Home/Board/BoardAnalyze/BoardAnalyze.vue";

// 静态路由
const constantRoutes: RouteRecordRaw[] = [
  { path: "/", redirect: "/login" },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/home",
    name: "home",
    component: Home,
    children: [
      {
        path: "/board",
        component: Board,
        redirect: "/board/info",
        children: [
          {
            path: "/board/info",
            name: "boardInfo",
            component: BoardInfo,
          },
          {
            path: "/board/analyze",
            name: "analyze",
            component: BoardAnalyze,
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
  routes: constantRoutes,
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

/**
 * 重置路由
 */
export function resetRouter() {
  router.push({ path: "/login" });
  location.reload();
}

export default router;
