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
        backgroundColor: '#0b1c2e',
        width:480,
        height: 220
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
        gridLineWidth: 2,
        // gridLineDashStyle: 'ShortDash',//网格线样式
        gridLineColor: 'rgb(93,102,112)',
        min: 0,//最小值
        tickInterval: 50, //间隔
        max: 250 //最大值
    },
    plotOptions: {
        column: {
            borderRadius: '0',
            dataLabels: {
                enabled: false
            },
            borderColor:'',//去边框
            shadow: false,		//去阴影
            groupPadding: 0.1,
            // color:'red'
        },
        // area:{
        //     shadow:{
        //         color:'rgba(0,0,0,0.5)',
        //         offsetX:0,
        //         offsetY:2,
        //         opacity:0.5,
        //         width:5
        //     }
        // }
        
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
        name: '数据一',
        data: [100, 140, 230, 100, 130],
        color: 'rgb(80,135,236)',
        pointPadding: 0,
        groupPadding: 0.2,
        borderRadiusTopLeft: 100,
        borderRadiusTopRight: 100,

    }, {
        name: '数据二',
        data: [150, 100, 200, 140, 100],
        color: 'rgb(104,187,196)',
        pointPadding: 0,
        groupPadding: 0.2
    }
    ]
})

</script>