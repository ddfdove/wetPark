<template>
    <div>
        <highcharts :options="chartOptions" ref="chart"></highcharts>
    </div>
    <span style="color:"></span>
</template>

<script setup>
import { ref,onMounted } from "vue"

const {dataList} = defineProps({
    dataList: {
        type: Array,
        default: () => [
            {
                name: '一级鸟类',
                y: 100,

                // sliced: true
            },
            {
                name: '二级鸟类',
                y: 150,


            },
            {
                name: '其他鸟类',
                y: 138,

            }
        ]
    }
})
const chartOptions = ref({
    chart: {
        type: 'pie',
        options3d: {
            enabled: true,
            alpha: 45,
            beta: 0,
            // depth: 50, // 增加饼图的深度
            viewDistance: 25 // 调整视角距离
        },
        backgroundColor: 'rgba(0, 0, 0, 0)',
        height: 230,
        spacing: [0, 0, 20, 0] // 去掉图表的内边距
    },
    title: {
        text: ''
    },
    subtitle: {
        text: ''
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            depth: 40, // 增加饼图的深度
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b><br><span style="color:{point.color}">{point.y}</span>',
                // distance: 0,
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
        enable: true,
        headerFormat: '',
        backgroundColor: 'rgba(0, 170, 255, 0.15)', // 提示框背景色
        borderWidth: 1, // 提示框边框宽度
        borderColor: ' rgba(0, 170, 255, 0.5)', // 提示框边框颜色
        style: {
            color: '#ffffff',

        },
        pointFormat: ' <b> {point.name}</b>: {point.y} '
    },
    credits: {
        enabled: false
    },
    exporting: {
        enabled: false
    },
    series: [{
        name: '鸟类',
        size: '110%',
        innerSize: '70%',
        data: dataList,
        colors: [
            '#f25e00',
            '#0084e6',
            '#10a34c'
        ]
    }]
})

</script>