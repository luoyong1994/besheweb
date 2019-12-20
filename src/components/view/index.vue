<template>
  <div class="index">
    <el-container>
      <el-header class="top-header">
        <div class="header">
          <div style="font-size:20px;">
            <i class="el-icon-tickets"></i>
            <span style="padding-left:10px;">欢迎来到派单系统</span>
          </div>
          <div class="header-search">
            <el-row :gutter="10" type="flex">
              <el-col :span="300">
                <div class="header-search-input">
                  <el-input placeholder="请输入收索内容" v-model="searchContent"></el-input>
                </div>
              </el-col>
              <el-col>
                <el-button type="primary" icon="el-icon-search" @click="handleClick">搜索</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-header>
      <el-main>
        <router-view :key="reload"></router-view>
      </el-main>
    </el-container>
  </div>
</template>
<script>
/* eslint-disable */
import { queryCustomerOrderInfo } from "@/api/api";
export default {
  name: "",
  props: [""],
  data() {
    return {
      searchContent: "",
      reload: ""
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {
    queryCustomerOrderInfo({})
      .then(res => {
        this.$store.dispatch("saveCustomerListInfo", res.data);
        this.$router.push({ name: "orderList" });
      })
      .catch(res => {
        this.$message({
          message: res.message,
          type: "error"
        });
      });
  },

  methods: {
    handleClick() {
      let searchContent = this.searchContent;
      var obj = {};
      obj.content = searchContent;
      queryCustomerOrderInfo(obj)
        .then(res => {
          if (res.state == 0) {
            this.reload = new Date().getTime();
            this.$store.dispatch("saveCustomerListInfo", res.data);
            this.$store.dispatch("saveSearchContent",this.searchContent);
            this.$router.push({ name: "orderList" });
          } else {
            this.$message({
              type: "error",
              message: res.message
            });
          }
        })
        .catch(res => {
          this.$message({
            type: "error",
            message: res.message
          });
        });
    }
  },
  watch: {
    searchContent(){

    }
  }
};
</script>
<style scoped>
.header > div {
  float: left;
}
.header-search {
  margin-left: 200px;
}

.top-header {
  background-color: #12665b;
}
.header-search-input {
  width: 500px;
}
</style>