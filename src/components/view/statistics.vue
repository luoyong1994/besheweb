<!-- 统计工作 -->
<template>
  <div class="bar-container"></div>
</template>

<script>
export default {
  data() {
    return {};
  },

  components: {},

  computed: {},

  mounted() {
    //初始化echart
    var mychart = this.$echarts.init(document.getElementById("bar-container"));
    option = {
      color: ["#3398DB"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "line" // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: "1%",
        right: "4%",
        bottom: "2%",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月"
          ],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      series: [
        {
          name: "直接访问",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390, 330, 220, 100, 200, 400, 600, 300]
        }
      ]
    };
  },

  methods: {}
};
</script>
<style>
.bar-container {
  height: 400px;
  width: 600px;
}
</style>