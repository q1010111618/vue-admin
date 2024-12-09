/**
 * 我的号码相关接口
 */
import request from "@/utils/request_lottery";
export default {
  // 新增用户所选号码
  addUserLottery(data) {
    return new Promise((resolve, reject) => {
      request
        .post("myLottery/addUserLottery", data)
        .then((result) => {
          if (result.code === 200) {
            resolve(result);
          } else {
            reject(result.message);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // 查询用户所选号码
  getUserLottery(data) {
    return new Promise((resolve, reject) => {
      request
        .post("myLottery/getUserLottery", data)
        .then((result) => {
          if (result.code === 200) {
            resolve(result);
          } else {
            reject(result.message);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  winningCheck(data) {
    return new Promise((resolve, reject) => {
      request
        .post("myLottery/winningCheck", data)
        .then((result) => {
          if (result.code === 200) {
            resolve(result);
          } else {
            reject(result.message);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
