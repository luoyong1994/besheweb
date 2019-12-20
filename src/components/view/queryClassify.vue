<!--  -->
<template>
  <div>
   <form action="http://localhost:8080/bishe/file/download.do" method="post">
     <input type="text" name="url" value="group1/M00/00/00/rBoMilyz_9KAE0kXAAQPLkDEW9002.docx">
     <input type="text" name="fileName" value="me.png">
     <input type="submit" value="确定">
   </form>
  </div>
</template>

<script>
import {download} from "@/api/api"
export default {
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    handleDown(){
     
    }
  }
}

</script>
<style scoped>
</style>