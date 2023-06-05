/**
 * 基础工具类
 */
export default {
  isEmpty(obj) {
    var regu = "^[ ]+$";
    var re = new RegExp(regu);
    if (typeof obj == "undefined" || obj == null || obj == "" || re.test(obj)) {
      return true;
    } else {
      return false;
    }
  },
};
