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
                format: '<b>{point.name}</b><br>{point.percentage:1f} ',
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
        itemStyle:{'color':'#FFFFFF'}
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
        borderColor:'',//去边框
            shadow: false,		//去阴影
        name: '超时订单',
        data: [
            { name: '验收超时', y: 25 },
            { name: '派单超时', y: 38 },
            { name: '上门超时', y: 12 },
            { name: '接单超时', y: 25 },
        ]
    }]
})

</script>