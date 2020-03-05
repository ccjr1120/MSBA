  <template>
  <el-container class="fillcontain">
    <el-aside>
      <el-row>
        <el-col style="width:100%" :span="12">
          <el-menu
            default-active="/manage"
            class="el-menu-vertical-demo"
          >
            <el-menu-item index="/manage">
              <i class="el-icon-menu"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-notebook-2"></i>
                <span slot="title">文章列表</span>
              </template>
              <el-menu-item-group>
                <el-submenu index="categoryList">
                  <template slot="title">分组查看</template>
                </el-submenu>
                <el-menu-item index="/blogs">全部文章</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="/comments">
              <i class="el-icon-s-comment"></i>
              <span slot="title">评论列表</span>
            </el-menu-item>
            <el-menu-item index="/newBlog">
              <i class="el-icon-edit"></i>
              <span slot="title">新建文章</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </el-aside>
    <el-container>
      <router-view />
      <!-- Keep maneuverable space for page header -->
      <!-- <el-header height="56px">
        <div style="float:right; margin-top:10px">
          <el-popover placement="bottom" popper-class="popover-width" v-model="popoverVisible">
            <div style="text-align: right; margin: 0;">
              <el-button size="mini" type="text" @click="popoverVisible = false">个人简介</el-button>
              <br />
              <el-button type="text" size="mini">注销</el-button>
            </div>
            <el-avatar slot="reference" :size="40"></el-avatar>
          </el-popover>
        </div>
      </el-header>
      <el-main>
        <router-view />
      </el-main> -->
    </el-container>
  </el-container>
</template>

<script>
export default {
  data(){
    return{
      popoverVisible:false
    }
  }
}
</script>

<style lang="less" scrope>
@import "../assets/style/mixin";
.el-header {
  background-color: #eff2f7;
  color: #333;
  line-height: 60px;
}
.el-aside {
  color: #333;
}
.el-main {
  color: #333;
  line-height: 40px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-height: 1024px;
}
.popover-width{
  widows: 100px;
}
body > .el-container {
  margin-bottom: 40px;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}
.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>