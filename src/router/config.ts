interface RoutesMapImpl {
  [prop: string]: () => Promise<any>;
}
export const globalRoutesMap: RoutesMapImpl = {
  "404": () => import("@/views/404.vue"),
  "/": () => import("@/layout/index.vue"),
  // layout: () =>
  'live': () => import('@/views/Live/index.vue'),
  'record': () => import('@/views/Record/index.vue'),
};
