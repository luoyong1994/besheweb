<template>
<div class="index">
  <div class="index-north" @click="goNorthRegion"></div>
  <div class="index-south"></div>
</div>
</template>
<script>
/* eslint-disable */
  export default {
    name:'',
    props:[''],
    data () {
      return {

      };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {
      goNorthRegion:function () {
        this.$router.push({name:"showRegion",params:{userId:1}});
      }
    },

    watch: {}

  }

</script>
<style scoped>
.index{
  margin:5px auto;
  width: 840px;
  height: 862px;
  background-size: contain;
  background-image: url(../../assets/index.jpg);
  background-repeat: no-repeat;
  position: relative;
}
.index-north{
  height: 438px;
  width: 314px;
  border: 1px solid red;
  position: absolute;
  right: 42px;
  top:17px;
}
</style>