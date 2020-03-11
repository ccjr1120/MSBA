<template>
  <div class="fillcontain">
    <Header v-bind:pageInfo="pageInfo"></Header>
    <el-main>
      <el-table :data="tableData" border style="width: 100%">
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
              @click="dialogVisible = true"
            >查看对话</el-button>
            <el-button v-else size="mini" type="primary">回复</el-button>
            <el-button size="mini" type="danger">删除</el-button>
            <el-dialog
              :center="true"
              :title="scope.row.blogTitle"
              :visible.sync="dialogVisible"
              width="30%"
            >
              <ChildComment v-bind:comment="scope.row"></ChildComment>
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
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>
<script>
import ChildComment from "../components/ChildComment";
import bus from "../utils/bus";
export default {
  data() {
    return {
      dialogVisible: false,
      pageInfo: {
        name: "评论列表",
        parent: "/home"
      },
      answerContent: "",
      answerWho: "",
      tableData: [
        {
          cid: 1,
          nickname: "nichname",
          email: "1110@qq.com",
          createDate: "2016-05-02",
          blogTitle: "blog title example1",
          content: "评论",
          children: [
            {
              cid: 1,
              nickname: "nichname",
              email: "1110@qq.com",
              createDate: "2016-05-02",
              blogTitle: "blog title example1",
              content: "评论的评论",
              children: [
                {
                  cid: 1,
                  nickname: "nichname",
                  email: "1110@qq.com",
                  createDate: "2016-05-02",
                  blogTitle: "blog title example1",
                  content: "评论的评论的评论",
                  children: []
                }
              ]
            },
            {
              cid: 1,
              nickname: "nichname",
              email: "1110@qq.com",
              createDate: "2016-05-02",
              blogTitle: "blog title example1",
              content: "评论的评论",
              children: [
                {
                  cid: 1,
                  nickname: "nichname",
                  email: "1110@qq.com",
                  createDate: "2016-05-02",
                  blogTitle: "blog title example1",
                  content: "评论的评论的评论",
                  children: []
                }
              ]
            }
          ]
        }
      ]
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
      console.log(comment);
    });
  },
  methods: {},
  components: {
    ChildComment
  }
};
</script>
