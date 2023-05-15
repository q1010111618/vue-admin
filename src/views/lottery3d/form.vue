<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px" :rules="rules">
      <el-form-item label="开奖号码" prop="compose">
        <el-input v-model="form.compose" type="number" />
      </el-form-item>
      <el-form-item label="日期" prop="time">
        <el-date-picker
          v-model="form.time"
          placeholder="选择日期"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addLottery3d } from "@/api/lottery3d";
export default {
  data() {
    return {
      form: {
        compose: "",
        time: "",
      },
      rules: {
        compose: [
          { required: true, message: "请输入开奖号码", trigger: "blur" },
          { min: 3, max: 3, message: "长度在3字符", trigger: "blur" },
        ],
        time: [{ required: true, message: "请选择日期", trigger: "change" }],
      },
    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addLottery3d(this.form)
            .then((result) => {
              if (result.code === 200) {
                this.$message.success(result.message);
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
