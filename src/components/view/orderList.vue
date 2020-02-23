<!--  -->
<template>
  <div class="body">
    <el-table :data="tableData" style="width: 100%;" border>
      <el-table-column prop="id" label="编号" width="290"></el-table-column>
      <el-table-column prop="projectName" label="项目名称"></el-table-column>
      <el-table-column prop="technology" label="技术要求" width="150"></el-table-column>
      <el-table-column prop="address" label="接单洽谈" width="150">
        <template slot-scope="scope">
          <a :href='scope.row.serviceQQ==null? "http://wpa.qq.com/msgrd?v=3&uin=1273536587&site=qq&menu=yes" : "http://wpa.qq.com/msgrd?v=3&uin="+scope.row.serviceQQ+"&site=qq&menu=yes"'>
            <img src="../../assets/button.gif" alt="qq洽谈">
          </a>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="状态" width="150">
        <template>
          <span style="color:#E6A23C">待开发</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.$index,tableData)" type="text" size="small">查看订单详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { queryCustomerOrderInfo } from "@/api/api";
/* eslint-disable */
export default {
  data() {
    return {
      tableData:[],
    };
  },

  components: {},
  watch: {
    
  },

  computed: {},

  mounted() {
    this.tableData = this.$store.state.customerListInfo;
    let searchContent = this.$store.state.searchContent;
    if(this.tableData || this.tableData==undefined || this.tableData.length==0){
      if(searchContent.length>0){
        return;
      }
      queryCustomerOrderInfo({})
      .then(res => {
        this.$store.dispatch("saveCustomerListInfo", res.data);
        this.tableData = res.data;  
      })
      .catch(res => {
        this.$message({
          message: res.message,
          type: "error"
        });
      });
    }
  },

  methods: {
    handleClick(index, rows) {
      this.$router.push({
        name: "newOrderDetal",
        params: { order: rows[index] }
      });
    }
  }
};
</script>
<style scoped>
.body {
  width: 80%;
  margin: 0px auto;
}
</style>