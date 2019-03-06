<template>
  <el-form :label-position="labelPosition" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="用户名" prop="userName">
      <el-input v-model="ruleForm.userName"></el-input>
    </el-form-item>
    <el-form-item label="登录密码" prop="userPassword">
      <el-input v-model="ruleForm.userPassword"></el-input>
    </el-form-item>
    <el-form-item label="电话" prop="userPhone">
      <el-input v-model="ruleForm.userPhone"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>

</template>

<script>
/* eslint-disable */
import { login } from "@/api/api";
export default {
  name: "",
  props: [""],
  data() {
    return {
      ruleForm: {
        userName: "",
        userPassword:"",
        userPhone:"",
        userType:"0"
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        userPassword: [
          { required: true, message: "请输入登录密码", trigger: "blur" }
        ],
        userPhone: [
          { required: true, message: "请输入电话", trigger: "blur" },
          { min: 11, max: 11, message: "输入电话格式错误", trigger: "blur" }
        ]
      },
      labelPosition: "left"
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },

  watch: {}
};
</script>
<style>
div label {
  margin-top: 18px;
}
</style>