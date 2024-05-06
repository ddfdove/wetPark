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
        categories: ['水位信息', '水温度', '浊度', '溶解度', '电导率'],
        title: {
            text: null
        },
        crosshair:true,
        labels: {
            rotation:0,
            style: {
                color: '#919191',
                fontSize: "10px"
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
                color: '#919191',
                fontSize: "10px"
            }
        },
        gridLineDashStyle: 'ShortDash',//网格线样式
        gridLineColor:'rgb(64,64,64)',
        min:-20 ,//最小值
		tickInterval:10, //间隔
		max:40 //最大值
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
        name: '分钟',
        lineColor: 'rgb(198,109,85)',

        data: [5.2, -16.2, -11.2, -4.5, -1.2]
    }, {
        name: '小时',
        data: [0.9, 33.6, 30.7, 21.6, 13.5],
        color: 'rgb( 197,171,108)'

    }]
})

</script>