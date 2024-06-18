<template>
    <div class="home">
        <highcharts :options="chartOptions" />
    </div>
</template>

<script setup>
import { ref, reactive } from "vue"
const chartOptions = reactive({
    chart: {
        type: 'pyramid3d',
        marginRight: 100,
        // width:460,
        height: 260,
        spacing:[0,0,0,0],
        backgroundColor: 'rgba(0,0,0,0)',
        options3d: {
            enabled: true,
            alpha: 10,
            depth: 60,
            viewDistance: 50
        }
    },
    title: {
        text: null,
        x: -50
    },
    plotOptions: {
        series: {
            borderColor: '',//去边框
            shadow: false,		//去阴影
            reversed: false,
            dataLabels: {
                enabled: false,
                format: '<b>{point.name}</b> ({point.y:,.0f})',
                // color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                softConnector: true
            }
        },
        // width: '60%',
        //     height: '80%',
        //     center: ['50%', '45%']
    },
    legend: {
        enabled: false
    },
    tooltip: {
        enable: false,
        headerFormat: '',
        backgroundColor: 'rgba(0, 170, 255, 0.5)', // 提示框背景色
        borderWidth: 1, // 提示框边框宽度
        borderColor: ' rgba(0, 170, 255, 0.5)', // 提示框边框颜色
        pointFormat: ' <b> {point.name}</b>: {point.y} '
    },
    credits: {
        enabled: false
    },
    exporting: { enabled: false },
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