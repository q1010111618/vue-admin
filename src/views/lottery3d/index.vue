<template>
  <div class="app-container">
    <div class="app-header">
      <el-button-group>
        <el-button
          type="primary"
          icon="el-icon-edit"
          @click="dialogFormVisible = true"
        >
          新增
        </el-button>
      </el-button-group>
      <div style="float: right">
        <h3>
          {{ time }} : <span style="color: blue">{{ compose }}</span>
        </h3>
        <h4>
          数据总量 : <span style="color: red">{{ count }}</span>
        </h4>
      </div>
    </div>
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
    <el-divider content-position="left">福彩3D个十百位出奖统计</el-divider>
    <div
      id="barChart2"
      v-loading="loading3"
      style="width: 100%; height: 400px"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    />

    <el-dialog :visible.sync="dialogFormVisible" title="开奖结果">
      <lottery-form ref="lotteryForm" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit()">确 定 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as echarts from "echarts";
import {
  composeSTAT,
  lottery3dLimit,
  getLottery3dInfo,
  getAnyGroupByData,
} from "@/api/lottery3d";
import { parseTime } from "@/utils/index.js";
import chartsData from "@/utils/charts-data";
import lotteryForm from "./form.vue";
import { addLottery3d } from "@/api/lottery3d";

export default {
  components: {
    lotteryForm,
  },
  data() {
    return {
      time: "", // 开奖日期
      compose: "", // 开奖号码
      count: 0, // 数据总量

      loading: true,
      loading2: true,
      loading3: true,
      chart: null,
      chart2: null,
      chart3: null,
      dialogFormVisible: false,
    };
  },
  mounted() {
    this.allInit();
  },
  methods: {
    allInit() {
      this.initCharts();
      this.initInfo();
    },

    initInfo() {
      getLottery3dInfo()
        .then((result) => {
          if (result.code == 200) {
            const data = result.data;
            this.time = parseTime(new Date(data.time), "{y}-{m}-{d}");
            this.compose = data.compose;
            this.count = data.count;
          } else {
            this.$message.error("获取开奖信息出错：" + result.message);
          }
        })
        .catch((error) => {
          this.$message.error("获取开奖信息出错：" + error.toString());
        });
    },

    initCharts() {
      this.chart = echarts.init(document.getElementById("barChart"));
      this.chart2 = echarts.init(document.getElementById("lineChart2"));
      this.chart3 = echarts.init(document.getElementById("barChart2"));
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
            chartsData.getBarOptionData(xData, yData, "开奖号码", "开奖次数")
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
            chartsData.getLineOptionData(xData, yData, "开奖日期", "开奖号码")
          );
          this.loading2 = false;
        })
        .catch((error) => {
          this.$message.error("获取统计数据出错：" + error.toString());
        });
      this.getAnyGroupByData()
        .then((result) => {
          const legendData = ["百位", "十位", "个位"];
          const xData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
          const seriesData = [];
          console.log("result:", result);
          const hCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          const tCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          const oCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          result.hundreds.forEach((h) => {
            hCount[h.num] = h.count;
          });
          result.tens.forEach((t) => {
            tCount[t.num] = t.count;
          });
          result.onces.forEach((o) => {
            oCount[o.num] = o.count;
          });
          seriesData.push(
            {
              name: "百位",
              color: "red",
              data: hCount,
            },
            {
              name: "十位",
              color: "orange",
              data: tCount,
            },
            {
              name: "个位",
              color: "blue",
              data: oCount,
            }
          );
          console.log("seriesData：", seriesData);
          this.chart3.setOption(
            chartsData.getMultiBarOptionData(
              "出奖次数统计",
              "号码",
              legendData,
              "开奖号码",
              xData,
              "出奖次数",
              seriesData
            )
          );
          this.loading3 = false;
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

    onSubmit() {
      this.$refs["lotteryForm"].$refs["form"].validate((valid) => {
        if (valid) {
          // request.post("/book/listByPage", { name: "123" });
          addLottery3d(this.$refs["lotteryForm"].form)
            .then((result) => {
              if (result.code === 200) {
                this.$message.success(result.message);
                this.dialogFormVisible = false;
                this.allInit();
              } else {
                this.$message.error(result.message);
              }
            })
            .catch((error) => {
              this.$message.error("新增失败：" + error.toString());
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style scoped>
h3,
h4 {
  margin: 0.4vh 0vw;
}
</style>
