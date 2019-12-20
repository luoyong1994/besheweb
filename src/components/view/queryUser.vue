<template>
  <el-table :data="tableData" :stripe="status" style="width: 100%;padding-left:10px;" height="850px">
    <el-table-column prop="id" label="id" width="350">
    </el-table-column>
    <el-table-column prop="username" label="用户名">
    </el-table-column>
    <el-table-column prop="name" label="姓名">
    </el-table-column>
    <el-table-column prop="tel" label="电话">
    </el-table-column>
    <el-table-column prop="qq" label="qq">
    </el-table-column>
    <el-table-column  label="操作">
      <template slot-scope="scope">
        <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="danger" size="small">
          删除
        </el-button>
        <el-button @click.native.prevent="updateUser(scope.$index, tableData)" type="warning" size="small">
          修改
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
/* eslint-disable */
import { queryUsers } from "@/api/api";
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
    queryUsers({}).then(res => {
      if (res.state == 0) {
        this.tableData = res.data;
      }
    });
  },

  methods: {
    deleteRow(index, tableData) {
      this.$confirm("此操作将永久删除该人员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var sysuser = {};
          sysuser = tableData[index];
          deleteUser(sysuser).then(res => {
            if (res.state == 0) {
              tableData.splice(index, 1);
            }
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    addUser: function(index, tableData) {
      this.$router.push({ name: "addUser" });
    },

    updateUser: function(index, tableData) {
      return;
      var formLabelAlign = tableData[index];
      this.$router.push({
        name: "updateUser",
        params: { formLabelAlign: formLabelAlign }
      });
    }
  },

  watch: {}
};
</script>
<style scoped>
.el-form-item {
  margin-bottom: 0px;
}
</style>