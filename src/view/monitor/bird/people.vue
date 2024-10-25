<template>
  <div>
    <highcharts :options="chartOptions" ref="chart"></highcharts>
  </div>
</template>

<script setup>
import { ref } from "vue";

// 定义组件的 props
const { dataList } = defineProps({
  dataList: {
    type: Array,
    default: () => [{ name: "2024", data: [1,1,1,1] ,year:2024,quarter:['春','夏','秋','冬']}],
  },
});
const chartOptions = ref({
  chart: {
    type: "spline",
    backgroundColor: "#030025",
    height: 280,
  },
  title: {
    // text: null,
    text: `季增长`,
    style: {
      color: "#ffffff",
      fontSize: "20px",
    },
  },
  xAxis: {
    categories: dataList[0].quarter,
    title: {
      text: null,
    },
    crosshair: true,
    labels: {
      rotation: 0,
      style: {
        color: "#ffffff",
        fontSize: "14px",
      },
    },
  },

  yAxis: {
    categories: ["0", "50", "100", "150"],
    title: {
      text: null,
    },
    labels: {
      style: {
        color: "#ffffff",
        fontSize: "14px",
      },
    },
    gridLineDashStyle: "solid", //网格线样式
    // gridLineDashStyle: 'ShortDash',//网格线样式
    gridLineColor: "#221f3f",
    min: 0, //最小值
    tickInterval: 50, //间隔
    max: 150, //最大值
  },
  plotOptions: {
    line: {
      dataLabels: {
        enabled: true,
      },
      enableMouseTracking: false,
    },
    series: {
      marker: {
        enabled: true,
      },
    },
  },
  legend: {
    enabled: true,
    layout: "horizontal",
    align: "center",
    verticalAlign: "top",
    // symbolHeight:14,
    // symbolWidth:20,
    // symbolRadius:5,
    itemStyle: { color: "#FFFFFF" },
  },
  tooltip: {
    // enable:false,
    shared: true,
    padding: 16,
    headerFormat: "{point.key}<br>",
    backgroundColor: "rgba(0, 170, 255, 0.15)", // 提示框背景色
    borderWidth: 1, // 提示框边框宽度
    borderColor: " rgba(0, 170, 255, 0.5)", // 提示框边框颜色
    style: {
      color: "#ccc",
      // letterSpacing: '2px',
      fontSize: "14px",
    },
    // <span style="color:{point.color}">\u25CF</span> //数据圆点点
    pointFormat: " <b> {series.name}</b>&nbsp&nbsp&nbsp&nbsp {point.y} 只<br>",
  },
  credits: {
    enabled: false,
  },
  exporting: { enabled: false },
  series: [
    {
      name: dataList[0].name,
      data: dataList[0].data,
      color: "#00eaff",
    },
  ],
});

</script>
