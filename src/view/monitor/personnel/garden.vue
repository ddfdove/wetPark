<template>
    <div>
      <highcharts :options="chartOptions" ref="chart"></highcharts>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from "vue";
  
  // 定义 props
  const props = defineProps({
    dataList: {
      type: Object,
      default: () => ({
        categories: [],
        series: []
      })
    }
  });
  
  // 定义 chartOptions，并在组件挂载时或 props.dataList 变化时更新配置
  const chartOptions = ref({
    chart: {
      type: 'column',
      backgroundColor: '#030025',
      spacing: [0, 0, 10, 0],
      height: 320,
      options3d: {
        enabled: true,
        beta: 30,
        depth: 70,
        viewDistance: 0
      }
    },
    title: {
      text: null
    },
    xAxis: {
      categories: props.dataList.categories,
      title: {
        text: null
      },
      gridLineWidth: 0,
        lineWidth: 0,
      labels: {
        style: {
          color: '#ffffff',
          fontSize: "12px"
        }
      }
    },
    yAxis: {
      title: {
        text: null,
      },
      labels: {
        style: {
          color: '#ffffff',
          fontSize: "12px"
        }
      },
      gridLineDashStyle: 'solid',
      gridLineColor: '#221f3f',
    //   min: 0,
    //   tickInterval: 1000,
    //   max: 5000
    },
    tooltip: {
      backgroundColor: 'rgba(0, 170, 255, 0.15)',
      borderWidth: 1,
      borderColor: ' rgba(0, 170, 255, 0.5)',
      style: {
        color: '#ccc',
        fontSize: '14px',
      },
      headerFormat: '{point.key}&nbsp&nbsp&nbsp  {point.y}<br>',
      pointFormat: ' ',
    },
    plotOptions: {
      column: {
        borderRadius: '50',
        depth: 25,
        dataLabels: {
          enabled: true,
        //   color: 'rgb(255,204,0)'
        },
        shadow: false,
        groupPadding: 0.1,
      }
    },
    legend: {
      enabled: false
    },
    credits: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    series: props.dataList.series ? props.dataList.series.map(seriesItem => ({
      ...seriesItem,
      color: {
        linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 }, // 从底部到顶部渐变
        stops: [
          [0.01, 'rgba(1, 56, 222, 0.2)'],
          [0.99, '#006BBC']
        ]
      },
      pointPadding: 0.3,
    })) : []
  });
  
  // 监听 props.dataList 的变化以更新 chartOptions
  watch(() => props.dataList, (newDataList) => {
    chartOptions.value.xAxis.categories = newDataList.categories || [];
    chartOptions.value.series = newDataList.series ? newDataList.series.map(seriesItem => ({
      ...seriesItem,
      color: {
        linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 }, // 从底部到顶部渐变
        stops: [
          [0.01, 'rgba(1, 56, 222, 0.2)'],
          [0.99, '#006BBC']
        ]
      },
      pointPadding: 0.3,
    })) : [];
  }, { immediate: true });
  
  </script>
  