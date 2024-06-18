<template>
    <div>
        <highcharts :options="chartOptions" ref="chart"></highcharts>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue"

// 定义组件的 props
const { dataList } = defineProps({
    dataList: {
        type: Array,
        default: () => [
            {
                name: '数据一',
                data: [150, 1890, 500, 440, 562],
            }

        ],
    },
});
const chartOptions = ref({
    chart: {
        type: 'column',
        backgroundColor: '#030025',
        // width: 500,
        height: 220,
        options3d: {
            enabled: true,
            // alpha: 15, // 调整alpha以旋转图表
            beta: 30,  // 调整beta以旋转图表
            depth: 70, // 增加深度以使柱子看起来更立体
            viewDistance: 25 // 调整视角距离
        }
    },
    title: {
        text: null
    },
    xAxis: {

        categories: ['1月', '2月', '3月', '4月', '5月'],
        title: {
            text: null
        },
        gridLineWidth: 0,
        lineWidth: 0,
        labels: {
            enabled: true,
            style: {
                color: '#ffffff',
                fontSize: "12px"
            }
        },

    },
    yAxis: {
        // categories: ['0', '100', '200', '300','400','500','600'],
        //   min: 0,
        title: {
            text: null,
        },
        labels: {
            enabled: true,
            overflow: 'justify',
            style: {
                color: '#ffffff',
                fontSize: "12px"
            }
        },
        gridLineDashStyle: 'solid',//网格线样式
        // gridLineDashStyle: 'ShortDash',//网格线样式
        gridLineColor: '#221f3f',
        min: 0,//最小值
        tickInterval: 200, //间隔
        max: 600 //最大值
    },
    tooltip: {
        backgroundColor: 'rgba(0, 170, 255, 0.15)', // 提示框背景色
        borderWidth: 1, // 提示框边框宽度
        borderColor: ' rgba(0, 170, 255, 0.5)', // 提示框边框颜色
        style: {
            color: '#ccc',
            // letterSpacing: '2px',
            fontSize: '14px',
        },
        headerFormat: '{point.key}<br>',
        pointFormat: ' <b> {series.name}</b>&nbsp&nbsp&nbsp {point.y} <br>',
        style: {
            color: '#ccc',
            letterSpacing: '2px',
            fontSize: '14px',
        },
    },
    plotOptions: {
        column: {
            borderRadius: '50',
            depth: 25,
            dataLabels: {
                enabled: false,
                color: 'rgb(255,204,0)'
            },
            borderColor: '',//去边框
            shadow: false,		//去阴影
            groupPadding: 0.1,
            // color:'red'
        },
        // area:{
        //     shadow:{
        //         color:'rgba(0,0,0,0.5)',
        //         offsetX:0,
        //         offsetY:2,
        //         opacity:0.5,
        //         width:5
        //     }
        // }
    },
    legend: {
        enabled: false
    },
    credits: {
        enabled: false
    },
    exporting: { enabled: false },
    series: [{
        name: dataList[0].name,
        data: dataList[0].data,
        color: {
            linearGradient: { x1: 0, y1: 1, x2: 0, y2: 0 }, // 从底部到顶部渐变
            stops: [
                [0.01, 'rgba(1, 56, 222, 0.2)'],
                [0.99, '#006BBC']
            ]
        },
        pointPadding: 0.3,
        // groupPadding: 0.2,
    }
    ]
})

</script>