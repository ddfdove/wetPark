<template>
    <div>
        <highcharts :options="chartOptions" ref="chart"></highcharts>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue"

// 定义组件的 props
const {dataList} = defineProps({
    dataList: {
        type: Array,
        default: () => [
            { name: '分钟', data: [5.2, -16.2, -11.2, -4.5, -1.2] },
            { name: '小时', data: [0.9, 33.6, 30.7, 21.6, 13.5], }
        ]
    }
});
const chartOptions = ref({
    chart: {
        type: 'spline',
        backgroundColor: '#030025',
        // width:400,
        height: 200
    },
    title: {
        text: null
    },
    xAxis: {
        categories: ['水位信息', '水温度', '浊度', '溶解度', '电导率'],
        title: {
            text: null
        },
        crosshair: true,
        labels: {
            rotation: 0,
            style: {
                color: '#ffffff',
                fontSize: "14px"
            }
        }
    },
    yAxis: {
        categories: ['-20', '-10', '0', '10', '20', '40'],
        title: {
            text: null
        },
        labels: {
            style: {
                color: '#ffffff',
                fontSize: "14px",
            }
        },
        gridLineDashStyle: 'solid',//网格线样式
        // gridLineDashStyle: 'ShortDash',//网格线样式
        gridLineColor: '#221f3f',
        min: -20,//最小值
        tickInterval: 10, //间隔
        max: 40 //最大值
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