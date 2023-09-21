<template>
  <div class="app-container" style="height: 50vh">
    <div v-for="(item, index) in dataList" :key="index" style="display: flex">
      <div class="num">{{ item.compose }}</div>
      <ul class="time-list">
        <li
          v-for="(child, index2) in item.timeList"
          :key="index2"
          class="time-item"
        >
          {{ child }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getMoreThenOne } from "@/api/lottery3d";
export default {
  data() {
    return {
      dataList: [],
    };
  },
  mounted() {
    getMoreThenOne()
      .then((result) => {
        const data = result;
        data.forEach((element) => {
          const timeList = element.times.split(",");
          element.timeList = timeList;
        });
        this.dataList = data;
      })
      .catch((error) => {
        this.$message.error("获取开奖信息出错：" + error.toString());
      });
  },
  methods: {},
};
</script>
<style scoped>
.num {
  padding: 1vh;
  text-align: center;
  font-size: 1.5vw;
  font-weight: bold;
  color: red;
  border: 1px solid orange;
  border-radius: 1vh;
  background-color: beige;
}
.time-list {
  list-style-type: none;
  display: flex;
  margin: 0.5vh 0vw;
  padding-left: 1vw;
}
.time-item {
  padding: 1vh;
  border: 1px solid deepskyblue;
  border-radius: 1vh;
  color: white;
  background-color: cornflowerblue;
}
</style>
