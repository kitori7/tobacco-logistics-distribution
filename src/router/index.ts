// src/router/index.ts
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

// 静态路由
const constantRoutes: RouteRecordRaw[] = [
  { path: "/", redirect: "/login" },
  {
    path: "/login",
    name: "login",
    component: ()=>import("@/pages/Login/Login.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: ()=>import("@/pages/Home/Home.vue"),
    meta: {order: 0}, 
    redirect: "/home/board",
    children: [
      {
        path: "/home/board",
        component: ()=>import("@/pages/Home/Board/Board.vue"),
        redirect: "/home/board/info?feedbackType=1",
        children: [
          {
            path: "/home/board/info",
            name: "boardInfo",
            component: ()=>import("@/pages/Home/Board/BoardInfo/BoardInfo.vue"),
          },
          {
            path: "/home/board/analyze",
            name: "analyze",
            component: ()=>import("@/pages/Home/Board/BoardAnalyze/BoardAnalyze.vue"),
          },
        ],
      },
      {
        path: "/home/group",
        name: "group",
        meta: {order: 1}, 
        component: ()=>import("@/pages/Home/Group/Group.vue"),
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
// 声明meta属性类型
declare module 'vue-router' {
  interface RouteMeta {
    order : number
   }
 }
export default router;
