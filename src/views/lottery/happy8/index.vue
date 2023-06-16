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
import lotteryForm from "./form.vue";
export default {
  components: {
    lotteryForm,
  },
  data() {
    return {
      time: "",
      compose: "",
      count: 0,
      dialogFormVisible: false,

      dateKey: Date.now(), // 用于刷新子组件
    };
  },
  methods: {
    onSubmit() {
      this.$refs["lotteryForm"].$refs["form"].validate((valid) => {
        if (valid) {
          console.log("formData:", this.$refs["lotteryForm"].form);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
