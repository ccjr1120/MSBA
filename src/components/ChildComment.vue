<template>
  <div>
    <el-button style="font-size:16px;" @click="sendParent(comment)" type="text">{{comment.nickname}}</el-button>:
    <span style="font-size:16px;">{{comment.content}}</span>
    <a href="javascript:;" @click="handleDelete">
      <span v-if="comment.content!=='该评论已被删除!'" style="font-size:10px;">删除</span>
    </a>

    <div style="padding-left:20px;" v-bind:key="child.label" v-for="child in comment.children">
      <ChildComment v-bind:comment="child"></ChildComment>
    </div>
  </div>
</template>

<script>
import bus from "../utils/bus";
import { deleteComment } from "../api/api";
export default {
  name: "ChildComment",
  props: ["comment"],
  methods: {
    sendParent: comment => {
      bus.$emit("sendParent", comment);
    },
    handleDelete() {
      this.$confirm("此操作将会删除该评论, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteComment(this.comment.cid).then(resp => {
            if (resp.data.success) {
              this.comment.content = "该评论已被删除!";
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style>
</style>