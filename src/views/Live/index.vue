<template>
  <div class="live_box">
    <div class="operate_box">
      <TreeAside></TreeAside>
      <OperateAside></OperateAside>
    </div>
    <div class="video_box">
      <VideoBox></VideoBox>
      <videoBar></videoBar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import OperateAside from "./components/OperateAside.vue";
import TreeAside from "./components/TreeAside.vue";
import VideoBox from "./components/VideoBox.vue";
import videoBar from "./components/videoBar.vue";
import { useLiveStore } from "./store";
// Live组件数据仓库
const liveStore = useLiveStore();
</script>

<style lang="scss" scoped>
.live_box {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  .operate_box {
    width: 240px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .video_box {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-left: 15px;
  }
}
</style>
