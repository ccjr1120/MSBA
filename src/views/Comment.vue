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
            <el-button v-else size="mini" @click="showReplyDialog(scope.row)" type="primary">回复</el-button>
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
        :before-close="closeDialogView"
        :title="dialogData.title"
        :visible.sync="dialogVisible"
        width="30%"
      >
        <ChildComment v-bind:comment="dialogData"></ChildComment>
        <span v-if="answerer.name !== ''" slot="footer" class="dialog-footer">
          <el-input
            style="width:90%;"
            type="textarea"
            :rows="2"
            placeholder="回复"
            v-model="answerContent"
          ></el-input>
          <el-button @click="commitAnswer" size="small" type="success" icon="el-icon-check" circle></el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="提示"
        :before-close="closeDialogView"
        :visible.sync="replyDialogVisible"
        width="30%"
        center
      >
        <el-input
          style="width:90%;"
          type="textarea"
          :autosize="{ minRows: 4}"
          :rows="2"
          placeholder="回复"
          v-model="answerContent"
        ></el-input>
        <el-button @click="commitAnswer" size="small" type="success" icon="el-icon-check" circle></el-button>
      </el-dialog>
    </el-main>
  </div>
</template>
<script>
import ChildComment from "../components/ChildComment";
import bus from "../utils/bus";
import { getCommentList, deleteComment, answerComment } from "../api/api.js";
export default {
  data() {
    return {
      pageInfo: {
        name: "评论列表",
        parent: "/home"
      },
      dialogVisible: false,
      dialogData: {},
      replyDialogVisible: false,
      answerer: {
        id: "",
        name: ""
      },
      answerContent: "",
      commentList: []
    };
  },
  watch: {
    //watch the answerContent value to judge the comment input box needs to be displayed
    answerContent() {
      var l = this.answerer.name.length;
      //answerContent.length < (@+answerer.name+:).length or the first values of content are not equal to answerer.name
      if (
        this.answerContent.length < l + 2 ||
        this.answerContent.substr(1, l) !== this.answerer.name
      ) {
        this.answerer.name = "";
      }
    }
  },
  mounted() {
    bus.$on("sendParent", comment => {
      this.answerer.id = comment.cid;
      this.answerer.name = comment.nickname;
      this.answerContent = "@" + this.answerer.name + ":";
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
    showReplyDialog(row) {
      this.replyDialogVisible = true;
      this.answerer.id = row.cid;
      this.answerer.name = row.nickname;
      this.answerContent = "@" + row.nickname + ":";
    },
    commitAnswer() {
      var cid = this.answerer.id;
      var answerContent = this.answerContent.substr(
        this.answerer.name.length + 2
      );
      answerComment(cid, {
        answerContent: answerContent
      }).then(resp => {
        if (resp.data.success) {
          this.$message({
            type: "success",
            message: "回复成功!"
          });
          this.answerer.id = "";
          this.answerer.name = "";
          this.answerContent = "";
          this.dialogVisible = false;
          this.replyDialogVisible = false;
          getCommentList().then(resp => {
            if (resp.data.success) {
              this.commentList = resp.data.data;
            }
          });
        } else {
          this.$message({
            type: "fail",
            message: "回复失败!"
          });
        }
      });
    },
    closeDialogView() {
      this.answerer.name = "";
      this.answerContent = "";
      this.dialogVisible = false;
      this.replyDialogVisible = false;
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
              row.content = "该评论已被删除!";
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
