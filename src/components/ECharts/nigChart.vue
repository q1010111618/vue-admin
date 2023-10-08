/* 南丁格尔玫瑰图 */
<template>
  <div
    :id="chartId"
    v-loading="loading"
    style="width: 100%; height: 100%"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  />
</template>

<script>
import * as echarts from "echarts";
import baseUtil from "@/utils/base-util";

export default {
  props: {
    chartId: {
      type: String,
      default: "nigChart",
    },
    chartData: {
      type: Array,
      default: null,
    },
    chartOptions: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      loading: true,
      nigChart: null,
    };
  },
  mounted() {
    console.log("数据读取：", this.chartData);
    console.log("配置项：", this.chartOptions);
    if (!baseUtil.isEmpty(this.chartData)) {
      console.log("非空加载数据");
      this.initCharts(this.chartData);
    }
  },
  methods: {
    initCharts(result) {
      this.nigChart = echarts.init(document.getElementById(this.chartId));
      this.nigChart.setOption(this.getNigOptionData(result, this.chartOptions));
      this.loading = false;
    },

    // 获取配置项
    getNigOptionData(chartData, chartOptions) {
      return {
        title: chartOptions.title,
        legend: {
          top: "bottom",
        },
        tooltip: {
          trigger: "item",
          formatter: function (params) {
            // console.log(params);
            const res =
              params.name +
              "<br/>" +
              "开奖次数：" +
              params.data.data +
              "<br/>" +
              "开奖占比：" +
              (params.value * 100).toFixed(2) +
              "%";
            return res;
            // return "{a} <br/>{b} : {c} ({d}%)";
          },
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: "开奖号码",
            type: "pie",
            radius: [15, 150],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 8,
            },
            data: chartData,
          },
        ],
      };
    },
  },
};
</script>

<style></style>
