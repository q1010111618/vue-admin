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
        <el-button type="success" icon="el-icon-refresh" @click="allInit">
          刷新
        </el-button>
      </el-button-group>
      <div style="float: right">
        <h4>
          数据总量 : <span style="color: red">{{ count }}</span>
        </h4>
        <div style="display: flex">
          <div>{{ time }} :</div>
          <div class="num-div">
            <span v-for="(item, index) in compose" :key="index">{{
              item
            }}</span>
          </div>
        </div>
      </div>
    </div>
    <el-divider content-position="left">快乐8各号码开奖次数</el-divider>
    <bar-chart
      v-if="barShow"
      :key="dataKey"
      :chart-data="barChartData"
      :chart-options="barChartOptions"
    />
    <el-divider content-position="left">快乐8各号码总期数比例</el-divider>
    <div style="display: flex">
      <div style="width: 50%; height: 600px">
        <nig-chart
          v-if="nigShow"
          :key="dataKey3"
          chart-id="nigChart1"
          :chart-data="nigChartData"
          :chart-options="nigChartOptions"
        />
      </div>
      <div style="width: 50%; height: 600px">
        <nig-chart
          v-if="nigShow"
          :key="dataKey4"
          chart-id="nigChart2"
          :chart-data="nigChartData2"
          :chart-options="nigChartOptions2"
        />
      </div>
    </div>
    <el-divider content-position="left">快乐8各号码开奖比例</el-divider>
    <pie-chart
      v-if="barShow"
      :key="dataKey2"
      :chart-data="pieChartData"
      :chart-options="pieChartOptions"
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
import happy8 from "@/api/happy8";
import lotteryForm from "./form.vue";
import { parseTime } from "@/utils/index.js";
import BarChart from "@/components/ECharts/barChart.vue";
import PieChart from "@/components/ECharts/pieChart.vue";
import NigChart from "@/components/ECharts/nigChart.vue";
export default {
  components: {
    lotteryForm,
    BarChart,
    PieChart,
    NigChart,
  },
  data() {
    return {
      time: "",
      compose: [],
      count: 0,
      dialogFormVisible: false,

      barShow: false,
      barChartData: {
        xData: [],
        yData: [],
      },
      barChartOptions: {
        xLabel: "开奖号码",
        yLable: "开奖次数",
      },
      pieChartData: [],
      pieChartOptions: {
        title: { text: "出奖号码比例图", left: "right" },
        subtext: "出奖占比",
        seriesName: "开奖号码",
        legendPos: {
          orient: "vertical",
          top: 20,
          left: 40,
          itemWidth: 15,
          itemHeight: 10,
          itemGap: 25,
          borderRadius: 4,
          textStyle: {
            color: "#000",
            fontFamily: "Alibaba PuHuiTi",
            fontSize: 14,
            fontWeight: 400,
          },
        },
      },
      nigShow: false,
      nigChartData: [], // 热门号码20个
      nigChartData2: [], // 冷门号码20个
      nigChartOptions: {
        title: {
          text: "热门号码20个",
          subtext: "热门号码占比",
          left: "center",
        },
      },
      nigChartOptions2: {
        title: {
          text: "冷门号码20个",
          subtext: "冷门号码占比",
          left: "center",
        },
      },

      dataKey: Date.now() + 1, // 用于刷新子组件
      dataKey2: Date.now() + 2,
      dataKey3: Date.now() + 3,
      dataKey4: Date.now() + 4,
    };
  },
  mounted() {
    this.allInit();
  },
  methods: {
    allInit() {
      this.getHappy8Info();
      this.getHappy8BarChart();
      this.getHappy8NigChart();
    },

    // 获取快乐8柱状图数据
    getHappy8BarChart() {
      happy8
        .getHappy8Stat1()
        .then((result) => {
          console.log("快乐8开奖分布结果：", result);
          result.data.forEach((item) => {
            this.barChartData.xData.push(item.num);
            this.barChartData.yData.push(item.count);
            this.pieChartData.push({ value: item.count, name: item.num });
          });

          // this.barChartOptions = { xLabel: "开奖号码", yLabel: "开奖次数" };
          this.barShow = true;
        })
        .catch((error) => {
          this.$message.error("获取统计结果异常：" + error);
        });
    },

    getHappy8NigChart() {
      happy8
        .getHappy8Stat2()
        .then((result) => {
          console.log("快乐8开奖结果占比：", result);
          result.data.forEach((item, index) => {
            const data = {
              value: item.ratio,
              name: "号码：" + item.num,
              data: item.count,
            };
            if (index < 20) {
              this.nigChartData.push(data);
            } else if (index > 59) {
              this.nigChartData2.push(data);
            }
          });
          console.log("热门占比：", this.nigChartData);
          console.log("冷门占比：", this.nigChartData2);

          // this.barChartOptions = { xLabel: "开奖号码", yLabel: "开奖次数" };
          this.nigShow = true;
        })
        .catch((error) => {
          this.$message.error("获取统计结果异常：" + error);
        });
    },

    // 获取快乐8最新一期开奖
    getHappy8Info() {
      happy8
        .getHappy8Info()
        .then((result) => {
          console.log("快乐8开奖结果：", result);
          this.count = result.count;
          this.time = parseTime(new Date(result.time), "{y}-{m}-{d}");
          // 字符串数组转int数组
          const resStr = result.list.split(",");
          const resInt = [];
          resStr.forEach((element) => {
            resInt.push(parseInt(element));
          });
          console.log("resInt:", resInt);
          console.log("sort:", resInt.sort());
          this.compose = resInt.sort((a, b) => {
            return a - b;
          });
        })
        .catch((error) => {
          this.$message.error("获取开奖结果异常：" + error);
        });
    },
    onSubmit() {
      this.$refs["lotteryForm"].$refs["form"].validate((valid) => {
        if (valid) {
          const formData = this.$refs["lotteryForm"].form;
          console.log("formData:", formData);
          const paramData = { num: [], time: formData.time };
          for (let i = 1; i < 21; i++) {
            paramData.num.push(formData["num" + i]);
          }
          console.log("入参参数：", paramData);
          happy8
            .addHappy8(paramData)
            .then((result) => {
              this.$message.success(result.message);
              this.dialogFormVisible = false;
              this.allInit();
            })
            .catch((error) => {
              this.$message.error(error);
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
.num-div {
  color: blue;
  width: 230px;
  float: right;
  word-wrap: break-word;
}

.num-div span {
  width: 10%;
  text-align: center;
  display: block;
  float: left;
}
</style>
