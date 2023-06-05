/**
 * 图标数据结构工具类
 */
export default {
  // 简易折线图
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
          // 最大最小值
          markPoint: {
            data: [
              {
                type: "max",
                name: "最大值",
                itemStyle: { color: "red" },
              },
              {
                type: "min",
                name: "最小值",
                itemStyle: { color: "green" },
              },
            ],
          },
          markLine: {
            data: [
              {
                type: "average",
                name: "平均值",
                itemStyle: { color: "orange" },
              },
            ],
          },
        },
      ],
    };
  },
  // 单柱图
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

  // 多列柱状图
  // titleName-标题名，tipsUnit-浮动提示窗单位
  // legendData-区分名,xData-X轴数据
  getMultiBarOptionData(
    titleName,
    tipsUnit,
    legendData,
    xName,
    xData,
    yName,
    seriesData
  ) {
    const OptionsData = {
      // 标题样式
      title: {
        text: titleName,
        textStyle: {
          color: "black",
        },
        left: "left",
      },
      // 提示框
      tooltip: {
        trigger: "axis",
        backgroundColor: "gray",
        axisPointer: {
          type: "shadow",
        },
        // 提示信息格式，支持html样式
        formatter: function (params) {
          var res = '<div style="color:#00C7FF">';
          res += "<strong>" + params[0].name + "（" + tipsUnit + "）</strong>";
          for (var i = 0, l = params.length; i < l; i++) {
            res +=
              "<br/>" +
              (i == 4 ? "&nbsp;&nbsp;" : "") +
              params[i].seriesName +
              " : " +
              params[i].value +
              " 次";
          }
          res += "</div>";
          return res;
        },
      },
      // 菜单
      legend: {
        // 菜单字体样式
        textStyle: {
          color: "black",
        },
        // 菜单位置
        x: "right",
        // 菜单数据
        data: legendData,
      },
      xAxis: [
        {
          type: "category",
          axisLine: {
            show: true,
            // x轴线样式
            lineStyle: {
              color: "#17273B",
              width: 1,
              type: "solid",
            },
          },
          // x轴字体设置
          axisLabel: {
            show: true,
            fontSize: 12,
            color: "black",
          },
          name: xName,
          data: xData,
        },
      ],
      yAxis: [
        {
          type: "value",
          // y轴字体设置
          axisLabel: {
            show: true,
            color: "black",
            fontSize: 12,
            // formatter: function (value) {
            //   return value + "次";
            // },
          },
          name: yName,
          // y轴线设置不显示
          axisLine: {
            show: false,
          },
          // 与x轴平行的线样式
          splitLine: {
            show: true,
            lineStyle: {
              color: "#17273B",
              width: 1,
              type: "dashd",
            },
          },
        },
      ],
      series: [],
    };
    seriesData.forEach((element) => {
      OptionsData.series.push({
        name: element.name,
        type: "bar",
        // 柱子宽度
        barWidth: 8,
        // 柱状图样式
        itemStyle: {
          color: element.color,
          barBorderRadius: [30, 30, 0, 0],
        },
        data: element.data,
      });
    });
    return OptionsData;
  },

  // 获取简易饼图数据结构
  getPieOptionData(title, subtext, seriesName, seriesData) {
    return {
      title: {
        text: title,
        subtext: subtext,
        left: "center",
      },
      tooltip: {
        trigger: "item",
        valueFormatter: (value) => value + "次",
      },
      legend: {
        left: "center",
        bottom: 10,
      },
      series: [
        {
          name: seriesName,
          type: "pie",
          radius: "50%",
          data: seriesData,
          label: {
            normal: {
              show: true,
              formatter: "{b}({d}%)", // 自定义显示格式(b:name, c:value, d:百分比)
            },
          },
          itemStyle: {
            normal: {
              // 设置颜色数
              color: function (colors) {
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
                ];
                return colorList[colors.dataIndex];
              },
            },
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
  },
};
