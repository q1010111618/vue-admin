<template>
  <div class="app-container">
    <el-button-group>
      <el-button
        type="primary"
        icon="el-icon-edit"
        @click="dialogFormVisible = true"
      >
        新增
      </el-button>
    </el-button-group>
    <el-divider content-position="left">福彩3D出奖统计</el-divider>
    <div
      id="barChart"
      v-loading="loading"
      style="width: 100%; height: 400px"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    />
    <el-divider content-position="left">福彩3D出奖结果</el-divider>
    <div
      id="lineChart2"
      v-loading="loading2"
      style="width: 100%; height: 400px"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    />

    <el-dialog :visible.sync="dialogFormVisible" title="开奖结果">
      <lottery-form />
    </el-dialog>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { composeSTAT, lottery3dLimit } from "@/api/lottery3d";
import { parseTime } from "@/utils/index.js";
import chartsData from "@/utils/charts-data";
import lotteryForm from "./form.vue";

export default {
  components: {
    lotteryForm,
  },
  data() {
    return {
      loading: true,
      loading2: true,
      chart: null,
      chart2: null,
      dialogFormVisible: false,
    };
  },
  mounted() {
    this.initCharts();
  },
  methods: {
    initCharts() {
      this.chart = echarts.init(document.getElementById("barChart"));
      this.chart2 = echarts.init(document.getElementById("lineChart2"));
      this.getComposeSTAT()
        .then((result) => {
          // console.log("result:", result);
          var xData = [];
          var yData = [];
          result.forEach((element) => {
            xData.push(element.compose);
            yData.push(element.count);
          });
          this.chart.setOption(
            chartsData.getBarOptionData(xData, yData, "开奖号码", "开奖日期")
          );
          this.loading = false;
        })
        .catch((error) => {
          this.$message.error("获取统计数据出错：" + error.toString());
        });
      this.getLottery3dLimit()
        .then((result) => {
          // console.log("result:", result);
          var xData = [];
          var yData = [];
          result.forEach((element) => {
            xData.push(parseTime(new Date(element.time), "{y}-{m}-{d}"));
            yData.push(element.compose);
          });
          this.chart2.setOption(
            chartsData.getLineOptionData(xData, yData, "开奖号码", "开奖次数")
          );
          this.loading2 = false;
        })
        .catch((error) => {
          this.$message.error("获取统计数据出错：" + error.toString());
        });
    },

    getComposeSTAT() {
      return new Promise((resolve, reject) => {
        composeSTAT()
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
    getLottery3dLimit() {
      return new Promise((resolve, reject) => {
        lottery3dLimit()
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
  },
};
</script>
