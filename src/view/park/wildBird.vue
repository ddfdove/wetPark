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
        backgroundColor: '#0b1c2e',
        // width:400,
        height: 240
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
                color: '#919191',
                fontSize: "12px"
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
                color: '#919191',
                fontSize: "12px"
            }
        },
        gridLineWidth: 1,
        gridLineDashStyle: 'ShortDash',//网格线样式
        gridLineColor: 'rgb(64,64,64)',
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
                color: 'rgb(63,149,166)',
                formatter: function () {//格式化
                    return this.y;
                }
            },
            borderRadius: '0',
            borderColor: '',//去边框
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
        data: [360, 355, 234, 572, 549, 342],
        color: 'rgb(63,149,194)'
    }]
})

</script>