<!--  -->
<template>
  <div>
    <el-row type="flex" :gutter="20">
      <el-col :span="8">
        <el-input v-model="name" placeholder="请输入分类"></el-input>
      </el-col>
      <el-col>
        <el-button type="primary" @click="addClassify()">添加分类</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%;margin-top:20px;">
      <el-table-column prop="id" label="分类id" width="350"></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="handleUpdate(scope.$index, tableData)" type="text" size="medium">修改</el-button>
          <el-button @click="handleDelete(scope.$index, tableData)" type="text" size="medium">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  addClassify,
  upateClassify,
  deleteClassify,
  queryClassify
} from "@/api/api";
export default {
  data() {
    return {
      name: "",
      tableData: [
        
      ]
    };
  },

  components: {},

  computed: {},

  mounted() {
      queryClassify().then(res=>{
          this.tableData = res.data;
      });
  },

  methods: {
    addClassify() {
      if (this.name) {
        var data = { name: this.name };
        addClassify(data)
          .then(res => {
            this.$message({
              message: "添加成功！",
              type: "success"
            });
            data.id = res.data.id;
            this.tableData.push(data);
          })
          .catch(res => {
            this.$message.error(res.message);
          });
      } else {
        this.$message.error("请填写分类名称");
      }
    },
    handleDelete(index, rows) {
      this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log(rows);
          var classify = {};
          classify.id = rows[index].id;
          classify.name = rows[index].name;
          deleteClassify(classify)
            .then(res => {
              if (res.state == "0") {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                rows.splice(index, 1);
              }
            })
            .catch(res => {
              this.$message.error(res.message);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleUpdate(index, rows) {
      this.$prompt("请输入分类名称", "分类修改", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: rows[index].name
      })
        .then(({ value }) => {
          var classify = {};
          classify.id = rows[index].id;
          classify.name = value;
          upateClassify(classify)
            .then(res => {
              if (res.state == "0") {
                this.$message({
                  type: "success",
                  message: "修改成功！"
                });
              }
              rows[index].name = value;
            })
            .catch(res => {
              this.$message({
                type: "error",
                message: "修改失败"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消修改"
          });
        });
    }
  }
};
</script>
<style scoped>
</style>