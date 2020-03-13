<template>
  <div class="fillcontain">
    <Header v-bind:pageInfo="pageInfo"></Header>
    <el-main>
      <el-table :data="commentList" border style="width: 100%">
        <el-table-column prop="nickname" label="评论昵称" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="createDate" label="日期" width="180"></el-table-column>
        <el-table-column prop="blogTitle" label="博客标题"></el-table-column>
        <el-table-column prop="content" label="评论内容"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.children!=null"
              size="mini"
              type="primary"
              @click="showDialogView(scope.row)"
            >查看对话</el-button>
            <el-button v-else size="mini" type="primary">回复</el-button>
            <el-button
              v-if="scope.row.content!=='该评论已被删除!'"
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        :center="true"
        :title="dialogData.title"
        :visible.sync="dialogVisible"
        :before-close="closeDialogView"
        width="30%"
      >
        <ChildComment v-bind:comment="dialogData"></ChildComment>
        <span v-if="answerWho !== ''" slot="footer" class="dialog-footer">
          <el-input
            style="width:90%;"
            type="textarea"
            :rows="2"
            placeholder="回复"
            v-model="answerContent"
          ></el-input>
          <el-button size="small" type="success" icon="el-icon-check" circle></el-button>
        </span>
      </el-dialog>
    </el-main>
  </div>
</template>
<script>
import ChildComment from "../components/ChildComment";
import bus from "../utils/bus";
import { getCommentList, deleteComment } from "../api/api.js";
export default {
  data() {
    return {
      pageInfo: {
        name: "评论列表",
        parent: "/home"
      },
      dialogVisible: false,
      dialogData: {},
      answerContent: "",
      answerWho: "",
      commentList: []
    };
  },
  watch: {
    //watch the answerContent value to judge the comment input box needs to be displayed
    answerContent() {
      var l = this.answerWho.length;
      //answerContent.length < (@+answerwho+:).length or the first values of content are not equal to answerwho
      if (
        this.answerContent.length < l + 2 ||
        this.answerContent.substr(1, l) !== this.answerWho
      ) {
        this.answerWho = "";
      }
    }
  },
  mounted() {
    bus.$on("sendParent", comment => {
      this.answerWho = comment.nickname;
      this.answerContent = "@" + this.answerWho + ":";
    });
    getCommentList().then(resp => {
      if (resp.data.success) {
        this.commentList = resp.data.data;
      }
    });
  },
  methods: {
    showDialogView(row) {
      this.dialogData = row;
      this.dialogVisible = true;
    },
    closeDialogView() {
      this.answerWho = "";
      this.dialogVisible = false;
    },
    handleDelete(index, row) {
      this.$confirm("此操作将会删除该评论, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteComment(row.cid).then(resp => {
            if (resp.data.success) {
              this.commentList.splice(index, 1);
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
  },
  components: {
    ChildComment
  }
};
</script>
