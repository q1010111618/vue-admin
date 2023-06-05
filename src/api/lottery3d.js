/**
 * 福彩3D相关接口
 */
import request from "@/utils/request_lottery";

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

export function composeSTAT(data) {
  return new Promise((resolve, reject) => {
    request
      .post("lottery3d/composeSTAT", data)
      .then((result) => {
        if (result.code === 200) {
          resolve(result.data);
        } else {
          reject(result.message);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getAnyGroupByData() {
  return new Promise((resolve, reject) => {
    request
      .get("lottery3d/getAnyGroupByData")
      .then((result) => {
        if (result.code === 200) {
          resolve(result.data);
        } else {
          reject(result.message);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
