<template>
  <div class="tree_box">
    <el-input
      placeholder="设备名称或分组"
      v-model="keyword"
      class="input-with-select"
      clearable
    >
      <!-- <template #append>
        <el-button @click="handleSearch" :icon="Search" />
      </template> -->
    </el-input>
    <div class="group_box">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <!-- 设备位置🌲 -->
        <el-tab-pane label="设备位置" name="position"> </el-tab-pane>
        <TreeList
          v-if="activeName == 'position'"
          :data="positionTree"
          :keyword="keyword"
          @getData="getPositionData"
        >
          <template #default="{ node, data }">
            <div
              class="flex"
              :style="{
                cursor:
                  data.isOrg || data.status == 1 ? 'pointer' : 'not-allowed',
              }"
              @dblclick="!data.isOrg && addVideoItem(data)"
            >
              <SvgIcon
                style="width: 15px; height: 15px"
                name="org"
                v-if="data.isOrg"
              ></SvgIcon>
              <SvgIcon
                style="width: 15px; height: 15px"
                name="channel"
                v-if="!data.isOrg && data.status == 1"
              ></SvgIcon>
              <SvgIcon
                style="width: 15px; height: 15px"
                name="channeloffline"
                v-if="!data.isOrg && data.status == 0"
              ></SvgIcon>
              <span
                :style="{
                  color: data.isOrg || data.status == 1 ? '#333' : '#999',
                }"
                >{{ data.name }}</span
              >
            </div>
          </template>
        </TreeList>

        <!-- 设备分组🌲 -->
        <el-tab-pane label="设备分组" name="group">
          <TreeList
            v-if="activeName == 'group'"
            :data="positionTree"
            :keyword="keyword"
          >
            <template #default="{ node, data }">
              <div
                class="flex"
                :style="{
                  cursor:
                    data.isOrg || data.status == 1 ? 'pointer' : 'not-allowed',
                }"
                @dblclick="!data.isOrg && addVideoItem(data)"
              >
                <SvgIcon
                  style="width: 15px; height: 15px"
                  name="org"
                  v-if="data.isOrg"
                ></SvgIcon>
                <SvgIcon
                  style="width: 15px; height: 15px"
                  name="channel"
                  v-if="!data.isOrg && data.status == 1"
                ></SvgIcon>
                <SvgIcon
                  style="width: 15px; height: 15px"
                  name="channeloffline"
                  v-if="!data.isOrg && data.status == 0"
                ></SvgIcon>
                <span
                  :style="{
                    color: data.isOrg || data.status == 1 ? '#333' : '#999',
                  }"
                  >{{ data.name }}</span
                >
              </div>
            </template>
          </TreeList>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import TreeList from "./TreeList.vue";
import { getPositionTree } from "../api.ts";
import { useLiveStore } from "../store";
import { ElMessage } from "element-plus";
import { positionDataParser } from "../store/config";
const liveStore = useLiveStore();
// 输入框内容
const keyword = ref();
const handleSearch = () => {};

const activeName = ref("position");
const handleClick = () => {
  keyword.value = "";
};

// 设备位置树
const positionTree = ref([]);
onMounted(() => {
  getPositionData();
});
const getPositionData = async () => {
  const res = await getPositionTree("video-platform");
  if (res.success) {
    positionTree.value = positionDataParser(res.data);
  }
};

// 双击事件
const addVideoItem = (data) => {
  if (!data.status) {
    ElMessage.info("设备已离线，无法播放");
    return;
  }
  liveStore.videoList[liveStore.activeIndex] = data;
};
</script>

<style lang="scss" scoped>
.tree_box {
  margin-bottom: 10px;
  background-color: #fff;
  flex: 1;
  height: 0;
  text-align: center;
  padding: 15px 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .group_box {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 0px;
      cursor: pointer;
    }
    //滚动条的滑块
    &::-webkit-scrollbar-thumb {
      background-color: rgba(144, 147, 153, 0.6);
      border-radius: 3px;
    }
    :deep(.el-tabs) {
      .el-tabs__nav-scroll {
        display: flex;
        justify-content: center;
      }
      .el-tabs__header {
        position: sticky;
        top: 0;
        z-index: 15;
        background-color: #fff;
      }
      .el-tabs__active-bar {
        left: -5%;
        width: 50% !important;
      }
    }
  }
}
</style>
