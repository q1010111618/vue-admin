/**
 * 福彩3D相关接口
 */
import request from "@/utils/request_lottery";
export function composeSTAT(data) {
  return request({
    url: "lottery3d/composeSTAT",
    method: "post",
    data,
  });
}

export function lottery3dLimit() {
  return request({
    url: "lottery3d/lottery3dLimit",
    method: "get",
  });
}

export function addLottery3d(data) {
  return request.post("lottery3d/addLottery3d", data);
}

export function getLottery3dInfo() {
  return request.get("lottery3d/getLottery3dInfo");
}

export function getAnyGroupByData() {
  return request.get("lottery3d/getAnyGroupByData");
}
