<template>
<el-container>
  <el-header>
  <el-menu :default-active="this.$router.path" mode="horizontal"  background-color="#B3C0D1" text-color="#ffff" :router="true">
  <el-menu-item index="index">首页</el-menu-item>
  <el-menu-item index="adminPage">查看管理员</el-menu-item>
  <el-menu-item index="readerPage">查看读者</el-menu-item>
  <!-- <el-submenu index="">
    <template slot="title">人员管理</template>
    <el-menu-item index="addAdminPage">添加管理员</el-menu-item>
    <el-menu-item index="adminPage">查看管理员</el-menu-item>
  </el-submenu> -->
  <!-- <el-submenu index="">
    <template slot="title">读者信息管理</template>
    <el-menu-item index="addAdminPage">查看读者</el-menu-item>
    <el-menu-item index="adminPage">查看管理员</el-menu-item>
  </el-submenu> -->
  <el-menu-item index="addAdminPage">人员添加</el-menu-item>
  <el-menu-item index="addBookPage">添加图书</el-menu-item>
  <el-menu-item index="editor">创建我的笔记</el-menu-item>
  <el-menu-item index="formTest">表单数据提交</el-menu-item>
  <el-menu-item index="6" class="header"><i class="el-icon-setting"></i>{{loginName}}</el-menu-item>
</el-menu>
  </el-header>
  <el-main >
    <router-view></router-view>
  </el-main>
</el-container>
</template>

<script>
export default {
  name: "",
  props: ["userName"],
  data() {
    return {
      loginName:this.userName
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
   
  },

  watch: {
    //监听路由变化
    '$route'(to,from){
      
    }
  }
};
</script>
<style lang='' scoped>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-main {
  color: #333;
  text-align: center;
  line-height: 160px;
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
.header{
  float: right;
  margin-right: 40px;
}
.el-icon-setting{
  font-size: 30px;
  display: inline-block;
  margin-right: 8px;
}
</style>