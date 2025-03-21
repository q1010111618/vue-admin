<template>
  <div>
    <el-form ref="form" :model="form" label-width="120px">
      <el-row :gutter="48">
        <el-col :span="12">
          <el-form-item label="期数">
            <el-input v-model="form.code" placeholder="请输入开奖期数" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" @click="getHappyInfo()">获取</el-button>
        </el-col>
      </el-row>

      <el-form-item label="开奖号码">
        <el-input-number
          v-for="index in 20"
          :key="index"
          v-model.number="form[`num${index}`]"
          class="input-number"
          :min="1"
          :max="80"
          controls-position="right"
          size="large"
          :placeholder="'号码' + index"
          @change="handleChange"
        />
      </el-form-item>

      <el-form-item label="日期" prop="time">
        <el-date-picker
          v-model="form.time"
          placeholder="选择日期"
          style="width: 100%"
        />
      </el-form-item>

      <!-- <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">提交</el-button>
      </el-form-item> -->
    </el-form>
  </div>
</template>

<script>
import happy8 from "@/api/happy8";
import baseUtil from "@/utils/base-util";

export default {
  data() {
    return {
      form: {},
    };
  },
  methods: {
    handleChange(val) {},
    onSubmit(formName) {
      console.log("this.form:", this.form);
    },

    getHappyInfo() {
      if (baseUtil.isEmpty(this.form.code)) {
        this.$message.error("期数不能为空");
        return;
      } else {
        happy8
          .getHappy8InfoFormAPI({ code: this.form.code })
          .then((result) => {
            console.log("result:", result);
            result.num.forEach((element, index) => {
              this.form[`num${index + 1}`] = element;
            });
            this.form.time = result.time;
          })
          .catch((error) => {
            this.$message.error("查询开奖结果异常：" + error);
          });
      }
    },
  },
};
</script>
<style scoped>
.input-number {
  width: 120px;
  margin: 2px;
}
</style>
