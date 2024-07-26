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
        backgroundColor: '#030025',
        width:200,
        // height: 300,
        // width: 400
    },
    title: {
        text: null
    },
    xAxis: {

        categories: ['A区', 'B区', 'C区'],
        title: {
            text: null
        },
        crosshair: true,
        // gridLineWidth: 1,
        lineWidth: 0.5,
        // gridLineDashStyle: 'ShortDash',//网格线样式
        // gridLineColor:'rgb(64,64,64)',
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
        gridLineDashStyle: 'solid',//网格线样式
        // gridLineDashStyle: 'ShortDash',//网格线样式
        gridLineColor: '#221f3f',
        min: 0,//最小值
        tickInterval: 5, //间隔
        max: 25 //最大值
    },
    plotOptions: {
        bar: {
            borderRadius: '0',
            dataLabels: {
                enabled: true,
                color: 'rgb(80,135,236)'
            },
            borderColor: '',//去边框
            groupPadding: 0.1
        },
        // column:{
        // 	borderColor: "",//去边框
        //     shadow: false		//去阴影
        // }
    },
    legend: {
        enabled: false
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
    series: [{
        name: '种类',
        data: [10, 14, 23],
        color: 'rgb(80,135,236)',
        pointPadding: 0,
        groupPadding: 0.25
    }]
})

</script>