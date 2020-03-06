<template>
  <div class="fillcontain">
    <Header v-bind:pageInfo="pageInfo"></Header>
    <el-main>这里应该会放一些数据展示等等</el-main>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";

export default {
  data() {
    return {
      pageInfo: {
        name: "首页",
        parent: null
      }
    };
  },
  components: {
    Header
  }
};
</script>
