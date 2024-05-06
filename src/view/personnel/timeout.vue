<template>
    <div>
        <highcharts :options="chartOptions" ref="chart"></highcharts>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue"

const chartOptions = ref({
    chart: {
        type: 'pie',
        backgroundColor: '#0b1c2e',
        // width:400,
        height: 240
    },
    title: {
        text: null,

    },
    // tooltip: {
    //     pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    // },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            showInLegend:true,
            // colors,
            // borderRadius: 10,
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b><br>{point.y} ',
                // format: '<b>{point.name}</b><br>{point.percentage:1f} ',
                // distance: -40,
                filter: {
                    property: 'percentage',
                    operator: '>',
                    value: 4
                }
            }
        }
    },
    legend: {
        enabled:true,
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        symbolHeight:14,
        symbolWidth:20,
        symbolRadius:0,
        itemStyle:{'color':'#FFFFFF'}
    },
    tooltip: {
        enable:false,
        headerFormat: '',
        pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b>: {point.y} '
    },
    credits: {
        enabled: false
    },
    exporting: {enabled: false},
    series: [{
        borderColor:'',//去边框
            shadow: false,		//去阴影
        name: '超时订单',
        data: [
            { name: '验收超时', y: 224 },
            { name: '派单超时', y: 100 },
            { name: '上门超时', y: 119 },
            { name: '接单超时', y: 150 },
        ],
        colors: [
           
           'rgb(255,207,72)',
           'rgb(88,148,255)',
           'rgb(22,132,252)',
           'rgb(96,181,101)',
           'rgb(104,187,196)'
       ]
    }]
})

</script>