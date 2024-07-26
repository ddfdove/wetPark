<template>
    <div>
        <highcharts :options="chartOptions" ref="chart"></highcharts>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue";

// 定义组件的 props
const { dataList } = defineProps({
    dataList: {
        type: Array,
        default: () => [
            {
                name: "数据一",
                data: [100, 140, 230, 100, 130],
            },
            {
                name: "数据二",
                data: [150, 100, 200, 140, 100],
            },
        ],
    },
});
const chartOptions = ref({
    chart: {
        type: "cylinder",
        backgroundColor: "#030025",
        spacing: [10, 20, 0, 0], // 去掉图表的内边距
        height: 320,
        width:600,
        options3d: {
            enabled: true,
            // alpha: 10,
            // beta: 30,
            depth: 50,
            // viewDistance: 25
        },
    },
    title: {
        text: null,
    },
    xAxis: {
        categories: ["1月", "2月", "3月", "4月", "5月"],
        title: {
            text: null,
        },
        // crosshair: true,
        // gridLineWidth: 1,
        lineWidth: 0,
        gridLineWidth: 0,
        labels: {
            enabled: true,
            style: {
                color: "#ffffff",
                fontSize: "12px",
            },
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
            overflow: "justify",
            style: {
                color: "#ffffff",
                fontSize: "12px",
            },
        },
        gridLineWidth: 2,
        gridLineDashStyle: "solid", //网格线样式
        // gridLineDashStyle: 'ShortDash',//网格线样式
        gridLineColor: "#221f3f",
        min: 0, //最小值
        tickInterval: 50, //间隔
        max: 250, //最大值
    },
    plotOptions: {
        series: {
            depth: 60,
            colorByPoint: false,
            pointWidth: 18, // 控制圆柱体的宽度
            edgeColor: "", // 去除3D效果中的白色部分
            dataLabels: {
                enabled: false,
            },
            groupPadding: 0.2, // 控制组之间的间隔
            pointPadding: 0.2, // 控制点之间的间隔
        },
        cylinder: {
            depth: 25,
            // edgeColor: '#FFFFFF', // 设置圆柱体边缘颜色
            edgeWidth: 2, // 设置边缘宽度
            // zones: [{
            //     value: 1, // 为顶部设置颜色
            //     color: {
            //         linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 }, // 纵向渐变
            //         stops: [
            //             [0, 'rgba(0, 117, 255, 0)'],
            //             [1, '#FFFFFF']
            //         ]
            //     }
            // }]
        },
    },
    legend: {
        layout: "horizontal",
        align: "right",
        verticalAlign: "top",
        symbolHeight: 8,
        symbolWidth: 8,
        itemStyle: { color: "#FFFFFF" },
    },
    tooltip: {
        // enable:false,
        shared: true,
        padding: 16,
        backgroundColor: "rgba(0, 170, 255, 0.15)", // 提示框背景色
        borderWidth: 1, // 提示框边框宽度
        borderColor: " rgba(0, 170, 255, 0.5)", // 提示框边框颜色
        headerFormat: "{point.key}<br>",
        style: {
            color: "#ffffff",
        },
        // <span style="color:{point.color}">\u25CF</span>
        pointFormat:
            " <b> {series.name}</b>&nbsp&nbsp&nbsp&nbsp {point.y} <br><br>",
    },
    credits: {
        enabled: false,
    },
    exporting: { enabled: false },
    series: [
        {
            name: dataList[0].name,
            data: dataList[0].data,
            color: {
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 }, // 180度渐变方向
                stops: [
                    [0, "rgba(0, 133, 255, 0.5)"],
                    [1, "rgba(0, 71, 255, 0)"],
                ],
            },
        },
        {
            name: dataList[1].name,
            data: dataList[1].data,
            color: {
                linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 }, // 横向渐变
                stops: [
                    [0, "rgba(0, 102, 255, 0.6)"],
                    [0.12, "rgba(0, 102, 255, 0.6)"],
                    [0.49, "rgba(135, 212, 255, 0.6)"],
                    [0.91, "rgba(0, 117, 255, 0.6)"],
                    [1, "rgba(0, 117, 255, 0.6)"],
                ],
            },
        },
    ],
});
</script>
