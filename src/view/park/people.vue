<template>
    <div>
        <highcharts :options="chartOptions" ref="chart"></highcharts>
    </div>
</template>

<script setup>
import { ref } from "vue"

// 定义组件的 props
const {dataList} = defineProps({
    dataList: {
        type: Array,
        default: () => [
            { name: '2021', data: [123, 32, 15] },
            { name: '2020', data: [233, 12, 23] }
        ]
    }
});
const chartOptions = ref({
    chart: {
        type: 'spline',
        backgroundColor: '#030025',
        height: 200
    },
    title: {
        text: null
    },
    xAxis: {
        categories: ['摄像头', '水质检测', '门禁'],
        title: {
            text: null
        },
        crosshair: true,
        labels: {
            style: {
                color: '#ffffff',
                fontSize: "14px"
            }
        }
    },

    yAxis: {
        categories: ['0', '50', '100', '150', '200', '250'],
        title: {
            text: null
        },
        labels: {
            style: {
                color: '#ffffff',
                fontSize: "14px"
            }
        },
        gridLineDashStyle: 'solid',//网格线样式
        // gridLineDashStyle: 'ShortDash',//网格线样式
        gridLineColor: '#221f3f',
        min: 0,//最小值
        tickInterval: 50, //间隔
        max: 250 //最大值
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        },
        series: {
            marker: {
                enabled: false
            }
        }
    },
    legend: {
        enabled: true,
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'top',
        // symbolHeight:14,
        // symbolWidth:20,
        // symbolRadius:5,
        itemStyle: { 'color': '#FFFFFF' }
    },
    tooltip: {
        // enable:false,
        shared: true,
        padding: 16,
        headerFormat: '{point.key}<br>',
        backgroundColor: 'rgba(0, 170, 255, 0.15)', // 提示框背景色
        borderWidth: 1, // 提示框边框宽度
        borderColor: ' rgba(0, 170, 255, 0.5)', // 提示框边框颜色
        style: {
            color: '#ccc',
            // letterSpacing: '2px',
            fontSize: '14px',
        },
        // <span style="color:{point.color}">\u25CF</span> //数据圆点点
        pointFormat: ' <b> {series.name}</b>&nbsp&nbsp&nbsp&nbsp {point.y} <br>'
    },
    credits: {
        enabled: false
    },
    exporting: { enabled: false },
    series: [{
        name: dataList[0].name,
        data: dataList[0].data,
        color: '#00eaff',
    }, {
        name: dataList[1].name,
        data: dataList[1].data,
        color: '#0091ff'

    }]
    
})

</script>