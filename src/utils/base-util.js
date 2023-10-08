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

  // 20种颜色列表
  getColorList() {
    var colorList = [
      "#FFC0CB",
      "#FF1493",
      "#7B68EE",
      "#0000FF",
      "#6495ED",
      "#00BFFF",
      "#5F9EA0",
      "#00FFFF",
      "#7FFFD4",
      "#2E8B57",
      "#7CFC00",
      "#FFD700",
      "#FFA500",
      "#FF4500",
      "#FA8072",
      "#FF0000",
      "#B22222",
      "#DCDCDC",
      "#A9A9A9",
      "#696969",
    ];
    return colorList;
  },
};
