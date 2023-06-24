<template>
  <div
    id="pieChart"
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
      pieChart: null,
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
      this.pieChart = echarts.init(document.getElementById("pieChart"));
      this.pieChart.setOption(
        chartsData.getPieOptionData(
          this.chartOptions.title,
          this.chartOptions.subtext,
          this.chartOptions.seriesName,
          result
        )
      );
      this.loading = false;
    },
  },
};
</script>
