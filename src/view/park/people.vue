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
        height: 220
    },
    title: {
        text: null
    },
    // style: {
    // color: 'red',
    // fontSize: "12px",

    //  },
    xAxis: {
        categories: ['摄像头', '水质检测', '门禁'],
        title: {
            text: null
        },
        crosshair:true,
        labels: {
            style: {
                color: '#919191',
                fontSize: "10px"
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
                color: '#919191',
                fontSize: "10px"
            }
        },
        gridLineDashStyle: 'ShortDash',//网格线样式
        gridLineColor:'rgb(64,64,64)',
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
    legend: {
        enabled:true,
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'top',
        // symbolHeight:14,
        // symbolWidth:20,
        // symbolRadius:5,
        itemStyle:{'color':'#FFFFFF'}
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
        lineColor: 'rgb(198,109,85)',

        data: [123, 32, 15]
    }, {
        name: '2020',
        data: [233, 12, 23],
        color: 'rgb( 197,171,108)'

    }]
})

</script>