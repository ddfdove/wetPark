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
                format: '<b>{point.name}</b><br>{point.percentage:1f} ',
                distance: -40,
                filter: {
                    property: 'percentage',
                    operator: '>',
                    value: 4
                }
            }
        }
    },
    //     plotOptions: {
    //       pie: {
    //           borderRadius: '50%',
    //           dataLabels: {
    //               enabled: true
    //           },
    //           groupPadding: 0.1
    //       }
    //   },
    credits: {
        enabled: false
    },
    exporting: {enabled: false},
    series: [{
        name: '鸟类',
        data: [
            { name: '一级鸟类', y: 25 },
            { name: '二级鸟类', y: 38 },
            { name: '其他鸟类', y: 37 },
        ]
    }]
})

</script>