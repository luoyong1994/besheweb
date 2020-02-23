<template>
  <div>
    <el-table :data="tableData" :stripe="status" style="width: 100%;padding-left:10px;">
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

      <!-- <el-table-column prop="programName" label="技术结账" width="120">
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
      </el-table-column>-->

      <el-table-column label="操作" fixed="right" width="200">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="updateOrder(scope.$index, tableData)"
            type="primary"
            size="small"
          >进度编辑</el-button>
          <el-button
            @click.native.prevent="orderDetail(scope.$index, tableData)"
            type="success"
            size="small"
          >查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 
      订单进度信息：1、订单详细信息，2、订单进度信息：外包结账进度，订单结账进度
    -->
    <el-dialog title="订单进度信息" :visible.sync="dialogFormVisible" width="80%">
      <el-divider content-position="center">订单详情</el-divider>
      <el-form :model="form">
        <el-row type="flex">
          <el-col>
            <el-form-item label="项目总金额" :label-width="formLabelWidth">
              <el-input v-model="form.totalAmt" autocomplete="off" placeholder="请输入项目总金额"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="项目定金" :label-width="formLabelWidth">
              <el-input v-model="form.bookAmt" autocomplete="off" placeholder="请输入项目定金"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col>
            <el-form-item label="论文金额" :label-width="formLabelWidth">
              <el-input v-model="form.paperAmt" autocomplete="off" placeholder="请输入论文价钱"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="程序金额" :label-width="formLabelWidth">
              <el-input v-model="form.programAmt" autocomplete="off" placeholder="请输入程序金额"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col>
            <el-form-item label="外包论文金额" :label-width="formLabelWidth">
              <el-input v-model="form.outPaperAmt" autocomplete="off" placeholder="请输入程序金额"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="外包技术金额" :label-width="formLabelWidth">
              <el-input v-model="form.outProgramAmt" autocomplete="off" placeholder="请输入程序金额"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-divider content-position="center">订单进度</el-divider>
      <div class="process-line">
        <el-steps :active="3" finish-status="success">
          <el-step title="外包论文"></el-step>
          <el-step title="外包技术"></el-step>
          <el-step title="全部外包"></el-step>
        </el-steps>
      </div>
      <el-divider content-position="center">外包订单编辑</el-divider>
      <div class="process-btn">
        <el-row type="flex">
          <el-col>
            <el-button type="primary" plain @click="addOutsourceInfo(1)">外包技术</el-button>
          </el-col>
          <el-col>
            <el-button type="primary" plain @click="addOutsourceInfo(2)">外包论文</el-button>
          </el-col>
          <el-col>
            <el-button type="primary" plain @click="addOutsourceInfo(3)">统一外包</el-button>
          </el-col>
        </el-row>
      </div>
      <!-- 内层 Dialog-->
      <el-dialog width="60%" title="添加技术外包信息" :visible.sync="innerVisibleProgram" append-to-body>
        <el-form :model="outsourceForm">
          <el-form-item label="技术外包价格" :label-width="formLabelWidth">
            <el-input v-model="outsourceForm.papername" autocomplete="off" placeholder="请输入技术外包价格"></el-input>
          </el-form-item>
          <el-form-item label="程序技术姓名" :label-width="formLabelWidth">
            <el-input
              v-model="outsourceForm.programname"
              autocomplete="off"
              placeholder="请输入程序技术姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="程序技术电话" :label-width="formLabelWidth">
            <el-input v-model="outsourceForm.tel" autocomplete="off" placeholder="请输入程序技术电话"></el-input>
          </el-form-item>
          <el-form-item label="程序技术qq" :label-width="formLabelWidth">
            <el-input v-model="outsourceForm.qq" autocomplete="off" placeholder="请输入程序技术qq"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="innerVisibleProgram = false">取 消</el-button>
          <el-button type="primary" @click="submitOutsourceInfo(1)">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog width="60%" title="添加论文外包信息" :visible.sync="innerVisibleParper" append-to-body>
        <el-form :model="outsourceForm">
          <el-form-item label="论文外包价格" :label-width="formLabelWidth">
            <el-input v-model="outsourceForm.papername" autocomplete="off" placeholder="请输入论文外包价格"></el-input>
          </el-form-item>
          <el-form-item label="论文技术姓名" :label-width="formLabelWidth">
            <el-input v-model="outsourceForm.papername" autocomplete="off" placeholder="请输入论文技术姓名"></el-input>
          </el-form-item>
          <el-form-item label="论文技术电话" :label-width="formLabelWidth">
            <el-input v-model="outsourceForm.papertel" autocomplete="off" placeholder="请输入论文技术电话"></el-input>
          </el-form-item>
          <el-form-item label="论文技术qq" :label-width="formLabelWidth">
            <el-input v-model="outsourceForm.paperqq" autocomplete="off" placeholder="请输入论文技术qq"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="innerVisibleParper = false">取 消</el-button>
          <el-button type="primary" @click="submitOutsourceInfo(2)">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog width="60%" title="添加统一外包信息" :visible.sync="innerVisibleAll" append-to-body>
        <el-form :model="outsourceForm">
          <el-form-item label="技术外包价格" :label-width="formLabelWidth">
            <el-input v-model="outsourceForm.papername" autocomplete="off" placeholder="请输入论文外包价格"></el-input>
          </el-form-item>
          <el-form-item label="论文外包价格" :label-width="formLabelWidth">
            <el-input v-model="outsourceForm.papername" autocomplete="off" placeholder="请输入论文外包价格"></el-input>
          </el-form-item>
          <el-form-item label="程序技术姓名" :label-width="formLabelWidth">
            <el-input
              v-model="outsourceForm.programname"
              autocomplete="off"
              placeholder="请输入程序技术姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="程序技术电话" :label-width="formLabelWidth">
            <el-input v-model="outsourceForm.tel" autocomplete="off" placeholder="请输入程序技术电话"></el-input>
          </el-form-item>
          <el-form-item label="程序技术qq" :label-width="formLabelWidth">
            <el-input v-model="outsourceForm.qq" autocomplete="off" placeholder="请输入程序技术qq"></el-input>
          </el-form-item>
          <el-form-item label="论文技术姓名" :label-width="formLabelWidth">
            <el-input v-model="outsourceForm.papername" autocomplete="off" placeholder="请输入论文技术姓名"></el-input>
          </el-form-item>
          <el-form-item label="论文技术电话" :label-width="formLabelWidth">
            <el-input v-model="outsourceForm.papertel" autocomplete="off" placeholder="请输入论文技术电话"></el-input>
          </el-form-item>
          <el-form-item label="论文技术qq" :label-width="formLabelWidth">
            <el-input v-model="outsourceForm.paperqq" autocomplete="off" placeholder="请输入论文技术qq"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="innerVisibleAll = false">取 消</el-button>
          <el-button type="primary" @click="submitOutsourceInfo(3)">确 定</el-button>
        </div>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitUpdateOrder">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import { queryOrderInfo, updateInOrder, addOutSource } from "@/api/api";
export default {
  name: "",
  props: [""],
  data() {
    return {
      status: true,
      tableData: [],
      dialogFormVisible: false,
      innerVisibleProgram: false,
      innerVisibleParper: false,
      innerVisibleAll: false,
      checkImg: false,
      checkNotify: false,
      imgUrl: "",
      title: "",
      form: {
        totalAmt: "",
        bookAmt: "",
        paperAmt: "",
        programAmt: "",
        outPaperAmt: "",
        outProgramAmt: ""
      },
      newForm: {
        totalAmt: "",
        bookAmt: "",
        paperAmt: "",
        programAmt: "",
        outPaperAmt: "",
        outProgramAmt: ""
      },
      outsourceForm: {
        programname: "",
        tel: "",
        qq: "",
        papername: "",
        papertel: "",
        paperqq: ""
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
    addOutsourceInfo(type) {
      if (type === 1) {
        //添加外包程序技术人员信息
        this.innerVisibleProgram = true;
      } else if (type === 2) {
        //添加外包论文人员信息
        this.innerVisibleParper = true;
      } else if (type === 3) {
        //统一添加人员信息，既外包技术和论文为统一一个人
        this.innerVisibleAll = true;
      }
    },
    //提交外包信息
    submitOutsourceInfo(type) {
      console.log("提交类型：%s", type);
      var requestData = this.outsourceForm;
      requestData.type = type;
      addOutSource(requestData)
        .then(res => {
          if (type === 1) {
            //添加外包程序技术人员信息
            this.innerVisibleProgram = false;
          } else if (type === 2) {
            //添加外包论文人员信息
            this.innerVisibleParper = false;
          } else if (type === 3) {
            //统一添加人员信息，既外包技术和论文为统一一个人
            this.innerVisibleAll = false;
          }
        })
        .catch(res => {
          this.$message({
            type: "error",
            message: res.message
          });
        });
      this.outsourceForm.programname = "";
      this.outsourceForm.tel = "";
      this.outsourceForm.qq = "";
      this.outsourceForm.papername = "";
      this.outsourceForm.papertel = "";
      this.outsourceForm.paperqq = "";
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

    orderDetail(index, tableData) {
      this.orderId = tableData[index].id;
      this.$router.push({name:"inorderDetail",params:{orderId:this.tableData[index].id}})
    },

    submitUpdateOrder() {
      var obj = {};
      obj = this.form;
      let process = this.projectProcess;
      if (process == 3) {
        obj.projectProcess = 3;
      }
      obj.id = this.orderId;
      updateInOrder(obj)
        .then(res => {
          if (res.state == 0) {
            this.$message({
              type: "success",
              message: "修改成功！"
            });
            this.dialogFormVisible = false;
            this.form = this.newForm;
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
<style>
.process-btn {
  width: 60%;
  margin: 15px auto;
}
.process-line{
  width: 80%;
  margin: 15px auto;
}
</style>