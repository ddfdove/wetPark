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
            { name: '2020', data: [300, 3, 4] },
            { name: '2021', data: [400, 4, 40] },
            { name: '2022', data: [357, 12, 0], }
        ]
    }
});
const chartOptions = ref({
    chart: {
        type: 'spline',
        backgroundColor: '#030025',
        // width:240,
        height: 280,
        space: [0, 0, 0, 0]
    },
    title: {
        text: '同比增长',
        style: {
           color: '#ffffff',
            fontSize: "20px",
        }
    },
    xAxis: {
        categories: ['设备总数', '保修数', '新增数'],
        title: {
            text: null
        },
        crosshair: true,
        labels: {
            rotation: 0,
            style: {
                color: '#ffffff',
                fontSize: "14px",
            }
        }
    },
    yAxis: {
        categories: ['0', '100', '200', '300', '400'],
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
        min: 0,//最小值
        tickInterval: 100, //间隔
        max: 400 //最大值
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
    credits: {
        enabled: false
    },
    exporting: { enabled: false },
    series: [{
        name: dataList[0].name,
        data: dataList[0].data,
        color: '#1dc36a',
    }, {
        name: dataList[1].name,
        data: dataList[1].data,
        color: '#00eaff'
    },
    {
        name: dataList[2].name,
        data: dataList[2].data,
        color: '#0091ff'
    }]
})

</script>