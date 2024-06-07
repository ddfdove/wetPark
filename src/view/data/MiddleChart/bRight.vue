<template>
    <div>
        <highcharts :options="chartOptions" ref="chart"></highcharts>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue"

const chartOptions = ref({
    chart: {
        type: 'column',
        backgroundColor: 'rgb(14, 17, 23)',
        width:360,
        height: 300
    },
    title: {
        text: null
    },
    xAxis: {

        categories: ['1月', '2月', '3月', '4月', '5月'],
        title: {
            text: null
        },
        crosshair:true,
        // gridLineWidth: 1,
        lineWidth: 0,
        labels: {
            enabled: false,
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
            enabled: false,
            overflow: 'justify',
            style: {
                color: '#919191',
                fontSize: "12px"
            }
        },
        // gridLineWidth: 0,
        // gridLineDashStyle: 'ShortDash',//网格线样式
        gridLineColor: 'rgb(187,187,187)',
        min: 0,//最小值
        tickInterval: 46, //间隔
        max: 230 //最大值
    },
    plotOptions: {
        column: {
            borderRadius: '0',
            dataLabels: {
                enabled: false,
                color:'rgb(255,204,0)'
            },
            borderColor:'',//去边框
            shadow: false,		//去阴影
            groupPadding: 1,
            // color:'red'
        },
    },
    legend: {
        enabled: false
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
        type:'column',
        name: '数据一',
        data: [100,140,200,100,130],
        color: 'rgb(80,135,236)',
        pointPadding: 0.1,
        groupPadding: 0.2,
        // borderRadiusTopLeft: 100,
        // borderRadiusTopRight: 100,

    }, {
        type:'line',
        name: '数据二',
        data: [150,100,230,140,130],
        color: 'rgb(114,205,215)',
    }
    ]
})

</script>