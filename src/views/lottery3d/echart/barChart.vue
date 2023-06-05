<template>
  <div
    id="barChart"
    v-loading="loading"
    style="width: 100%; height: 400px"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  />
</template>
<script>
import * as echarts from "echarts";
import baseUtil from "@/utils/base-util";
import chartsData from "@/utils/charts-data";

export default {
  props: {
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
      barChart: null,
    };
  },
  mounted() {
    console.log("数据读取：", this.chartData);
    if (!baseUtil.isEmpty(this.chartData)) {
      console.log("非空加载数据");
      this.initCharts(this.chartData);
    }
  },
  methods: {
    initCharts(result) {
      this.barChart = echarts.init(document.getElementById("barChart"));
      var xData = [];
      var yData = [];
      result.forEach((element) => {
        xData.push(element.compose);
        yData.push(element.count);
      });
      this.barChart.setOption(
        chartsData.getBarOptionData(
          xData,
          yData,
          this.chartOptions.xLabel || "开奖号码",
          this.chartOptions.yLabel || "开奖次数"
        )
      );
      this.loading = false;
    },
  },
};
</script>
