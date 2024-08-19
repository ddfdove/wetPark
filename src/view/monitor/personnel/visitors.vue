<template>
    <div>
      <highcharts :options="chartOptions" ref="chart"></highcharts>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, toRefs } from "vue";
  
  // 接收 props 并使用 toRefs 保持响应式
  const props = defineProps({
    dataList: {
      type: Object,
      required: true,
    },
  });
  
  // 使用 toRefs 保留响应式
  const { dataList } = toRefs(props);
  
  // 为每条线设置不同颜色
  const colors = [
    "#43cf7c", // 绿色
    "#ff8d1a", // 橙色
    "#ac33c1", // 紫色
    "#2263ed", // 蓝色
    "#ff4d4d", // 红色
    "#f0e02e", // 黄色
  ];
  
  // 初始化 chartOptions
  const chartOptions = ref({
    chart: {
      type: "spline",
      backgroundColor: "#030025",
      width: 1320,
      height: 320,
    },
    title: {
      text: null,
    },
    xAxis: {
      categories: [], // 初始化为空数组
      title: {
        text: null,
      },
      crosshair: true,
      labels: {
        style: {
          color: "#919191",
          fontSize: "12px",
        },
      },
    },
    yAxis: {
      title: {
        text: null,
      },
      labels: {
        style: {
          color: "#919191",
          fontSize: "12px",
        },
      },
      gridLineDashStyle: "solid",
      gridLineColor: "#221f3f",
      min: 0,
      tickInterval: 1,
      max: 4,
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
        dataLabels: {
                enabled: true, // 启用数据标签
                format: '{y}', // 可以设置数据标签显示的格式，这里显示y值
                style: {
                    textOutline: 'none', // 文本描边，可选
                    color: 'white', // 文本颜色，可选
                    fontSize: '12px' // 文本字号，可选
                }
            },
      },
    },
    legend: {
      itemStyle: { color: "#FFFFFF" },
    },
    tooltip: {
      shared: true,
      padding: 16,
      backgroundColor: "rgba(0, 170, 255, 0.15)",
      borderWidth: 1,
      borderColor: "rgba(0, 170, 255, 0.5)",
      headerFormat: "{point.key}<br>",
      pointFormat: "<b>{series.name}</b>&nbsp&nbsp&nbsp {point.y} <br>",
      style: {
        color: "#ccc",
        letterSpacing: "2px",
        fontSize: "14px",
      },
    },
    credits: {
      enabled: false,
    },
    exporting: { enabled: false },
    series: [], // 初始化为空数组
  });
  
  // 监听 dataList 的变化
  watch(
    dataList,
    (newValue) => {
      if (newValue && newValue.series && newValue.categories) {
        chartOptions.value.series = newValue.series.map((item, index) => ({
          name: item.name,
          data: item.data,
          color: colors[index % colors.length], // 根据颜色数组循环设置颜色
          marker: {
            symbol: "circle",
            lineColor: colors[index % colors.length], // 为每个点指定颜色
          },
        }));
        chartOptions.value.xAxis.categories = newValue.categories;
      }
    },
    { immediate: true }
  );
  </script>
  