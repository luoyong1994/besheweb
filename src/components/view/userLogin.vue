<template>
  <div class="body-bacg">
    <div class="main">
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        size="medium"
      >
        <el-form-item class="item">
          <div v-show="error">
            <el-alert center title="用户名密码错误" type="error" show-icon :closable="false"></el-alert>
          </div>
        </el-form-item>
        <el-form-item label="用户名" prop="userName" class="item">
          <el-input type="text" v-model="loginForm.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密 码" prop="userPassword" class="item">
          <el-input type="password" v-model="loginForm.userPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="item">
          <div class="item-btn">
            <el-button type="primary"  @keyup.13="login('loginForm')"  @click="login('loginForm')">登录</el-button>
            <!-- <el-button @click="register()">注册</el-button> -->
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { signIn } from "@/api/api";
import md5 from "js-md5";
export default {
  name: "",
  props: [""],
  data() {
    var validateUserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        //操作用户名
      }
    };
    var validatePassWord = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        //操作密码
        //加密
      }
      var validateTip = (rule, value, callback) => {
        this.error = false;
      };
    };
    return {
      loginForm: {
        userName: "",
        userPassword: ""
      },
      rules: {
        userName: [{ validator: validateUserName, trigger: "blur" }],
        passWord: [{ validator: validatePassWord, trigger: "blur" }]
      },
      success: false,
      error: false,
      show: false
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    login: function(refForm) {
      if (this.loginForm.userName && this.loginForm.userPassword) {
        var sysuser = {};
        sysuser.username = this.loginForm.userName;
        sysuser.password = md5(this.loginForm.userPassword);
        signIn(sysuser).then(res => {
          if (res.state == 0) {
            this.error = false;
            this.$store.dispatch("saveUserInfo", res.data);
            this.$router.push({
              name: "admin",
              params: { user: res.data }
            });
          } else {
            this.error = true;
          }
        });
      }
    },
    register: function() {
      this.$router.push({ name: "userRegister", params: {} });
    }
  },

  watch: {}
};
</script>
<style>
.main {
  height: 300px;
  width: 400px;
  margin: 200px auto;
}
.item-btn {
  text-align: center;
}
</style>