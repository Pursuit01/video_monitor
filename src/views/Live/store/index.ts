import { defineStore } from "pinia";
export const useLiveStore = defineStore("liveStore", {
  state: () => ({
    // 高亮视频格
    activeIndex: 0,
    // 设置一条空数据，用于初始化 VideoBox
    videoList: [null],
    // 云台控制
    queryData: {
      direction: 0, // 1:上；2：下；3：左；4：右；5：左上；6：左下；7：右上；8：右下
      zoom: 0, // 1/加，2/减
    },
  }),
  actions: {
    setActiveIndex(idx: number) {
      this.activeIndex = idx;
    },
    // videoList相关
    changeVideoNum(num: number) {
      this.videoList.length = num;
    },
    changeVideoList(list: any) {
      this.videoList = list;
    },
    changeDirection(type: number) {
      this.queryData.direction = type;
    },
    changeZoom(value: number) {
      this.queryData.zoom = value;
    },
  },
});
