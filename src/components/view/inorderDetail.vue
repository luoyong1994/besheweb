<!-- 内部订单详情展示  -->
<template>
  <div class="header-inorderDetail">
    <el-divider content-position="center">订单信息</el-divider>
    <el-form ref="form" :model="form" label-width="100px">
      <el-row type="flex" :gutter="60">
        <el-col>
          <el-form-item label="店铺" :label-width="formLabelWidth">
            <el-input v-model="form.totalAmt" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="旺旺名" :label-width="formLabelWidth">
            <el-input v-model="form.bookAmt" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" :gutter="60">
        <el-col>
          <el-form-item label="接单时间" :label-width="formLabelWidth">
            <el-input v-model="form.totalAmt" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="项目名" :label-width="formLabelWidth">
            <el-input v-model="form.bookAmt" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" :gutter="60">
        <el-col>
          <el-form-item label="使用技术" :label-width="formLabelWidth">
            <el-input v-model="form.totalAmt" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="项目定金" :label-width="formLabelWidth">
            <el-input v-model="form.bookAmt" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" :gutter="60">
        <el-col>
          <el-form-item label="程序技术分配" :label-width="formLabelWidth">
            <el-input v-model="form.bookAmt" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="论文技术分配" :label-width="formLabelWidth">
            <el-input v-model="form.totalAmt" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider content-position="center">外包信息</el-divider>
      <el-row type="flex" :gutter="60">
        <el-col>
          <el-form-item label="程序技术姓名" :label-width="formLabelWidth">
            <el-input v-model="form.programname" autocomplete="off" placeholder="请输入程序技术姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="程序技术电话" :label-width="formLabelWidth">
            <el-input v-model="form.tel" autocomplete="off" placeholder="请输入程序技术电话"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" :gutter="60">
        <el-col>
          <el-form-item label="程序技术qq" :label-width="formLabelWidth">
            <el-input v-model="form.qq" autocomplete="off" placeholder="请输入程序技术qq"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="论文技术姓名" :label-width="formLabelWidth">
            <el-input v-model="form.papername" autocomplete="off" placeholder="请输入论文技术姓名"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" :gutter="60">
        <el-col>
          <el-form-item label="论文技术电话" :label-width="formLabelWidth">
            <el-input v-model="form.papertel" autocomplete="off" placeholder="请输入论文技术电话"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="论文技术qq" :label-width="formLabelWidth">
            <el-input v-model="form.paperqq" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider content-position="center">外包价格信息</el-divider>
      <el-row type="flex" :gutter="60">
        <el-col>
          <el-form-item label="技术外包价格" :label-width="formLabelWidth">
            <el-input v-model="form.paperqq" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="论文外包价格" :label-width="formLabelWidth">
            <el-input v-model="form.papertel" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
/* eslint-disable */
import { queryOrderAllDetail } from "@/api/api";
export default {
  props: ["orderId"],
  data() {
    return {
      form: {}
    };
  },

  components: {},

  computed: {},

  mounted() {
    var requestData = {};
    requestData.orderId = this.orderId;
    queryOrderAllDetail(requestData)
      .then(res => {
        //返回数据进行挂载
        var orderAllDetail = "";
      })
      .catch(res => {
        this.$message({ type: "error", message: res.message });
      });
  },

  methods: {}
};
</script>
<style>
.header-inorderDetail {
  width: 80%;
  margin: 10px auto;
}
</style>