<template>
    <div>
        <highcharts :options="chartOptions" ref="chart"></highcharts>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue"
import { Chart } from 'highcharts-vue'
const chartOptions = ref({
    chart: {
        type: 'pie',
        backgroundColor: 'rgb(14, 17, 23)',
        width:360,
        height: 300
    },
    title: {
        text: null,
        align: 'left'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            borderColor:'',//去边框
            shadow: false,		//去阴影
            // groupPadding: 0.1,
            dataLabels: {
                enabled: false,
                // format: '<b>{point.name}</b><br>{point.percentage:1f} ',
                format:' <span style="color:{point.color}">\u25CF</span> <b>  {point.name}: {point.percentage:.1f}% '
                // distance: -60,
                // filter: {
                //     property: 'percentage',
                //     operator: '>',
                //     value: 6
                // }
            }
        }
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
        type: "pie",
        minPointSize: 10,
        // innerSize: '20%',
        zMin: 0,
        name: '鸟类',
        // name: null,
        borderRadius: 1,
        // itemStyle: {
        //               normal: {
        //                   borderColor: '#fff',
        //                   borderWidth: '5'
        //               },
        //               emphasis: {
        //                   borderColor: '#fff',
        //                   borderWidth: '5'
        //               }
        //           },
        data: [{
            name: '数据一',
            y: 100,
            // sliced:true
        }, {
            name: '数据二',
            y: 150,
           
        }],
        colors: [
            'rgb(88,148,255)',
            'rgb(114,205,215)',
           
        ]
    }]
})

</script>