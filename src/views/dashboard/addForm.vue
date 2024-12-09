<template>
  <div>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="所选号码" prop="lotteryNum">
        <el-input
          v-model="form.lotteryNum"
          placeholder="请输入你的号码，英文逗号或空格隔开。"
        />
      </el-form-item>

      <el-form-item label="彩票类型" prop="lotteryTable">
        <el-select
          v-model="form.lotteryTable"
          placeholder="请选择"
          @change="handleChange"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="所选玩法" prop="lotteryType">
        <el-select v-model="form.lotteryType" placeholder="请选择">
          <el-option
            v-for="item in lotteryTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      options: [
        {
          value: "lottery_3d",
          label: "福彩3D",
        },
        {
          value: "lottery_happy8",
          label: "福彩快乐8",
        },
      ],
      lotteryTypeOptions: [
        { value: "选六", label: "选六" },
        { value: "单选", label: "单选" },
      ],
    };
  },
  methods: {
    handleChange(val) {
      console.log("当前选中值：", val);
      this.form.lotteryName = this.getSelectedLabel(val);
      console.log("当前form:", this.form);
    },

    // 获取所选的label值
    getSelectedLabel(val) {
      const selectedOption = this.options.find(
        (option) => option.value === val
      );
      if (selectedOption) {
        return selectedOption.label;
      }
      return "";
    },
    onSubmit(formName) {
      console.log("this.form:", this.form);
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
