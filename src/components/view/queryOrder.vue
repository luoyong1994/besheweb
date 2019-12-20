<template>
  <div>
    <el-table
      :data="tableData"
      :stripe="status"
      style="width: 100%;padding-left:10px;"
      height="600"
    >
      <el-table-column prop="shop" label="店铺" width="150"></el-table-column>
      <el-table-column prop="wantName" label="旺旺名"></el-table-column>
      <el-table-column prop="orderDate" label="接单时间" width="150"></el-table-column>
      <el-table-column prop="projectName" label="项目名" width="150"></el-table-column>
      <el-table-column prop="technology" label="使用技术" width="150"></el-table-column>
      <el-table-column prop="programName" label="程序技术分配" width="120">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag
              size="medium"
              :type="scope.row.programName ==null ? 'warning' : 'success'"
            >{{scope.row.programName==null? "未分配":"已分配"}}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="paperName" label="论文技术分配" width="120">
        <template slot-scope="scope">
          <div>
            <el-tag
              size="medium"
              :type="scope.row.paperName==null ? 'warning' : 'success'"
            >{{scope.row.paperName==null? "未分配":"已分配"}}</el-tag>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="programName" label="技术结账" width="120">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag
              size="medium"
              :type="scope.row.projectProcess=='1' ? 'success' : 'warning'"
            >{{scope.row.projectProcess=="1"? "已结账":"未结账"}}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="paperName" label="论文结账" width="120">
        <template slot-scope="scope">
          <div slot="reference">
            <el-tag
              size="medium"
              :type="scope.row.projectProcess === '2' ? 'success' : 'warning'"
            >{{scope.row.projectProcess=="2"? "已结账":"未结账"}}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="170">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="updateOrder(scope.$index, tableData)"
            type="primary"
            size="small"
          >修改</el-button>
          <el-button
            @click.native.prevent="orderDetail(scope.$index, tableData)"
            type="success"
            size="small"
          >查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="订单完善" :visible.sync="dialogFormVisible" width="50%">
      <el-form :model="form">
        <el-form-item label="项目总金额" :label-width="formLabelWidth">
          <el-input v-model="form.totalAmt" autocomplete="off" placeholder="请输入项目总金额"></el-input>
        </el-form-item>
        <el-form-item label="项目定金" :label-width="formLabelWidth">
          <el-input v-model="form.bookAmt" autocomplete="off" placeholder="请输入项目定金"></el-input>
        </el-form-item>
        <el-form-item label="论文金额" :label-width="formLabelWidth">
          <el-input v-model="form.paperAmt" autocomplete="off" placeholder="请输入论文价钱"></el-input>
        </el-form-item>
        <el-form-item label="程序金额" :label-width="formLabelWidth">
          <el-input v-model="form.programAmt" autocomplete="off" placeholder="请输入程序金额"></el-input>
        </el-form-item>
        <el-form-item label="外包论文金额" :label-width="formLabelWidth">
          <el-input v-model="form.outPaperAmt" autocomplete="off" placeholder="请输入程序金额"></el-input>
        </el-form-item>
        <el-form-item label="外包技术金额" :label-width="formLabelWidth">
          <el-input v-model="form.outProgramAmt" autocomplete="off" placeholder="请输入程序金额"></el-input>
        </el-form-item>
        <el-form-item label="是否完成" :label-width="formLabelWidth">
          <div>
            <el-radio v-model="projectProcess" label="1" border size="medium">未完成</el-radio>
            <el-radio v-model="projectProcess" label="3" border size="medium">已完成</el-radio>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitUpdateOrder">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import { queryOrderInfo,updateInOrder } from "@/api/api";
export default {
  name: "",
  props: [""],
  data() {
    return {
      status: true,
      tableData: [],
      dialogFormVisible: false,
      checkImg: false,
      checkNotify: false,
      imgUrl: "",
      title: "",
      form: {
        totalAmt:"",
        bookAmt:"",
        paperAmt:"",
        programAmt:"",
        outPaperAmt:"",
        outProgramAmt:""
      },
      newForm:{
        totalAmt:"",
        bookAmt:"",
        paperAmt:"",
        programAmt:"",
        outPaperAmt:"",
        outProgramAmt:""
      },
      formLabelWidth: "120px",
      orderId: "", //修改的id
      projectProcess: "1",
      checkList: []
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {
    queryOrderInfo({})
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
    checkDetail: function(index, tableData, type) {
      if (type == 1) {
        this.title = "区域图片";
        var basePath =
          "http://localhost:8088/fullview/upload/downloadImg.do?fileName=";
        this.imgUrl = basePath + tableData[index].imagepath;
        this.checkImg = true;
      } else if (type == 2) {
        this.title = "区域通知";
        this.textarea = tableData[index].notify;
        this.checkNotify = true;
      }
      this.dialogVisible = true;
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.checkImg = false;
          this.checkNotify = false;
          done();
        })
        .catch(_ => {});
    },

    updateOrder(index, tableData) {
      this.dialogFormVisible = true;
      this.orderId = tableData[index].id;
    },

    submitUpdateOrder() {
      var obj={};
      obj = this.form;
      let process = this.projectProcess;
      if(process==3){
        obj.projectProcess=3;
      }
      obj.id=this.orderId;
      updateInOrder(obj).then(res=>{
        if(res.state==0){
          this.$message({
            type:"success",
            message:"修改成功！"
          });
          this.dialogFormVisible=false;
          this.form= this.newForm;
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

    },

    deleteView(index, tableData) {
      this.$confirm("此操作将永久删除该区域, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var region = {};
          region = tableData[index];
          deleteView(region).then(res => {
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
    }
  },

  watch: {}
};
</script>
<style scoped>
</style>