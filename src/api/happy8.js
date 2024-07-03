// 快乐8相关接口

import request from "@/utils/request_lottery";
export default {
  // h获取最新一期开奖号码
  getHappy8Info() {
    return new Promise((resolve, reject) => {
      request
        .get("happy8/getHappy8Info")
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
  },

  addHappy8(data) {
    return new Promise((resolve, reject) => {
      request
        .post("happy8/addHappy8", data)
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

  // 获取开奖号码总期数占比
  getHappy8Stat1() {
    return new Promise((resolve, reject) => {
      request
        .get("happy8/getHappy8Stat1")
        .then((result) => {
          if (result.code == 200) {
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

  getHappy8Stat2() {
    return new Promise((resolve, reject) => {
      request
        .get("happy8/getHappy8Stat2")
        .then((result) => {
          if (result.code == 200) {
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

  // 查询某批号码命中数及对应开奖记录
  query4Hit(data, hitCount) {
    return new Promise((resolve, reject) => {
      request
        .post("happy8/query4Hit", { num: data, hitCount: hitCount })
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
  },
};
