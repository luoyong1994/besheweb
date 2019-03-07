<template>
    <div>
        <div class="head" v-loading="loading">
            <img src="../../assets/north.jpg" alt="北区图">
        </div>
        <div class="body">
            <div>
                <div class="body-message">
                    <el-form :label-position="labelPosition">
                        <el-form-item label="我的留言：">
                            <el-input type="textarea" v-model="message"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="body-showmessage">
                    <h4>留言列表:</h4>
                    <el-card class="box-card">
                        <div v-for="o in 4" :key="o" class="text item">
                            {{'列表内容 ' + o }}
                        </div>
                    </el-card>
                </div>
            </div>
            <div class="body-content" v-show="isNotice">
                <div class="body-notice">
                    <h4>公告：</h4>
                    <div>
                       请看公告{{userId}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "",
  props: [""],
  data() {
    return {
      loading: false,
      labelPosition: "top",
      message: "",
      currentDate: new Date(),
      isNotice:true,
      userId: this.$route.params.userId
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {},

  watch: {}
};
</script>
<style scoped>
/* eslint-disable */
img {
  height: 600px;
  width: 100%;
}
.body {
  height: 400px;
  width: 900px;
  margin: 0px auto;
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
}
.body > div {
  float: left;
}
.body-notice>div{
    /* height: 300px; */
    width: 400px;
    /* border: 1px solid red; */
}
.body-notice{
    margin-left: 5px;
}
</style>