
<template>
  <div class="body">
    <table border="1" cellspacing="0">
      <tr>
        <td class="body-tdleft">编号</td>
        <td class="body-tdright">{{orderInof.id}}</td>
      </tr>
      <tr>
        <td class="body-tdleft">项目名称</td>
        <td class="body-tdright">{{orderInof.projectName}}</td>
      </tr>
      <tr>
        <td class="body-tdleft">技术方向</td>
        <td class="body-tdright">{{orderInof.technology}}</td>
      </tr>
      <tr>
        <td class="body-tdleft">需求说明</td>
        <td class="body-tdright" v-if="haveDoc">
          <!-- <form action="http://localhost:8080/bishe/file/download.do" method="post" target="_self">
            <input type="text" v-bind:value="fileUrl" name="url" style="display:none">
            <input type="text" v-bind:value="fileName" name="fileName" style="display:none">
            <input type="submit" value="下载需求文档">
          </form> -->
           <form action="http://39.98.163.208:8080/file/download.do" method="post" target="_self">
            <input type="text" v-bind:value="fileUrl" name="url" style="display:none">
            <input type="text" v-bind:value="fileName" name="fileName" style="display:none">
            <input type="submit" value="下载需求文档">
          </form>
        </td>
         <td class="body-tdright" v-else="">无</td>
      </tr>
      <tr>
        <td class="body-tdleft">订单状态</td>
        <td class="body-tdright">待开发</td>
      </tr>
      <tr>
        <td class="body-tdleft">图片材料</td>
        <td class="body-tdright" v-if="haveImg">
          <el-carousel indicator-position="outside">
            <el-carousel-item v-for="item in imgArry" :key="item">
              <template>
                <img :src="item" alt="论文材料图" style="height:100%;width:100%">
              </template>
            </el-carousel-item>
          </el-carousel>
        </td>
        <td class="body-tdright" v-else="">无</td>
      </tr>
      <tr>
        <td class="body-tdleft">备注</td>
        <td class="body-tdright">{{orderInof.remarks}}</td>
      </tr>
      <tr>
        <td></td>
        <td class="butto">
          <el-button type="success" @click="dialogFormVisible = true">我要接单</el-button>
          <el-button type="info" class="back" size="mini" @click="goback">返回</el-button>
        </td>
      </tr>
    </table>
    <p class="footer">© 版权@2008-2017 个人打造-订单管理系统</p>
    <p class="footer">欢迎来到毕设派单系统！敬请收藏本链接，或者创建桌面快捷方式。订单每天更新欢迎接单。</p>
    <el-dialog title="请填写个人信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.programName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="意向价" :label-width="formLabelWidth">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.tel" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="qq" :label-width="formLabelWidth">
          <el-input v-model="form.qq" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrderFlow">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import { queryOrderDetailById, addAcceptOrderFlow } from "@/api/api";
export default {
  props: ["order"],
  data() {
    return {
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
        price:""
      },
      formLabelWidth: "120px",
    };
  },
  beforeMount () {
    
  },
  components: {},

  computed: {
    haveImg: function(){
      return this.imgArry.length>0;
    },

    haveDoc: function(){
      return this.fileName.length>0;
    }

  },

  mounted() {
    var id = this.order.id;
    queryOrderDetailById({ id: id })
      .then(res => {
        this.orderInof = res.data;
        this.fileUrl = res.data.docPath;
        this.fileName = res.data.docName == null ? "" : res.data.docName;
        this.imgArry = res.data.imagePath.length>0? res.data.imagePath.split(";"):[];
        let showImg = this.imgArry.map(function(item) {
          return "http://39.98.163.208/" + item;
        });
        this.imgArry = showImg;
      })
      .catch(res => {
        this.$message({
          type: "error",
          message: res.message
        });
      });
  },

  methods: {
    addOrderFlow() {
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
              type:"success",
              message:"感谢你的接单,管理员会尽快处理！"
            })
            this.$router.push({name:"orderList"});
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
    goback() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.body {
  width: 80%;
  margin: 0px auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #909399;
  font-family: "PingFang SC";
  font-size: 12px;
}

.body-tdleft {
  width: 10%;
  height: 30px;
  line-height: 30px;
  padding-left: 5px;
  font-weight: bold;
}
.body-tdright{
  width: 90%;
}

.doc {
  color: #409eff;
  text-decoration: none;
}

.butto {
  padding: 5px 10px;
  position: relative;
}
.butto .back {
  position: absolute;
  right: 20px;
  top: 5px;
}
.footer {
  text-align: center;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>