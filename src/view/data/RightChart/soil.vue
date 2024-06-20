<template>
    <div>
        <highcharts :options="chartOptions" ref="chart"></highcharts>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue"
import HighCharts from 'highcharts'


// 定义组件的 props
const {dataList} = defineProps({
    dataList: {
        type: Array,
        default: () => [
            { name: '土壤湿度', data: [88, 232, 876, 312, 94] },
            { name: '土壤温度', data: [842, 512, 132, 332, 958] }
        ]
    }
});

const chartOptions = ref({
    chart: {
        type: 'areaspline',
        backgroundColor: '#030632',
        // width:400,
        height: 240
    },
    title: {
        text: null
    },
    // style: {
    // color: 'red',
    // fontSize: "12px",

    //  },
    xAxis: {
        categories: ['今日', '本月', '本季度', '上季度', '全年'],
        title: {
            text: null
        },

        crosshair: {
            snap: true,
            label: {
                enabled: true,
                align: 'right',
                // 格式化文本内容
                // formatter: '{chart.options.countries.(value).ucCode}<br>' +
                // '<span class="f32">' +
                // '<span style="display:inline-block;height:32px;vertical-align:text-top;" ' +
                // 'class="flag {value}"></span></span>'
            }
        },
        labels: {
            style: {
                color: '#ffffff',
                fontSize: "14px"
            }
        }
    },

    yAxis: {
        categories: ['0', '200', '400', '600', '800', '1000'],
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
        tickInterval: 200, //间隔
        max: 1000 //最大值
    },
    plotOptions: {
        areaspline: {
            dataLabels: {
                enabled: false
            },
            enableMouseTracking: false,
            fillOpacity: 0.5
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
        style: {
            color: 'rgb(124,124,124)',

        },
        pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {series.name}</b>&nbsp&nbsp&nbsp&nbsp {point.y} <br>'
    },
    credits: {
        enabled: false
    },
    exporting: { enabled: false },
    series: [
        {
            name: dataList[0].name,
            data: dataList[0].data,
            color: '#00eaff',
            fillColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, 'rgba(0, 238, 255, 0.5)'],
                    [1, 'rgba(0, 234, 255, 0)']
                ]
            }
        },
        {
            name: dataList[1].name,
            data: dataList[1].data,
            color: '#0091ff',
            fillColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, 'rgba(0, 145, 255, 0.4)'],
                    [1, 'rgba(0, 145, 255, 0)']
                ]
            }
        }
    ]

})
</script>