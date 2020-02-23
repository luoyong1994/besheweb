<template>
  <div>
    <el-form
      :label-position="position"
      label-width="150px"
      :model="formLabelAlign"
      :rules="rules"
      ref="formLabelAlign"
      class="demo-ruleForm"
    >
      <el-row type="flex">
        <el-col>
          <el-form-item label="店铺" prop="shop">
            <el-input v-model="formLabelAlign.shop"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="旺旺名" prop="wantName">
            <el-input v-model="formLabelAlign.wantName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col>
          <el-form-item label="项目名" prop="projectName">
            <el-input v-model="formLabelAlign.projectName"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="论文题目" prop="paperTitle">
            <el-input v-model="formLabelAlign.paperTitle"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col>
          <!-- 选择 -->
          <el-form-item label="客服qq" prop="serviceQQ">
            <el-row type="flex">
              <el-col :span="50">
                <el-input v-model="formLabelAlign.serviceQQ" placeholder="请选择客服qq"></el-input>
              </el-col>
              <el-col :span="1">
                <el-button type="primary" icon="el-icon-arrow-right" @click="selectCustomer"></el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col>
          <!-- 手输入 -->
          <el-form-item label="客户qq" prop="customerQQ">
            <el-input v-model="formLabelAlign.customerQQ" placeholder="请输入客户qq"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col>
          <el-form-item label="技术类型" prop="technology">
            <el-select v-model="formLabelAlign.technology" placeholder="请选择技术类型">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="接单时间" prop="orderDate">
            <el-date-picker
              value-format="yyyyMMddHHmmss"
              v-model="formLabelAlign.orderDate"
              type="datetime"
              placeholder="选择日期时间"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex">
        <el-col>
          <el-form-item label="项目总金额" prop="totalAmt">
            <el-input v-model="formLabelAlign.totalAmt"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="程序金额" prop="programAmt">
            <el-input v-model="formLabelAlign.programAmt"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col>
          <el-form-item label="论文价钱" prop="paperAmt">
            <el-input v-model="formLabelAlign.paperAmt"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="项目定金" prop="bookAmt">
            <el-input v-model="formLabelAlign.bookAmt"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex"></el-row>

      <el-form-item label="备注">
        <el-input
          type="textarea"
          :autosize="{ minRows: 8, maxRows: 20}"
          placeholder="请填写备注"
          v-model="formLabelAlign.remarks"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-upload
          class="upload-demo"
          action="http://localhost:8080/bishe/file/upload.do"
          :before-remove="beforeRemove"
          multiple
          :file-list="fileList"
          drag
          :before-upload="checkFile"
          :on-success="handleSuccess"
        >
          <!-- <el-upload
          class="upload-demo"
          action="http://39.98.163.208:8080/file/upload.do"
          :before-remove="beforeRemove"
          multiple
          :file-list="fileList"
          drag
          :before-upload="checkFile"
          :on-success="handleSuccess"
          >-->
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">只能上传word文件和图片，且不超过10Mb</div>
        </el-upload>
      </el-form-item>
      <el-form-item style="margin:0px auto">
        <el-button type="primary" @click="submitForm('formLabelAlign')">立即创建</el-button>
        <el-button type="info" @click="goback">返回</el-button>
      </el-form-item>
    </el-form>

    <!-- 人员信息列表 -->
    <el-dialog title="客服列表" :visible.sync="dialogTableVisible">
      <el-table :data="gridData" highlight-current-row @current-change="handleCurrentChange">
        <el-table-column type="index" width="180" label="序号"></el-table-column>
        <el-table-column property="name" label="姓名" width="180"></el-table-column>
        <el-table-column property="qq" label="qq" width="180"></el-table-column>
        <el-table-column property="tel" label="电话" width="180"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import { addOrder, queryClassify, queryUsers } from "@/api/api";
export default {
  name: "",
  props: [""],
  data() {
    return {
      dialogTableVisible: false,
      gridData: [],
      fileList: [], //文件列表
      options: [], //技术类型
      position: "right",
      imageUrl: "",
      formLabelAlign: {
        shop: "",
        wantName: "",
        qq: "",
        serviceQQ: "",
        customerQQ: "",
        projectName: "",
        technology: "",
        orderDate: "",
        totalAmt: "",
        bookAmt: "",
        programAmt: "",
        paperTitle: "",
        paperAmt: "",
        remarks: ""
      },
      rules: {
        shop: [{ required: true, message: "请输入店铺", trigger: "blur" }],
        wantName: [
          { required: true, message: "请输入旺旺名", trigger: "blur" }
        ],
        qq: [{ required: true, message: "请输入qq号", trigger: "blur" }],
        projectName: [
          { required: true, message: "请输入项目名", trigger: "blur" }
        ],
        technology: [
          { required: true, message: "请输入使用技术", trigger: "blur" }
        ],
        orderDate: [
          { required: true, message: "请输入接单时间", trigger: "blur" }
        ],
        paperTitle: [
          { required: true, message: "请输入论文题目", trigger: "blur" }
        ],
        serviceQQ: [
          { required: true, message: "请选择客服qq", trigger: "blur" }
        ],
        customerQQ: [
          { required: true, message: "请输入客户qq", trigger: "blur" }
        ]
      }
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {
    queryUsers().then(res => {
      this.gridData = res.data;
    });

    queryClassify().then(res => {
      this.options = res.data;
    });
  },

  methods: {
    handleCurrentChange(currentRow, oldCurrentRow) {
      this.formLabelAlign.serviceQQ = currentRow.qq;
      this.dialogTableVisible = false;
    },

    selectCustomer() {
      this.dialogTableVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var orderInfo = {};
          orderInfo.shop = this.formLabelAlign.shop;
          orderInfo.wantName = this.formLabelAlign.wantName;
          orderInfo.serviceQQ = this.formLabelAlign.serviceQQ;
          orderInfo.customerQQ = this.formLabelAlign.customerQQ;
          orderInfo.projectName = this.formLabelAlign.projectName;
          orderInfo.technology = this.formLabelAlign.technology;
          orderInfo.orderDate = this.formLabelAlign.orderDate;
          orderInfo.totalAmt = this.formLabelAlign.totalAmt;
          orderInfo.bookAmt = this.formLabelAlign.bookAmt;
          orderInfo.programAmt = this.formLabelAlign.programAmt;
          orderInfo.paperTitle = this.formLabelAlign.paperTitle;
          orderInfo.paperAmt = this.formLabelAlign.paperAmt;
          orderInfo.remarks = this.formLabelAlign.remarks;
          var files = this.fileList;
          console.log(files);
          var imagePath = "";
          for (let i = 0; i < files.length; i++) {
            var response = files[i].response;
            if (response != undefined && response.state != 1) {
              if (
                response.data.fileName
                  .substring(response.data.fileName.lastIndexOf("."))
                  .toLowerCase() == "docx" ||
                response.data.fileName
                  .substring(response.data.fileName.lastIndexOf("."))
                  .toLowerCase() == "doc"
              ) {
                if (orderInfo.docName) {
                  this.$message({
                    message: "只能保存一份word需求文档，请删除多余的文档",
                    type: "warn"
                  });
                  break;
                }
                orderInfo.docName = response.data.fileName;
                orderInfo.docPath = response.data.fileId;
                continue;
              }
              imagePath += response.fileId + ";";
            }
          }
          if (imagePath.length > 0) {
            imagePath = imagePath.substring(0, imagePath.lastIndexOf(";"));
          }
          orderInfo.imagePath = imagePath;
          console.log(orderInfo);
          addOrder(orderInfo).then(res => {
            if (res.state == 0) {
              this.$message({
                message: "添加成功！",
                type: "success"
              });
              this.$router.push({ name: "queryOrder" });
            } else {
              this.$message({
                message: res.message,
                type: "error"
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    checkFile(file) {
      // let fileList = this.$get("data",fileList);
      // for(let i=0;i<fileList.length;i++){
      //   let last = fileList[i].name.substring(fileList[i].name.indexOf(".")+1);
      //   if(last.toLowerCase()=="docx" || last.toLowerCase()=="xlsx"){
      //     this.$message({
      //           message: 已经上传了world文件,请删除了再上传,
      //           type: "error"
      //         });
      //         return false
      //   }
      // }
      // return true;
    },
    handleSuccess(response, file, fileList) {
      this.fileList = fileList;
    },
    goback() {
      this.$router.go(-1);
    }
  },

  watch: {}
};
</script>
<style scoped>
</style>