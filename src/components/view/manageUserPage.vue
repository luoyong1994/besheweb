<template>
    <el-table :data="tableData" :stripe="status" style="width: 100%;padding-left:10px;" height="850px">
        <el-table-column prop="userId" label="id" width="250">
        </el-table-column>
        <el-table-column prop="userName" label="用户名" width="250">
        </el-table-column>
        <el-table-column prop="userPhone" label="电话" width="250">
        </el-table-column>
        <el-table-column prop="userPhone" label="操作" width="250">
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
import { queryUser, deleteAdmin } from "@/api/api";
export default {
  name: "",
  props: [""],
  data() {
    return {
      status: true,
      tableData: [
        {
          userId: "1",
          userName: "name",
          userPhone: 121312
        }
      ]
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {
    queryUser({}).then(res => {
      if (res.state == 0) {
        this.tableData = res.data;
      }
    });
  },

  methods: {
    deleteRow(index, tableData) {
      deleteAdmin(tableData[index]).then(res => {
        if (res.state == 0) {
          tableData.splice(index, 1);
        }
      });
    },
    addUser: function(index, tableData) {
      this.$router.push({ name: "addUser" });
    },
    updateUser: function(index, tableData) {
      this.$router.push({ name: "updateUser" });
    }
  },

  watch: {}
};
</script>
<style scoped>
.el-form-item{
    margin-bottom:0px;
}
</style>