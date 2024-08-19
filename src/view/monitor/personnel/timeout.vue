<template>
    <div>
      <highcharts :options="chartOptions" ref="chart"></highcharts>
    </div>
  </template>
  
  <script setup>
  import { ref, watchEffect } from 'vue';
  
  const props = defineProps({
    dataList: {
      type: Array,
      default: () => []
    }
  });
  
  const chartOptions = ref({
    chart: {
      type: 'pie',
      backgroundColor: 'rgba(0,0,0,0)',
      spacing: [0, 0, 10, 0],
      height: 260,
      options3d: {
        enabled: true,
        alpha: 45,
        beta: 0
      },
    },
    title: {
      text: null,
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        showInLegend: true,
        depth: 80,
        dataLabels: {
          enabled: false,
          format: '<b>{point.name}</b><br>{point.y} ',
        }
      }
    },
    legend: {
      enabled: true,
      layout: 'horizontal',
      align: 'center',
      verticalAlign: 'bottom',
      symbolHeight: 8,
      symbolWidth: 8,
      itemStyle: { color: '#FFFFFF' },
      labelFormatter: function () {
        return `
          <span style="font-size: 14px;">${this.name}</span> </br> </br>
          <span style="color:${this.color}; font-size: 20px; padding:10px">${this.y}</span>
        `;
      }
    },
    tooltip: {
      enable: true,
      headerFormat: '',
      backgroundColor: 'rgba(0, 170, 255, 0.15)',
      borderWidth: 1,
      borderColor: 'rgba(0, 170, 255, 0.5)',
      style: {
        color: '#ffffff',
      },
      pointFormat: ' <b> {point.name}</b>: {point.y} '
    },
    credits: {
      enabled: false
    },
    exporting: { enabled: false },
    series: [{
      name: '超时订单',
      data: [],  // 初始时为空，等到数据传递过来时再更新
      colors: [
        'rgb(255,207,72)',
        '#e02b41',
        'rgb(22,132,252)',
        'rgb(96,181,101)',
      ]
    }]
  });
  
  watchEffect(() => {
    if (props.dataList && props.dataList.length) {
      chartOptions.value.series[0].data = props.dataList;
    }
  });
  </script>
  