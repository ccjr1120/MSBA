<template>
  <div class="fillcontain">
    <Header v-bind:pageInfo="pageInfo"></Header>
    <el-main style="height:90%;overflow:visible;">
      <div id="editor">
        <mavon-editor style="height: 100%"></mavon-editor>
      </div>
    </el-main>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  data() {
    return {
      pageInfo: {
        name: "博客编辑",
        parent: "/home"
      }
    };
  },
  components: {
    mavonEditor
  }
};
</script>

<style>
#editor {
  margin: auto;
  width: 100%;
  height: 100%;
}
</style>