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
        type: 'variablepie',
        backgroundColor: '#0b1c2e',
         // width:400,
         height: 240
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
                format:'值：{point.y} 占比 {point.percentage}%'
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
        pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
            'Area (square km): <b>{point.y}</b><br/>' +
            'Population density (people per square km): <b>{point.z}</b><br/>'
    },
    credits: {
        enabled: false
    },
    exporting: {enabled: false},
    series: [{
        // type: "pie",
        minPointSize: 10,
        innerSize: '20%',
        zMin: 0,
        name: 'countries',
        borderRadius: 5,
        itemStyle: {
                      normal: {
                          borderColor: '#fff',
                          borderWidth: '0'
                      },
                      emphasis: {
                          borderColor: '#fff',
                          borderWidth: '0'
                      }
                  },
        data: [{
            name: '数据一',
            y: 40,
            z: 220
        }, {
            name: '数据二',
            y: 32,
            z: 130
        }, {
            name: '数据三',
            y: 28,
            z: 100
        }, {
            name: '数据四',
            y: 25,
            z: 80
        }, {
            name: '数据五',
            y: 18,
            z: 50
        }],
        colors: [
            'rgb(88,148,255)',
            'rgb(114,205,215)',
            'rgb(88,165,92)',
            'rgb(242,189,66)',
            'rgb(238,117,47)',
        ]
    }]
})

</script>