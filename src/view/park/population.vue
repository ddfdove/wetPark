<template>
    <div>
        <highcharts :options="chartOptions" ref="chart"></highcharts>
    </div>
</template>

<script setup>
import { ref } from 'vue';


const chartOptions = ref({
    chart: {
        type: 'pie',
        options3d: {
            enabled: true,
            alpha: 45,
            beta: 0,
            depth: 50, // 增加饼图的深度
            viewDistance: 25 // 调整视角距离
        },
        backgroundColor: '#030632',
        height: 180,
        spacing: [0, 0, 0, 0] // 去掉图表的内边距
    },
    title: {
        text: null
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            borderColor: '', //去边框
            shadow: false, //去阴影
            size: '120%', // 设置饼图大小
            // center: ['50%', '50%'], // 设置饼图中心位置
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b><br>{point.y} ',
                distance: -40,
                filter: {
                    property: 'percentage',
                    operator: '>',
                    value: 4
                },
                style: {
                    color: '#ffffff',
                    fontSize: '12px'
                }
            }
        }
    },
    tooltip: {
        enabled: true,
        headerFormat: '',
        padding: 16,
        pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b>: {point.y} '
    },
    credits: {
        enabled: false
    },
    exporting: {
        enabled: false
    },
    series: [{
        name: '鸟类',
        data: [
            { name: '一级鸟类', y: 100 },
            { name: '二级鸟类', y: 150 },
            { name: '其他鸟类', y: 138 }
        ]
    }]
    // series: [{
    //     name: '鸟类',
    //     data: [
    //         {
    //             name: '一级鸟类',
    //             y: 100,
    //             color: {
    //                 linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },
    //                 stops: [
    //                     [0, '#D0B154'],
    //                     [1, '#BBCA6E']
    //                 ]
    //             }
    //         },
    //         {
    //             name: '二级鸟类',
    //             y: 150,
    //             color: {
    //                 linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },
    //                 stops: [
    //                     [0, '#A8E186'],
    //                     [1, '#9AF297']
    //                 ]
    //             }
    //         },
    //         {
    //             name: '其他鸟类',
    //             y: 138,
    //             color: {
    //                 linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },
    //                 stops: [
    //                     [0, '#92FCA2'],
    //                     [1, '#6DC6FD']
    //                 ]
    //             }
    //         }
    //     ]
    // }]
});
</script>
