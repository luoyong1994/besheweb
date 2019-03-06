<template>
  <el-container style="height: 850px;border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-active="this.$router.path" :router="true">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-message"></i>人员管理</template>
          <el-menu-item index="manageUserPage">人员查看</el-menu-item>
          <el-menu-item index="addUser">人员添加</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-message"></i>区域管理</template>
          <el-menu-item index="queryRegion">区域查看</el-menu-item>
          <el-menu-item index="addRegion">区域添加</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <i class="el-icon-setting" style="margin-right: 20px"></i>
        <span>王小虎</span>
      </el-header>
      <el-main>
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
/* eslint-disable */
export default {
  name: "",
  props: ["userName"],
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      tableData: Array(20).fill(item)
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {},

  watch: {
    //监听路由变化
    $route(to, from) {}
  }
};
</script>
<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>