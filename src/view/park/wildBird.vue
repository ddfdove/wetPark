<template>
    <div>
        <highcharts :options="chartOptions" ref="chart"></highcharts>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue"

const chartOptions = ref({
    chart: {
        type: 'bar',
        backgroundColor: '#030632',
        // width:400,
        height: 200
    },
    title: {
        text: null
    },

    xAxis: {

        categories: ['黑水鸭', '绿头鸭', '斑头雁', '白骨顶', '灰雁', '赤麻鸭'],
        title: {
            text: null
        },
        crosshair: true,
        // gridLineWidth: 1,
        lineWidth: 0,
        labels: {
            style: {
                color: '#ffffff',
                fontSize: "14px"
            }
        },

    },
    yAxis: {
        // categories: ['0', '100', '200', '300','400','500','600'],
        //   min: 0,
        title: {
            text: null,
        },
        labels: {
            overflow: 'justify',
            style: {
                color: '#ffffff',
                fontSize: "14px"
            }
        },
        gridLineWidth: 1,
        gridLineDashStyle: 'solid',//网格线样式
        // gridLineDashStyle: 'ShortDash',//网格线样式
        gridLineColor: '#221f3f',
        min: 0,//最小值
        tickInterval: 100, //间隔
        max: 600 //最大值
    },
    plotOptions: {
        // bar: {
        //     dataLabels: {
        //         enabled: true,
        //         color: 'rgb(63,149,166)',
        //         style: {
        //             fontSize: "12px",
        //         }
        //     },
        //     borderRadius: '0',
        //     borderColor: '',//去边框
        //     groupPadding: 0.1
        // },
        series: {
            marker: {
                enabled: true   //是否显示折线图上的点（折线图配置）
            },
            dataLabels: {
                enabled: true,  //是否在图表上各个数据点显示对应数据
                color: '#ffffff',
                formatter: function () {//格式化
                    return this.y;
                }
            },
            borderRadius: 8, // 设置圆角
            pointWidth: 8, // 设置每个数据的宽度
            borderColor: '', // 去边框
            groupPadding: 0.1
        },
    },
    legend: {
        enabled: false
    },
    tooltip: {
        // enable:false,
        shared: true,
        headerFormat: '{point.key}<br>',
        padding: 10,
        style: {
            color: 'rgb(124,124,124)',
        },
        pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {series.name}</b>&nbsp&nbsp {point.y} <br>'
    },
    credits: {
        enabled: false
    },
    exporting: { enabled: false },
    series: [{
        name: '数量',
        data: [360, 355, 234, 533, 521, 342],
        color: {
            linearGradient: {
                x1: 1,
                y1: 0,
                x2: 0,
                y2: 0
            },
            stops: [
                [0, '#2861AF'],
                [0.13, '#2861AF'],
                [0.72, '#3981D4'],
                [1, '#3981D4']
            ]
        }
    }]
})

</script>