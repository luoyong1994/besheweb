<template>
  <div class="header">
    <el-form
      :label-position="position"
      label-width="100px"
      :model="formLabelAlign"
      :rules="rules"
      ref="formLabelAlign"
      class="demo-ruleForm"
    >
      <el-form-item label="登录用户名" prop="username">
        <el-input v-model="formLabelAlign.username" placeholder="请输入登录用户名"></el-input>
      </el-form-item>
      <el-form-item label="登录密码" prop="password">
        <el-input v-model="formLabelAlign.password" placeholder="请输入登录密码"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="formLabelAlign.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="tel">
        <el-input v-model="formLabelAlign.tel" placeholder="请输入电话"></el-input>
      </el-form-item>
      <el-form-item label="qq" prop="qq">
        <el-input v-model="formLabelAlign.qq" placeholder="请输入qq"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('formLabelAlign')">立即创建</el-button>
        <el-button type="info" @click="goback">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
/* eslint-disable */
import { addUser } from "@/api/api";
import md5 from 'js-md5'
export default {
  name: "",
  props: [""],
  data() {
    return {
      position: "left",
      formLabelAlign: {
        username: "",
        name: "",
        password: "",
        qq: "",
        tel: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入登录用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" }
        ],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        qq: [{ required: true, message: "请输入qq", trigger: "blur" }],
        tel: [{ required: true, message: "请输入电话", trigger: "blur" }]
      }
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {

  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var password = this.formLabelAlign.password;
          var sysuser={};
          sysuser.username=this.formLabelAlign.username;
          sysuser.name= this.formLabelAlign.name;
          sysuser.password = this.formLabelAlign.password;
          sysuser.qq = this.formLabelAlign.qq;
          sysuser.tel = this.formLabelAlign.tel;
          sysuser.password=md5(password);
          addUser(sysuser).then(res => {
            if (res.state == "0") {
              this.$message({
                message: "添加成功！",
                type: "success"
              });
              this.$router.push({ name: "queryUser" });
            } else if (res.state == "1") {
              this.$message({
                message: res.message,
                type: "error"
              });
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
    goback() {
      this.$router.go(-1);
    }
  },

  watch: {}
};
</script>
<style scoped>
.header {
  margin: 10px auto;
  width: 500px;
}
</style>