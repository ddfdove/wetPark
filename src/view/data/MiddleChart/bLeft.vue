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
        backgroundColor: 'rgb(14, 17, 23)',
        width:360,
        height: 300
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
            borderColor:'',//去边框
            shadow: false,		//去阴影
            dataLabels: {
                enabled: false,
                format: '<b>{point.name}</b><br>{point.percentage:1f} ',
                // distance: -60,
                // filter: {
                //     property: 'percentage',
                //     operator: '>',
                //     value: 6
                // }
            }
        }
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
        name: 'countries',
        borderRadius: 1,
        // itemStyle: {
        //               normal: {
        //                   borderColor: '#fff',
        //                   borderWidth: '1'
        //               },
        //               emphasis: {
        //                   borderColor: '#fff',
        //                   borderWidth: '1'
        //               }
        //           },
        name: '鸟类',
        size:'110%',
        innerSize:'70%',
        data: [
            { name: '数据一', y: 60 },
            { name: '数据二', y: 40 },
            
        ],
        colors: [
           
            'rgb(22,132,252)',
            'rgb(232,232,232)'
        ]
    }]
})

</script>