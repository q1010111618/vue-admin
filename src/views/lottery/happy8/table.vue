/* 查询某批号码开奖记录 */
<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="查询号码">
        <el-input
          v-model="formInline.nums"
          placeholder="查询号码"
          style="width: 15vw"
        />
      </el-form-item>
      <el-form-item label="命中数">
        <el-select
          v-model="formInline.hitCount"
          placeholder="命中数"
          style="width: 8vw"
        >
          <el-option label="4" :value="4" />
          <el-option label="5" :value="5" />
          <el-option label="6" :value="6" />
          <el-option label="7" :value="7" />
          <el-option label="8" :value="8" />
          <el-option label="9" :value="9" />
          <el-option label="10" :value="10" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryData">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="tableData" height="500">
      <el-table-column label="开奖号码" width="400px;">
        <template slot-scope="scope">
          <div
            v-for="(data, i) in scope.row.happy8Num.split(',')"
            :key="i"
            class="ball_noraml"
            :class="{ active: dataCheck(data) }"
          >
            {{ data }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="time" label="日期" />
      <el-table-column prop="hitCount" label="命中数" />
    </el-table>
  </div>
</template>

<script>
import happy8 from "@/api/happy8";
export default {
  data() {
    return {
      loading: false,
      formInline: {
        nums: "",
        hitCount: 4,
      },
      tableData: [],
    };
  },
  methods: {
    dataCheck(data) {
      let hasNum = this.formInline.nums.split(",").filter((item) => {
        return item == data;
      });
      if (hasNum.length > 0) {
        return true;
      } else {
        return false;
      }
    },

    queryData() {
      this.tableData = [];
      this.loading = true;
      const data = this.formInline.nums.split(",");
      happy8
        .query4Hit(data, this.formInline.hitCount)
        .then((result) => {
          console.log("快乐8中将结果查询：", result);
          this.tableData = result;
          console.log("tableData:", this.tableData);
        })
        .catch((error) => {
          this.$message.error("获取查询结果异常：" + error);
        })
        .finally((e) => {
          this.loading = false;
        });
    },
  },
};
</script>
<style scoped>
.ball_noraml {
  width: 1.5vw;
  height: 1.5vw;
  border-radius: 1vw;
  background-color: #00a8ff;
  color: white;
  float: left;
  text-align: center;
  margin: 2px 5px;
}
.active {
  background-color: #fb2a2a;
}
</style>
