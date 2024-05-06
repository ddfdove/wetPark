<template>
    <div>
        <highcharts :options="chartOptions" ref="chart"></highcharts>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue"

const chartOptions = ref({
    chart: {
        type: 'spline',
        backgroundColor: '#0b1c2e',
        // width:400,
        height: 320
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
        crosshair:true,
        labels: {
            style: {
                color: '#919191',
                fontSize: "12px"
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
                color: '#919191',
                fontSize: "12px"
            }
        },
        // gridLineDashStyle: 'ShortDash',//网格线样式
        gridLineColor:'rgb(45,42,42)',
        min:0 ,//最小值
		tickInterval:50, //间隔
		max:250 //最大值

    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        }
    },
    tooltip: {
        // enable:false,
        shared: true,
        padding:16,
        headerFormat: '{point.key}<br>',
        style: {
            color: 'rgb(124,124,124)',
          
        },
        pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {series.name}</b>&nbsp&nbsp&nbsp&nbsp {point.y} <br>'
    },
    credits: {
        enabled: false
    },
    exporting: {enabled: false},
    series: [{
        name: '2021',
        lineColor: 'rgb(215,117,91)',

        data: [100, 156, 222, 65, 89,95,12,189,223,99,156,245]
    }, {
        name: '2022',
        data: [149, 123, 221, 89, 86,59,145,198,226,146,110,145],
        color: 'rgb( 250,215,130)'
    },{
        name: '2023',
        lineColor: 'rgb(225,173,129)',

        data: [148, 156, 222, 56, 29,98,45,125,146,249,211,102,65]
    }, 
    {
        name: '2024',
        lineColor: 'rgb(61,125,121)',

        data: [223, 156, 222, 87, 111,23,56,79,145,11,233,210,156]
    }, 

]
})

</script>