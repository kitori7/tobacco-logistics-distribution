// src/router/index.ts
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Login from "@/pages/Login/Login.vue";
import Home from "@/pages/Home/Home.vue";
import Board from "@/pages/Home/Board/Board.vue";
import BoardInfo from "@/pages/Home/Board/BoardInfo/BoardInfo.vue";
import BoardAnalyze from "@/pages/Home/Board/BoardAnalyze/BoardAnalyze.vue";
import Group from "@/pages/Home/Group/Group.vue";

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
    redirect: "/home/board",
    children: [
      {
        path: "/home/board",
        component: Board,
        redirect: "/home/board/info?feedbackType=1",
        children: [
          {
            path: "/home/board/info",
            name: "boardInfo",
            component: BoardInfo,
          },
          {
            path: "/home/board/analyze",
            name: "analyze",
            component: BoardAnalyze,
          },
        ],
      },
      {
        path: "/home/group",
        name: "group",
        component: Group,
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
});

/**
 * 重置路由
 */
export function resetRouter() {
  router.push({ path: "/login" });
  location.reload();
}
router.beforeEach((to) => {
  //登录成功有token进入main
  const token = localStorage.getItem("token");
  if (to.path.startsWith("/home") && !token) {
    return "/login";
  }
});
export default router;
