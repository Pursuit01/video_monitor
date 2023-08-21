<template>
  <div class="video_bar_box">
    <el-popover
      trigger="click"
      :width="110"
      :visible="isShow"
      popper-class="choose_box"
    >
      <template #reference>
        <div class="refer" @click="isShow = !isShow">
          <img :src="screenMap[activeType]" alt="" />
          <img :src="down" alt="" />
        </div>
      </template>
      <template #default>
        <img @click="changeType('1')" :src="one" alt="" />
        <img @click="changeType('4')" :src="four" alt="" />
        <img @click="changeType('9')" :src="nine" alt="" />
      </template>
    </el-popover>
    <img @click="setFullScreen" :src="fullscreen" alt="" />
  </div>
</template>

<script setup>
import one from "@/assets/live/fenping1.png";
import four from "@/assets/live/fenping4.png";
import nine from "@/assets/live/fenping9.png";
import down from "@/assets/live/down.png";
import fullscreen from "@/assets/live/quanping.png";
import { ElMessage } from "element-plus";
import { useLiveStore } from "../store";
// 根组件数据仓库
const liveStore = useLiveStore();
const videoList = computed(() => liveStore.videoList);
const changeVideoNum = (num) => {
  liveStore.changeVideoNum(num);
};

const screenMap = {
  1: one,
  4: four,
  9: nine,
};

const isShow = ref(false);
const activeType = ref("1");
const changeType = (type) => {
  isShow.value = false;
  activeType.value = type;
  changeVideoNum(type);
};
const clearFullScreen = () => {
  document.exitFullscreen();
};
const setFullScreen = () => {
  const element = document.getElementById("video_content");

  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    // Firefox
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    // Chrome, Safari and Opera
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    // IE/Edge
    element.msRequestFullscreen();
  }
  element.addEventListener("dblclick", clearFullScreen);
};

watch(
  () => videoList.value,
  (val) => {
    activeType.value = Number(val.length);
  },
  {
    immediate: true,
    deep: true,
  }
);
</script>

<style lang="scss" scoped>
.video_bar_box {
  height: 50px;
  flex: 0 0 50px;
  background-color: #f5f8fc;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #e4e9f1;
  padding: 0 20px;
  > img {
    width: 22px;
    height: 22px;
    cursor: pointer;
  }
  .refer {
    width: 58px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    cursor: pointer;
    border: 1px solid #e4e9f1;
    img:nth-child(1) {
      width: 20px;
      height: 20px;
    }
    img:nth-child(2) {
      width: 15px;
      height: 8px;
    }
  }
}
</style>
<style lang="scss">
.choose_box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px,
    rgb(14 18 22 / 20%) 0px 10px 20px -15px;
  padding: 8px;
  img {
    width: 25px;
    height: 25px;
    cursor: pointer;
  }
}
</style>
