import suoxiao from "@/assets/live/suoxiao.png";
import suoxiao_h from "@/assets/live/suoxiao-h.png";
import fangda from "@/assets/live/fangda.png";
import fangda_h from "@/assets/live/fangda-h.png";

import toLeft from "@/assets/live/xiangzuo.png";
import toRight from "@/assets/live/xiangyou.png";
import toTop from "@/assets/live/xiangshang.png";
import toBottom from "@/assets/live/xiangxia.png";
// ptzDire1
import top from "@/assets/live/yunpanshang.png";
import bottom from "@/assets/live/yunpanxia.png";
import left from "@/assets/live/yunpanzuo.png";
import right from "@/assets/live/yunpanyou.png";
import top_h from "@/assets/live/yunpanshang-h.png";
import bottom_h from "@/assets/live/yunpanxia-h.png";
import left_h from "@/assets/live/yunpanzuo-h.png";
import right_h from "@/assets/live/yunpanyou-h.png";
// ptzDire2
import righttop from "@/assets/live/yunpanyoushang.png";
import rightbottom from "@/assets/live/yunpanyouxia.png";
import righttop_h from "@/assets/live/yunpanyoushang-h.png";
import rightbottom_h from "@/assets/live/yunpanyouxia-h.png";
import lefttop from "@/assets/live/yunpanzuoshang.png";
import leftbottom from "@/assets/live/yunpanzuoxia.png";
import lefttop_h from "@/assets/live/yunpanzuoshang-h.png";
import leftbottom_h from "@/assets/live/yunpanzuoxia-h.png";
import rotate from "@/assets/live/xuanzhuan.png";
// 按钮组
import fangdajia from "@/assets/live/fangdajia.png";
import suoxiaojian from "@/assets/live/fangdajian.png";
import jujiaojia from "@/assets/live/jujiaojia.png";
import jujiaojian from "@/assets/live/jujiaojian.png";
import guangquanjia from "@/assets/live/光圈加.png";
import guangquanjian from "@/assets/live/光圈减.png";
import { PositionTree, TempFloor } from "../types/position";
export const enum OperateType {
  Empty = "",
  Zoom = 1,
}

export const ptzImgs = {
  // 缩小
  suoxiao: [suoxiao, suoxiao_h],
  // 放大
  fangda: [fangda, fangda_h],
  // 收缩状态下四个按钮
  direction: [
    { url: toTop, type: 1 },
    { url: toBottom, type: 2 },
    { url: toLeft, type: 3 },
    { url: toRight, type: 4 },
  ],
  // 方向图标： 上下左右 [0]默认图标  [1]高亮图标
  ptzDire1: [
    [
      { url: top, type: 1 },
      { url: right, type: 4 },
      { url: bottom, type: 2 },
      { url: left, type: 3 },
    ],
    // [top_h, right_h, bottom_h, left_h],
  ],
  // 方向图标： 左上 左下 右上 右下
  ptzDire2: [
    [
      { url: lefttop, type: 5 },
      { url: righttop, type: 7 },
      { url: leftbottom, type: 6 },
      { url: rightbottom, type: 8 },
    ],
    // [lefttop_h, righttop_h, leftbottom_h, rightbottom_h],
  ],
  // 中心旋转图标
  rotate,
  // 按钮组
  btns: [
    { name: fangdajia, type: OperateType.Zoom, value: 1 },
    { name: suoxiaojian, type: OperateType.Zoom, value: 2 },
    { name: jujiaojia, type: "", value: 1 },
    { name: jujiaojian, type: "", value: 2 },
    { name: guangquanjia, type: "", value: 1 },
    { name: guangquanjian, type: "", value: 2 },
  ],
};

// 工具函数：处理位置树
/**
 * 由于楼栋，楼层，房间的字段名不同，所以使用递归不方便，需要逐层处理
 * @param {*} originData 接口返回数据
 */
export const positionDataParser = (originData: PositionTree[]) => {
  let res: any = [];
  originData?.forEach((item) => {
    let tempFloor: TempFloor = { ...item };

    // 处理楼栋
    if (item.floorNodeList.length > 0) {
      tempFloor.isOrg = true; // 代表是楼栋
      tempFloor.children = item.floorNodeList;
      delete tempFloor.floorNodeList;

      // 处理楼层
      tempFloor.children.forEach((floor: any) => {
        floor.isOrg = true; // 代表是楼层
        floor.id = floor.floorId;
        floor.name = floor.floor;
        delete floor.floorId;
        delete floor.floor;
        delete floor.floorIndex;

        if (floor.doorPlateNodes.length > 0) {
          floor.children = floor.doorPlateNodes;
          delete floor.doorPlateNodes;

          // 处理房间
          floor.children.forEach((door: any) => {
            door.name = door.number;
            delete door.number;
            delete door.type;
            door.isOrg = true; // 代表是房间

            //
            if (door.deviceNodes.length > 0) {
              door.children = door.deviceNodes;
              delete door.deviceNodes;

              door.children.forEach((device: any) => {
                device.isOrg = false; // 代表是设备
                device.id = device.deviceId;
              });
            }
          });
        }

        if (floor.deviceNodes.length > 0) {
          if (floor.children) {
            floor.deviceNodes.forEach((device: any) => {
              device.isOrg = false; // 代表是设备
              device.id = device.deviceId;
              floor.children.push(device);
            });
          } else {
            floor.children = floor.deviceNodes;
          }
        }
        delete floor.deviceNodes;
      });
    }
    res.push(tempFloor);
  });
  // console.log("res", res);
  return res;
};
