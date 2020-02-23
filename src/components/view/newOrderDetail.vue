
<template>
  <div class="detail-body">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="title" width="180"></el-table-column>
      <el-table-column prop="type">
        <template slot-scope="scope">
          <div v-if="scope.row.type=='url'">
            <el-link
              type="primary"
              @click="handDownloadDoc(scope.row)"
              v-if="scope.row.content"
            >点击下载</el-link>
            <p v-else>暂无需求文档</p>
          </div>
          <p v-else-if="scope.row.type=='text'">{{scope.row.content}}</p>
          <div class="block" v-else>
            <el-image
              :src="image"
              v-for="(image,index) in scope.row.content"
              :key="index"
              :fit="fit"
              style="width: 100px; height: 100px"
            >
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="order-accpter">
      <el-button type="primary" @click="dialogFormVisible = true">接单</el-button>
      <el-button type="info" class="back" size="mini" @click="goback">返回</el-button>
    </div>
    <p class="footer">© 版权@2008-2017 个人打造-订单管理系统</p>
    <p class="footer">欢迎来到毕设派单系统！敬请收藏本链接，或者创建桌面快捷方式。订单每天更新欢迎接单。</p>
    <el-dialog title="请填写个人信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="programName" require>
          <el-input v-model="form.programName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="意向价" :label-width="formLabelWidth" prop="price" require>
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="tel" require>
          <el-input v-model="form.tel" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="QQ" :label-width="formLabelWidth" prop="qq" require>
          <el-input v-model="form.qq" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrderFlow('form')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 文件下载表单 -->
    <form v-bind:action="actionUrl" method="post" id="fileForm" style="display:none" target="_self">
      <input type="text" name="fileName" v-bind:value="fileName">
      <input type="submit" value="提交">
    </form>
  </div>
</template>

<script>
/* eslint-disable */
import { queryOrderDetailById, addAcceptOrderFlow } from "@/api/api";
export default {
  props: ["order"],
  data() {
    var checkTel = (rule, value, callback) => {
      if (value) {
        var regex = /^1[34578]\d{9}$/;
        if (!regex.test(value)) {
          return callback(new Error("请输入正确的电话号"));
        }
      }
    };
    var checkPrice = (rule, value, callback) => {
      if(value){
        if(!Number.isInteger(value)){
          return callback(new Error("请输入正确的意向价"));
        }
      }
    };
    var checkQQ = (rule, value, callback) => {
      if(value){
        var regex = /^[1-9][0-9]{4,11}$/;
        if(!regex.test(value)){
          callback(new Error("请输入正确的QQ"));
        }
      }
    };
    return {
      fit: "cover",
      tableData: [
        // {
        //   title: "编号",
        //   content: "123456789", //项目名称
        //   type: "text"
        // },
        // {
        //   title: "项目名称",
        //   content: "基于java开发的商城系统",
        //   type: "text"
        // },
        // {
        //   title: "需求文档",
        //   content: "http://www.baidu.com",
        //   type: "url"
        // },
        // {
        //   title: "2016-05-02",
        //   type: "image",
        //   content: [
        //     "http://localhost:8080/candy.png",
        //     "http://localhost:8080/candy.png",
        //     "http://localhost:8080/candy.png",
        //     "http://localhost:8080/candy.png"
        //   ]
        // }
      ],

      fileUrl: "",
      fileName: "",
      imgArry: [],
      orderInof: {},
      dowloadUrl: "",
      dialogFormVisible: false,
      form: {
        programName: "",
        tel: "",
        qq: "",
        price: ""
      },
      rules: {
        programName: [
          { required: true, message: "请输入姓名", trigger: "blur" }
        ],
        tel: [
          { required: true, message: "请输入电话", trigger: "blur" },
          { validator: checkTel, trigger: "blur" }
        ],
        qq: [{ required: true, message: "请输入qq号码", trigger: "blur" }],
        price: [{ required: true, message: "请输入意向价格", trigger: "blur" }]
      },
      formLabelWidth: "120px",
      actionUrl:'',
    };
  },
  beforeMount() {},
  components: {},
  watch: {
    dialogFormVisible: function(oldVlaue, newValue) {
      if (!oldVlaue) {
        (this.form.programName = ""),
          (this.form.tel = ""),
          (this.form.qq = ""),
          (this.form.price = "");
      }
    }
  },
  computed: {
    haveImg: function() {
      return this.imgArry.length > 0;
    },

    haveDoc: function() {
      return this.fileName.length > 0;
    }
  },

  mounted() {
    var id = this.order.id;
    queryOrderDetailById({ id: id })
      .then(res => {
        var tableArr = this.assemblyData(res.data);
        console.log("返回数据%s", JSON.stringify(tableArr));
        //初始化下载地址
        this.tableData = tableArr;
        tableArr.forEach((item)=>{
          if(item.type=='url'){
            console.log("下载文件内容：%s",item.content);
            this.actionUrl= "http://localhost:8088/bishe/file/download.do";
            this.fileName = "hello.txt";
          }
        });
      })
      .catch(res => {
        console.log("返回错误数据%s", res);
        this.$message({
          type: "error",
          message: res.message
        });
      });
  },

  methods: {
    /**
     * 装配数据
     */
    assemblyData(data) {
      let imgArry = data.imagePath.length > 0 ? data.imagePath.split(";") : [];
      let showImg = imgArry.map(function(item) {
        return "http://39.98.163.208/" + item;
      });
      imgArry = showImg;
      imgArry = [
        "http://localhost:8080/candy.png",
        "http://localhost:8080/candy.png",
        "http://localhost:8080/candy.png",
        "http://localhost:8080/candy.png"
      ];
      let arr = [];
      arr.push({ title: "编号", type: "text", content: data.id });
      arr.push({ title: "项目名称", type: "text", content: data.projectName });
      arr.push({ title: "技术方向", type: "text", content: data.technology });
      arr.push({
        title: "需求说明",
        type: "url",
        content: "http://localhost:8080/download.do"
      });
      arr.push({ title: "订单状态", type: "text", content: "待开发" });
      arr.push({ title: "图片材料", type: "image", content: imgArry });
      arr.push({ title: "备注", type: "text", content: data.remarks });
      return arr;
    },

    /**
     * 下载需求文档
     */
    handDownloadDoc() {
      document.getElementById("fileForm").submit();
    },

    goback() {
      this.$router.go(-1);
    },

    addOrderFlow(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var customer = {};
          customer.id = this.order.id;
          customer.programName = this.form.programName;
          customer.tel = this.form.tel;
          customer.qq = this.form.qq;
          customer.price = this.form.price;
          addAcceptOrderFlow(customer)
            .then(res => {
              if (res.state == "0") {
                this.$message({
                  type: "success",
                  message: "感谢你的接单,管理员会尽快处理！"
                });
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
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style>
.detail-body {
  padding: 0px 20px;
}
.detail-body .el-table__header-wrapper {
  display: none;
}
.dowload-icon {
  font-size: 40px;
}
.order-accpter {
  margin: 20px auto;
  width: 600px;
}
.order-accpter .el-button {
  margin: 0px 100px;
}
</style>