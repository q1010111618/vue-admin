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

  // 随机RGB颜色代码#
  getRandomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    r = r < 16 ? "0" + r.toString(16) : r.toString(16);
    g = g < 16 ? "0" + g.toString(16) : g.toString(16);
    b = b < 16 ? "0" + b.toString(16) : b.toString(16);
    return "#" + r + g + b;
  },
};
