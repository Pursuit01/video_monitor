<template>
  <el-container class="app-container">
    <el-container class="app-container-aside-main">
      <el-aside
        :class="['app-container-aside', !isCollapse ? 'is_expend' : '']"
        width="auto"
      >
        <d-menu-model
          class="aside-menu-model"
          :isCollapse="isCollapse"
          v-model="active"
          :list="authRoutes"
          isMerge
          @onClick="(data) => goTo('onClick', data)"
          @onCollapseClick="(data) => goTo('onCollapseClick', data)"
        >
        </d-menu-model>
      </el-aside>
      <el-main class="app-container-main">
        <router-view v-slot="{ Component }">
          <component :is="Component" />
          <!-- <transition name="el-fade-in-linear" mode="out-in">
          </transition> -->
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store/modules/app";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const appStore = useAppStore();
const isCollapse = computed(() => appStore.isCollapse);

const authRoutes = computed(() => appStore.routes);

const active = ref("");

const setActive = () => {
  const _fullPathList = route.fullPath.split("/");
  let _active: string = "";
  _fullPathList?.map((item: any, index: number) => {
    if (index !== 0 && index < 3) {
      _active += `/${item}`;
    }
  });
  // console.log(_active);

  active.value = _active;
};

const goTo = (key: string, data: any) => {
  console.log(key, data);
  if (key == "onClick") {
    const _url = data?.data?.path;
    console.log(router.options.routes);

    router.push("/" + _url);
  }
  if (key == "onCollapseClick") {
    appStore.isCollapse = !appStore.isCollapse;
  }
};

watchEffect(() => {
  setActive();
});
</script>

<style lang="less" scoped>
.app-container {
  width: 100vw;
  height: 100vh;
  &.isHaveWuJie {
    height: 100%;
  }
  .app-container-header {
    --el-header-height: auto;
    --nav-bar-active-color: var(--el-color-primary);
    padding: 0;
  }

  .app-container-aside-main {
    background: var(--el-main-bg-color);
    flex: 1;
    --el-main-padding: 16px;
    padding-top: var(--el-main-padding);
  }

  .app-container-aside {
    height: 100%;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #6c6e73;
    overflow: unset;
    padding: 0 24px 0 0;
    overflow-y: auto;
    //滚动条的宽度
    &::-webkit-scrollbar {
      width: 0px;
    }
    //滚动条的滑块
    &::-webkit-scrollbar-thumb {
      background-color: rgba(144, 147, 153, 1);
      border-radius: 3px;
    }
    :deep(.el-menu-item + .el-menu-item) {
      margin-top: 15px;
      margin-bottom: 15px;
    }

    :deep(.el-sub-menu .el-menu-item) {
      margin-top: 0;
      margin-bottom: 0;
    }
    .aside-menu-model {
      --el-menu-width: 188px;
      ::v-deep(.el-button) {
        &::before {
          font-family: "zr-iconfont";
          content: "\e7ed";
          position: relative;
          left: 10px;
          top: 1px;
          width: 20px;
          height: 20px;
        }
      }
    }
  }
  .app-container-main {
    //height: calc(100vh - v-bind(nav_height));
    width: 100%;
    height: calc(100% - 24px);
    //overflow: hidden;
    // padding: 40px;
    margin-right: 24px;
    margin-bottom: 24px;
    // border-radius: 8px;
    // box-shadow: 0px 0px 6px 1px rgba(53, 56, 63, 0.1);
    padding: 0;
  }
}
</style>
