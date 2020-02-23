<!-- 订单统计 将完成的订单进行统计   完成订单月份，订单数量，订单金额， -->
<template>
  <div>
    <el-table :data="tableData" border show-summary style="width: 100%">
      <el-table-column prop="name" label="月份"></el-table-column>
      <el-table-column prop="amount1" sortable label="数量"></el-table-column>
      <el-table-column prop="amount2" sortable label="订单金额"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: "12987122",
          name: "王小虎",
          amount1: "234",
          amount2: "3.2",
          amount3: 10
        },
        {
          id: "12987123",
          name: "王小虎",
          amount1: "165",
          amount2: "4.43",
          amount3: 12
        },
        {
          id: "12987124",
          name: "王小虎",
          amount1: "324",
          amount2: "1.9",
          amount3: 9
        },
        {
          id: "12987125",
          name: "王小虎",
          amount1: "621",
          amount2: "2.2",
          amount3: 17
        },
        {
          id: "12987126",
          name: "王小虎",
          amount1: "539",
          amount2: "4.1",
          amount3: 15
        }
      ]
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {

  }
};
</script>
<style scoped>
</style>