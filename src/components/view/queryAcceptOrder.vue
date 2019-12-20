<template>
  <div>
    <el-table
      :data="tableData"
      :stripe="status"
      style="width: 100%;padding-left:10px;"
     
    >
     <el-table-column prop="id"  type="expand">
        <template slot-scope="props">
        <el-form label-position="left"  class="demo-table-expand">
          <el-form-item label="项目编号">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="项目名">
            <span>{{ props.row.projectName }}</span>
          </el-form-item>
          <el-form-item label="姓名">
            <span>{{ props.row.programName }}</span>
          </el-form-item>
          <el-form-item label="电话">
            <span>{{ props.row.tel }}</span>
          </el-form-item>
          <el-form-item label="qq">
            <span>{{ props.row.qq }}</span>
          </el-form-item>
          <el-form-item label="日期">
            <span>{{ props.row.orderDate }}</span>
          </el-form-item>
          <el-form-item label="报价">
            <span>{{ props.row.price }}</span>
          </el-form-item>
        </el-form>
      </template>
     </el-table-column>
      <el-table-column prop="id" label="项目编号" ></el-table-column>
      <el-table-column prop="projectName" label="项目名"></el-table-column>
      <el-table-column prop="programName" label="姓名"></el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteAccept(scope.$index, tableData)"
            type="danger"
            size="small"
          >拒绝</el-button>
          <el-button
            @click.native.prevent="authedAccept(scope.$index, tableData)"
            type="success"
            size="small"
          >派单</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
/* eslint-disable */
import {
  queryAcceptOrder,
  deleteAcceptOrder,
  authedAcceptFlow
} from "@/api/api";
export default {
  name: "",
  props: [""],
  data() {
    return {
      status: true,
      tableData: []
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {
    queryAcceptOrder({})
      .then(res => {
        this.tableData = res.data;
      })
      .catch(res => {
        this.$message({
          type: "error",
          message: res.message
        });
      });
  },

  methods: {
    authedAccept(index, tableData) {
      authedAcceptFlow({flowNo : tableData[index].flowNo}).then(res=>{
        if(res.state==0){
          this.$message({
          type:"success",
          message:"审核完成！"
        });
          tableData.splice(index, 1);
        }else{
          this.$message({
          type:"error",
          message:res.message
        });
        }
      }).catch(res=>{
        this.$message({
          type:"error",
          message:res.message
        });
      });
      return false;
    },

    deleteAccept(index, tableData) {
      this.$confirm("此操作将拒绝技术接单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteAcceptOrder({ flowNo: tableData[index].flowNo }).then(res => {
            if (res.state == 0) {
              tableData.splice(index, 1);
              this.$message({
                type: "success",
                message: "拒绝成功!"
              });
            }else{
               this.$message({
                type: "error",
                message: res.message
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消拒绝"
          });
        });
    }
  },

  watch: {}
};
</script>
<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>