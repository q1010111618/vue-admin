<template>
  <div style="display: flex">
    <div
      id="pieChart"
      v-loading="loading4"
      style="width: 33%; height: 400px"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    />
    <div
      id="pieChart2"
      v-loading="loading5"
      style="width: 33%; height: 400px"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    />
    <div
      id="pieChart3"
      v-loading="loading6"
      style="width: 33%; height: 400px"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    />
  </div>
</template>

<script>
import * as echarts from "echarts";
import { getAnyGroupByData } from "@/api/lottery3d";
import chartsData from "@/utils/charts-data";
export default {
  data() {
    return {
      loading4: true,
      loading5: true,
      loading6: true,
      chart4: null,
      chart5: null,
      chart6: null,
    };
  },
  mounted() {
    this.initCharts();
  },
  methods: {
    initCharts() {
      this.chart4 = echarts.init(document.getElementById("pieChart"));
      this.chart5 = echarts.init(document.getElementById("pieChart2"));
      this.chart6 = echarts.init(document.getElementById("pieChart3"));
      getAnyGroupByData()
        .then((result) => {
          // 饼图
          const pieSeriesData = this.getSeriesData2(result);
          this.chart4.setOption(
            chartsData.getPieOptionData(
              { text: "百位号码", left: "center" },
              "出奖占比",
              "开奖号码",
              pieSeriesData.hData
            )
          );
          this.loading4 = false;
          this.chart5.setOption(
            chartsData.getPieOptionData(
              { text: "十位号码", left: "center" },
              "出奖占比",
              "开奖号码",
              pieSeriesData.tData
            )
          );
          this.loading5 = false;
          this.chart6.setOption(
            chartsData.getPieOptionData(
              { text: "个位号码", left: "center" },
              "出奖占比",
              "开奖号码",
              pieSeriesData.oData
            )
          );
          this.loading6 = false;
        })
        .catch((error) => {
          this.$message.error("获取统计数据出错：" + error.toString());
        });
    },

    getAnyGroupByData() {
      return new Promise((resolve, reject) => {
        getAnyGroupByData()
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

    // 获取饼图所需数据
    getSeriesData2(result) {
      const hData = [];
      const tData = [];
      const oData = [];
      result.hundreds.forEach((h) => {
        hData.push({ value: h.count, name: h.num });
      });
      result.tens.forEach((t) => {
        tData.push({ value: t.count, name: t.num });
      });
      result.onces.forEach((o) => {
        oData.push({ value: o.count, name: o.num });
      });
      return {
        hData: hData,
        tData: tData,
        oData: oData,
      };
    },
  },
};
</script>
