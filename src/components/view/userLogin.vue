<template>
  <div>
    <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm controll" size="medium">
      <el-form-item class="item">
        <div v-show="error">
          <el-alert center title="用户名密码错误" type="error" show-icon :closable=false>
          </el-alert>
        </div>
      </el-form-item>
      <el-form-item label="用户名" prop="userName" class="item">
        <el-input type="text" v-model="loginForm.userName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密 码" prop="passWord" class="item">
        <el-input type="password" v-model="loginForm.passWord" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item class="item login_button">
        <el-button type="primary" @click="login('loginForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
import { login } from "@/api/api";
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
      };
      var validateTip =(rule, value, callback)=>{
        this.error=false;
      }
    };
    return {
      loginForm: {
        userName: "admin",
        passWord: "admin"
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
      if (this.loginForm.userName && this.loginForm.passWord) {
        var sysuser = {};
        sysuser.userName = this.loginForm.userName;
        sysuser.userPassword = this.loginForm.passWord;
        login(sysuser).then(res => {
          if (res.state == 0) {
            this.error=false;
            this.$router.push({
              name: "navigator",
              params: { userName: this.loginForm.userName }
            });
          } else {
            this.error = true;
          }
        });
      }
    }
  },

  watch: {}
};
</script>
<style lang='' scoped>
.controll {
  height: 300px;
  width: 400px;
  margin: 300px auto;
}
.item {
  margin: 30px 0px;
}
.login_button {
  margin-top: -9px;
}
</style>