<template>
  <div class="treelist_box">
    <el-tree
      ref="treeRef"
      class="aside-tree"
      :data="data"
      :props="defaultProps"
      :filter-node-method="filterNode"
      highlight-current
      @node-click="handleNodeClick"
    >
      <template #default="{ node, data }">
        <slot nme="default" v-bind="{ node, data }"></slot>
      </template>
    </el-tree>
  </div>
</template>

<script setup>
const defaultProps = {
  children: "children",
  label: "name",
};
const emits = defineEmits({
  getData: null,
});
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  keyword: {
    type: String,
    default: "",
  },
});

const treeRef = ref();
const handleNodeClick = (obj, node, treeNode, event) => {
  // console.log(obj, node, treeNode);
};
const filterNode = (value, data, node) => {
  if (!value) return true;
  console.log(node.parent.data);
  // 父节点的 name 或当前节点的 name 满足条件，展示当前节点
  if (node.parent.data?.name?.toLowerCase()?.includes(value)) {
    return true;
  }
  if (data.name.toLowerCase().includes(value)) {
    return true;
  }
  return false;
};
watch(
  () => props.keyword,
  (val) => {
    treeRef.value.filter(val.toLowerCase());
  }
);
// emits("getData");
</script>

<style lang="scss" scoped>
.el-tree {
  user-select: none;
}
</style>

<!-- <style lang="scss" scoped>
.treelist_box {
  overflow: auto;
  flex: 1;
  :deep(.aside-tree) {
    --el-tree-node-hover-bg-color: rgba(72, 134, 255, 0.1);
    --el-color-primary-light-9: transparent;
    --el-tree-node-current-bg: rgba(72, 134, 255, 0.1);
    --el-tree-node-icon-width: 16px;
    --el-tree-node-border-left: 1px dashed rgba(72, 134, 255, 0.5);
    --el-tree-node__content-height: 35px;
    --el-tree-transition: all 0.2s ease-in-out;
    //width: 100%;
    flex: 1;
    overflow: auto;
    background: transparent;

    .el-tree-node__content {
      padding-left: 5px !important;
    }
    // 左边虚线部分 ↓↓↓↓↓↓↓↓↓↓↓↓
    .el-tree-node {
      padding-left: 15px;
      position: relative;
      .el-tree-node__label {
        padding-left: 8px;
        user-select: none;
      }
      &:before {
        content: "";
        height: calc(100%);
        //width: 1px;
        position: absolute;
        left: calc(18px + var(--el-tree-node-icon-width) / 2);
        top: 0;
        border-left: var(--el-tree-node-border-left);
      }

      &:first-child:before {
        height: calc(100% - var(--el-tree-node__content-height) / 2);
        top: calc(var(--el-tree-node__content-height) / 2);
      }

      &:last-child:before {
        height: calc(100% - var(--el-tree-node__content-height) / 2);
        top: calc(0 + var(--el-tree-node__content-height) / 1);
      }
      &:only-child:before {
        height: calc(100% - var(--el-tree-node__content-height) / 2);
        top: calc(0 + var(--el-tree-node__content-height) / 1);
        opacity: 0;
      }

      .el-tree-node__content {
        // overflow: hidden;
      }

      .el-tree-node__content {
        height: var(--el-tree-node__content-height);

        .el-icon.el-tree-node__expand-icon {
          width: var(--el-tree-node-icon-width);
          height: var(--el-tree-node-icon-width);
          background: #4886ff;
          border-radius: 2px;
          box-sizing: border-box;
          position: relative;
          transform: unset;

          svg {
            display: none;
          }

          &:before {
            transition: var(--el-tree-transition);
            content: " ";
            display: block;
            width: 10px;
            height: 2px;
            background: #ffffff;
            position: absolute;
            top: calc(50% - 1px);
            left: calc(50% - 5px);
            transform: rotate(0);
          }

          &:after {
            transition: var(--el-tree-transition);
            content: " ";
            display: block;
            width: 2px;
            height: 10px;
            background: #ffffff;
            position: absolute;
            top: calc(50% - 5px);
            left: calc(50% - 1px);
            transform: rotate(0);
          }

          &.is-leaf {
            //opacity: 0;
            opacity: 0.5;
            cursor: not-allowed;
          }

          &.expanded {
            &:before {
              transform: rotate(-180deg);
            }

            &:after {
              transform: rotate(90deg);
            }
          }
        }
      }
    }

    // 去掉最外层最后一个 多余的部分
    > .el-tree-node {
      &:before {
        opacity: 0;
      }
    }

    // 左边虚线部分 ↑↑↑↑↑↑↑↑↑↑

    .tree-item {
      //width: 100%;
      display: flex;
      align-items: center;
      flex: 1;
      overflow: hidden;
      height: 100%;
      box-sizing: border-box;
      line-height: 1;
      padding-left: 8px;
      padding-right: 20px;
      position: relative;
      //&:before{
      //  position: absolute;
      //  content:" ";
      //  display: block;
      //  height:100%;
      //  border-left: 2px solid rgba(72,134,255,0.5);
      //  left:0;
      //  top:0;
      //}

      .tree-item-label {
        display: flex;
        align-items: center;
        //flex: 1;
        height: 100%;
        padding-right: 10px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;

        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #6c6e73;

        .tooltip-default {
          padding: 0;
          height: unset;
          transition: var(--el-tree-transition);
        }

        .tree-item-label-text {
        }
      }

      .tree-item-btns {
        display: flex;
        align-items: center;
        flex-shrink: 0;
        opacity: 0;
        transition: var(--el-tree-transition);

        pointer-events: none;
        width: 0;
        overflow: hidden;
        transform: scale(0);
        transform-origin: left;
        //&.isShow {
        //  width: auto;
        //  opacity: 1;
        //  pointer-events: auto;
        //}

        .tree-item-btn {
          border: 0;
          background-color: transparent;
          padding: 0 9px;
          margin: 0;
          //color:#4f6d95;
          color: #12294d;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;

          &:hover {
            color: #4886ff;
          }
        }
      }
    }

    .tree-item {
      &:hover {
        .tree-item-btns {
          width: auto;
          opacity: 1;
          pointer-events: auto;
          transform: scale(1);
        }
      }
    }

    .tree-item {
      &.isCurrent {
        // background: var(--el-tree-node-current-bg);
        // border-radius: 4px;
        // padding: 3px 20px 3px 4px;
        .tooltip-default {
        }
      }
    }

    .el-tree-node__content:has(.isCurrent) {
      background: var(--el-tree-node-current-bg);
      border-radius: 4px;
      padding: 3px 20px 3px 4px;
    }
  }
}
</style> -->
