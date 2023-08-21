<template>
  <div class="video_content" id="video_content">
    <div
      class="video_item"
      v-for="(item, index) in videoList"
      :style="style"
      :key="index"
      @click="changeActiveIndex(index)"
      @dblclick="setFullScreen(index)"
      :class="[activeIndex === index ? 'active' : '']"
      @mouseenter="item && changeMaskStatus(true, $event)"
      @mouseleave="item && changeMaskStatus(false, $event)"
    >
      {{ item }}
      <div class="top_mask mask"></div>
      <div class="bottom_mask mask">
        <SvgIcon
          name="open"
          width="13px"
          height="13px"
          class="open"
          color="#aaa"
        ></SvgIcon>
      </div>
    </div>
  </div>
</template>

<script setup>
import Demo from "../demo.vue";
import { useLiveStore } from "../store";
// 根组件数据仓库
const liveStore = useLiveStore();

const activeIndex = computed(() => liveStore.activeIndex);
const changeActiveIndex = (idx) => {
  liveStore.setActiveIndex(idx);
};
const videoList = computed(() => liveStore.videoList);

/**
 * 目的：保持时刻都有一个视频格处于高亮状态
 */
watchEffect(() => {
  // 监听 videoList 数组的长度，如果 activeIndex > videoList.length,则重置activeIndex为0
  if (activeIndex.value > videoList.value.length - 1) {
    changeActiveIndex(0);
  }
});

const setFullScreen = (idx) => {
  let tempList = JSON.parse(JSON.stringify(videoList.value));
  tempList[0] = tempList[idx];
  tempList.splice(1, tempList.length - 1);
  liveStore.changeVideoList(tempList);
};

const changeMaskStatus = (visible, e) => {
  if (visible) {
    e.target.classList.add("show_mask");
  } else {
    e.target.classList.remove("show_mask");
  }
  console.log(e.target.classList);
};

const style = computed(() => {
  return {
    width:
      videoList.value.length == 1
        ? "calc(100%)"
        : videoList.value.length == 4
        ? "calc(50% - 2px)"
        : "calc(33%)",
    height:
      videoList.value.length == 1
        ? "calc(100%)"
        : videoList.value.length == 4
        ? "calc(50% - 2px)"
        : "calc(33%)",
  };
});
</script>

<style lang="scss" scoped>
.video_content {
  width: 100%;
  height: 100%;
  overflow: hidden;
  flex: 1;
  background-color: #ccc;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-content: space-evenly;
  .video_item {
    overflow: hidden;
    position: relative;
    background-color: #333;
    color: #fff;
    margin: 1px;
    cursor: pointer;
    border: solid 1px transparent;
    video {
      object-fit: contain;
    }
    .mask {
      transition: all 0.2s ease-in;
      cursor: auto;
      width: 100%;
      position: absolute;
      height: 28px;
      line-height: 28px;
      left: 0;
      background: linear-gradient(
        to bottom,
        rgba(52, 59, 74, 0.8) 0%,
        rgba(22, 24, 29, 0.8) 100%
      );
    }
    .top_mask {
      top: -28px;
    }
    .bottom_mask {
      bottom: -28px;
      display: flex;
      align-items: center;
      .open {
        margin-left: 8px;

        &:hover {
          cursor: pointer;
          filter: brightness(200%);
        }
      }
    }
  }
  .show_mask {
    .top_mask {
      top: 0;
    }
    .bottom_mask {
      bottom: 0;
      display: flex;
      align-items: center;
      .open {
        margin-left: 8px;

        &:hover {
          cursor: pointer;
          filter: brightness(200%);
        }
      }
    }
  }
  .active {
    border: solid 1px #04a5f9;
  }
}
</style>
