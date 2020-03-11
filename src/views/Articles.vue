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
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageInfo: {
        name: "文章列表·all",
        parent: "/home"
      },
      articleList: [
        {
          bid: "1",
          category: "未分类",
          createDate: "2016-05-02",
          title: "why the sun alwas here?"
        }
      ]
    };
  },
  created() {},
  methods: {
    getPageName: path => {
      //path's examples:"/articles", "/articles/category"...
      var pageInfo = {
        parent: "/home",
        name: ""
      };
      var pageName = "文章列表·";
      if (path === "/articles") {
        pageName += "all";
      } else {
        pageName += path.substring(10);
      }
      pageInfo.name = pageName;
      return pageInfo;
    },
    handleEdit(index, row) {
      this.$router.push({
        name: "Edit",
        params: {
          article: row
        }
      });
    },
    handleDelete(index) {
      this.$confirm("此操作将会删除该博客, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.articleList.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
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
