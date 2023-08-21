import request from "@/api/http";

// 获取位置树
export const getPositionTree = (bizUint: string) => {
  return request({
    method: "get",
    url: `/device-manager/api/v1/device/system/position/tree?bizUnit=${bizUint}`,
  });
};
