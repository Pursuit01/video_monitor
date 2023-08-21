import { RouteRecordRaw } from "vue-router";
import { globalRoutesMap } from "./config";
import Live from "@/views/Live/index.vue";
export const defaultRoute = [
  { path: "/404", component: globalRoutesMap["404"] },
  { path: "/:pathMatch(.*)*", component: globalRoutesMap["404"] },
];

export const mainRoute = [
  {
    path: "/",
    name: "main",
    component: globalRoutesMap["/"],
    redirect: "/live",
    children: [
      {
        path: "live",
        name: "live",
        index: "/live",
        // component: Live,
        component: globalRoutesMap["live"],
        icon: "zr-live",
        title: "实时预览",
        meta: { title: "实时预览" },
      },
      {
        path: "record",
        name: "record",
        index: "/record",
        component: globalRoutesMap["record"],
        icon: "zr-record",
        title: "录像回放",
        meta: { title: "录像回放" },
      },
    ],
  },
];
