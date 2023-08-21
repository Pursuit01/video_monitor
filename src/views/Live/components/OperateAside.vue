<template>
  <div class="move_box" :class="[isExpend ? 'expend' : 'no_expend']">
    <img
      :src="isExpend ? ptzImgs.suoxiao[0] : ptzImgs.fangda[0]"
      @click="expendMoveBox"
      alt=""
    />
    <div class="expend_box" v-if="isExpend">
      <div class="setting">
        <div class="dire">
          <img
            :src="item.url"
            v-for="(item, index) in ptzImgs.ptzDire2[0]"
            :key="index"
            alt=""
            @click="changeDirection(item.type)"
          />
        </div>
        <div class="dire scale">
          <img
            v-for="(item, index) in ptzImgs.ptzDire1[0]"
            :key="index"
            :src="item.url"
            alt=""
            @click="changeDirection(item.type)"
          />
        </div>
        <div class="center">
          <img :src="ptzImgs.rotate" alt="" />
        </div>
      </div>
      <div class="operate_btns">
        <div
          class="btn_item"
          v-for="(item, index) in ptzImgs.btns"
          :key="index"
          @click="changeTypeState(item.type, item.value)"
        >
          <img :src="item.name" alt="" />
        </div>
      </div>
      <div class="slider_bar">
        <el-slider
          v-model="step"
          :max="7"
          :min="1"
          :step="1"
          :show-tooltip="false"
        ></el-slider>
        <span>{{ step }}</span>
      </div>
      <div class="set_point">
        <el-select placeholder="请输入预设点" v-model="point"></el-select>
        <el-button>查看</el-button>
      </div>
      <div class="set_point">
        <el-select placeholder="请设置" v-model="point"></el-select>
        <el-button>开始</el-button>
        <el-button>停止</el-button>
      </div>
    </div>
    <div class="noexpend_box" v-else>
      <div class="direction_box">
        <img
          :src="item.url"
          v-for="(item, index) in ptzImgs.direction"
          :key="index"
          alt=""
          @click="changeDirection(item.type)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ptzImgs, OperateType } from "../store/config";
import { useLiveStore } from "../store";
import { ElMessage } from "element-plus";
const liveStore = useLiveStore();

const isExpend = ref(false);
const expendMoveBox = () => {
  isExpend.value = !isExpend.value;
};
const step = ref(1);

// 预设点
const point = ref(null);

// 修改云台方向
const changeDirection = (type: number) => {
  liveStore.changeDirection(type);
};
const changeTypeState = (type: OperateType, value: number) => {
  if (type == "") {
    ElMessage.info("功能开发中...");
    return;
  }
  switch (type) {
    case OperateType.Zoom:
      liveStore.changeZoom(value);
      break;
    default:
      let res: never = type;
      break;
  }
};
</script>

<style lang="scss" scoped>
.move_box {
  position: relative;
  background-color: #fff;
  padding: 15px 10px;
  transition: height 0.4s;
  text-align: right;
  > img {
    cursor: pointer;
  }
  &.no_expend {
    height: 104px;
  }
  &.expend {
    height: 518px;
  }
  .expend_box {
    display: flex;
    flex-direction: column;
    align-items: center;
    .setting {
      position: relative;
      width: 150px;
      height: 150px;
      border-radius: 50%;
      border: 1px solid #cee0f9;
      background-color: #edf4fd;
      .center {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 55px;
        height: 55px;
        border: 1px solid #cee0f9;
        border-radius: 50%;
        z-index: 11;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 25px;
          height: 25px;
          cursor: pointer;
          transition: all 0.3s;
          &:hover {
            filter: contrast(150%);
          }
        }
      }
      .dire {
        position: absolute;
        align-items: center;
        width: 100px;
        height: 100px;
        left: 25px;
        top: 25px;
        z-index: 10;

        img {
          position: absolute;
          cursor: pointer;
          transition: all 0.3s;
          width: 21px;
          height: 22px;
          &:hover {
            filter: contrast(150%);
          }
          &:nth-child(2n-1) {
            left: 0;
          }
          &:nth-child(2n) {
            right: 0;
          }
          &:nth-child(1) {
          }
          &:nth-child(3) {
            bottom: 0;
          }
          &:nth-child(2) {
          }
          &:nth-child(4) {
            bottom: 0;
          }
        }
      }
      .scale {
        left: 0;
        top: 0;
        width: 150px;
        height: 150px;
        z-index: 9;
        img {
          &:nth-child(2n-1) {
            width: 23px;
            height: 13px;
            left: 50%;
            transform: translateX(-50%);
          }
          &:nth-child(2n) {
            width: 13px;
            height: 23px;
            top: 50%;
            transform: translateY(-50%);
          }
          &:nth-child(1) {
            top: 10px;
          }
          &:nth-child(3) {
            bottom: 10px;
          }
          &:nth-child(2) {
            right: 10px;
          }
          &:nth-child(4) {
            left: 10px;
          }
        }
      }
    }
    .operate_btns {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      margin-top: 16px;
      .btn_item {
        width: 50%;
        text-align: center;
        border: 1px solid #e4e9f1;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
          background-color: rgba(5, 166, 250, 0.05);
        }
      }
    }
    .slider_bar {
      width: 100%;
      display: flex;
      margin: 15px 10px 5px;
      padding-left: 5px;
      // padding-left: 10px;
      span {
        width: 30px;
        margin-left: 16px;
        text-align: center;
        line-height: 32px;
        border: 1px solid #ccc;
      }
    }
    .set_point {
      display: flex;
      margin-top: 15px;
      .el-button {
        margin-left: 15px;
      }
    }
  }
  .noexpend_box {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: end;
    .direction_box {
      width: 100%;
      display: flex;
      justify-content: space-around;
      img {
        cursor: pointer;
      }
    }
  }
}
</style>
../store/config
