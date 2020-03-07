<template>
  <div class="fillcontain">
    <Header v-bind:pageInfo="pageInfo"></Header>
    <el-main>这里应该会放一些数据展示等等</el-main>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageInfo: {
        name: "首页",
        parent: null
      }
    };
  }
};
</script>
