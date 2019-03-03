<template>
    <div style="width:100%;height:850px;background-color:#ffff;padding-top:20px;">
            <el-table :data="tableData" :stripe="status" style="width: 100%;padding-left:50px;" height="850px">
                <el-table-column prop="userId" label="id" width="250">
                </el-table-column>
                <el-table-column prop="userName" label="用户名" width="250">
                </el-table-column>
                <el-table-column prop="userPhone" label="电话" width="250">
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="250">
                    <template slot-scope="scope">
                        <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="danger" size="small">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
    </div>
</template>

<script>
import { queryUser,deleteAdmin } from "@/api/api";
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
      queryUser({}).then(res=>{
          if(res.state==0){
              this.tableData=res.data;
          }
      })
  },

  methods: {
       deleteRow(index, tableData) {
         deleteAdmin(tableData[index]).then(res=>{
             if(res.state==0){
                 tableData.splice(index,1);
             }
         });
      }
  },

  watch: {}
};
</script>
<style lang='' scoped>
div {
  width: 600px;
  margin: 10px auto;
}
</style>