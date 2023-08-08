import { defineStore } from "pinia";
import { mainRoute } from "@/router/default";
export const useAppStore = defineStore("appStore", {
  state: () => ({
    isCollapse: false,
    routes: mainRoute[0].children
  }),
});
export const run = () => {
  return useAppStore();
};