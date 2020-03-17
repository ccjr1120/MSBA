<template>
  <div class="fillcontain">
    <Header v-bind:pageInfo="getPageName(this.$route.path)"></Header>
    <el-main>
      <el-table :data="articleList" border style="width: 100%">
        <el-table-column prop="bid" label="博客ID" width="180"></el-table-column>
        <el-table-column prop="category" label="分类" width="180"></el-table-column>
        <el-table-column prop="createDate" label="创建日期" width="180"></el-table-column>
        <el-table-column prop="title" label="博客标题"></el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>
<script>
import {
  getArticleList,
  getArticleListByCategory,
  deleteBlog
} from "../api/api";
export default {
  data() {
    return {
      pageInfo: {
        name: "文章列表·all",
        parent: "/home"
      },
      articleList: []
    };
  },
  created() {
    this.dynamicGetArticleList(this.$route.path);
  },
  watch: {
    $route(to, from) {
      console.log(from);
      this.dynamicGetArticleList(this.$route.path);
    }
  },
  methods: {
    getPageName(path) {
      //path's examples:"/articles", "/articles/category"...
      var pageInfo = {
        parent: "/home",
        name: ""
      };
      var pageName = "文章列表·";
      if (path === "/articles") {
        pageName += "all";
      } else {
        var category = path.substring(10);
        pageName += category;
      }
      pageInfo.name = pageName;
      return pageInfo;
    },
    dynamicGetArticleList(path) {
      if (path === "/articles") {
        getArticleList().then(resp => {
          if (resp.data.success) {
            this.articleList = resp.data.data;
          } else {
            this.$message({
              type: "fail",
              message: "获取博客列表失败!reason:" + resp.data.errMsg
            });
          }
        });
      } else {
        var category = path.substring(10);
        getArticleListByCategory(category).then(resp => {
          if (resp.data.success) {
            this.articleList = resp.data.data;
          } else {
            this.$message({
              type: "fail",
              message:
                "获取博客列表失败!reason:" +
                resp.data.errMsg +
                " 请尝试重新拉取分组列表"
            });
          }
        });
      }
    },
    handleEdit(index, row) {
      this.$router.push({
        name: "Edit",
        params: {
          article: row
        }
      });
    },
    handleDelete(index, row) {
      this.$confirm("此操作将会删除该博客, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteBlog(row.bid).then(resp => {
            if (resp.data.success) {
              this.articleList.splice(index, 1);
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            } else {
              this.$message({
                type: "fail",
                message: "删除失败! reason:" + resp.data.errMsg
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
