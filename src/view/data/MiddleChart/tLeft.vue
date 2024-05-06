<template>
    <div>
        <highcharts :options="chartOptions" ref="chart"></highcharts>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue"

const chartOptions = ref({
    chart: {
        type: 'line',
        backgroundColor: 'rgb(14, 17, 23)',
        width:360,
        height: 300
    },
    title: {
        text: null
    },
    // style: {
    // color: 'red',
    // fontSize: "12px",

    //  },
    xAxis: {
        categories: ['1月', '2月', '3月', '4月', '5月'],
        title: {
            text: null
        },
        crosshair:true,
        labels: {
            enabled: false,
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
            enabled: false,
            style: {
                color: '#919191',
                fontSize: "12px"
            }
        },
        // gridLineDashStyle: 'ShortDash',//网格线样式
        gridLineColor:'rgb(93,102,112)',
        min:0 ,//最小值
		tickInterval:50, //间隔
		max:250 //最大值
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: false
            },
            enableMouseTracking: true
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
    legend: {
        enabled: false
    },
    series: [{
        name: '数据一',
        lineColor: 'rgb(112,163,252)',

        data: [150, 100, 200, 140, 100]
    }, {
        name: '数据二',
        data: [100, 140, 230, 100, 130],
        color: 'rgb( 78,132,231)'

    }]
})

</script>