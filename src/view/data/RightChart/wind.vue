<template>
    <div class="home">
        <highcharts :options="chartOptions" />
    </div>
</template>

<script setup>
// @ is an alias to /src 
import { ref, reactive } from "vue"

const chartOptions = reactive({
    chart: {
        type: 'pyramid',
        marginRight: 100,
        // width:460,
        height: 260,
        backgroundColor: '#0b1c2e',
    },
    title: {
        text:null,
        x: -50
    },
    plotOptions: {
        series: {
            borderColor:'',//去边框
            shadow: false,		//去阴影
            reversed: false,
            dataLabels: {
                enabled: false,
                format: '<b>{point.name}</b> ({point.y:,.0f})',
                // color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                softConnector: true
            }
        }
    },
    legend: {
        enabled: false
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
        name: '数据',
        data: [
            ['数据一', 100],
            ['数据二', 80],
            ['数据三', 60],
            ['数据四', 40],
            ['数据五', 20]
        ]
    }]
})


</script>