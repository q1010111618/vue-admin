/**
 * 图标数据结构工具类
 */
export default {
  getLineOptionData(xData, yData, xLabel, yLabel) {
    return {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      xAxis: {
        type: "category",
        data: xData,
        name: xLabel,
      },
      yAxis: {
        type: "value",
        name: yLabel,
      },
      series: [
        {
          data: yData,
          type: "line",
          name: "开奖号码",
        },
      ],
    };
  },
  getBarOptionData(xData, yData, xName, yName) {
    return {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      xAxis: [
        {
          type: "category",
          data: xData,
          axisTick: {
            alignWithLabel: true,
          },
          name: xName,
        },
      ],
      yAxis: [
        {
          type: "value",
          name: yName,
        },
      ],
      series: [
        {
          name: "次数",
          type: "bar",
          barWidth: "60%",
          data: yData,
        },
      ],
    };
  },
};
