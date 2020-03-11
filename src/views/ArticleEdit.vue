<template>
  <div class="fillcontain">
    <Header v-bind:pageInfo="pageInfo"></Header>
    <el-main style="height:90%;overflow:visible;">
      <el-dialog title="文章基础信息" :visible.sync="dialogVisible">
        <el-form :model="article" ref="articleForm" :rules="rules">
          <el-form-item label="分类" prop="category" label-width="120px">
            <el-select
              v-model="article.category"
              filterable
              allow-create
              default-first-option
              placeholder="请选择文章标签(可自建)"
            >
              <el-option v-for="category in categoryList" :key="category" :value="category"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标题" prop="title" label-width="120px">
            <el-input maxlength="24" show-word-limit v-model="article.title" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="描述" label-width="120px">
            <el-input
              type="textarea"
              maxlength="64"
              show-word-limit
              v-model="article.description"
              placeholder="选填"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="checkForm('articleForm')">确 定</el-button>
        </div>
      </el-dialog>
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
      },
      dialogVisible: true,
      categoryList: ["未命名", "测试分组"],
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        category: [{ required: true, message: "请选择分类", trigger: "blur" }]
      },
      article: {
        title: "",
        category: "",
        content: "",
        description: ""
      }
    };
  },
  created() {
    if (this.$route.params.article != null) {
      this.article = this.$route.params.article;
      console.log(this.article)
    }
  },
  methods: {
    checkForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dialogVisible = false;
        } else {
          window.console.log("error submit!!");
          return false;
        }
      });
    }
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