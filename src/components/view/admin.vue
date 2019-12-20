<template>
  <el-container>
    <el-header>
      <el-row :gutter="20" type="flex">
        <el-col :span="6" style="font-size:20px;">
          <div>派单管理系统</div>
        </el-col>
        <el-col :span="20">
          <div style="text-align:right">
            <i class="el-icon-setting"></i>
            <span>{{userName}}</span>
          </div>
        </el-col>
      </el-row>
    </el-header>

    <el-container class="bodyDown">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-active="this.$router.path" :router="true">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-message"></i>人员管理
            </template>
            <el-menu-item index="queryUser">人员查看</el-menu-item>
            <el-menu-item index="addUser">人员添加</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-message"></i>订单管理
            </template>
            <el-menu-item index="queryOrder">订单查看</el-menu-item>
            <el-menu-item index="queryAcceptOrder">预约订单查看</el-menu-item>
            <el-menu-item index="addOrder">订单上传</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-message"></i>技术管理
            </template>
            <el-menu-item index="classify">分类管理</el-menu-item>
            <!-- <el-menu-item index="#">查看分类</el-menu-item> -->
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <div class="mainBody">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
/* eslint-disable */
export default {
  name: "",
  props: ["user"],
  data() {
    return {
      userName: this.$store.state.user.userName
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

.bodyDown {
  height: 900px;
}

.mainBody {
  margin: 10px auto;
}
</style>