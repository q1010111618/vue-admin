/** 首页界面 */

<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
    <div class="app-header">
      <el-button-group>
        <el-button type="primary" icon="el-icon-edit" @click="addForm">
          新增
        </el-button>
        <el-button type="success" icon="el-icon-refresh" @click="getData">
          刷新
        </el-button>
      </el-button-group>
    </div>
    <el-divider content-position="left">我的号码</el-divider>
    <el-table v-loading="loading" :data="tableData" height="700">
      <el-table-column label="所选号码" width="400px;">
        <template slot-scope="scope">
          <div
            v-for="(data, i) in scope.row.lotteryNum.split(',')"
            :key="i"
            class="ball_noraml"
          >
            {{ data }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="lotteryName" label="彩票类型" />
      <el-table-column prop="lotteryType" label="玩法" />
      <el-table-column prop="winningFlag" label="是否中奖" />
      <el-table-column prop="winningDate" label="中奖日期" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            v-show="!scope.row.winningFlag"
            type="primary"
            @click="winningCheck(scope.row)"
            >校验是否中奖</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogFormVisible" title="新增我的号码">
      <add-form ref="addForm" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit()">确 定 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import addForm from "./addForm.vue";
import myLottery from "@/api/myLottery";

export default {
  name: "Dashboard",
  components: { addForm },
  data() {
    return {
      loading: false,
      tableData: [],

      dialogFormVisible: false,
    };
  },
  computed: {
    ...mapGetters(["name"]),
  },
  mounted() {
    this.getData();
  },
  methods: {
    addForm() {
      this.dialogFormVisible = true;
      this.$refs.addForm.form = {};
    },

    getData() {
      myLottery
        .getUserLottery({ username: this.name })
        .then((result) => {
          this.$message.success(result.message);
          this.tableData = result.data;
        })
        .catch((error) => {
          this.$message.error(error);
        });
    },

    winningCheck(data) {
      myLottery
        .winningCheck(data)
        .then((result) => {
          this.$message.success(result.message);
          this.getData(); // 刷新数据
        })
        .catch((error) => {
          this.$message.error(error);
        });
    },

    onSubmit() {
      this.$refs["addForm"].$refs["form"].validate((valid) => {
        if (valid) {
          const formData = this.$refs["addForm"].form;
          console.log("formData:", formData);
          myLottery
            .addUserLottery(formData)
            .then((result) => {
              this.$message.success(result.message);
              this.dialogFormVisible = false;
              this.getData(); // 刷新数据
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

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.ball_noraml {
  width: 1.5vw;
  height: 1.5vw;
  line-height: 1.5vw;
  border-radius: 1vw;
  background-color: #00a8ff;
  color: white;
  float: left;
  text-align: center;
  margin: 2px 5px;
}
</style>
