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
    // accessibility: {
    //     point: {
    //         valueSuffix: '%'
    //     }
    // },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            color:'red',
            borderColor:'',//去边框
            shadow: false,		//去阴影
            dataLabels: {
                enabled: true,
                // format: '<b>{point.name}</b><br>{point.percentage:1f} ',
                format: '<b>{point.name}</b><br>{point.y} ',
                distance: -40,
                filter: {
                    property: 'percentage',
                    operator: '>',
                    value: 4
                }
            }
        }
    },
    tooltip: {
        enable:false,
        headerFormat: '',
        padding:16,
        pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b>: {point.y} '
    },
    credits: {
        enabled: false
    },
    exporting: {enabled: false},
    series: [{
        name: '鸟类',
        data: [
            { name: '一级鸟类', y: 100 },
            { name: '二级鸟类', y: 150 },
            { name: '其他鸟类', y: 138 },
        ]
    }]
})

</script>