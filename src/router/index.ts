import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { defaultRoute, mainRoute } from "./default";
import NProgress from "nprogress";

const routes: RouteRecordRaw[] = [...defaultRoute, ...mainRoute];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});
router.afterEach(() => {
  NProgress.done();
});
export default router;
